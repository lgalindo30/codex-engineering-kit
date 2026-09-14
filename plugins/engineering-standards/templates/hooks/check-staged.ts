import { mkdtemp, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function git(args: string[]): string {
  const result = Bun.spawnSync(['git', ...args]);
  if (result.exitCode !== 0) throw new Error(result.stderr.toString());
  return result.stdout.toString();
}

const root = git(['rev-parse', '--show-toplevel']).trim();
process.chdir(root);
const files = git(['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z'])
  .split('\0')
  .filter(Boolean);
if (!files.length) process.exit(0);
const temporary = await mkdtemp(join(tmpdir(), 'codex-staged-'));
try {
  // Check an index snapshot so partially staged files are never modified or restaged.
  git(['checkout-index', '--all', `--prefix=${temporary}/`]);
  await symlink(join(root, 'node_modules'), join(temporary, 'node_modules'), 'dir');
  const commands = [
    ['bun', 'run', '--bun', 'prettier', '--check', '--ignore-unknown', '--', ...files],
  ];
  const source = files.filter((file) => /\.[cm]?[jt]sx?$/.test(file));
  if (source.length) commands.push(['bun', 'run', '--bun', 'eslint', '--', ...source]);
  for (const command of commands) {
    const result = Bun.spawnSync(command, { cwd: temporary, stdout: 'inherit', stderr: 'inherit' });
    if (result.exitCode !== 0) {
      process.exitCode = result.exitCode;
      break;
    }
  }
} finally {
  await rm(temporary, { recursive: true, force: true });
}
