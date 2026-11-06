import { accessSync, constants, existsSync, lstatSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const requiredHooks = ['pre-commit', 'commit-msg', 'pre-push'] as const;

function git(root: string, args: string[], optional = false): string | undefined {
  const result = Bun.spawnSync(['git', ...args], { cwd: root });
  if (optional && result.exitCode === 1) return undefined;
  if (result.exitCode !== 0) throw new Error(result.stderr.toString().trim());
  return result.stdout.toString().replace(/\n$/, '');
}

function executable(path: string): boolean {
  try {
    if (!lstatSync(path).isFile()) return false;
    accessSync(path, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

export interface HookStatus {
  root: string;
  configured: string | undefined;
  effectiveDirectory: string;
  active: boolean;
  problems: string[];
}

export function inspectHooks(directory: string): HookStatus[] {
  const root = git(directory, ['rev-parse', '--show-toplevel'])!;
  const listing = git(root, ['worktree', 'list', '--porcelain', '-z'])!;
  return listing
    .split('\0')
    .filter((field) => field.startsWith('worktree '))
    .map((field) => {
      const path = field.slice('worktree '.length);
      if (!existsSync(path)) throw new Error(`Registered worktree is unavailable: ${path}`);
      const configured = git(path, ['config', '--path', '--get', 'core.hooksPath'], true);
      const effectiveDirectory = git(path, [
        'rev-parse',
        '--path-format=absolute',
        '--git-path',
        'hooks',
      ])!;
      const expectedDirectory = join(path, '.githooks');
      const problems: string[] = [];
      if (configured !== undefined && effectiveDirectory !== expectedDirectory) {
        problems.push(`Existing hook manager/path must be preserved: ${effectiveDirectory}`);
      }
      for (const hook of requiredHooks) {
        if (!executable(join(expectedDirectory, hook)))
          problems.push(`Missing executable .githooks/${hook}`);
      }
      if (configured === undefined && existsSync(effectiveDirectory)) {
        const custom = readdirSync(effectiveDirectory).filter(
          (name) => !name.endsWith('.sample') && executable(join(effectiveDirectory, name)),
        );
        if (custom.length)
          problems.push(`Existing default hooks must be preserved: ${custom.join(', ')}`);
      }
      return {
        root: path,
        configured,
        effectiveDirectory,
        active: effectiveDirectory === expectedDirectory && problems.length === 0,
        problems,
      };
    });
}

export function setupHooks(directory: string, activate = false): HookStatus[] {
  const before = inspectHooks(directory);
  const problems = before.flatMap((status) =>
    status.problems.map((problem) => `${status.root}: ${problem}`),
  );
  if (problems.length)
    throw new Error(`Hook setup aborted without changes:\n${problems.join('\n')}`);
  if (!activate) return before;
  const root = git(directory, ['rev-parse', '--show-toplevel'])!;
  git(root, ['config', '--local', 'core.hooksPath', '.githooks']);
  const after = inspectHooks(root);
  if (after.some((status) => !status.active))
    throw new Error('Hook activation could not be verified in every worktree.');
  return after;
}

if (import.meta.main) {
  try {
    const args = Bun.argv.slice(2);
    if (args.length !== 1 || !['--check', '--dry-run', '--activate'].includes(args[0]!)) {
      throw new Error('Usage: bun git-hooks.ts --check|--dry-run|--activate');
    }
    const mode = args[0];
    const worktrees =
      mode === '--check'
        ? inspectHooks(process.cwd())
        : setupHooks(process.cwd(), mode === '--activate');
    console.log(JSON.stringify({ mode, worktrees }, null, 2));
    if (mode === '--check' && worktrees.some((status) => !status.active)) process.exitCode = 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
