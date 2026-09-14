#!/usr/bin/env bun
import { lstat, mkdir, open, readFile, realpath, unlink } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export type Profile = 'backend' | 'frontend' | 'monorepo';
type Options = { target: string; profile: Profile; dryRun: boolean };
type PlannedFile = { path: string; content: string; action: 'create' | 'unchanged' };
const templateRoot = fileURLToPath(new URL('../templates/', import.meta.url));
const commonTemplates = {
  '.editorconfig': 'editorconfig',
  '.prettierrc.json': 'prettierrc.json',
  '.prettierignore': 'prettierignore',
  '.gitignore': 'gitignore',
  'eslint.config.mjs': 'eslint.config.mjs',
  'tsconfig.json': 'tsconfig.json',
  'env.d.ts': 'env.d.ts',
  'bunfig.toml': 'bunfig.toml',
};

export function parseOptions(args: string[]): Options {
  let target: string | undefined;
  let profile: Profile | undefined;
  let dryRun = false;
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (argument === '--dry-run') dryRun = true;
    else if (argument === '--target') target = args[++index];
    else if (argument === '--profile') {
      const value = args[++index];
      if (value !== 'backend' && value !== 'frontend' && value !== 'monorepo') {
        throw new Error('Profile must be backend, frontend, or monorepo.');
      }
      profile = value;
    } else throw new Error(`Unknown argument: ${argument}`);
  }
  if (!target || target.startsWith('--') || !profile) {
    throw new Error(
      'Usage: bun apply-project.ts --target PATH --profile backend|frontend|monorepo [--dry-run]',
    );
  }
  return { target: resolve(target), profile, dryRun };
}

async function assertSafeDirectory(path: string): Promise<void> {
  const parent = dirname(path);
  if (parent !== path) await assertSafeDirectory(parent);
  try {
    const info = await lstat(path);
    // Resolve the explicit target first; its ancestors may include OS-managed aliases such as /tmp.
    if (!info.isDirectory()) throw new Error(`Target component is not a directory: ${path}`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
}

async function canonicalTarget(path: string, ancestor = false): Promise<string> {
  try {
    const info = await lstat(path);
    if (info.isSymbolicLink()) {
      if (ancestor) return await realpath(path);
      throw new Error(`Refusing a symbolic-link target: ${path}`);
    }
    if (!info.isDirectory()) throw new Error(`Target is not a directory: ${path}`);
    return await realpath(path);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    return join(await canonicalTarget(dirname(path), true), path.slice(dirname(path).length + 1));
  }
}

function packageContent(profile: Profile): string {
  return `${JSON.stringify(
    {
      name: `${profile}-project`,
      private: true,
      type: 'module',
      packageManager: 'bun@1.3.14',
      scripts: {
        format: 'prettier --write .',
        'format:check': 'prettier --check .',
        lint: 'eslint .',
        typecheck: 'tsc --noEmit',
        test: 'bun -e "console.error(\'Configure behavioral tests for this application before accepting quality checks.\'); process.exit(1)"',
        check: 'bun run format:check && bun run lint && bun run typecheck && bun run test',
        'security:check': 'bun audit',
      },
      devDependencies: {
        '@eslint/js': '10.0.1',
        '@types/bun': '1.3.14',
        eslint: '10.10.0',
        prettier: '3.9.6',
        typescript: '5.9.3',
        'typescript-eslint': '8.70.0',
      },
    },
    null,
    2,
  )}\n`;
}

export async function planProject(options: Options): Promise<PlannedFile[]> {
  const target = await canonicalTarget(options.target);
  await assertSafeDirectory(target);
  const files = await Promise.all(
    Object.entries(commonTemplates).map(async ([name, source]) => ({
      path: join(target, name),
      content: await readFile(join(templateRoot, 'quality', source), 'utf8'),
    })),
  );
  files.push({ path: join(target, 'package.json'), content: packageContent(options.profile) });
  files.push({
    path: join(target, 'AGENTS.md'),
    content: await readFile(join(templateRoot, 'agents', `${options.profile}.md`), 'utf8'),
  });
  const plan: PlannedFile[] = [];
  const conflicts: string[] = [];
  for (const file of files) {
    try {
      const info = await lstat(file.path);
      if (!info.isFile() || info.isSymbolicLink()) {
        conflicts.push(file.path);
      } else if ((await readFile(file.path, 'utf8')) !== file.content) {
        conflicts.push(file.path);
      } else plan.push({ ...file, action: 'unchanged' });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
      plan.push({ ...file, action: 'create' });
    }
  }
  if (conflicts.length)
    throw new Error(`Existing files differ; nothing was written:\n${conflicts.join('\n')}`);
  return plan;
}

export async function applyProject(options: Options): Promise<PlannedFile[]> {
  const plan = await planProject(options);
  const created: { path: string; ino: number; dev: number }[] = [];
  if (!options.dryRun) {
    try {
      for (const file of plan.filter((entry) => entry.action === 'create')) {
        await mkdir(dirname(file.path), { recursive: true });
        // Exclusive creation also refuses a file created after the preflight check.
        const handle = await open(file.path, 'wx');
        try {
          const { ino, dev } = await handle.stat();
          created.push({ path: file.path, ino, dev });
          await handle.writeFile(file.content);
        } finally {
          await handle.close();
        }
      }
    } catch (error) {
      for (const file of created.reverse()) {
        const info = await lstat(file.path).catch(() => undefined);
        // Do not remove a concurrent writer's replacement while rolling back.
        if (info?.ino === file.ino && info.dev === file.dev) await unlink(file.path);
      }
      throw error;
    }
  }
  return plan;
}

if (import.meta.main) {
  try {
    const options = parseOptions(Bun.argv.slice(2));
    const plan = await applyProject(options);
    process.stdout.write(
      `${JSON.stringify({ dryRun: options.dryRun, files: plan.map(({ path, action }) => ({ path, action })) }, null, 2)}\n`,
    );
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
