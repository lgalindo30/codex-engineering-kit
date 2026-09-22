import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';

function inside(root: string, target: string): boolean {
  const path = relative(root, target);
  return path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path);
}

function referenceFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return referenceFiles(path);
    return entry.isFile() ? [path] : [];
  });
}

function localLinks(file: string): { href: string; target: string }[] {
  return [...readFileSync(file, 'utf8').matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].flatMap((match) => {
    const href = match[1]?.split('#')[0];
    if (!href || /^(?:https?:|mailto:)/.test(href)) return [];
    return [{ href, target: resolve(dirname(file), decodeURIComponent(href)) }];
  });
}

function knowledgeScope(
  root: string,
  shared: string | undefined,
  skillRoots: string[],
  assetRoots: string[],
  fromShared: boolean,
  target: string,
): 'follow' | 'reject' | 'asset' {
  // A complete skill directory owns all its documents, not only references/ and SKILL.md.
  // Check ownership before asset allowances so those cannot bypass skill isolation.
  if (skillRoots.some((skill) => skill !== root && inside(skill, target))) return 'reject';
  if (inside(root, target)) return fromShared ? 'reject' : 'follow';
  if (shared && inside(shared, target)) return 'follow';
  if (assetRoots.some((asset) => inside(asset, target))) return 'asset';
  return 'reject';
}

function inspect(
  root: string,
  shared: string | undefined,
  skillRoots: string[],
  assetRoots: string[],
  sharedReached: Set<string>,
): string[] {
  const pending = [join(root, 'SKILL.md')];
  const reached = new Set<string>();
  const problems: string[] = [];
  while (pending.length) {
    const file = pending.pop()!;
    if (reached.has(file)) continue;
    reached.add(file);
    const fromShared = shared !== undefined && inside(shared, file);
    if (fromShared) sharedReached.add(file);
    if (!file.endsWith('.md')) continue;
    for (const { href, target } of localLinks(file)) {
      if (!existsSync(target) || !statSync(target).isFile()) {
        problems.push(`Broken reference: ${relative(root, file)} -> ${href}`);
        continue;
      }
      const scope = knowledgeScope(root, shared, skillRoots, assetRoots, fromShared, target);
      if (scope === 'follow') {
        pending.push(target);
      } else if (scope === 'reject') {
        problems.push(`Knowledge outside allowed roots: ${relative(root, file)} -> ${href}`);
      }
      // Optional shared executable/template assets remain allowed. Shared policy must not
      // route back into skills; skill-specific details belong to the caller's local guide.
    }
  }
  for (const file of referenceFiles(join(root, 'references')).sort()) {
    if (!reached.has(file)) problems.push(`Unreachable reference: ${relative(root, file)}`);
  }
  return problems;
}

export function inspectSkillReferences(
  directory: string,
  assetDirectories: string[] = [],
): string[] {
  const root = resolve(directory);
  return inspect(
    root,
    undefined,
    [root],
    assetDirectories.map((asset) => resolve(asset)),
    new Set(),
  );
}

// Reachability starts at every SKILL.md, not at the references themselves: disconnected cycles
// and shared files that no skill uses are still orphans. The kit uses inline Markdown links.
export function inspectReferenceGraph(
  directories: string[],
  sharedDirectory: string,
  assetDirectories: string[] = [],
): string[] {
  const skillRoots = directories.map((directory) => resolve(directory));
  const shared = resolve(sharedDirectory);
  const assetRoots = assetDirectories.map((directory) => resolve(directory));
  const sharedReached = new Set<string>();
  const problems = directories.flatMap((directory) =>
    inspect(resolve(directory), shared, skillRoots, assetRoots, sharedReached).map(
      (problem) => `${directory}: ${problem}`,
    ),
  );
  for (const file of referenceFiles(shared).sort()) {
    if (!sharedReached.has(file))
      problems.push(`Unreachable shared reference: ${relative(shared, file)}`);
  }
  return problems;
}
