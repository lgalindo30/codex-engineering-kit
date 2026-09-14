import { resolve } from 'node:path';
import { applyChanges, safePath, snapshot } from './files.ts';

export const versionFiles = [
  'package.json',
  'plugins/engineering-standards/.codex-plugin/plugin.json',
] as const;

export function parseVersion(value: unknown): bigint[] {
  if (typeof value !== 'string' || !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(value)) {
    throw new Error(`Expected a stable major.minor.patch version; received ${String(value)}`);
  }
  return value.split('.').map(BigInt);
}

export function compareVersions(left: string, right: string): number {
  const a = parseVersion(left);
  const b = parseVersion(right);
  for (let index = 0; index < 3; index++) {
    if (a[index]! > b[index]!) return 1;
    if (a[index]! < b[index]!) return -1;
  }
  return 0;
}

function git(root: string, args: string[]): string {
  const result = Bun.spawnSync(['git', ...args], { cwd: root });
  if (result.exitCode !== 0) throw new Error(result.stderr.toString().trim());
  return result.stdout.toString().trim();
}

export function committedVersion(root: string, revision: string): string {
  // Hook input is object IDs; explicit refs are supported for CI comparisons.
  const commit = git(root, ['rev-parse', '--verify', '--end-of-options', `${revision}^{commit}`]);
  const versions = versionFiles.map((file) => {
    const document = JSON.parse(git(root, ['show', `${commit}:${file}`])) as { version?: unknown };
    parseVersion(document.version);
    return document.version as string;
  });
  if (versions[0] !== versions[1]) throw new Error(`Package/plugin versions differ at ${revision}`);
  return versions[0]!;
}

function branchBaseline(root: string, remote?: string): string | undefined {
  if (!remote) return undefined;
  if (!/^[a-zA-Z0-9_.-]+$/.test(remote)) {
    throw new Error('Use a named Git remote with a simple name to discover new-branch baselines');
  }
  const objects = git(root, ['for-each-ref', '--format=%(objectname)', `refs/remotes/${remote}/`]);
  let greatest: string | undefined;
  for (const object of new Set(objects.split('\n').filter(Boolean))) {
    const candidate = committedVersion(root, object);
    if (!greatest || compareVersions(candidate, greatest) > 0) greatest = candidate;
  }
  return greatest;
}

export function checkPush(root: string, input: string, remote?: string): number {
  let checked = 0;
  for (const line of input.split('\n').filter((value) => value.trim())) {
    const fields = line.trim().split(/\s+/);
    if (fields.length !== 4) throw new Error('Invalid Git pre-push input: expected four fields');
    const [, localId, remoteRef, remoteId] = fields as [string, string, string, string];
    if (!remoteRef.startsWith('refs/heads/') || /^0+$/.test(localId)) continue;
    if (localId === remoteId) continue;
    const next = committedVersion(root, localId);
    let previous: string | undefined;
    if (!/^0+$/.test(remoteId)) {
      try {
        previous = committedVersion(root, remoteId);
      } catch (error) {
        throw new Error(
          `Cannot inspect remote baseline ${remoteRef} (${remoteId}). Fetch the remote branch ` +
            `and ensure its committed version files are valid before retrying. ${String(error)}`,
          { cause: error },
        );
      }
    } else {
      previous = branchBaseline(root, remote);
    }
    if (previous && compareVersions(next, previous) <= 0) {
      throw new Error(
        `${remoteRef}: outgoing version ${next} must exceed remote version ${previous}. ` +
          'Run bun run release:bump patch (or minor/major), review and commit both version files.',
      );
    }
    checked++;
  }
  return checked;
}

export function bumpVersion(root: string, increment: string): string {
  const index = ['major', 'minor', 'patch'].indexOf(increment);
  if (index < 0) throw new Error('Usage: bun run release:bump patch|minor|major');
  const originals = versionFiles.map((file) => {
    const path = safePath(resolve(root), file);
    const before = snapshot(path);
    if (!before) throw new Error(`Missing version file: ${file}`);
    const document = JSON.parse(before.content) as { version: string };
    parseVersion(document.version);
    return { path, before, document };
  });
  const current = originals[0]!.document.version;
  if (originals.some(({ document }) => document.version !== current)) {
    throw new Error('Package/plugin versions differ; reconcile them before bumping');
  }
  const parts = parseVersion(current);
  parts[index] = parts[index]! + 1n;
  for (let cursor = index + 1; cursor < 3; cursor++) parts[cursor] = 0n;
  const next = parts.join('.');
  applyChanges(
    originals.map(({ path, before, document }) => ({
      path,
      before,
      after: { ...before, content: `${JSON.stringify({ ...document, version: next }, null, 2)}\n` },
    })),
  );
  return next;
}
