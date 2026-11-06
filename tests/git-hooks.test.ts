import { afterEach, expect, test } from 'bun:test';
import {
  chmodSync,
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const temporary: string[] = [];
const source = resolve(import.meta.dir, '..');
const setup = join(source, 'plugins/engineering-standards/scripts/git-hooks.ts');
const environment = { ...process.env, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null' };

afterEach(() =>
  temporary.splice(0).forEach((path) => rmSync(path, { recursive: true, force: true })),
);

function execute(root: string, args: string[]) {
  return Bun.spawnSync(args, { cwd: root, env: environment });
}

function git(root: string, ...args: string[]): string {
  const result = execute(root, ['git', ...args]);
  if (result.exitCode !== 0) throw new Error(result.stderr.toString());
  return result.stdout.toString().trim();
}

function commit(root: string, message = 'test(fixture): record valid state') {
  return execute(root, [
    'git',
    '-c',
    'user.name=Fixture',
    '-c',
    'user.email=fixture@example.invalid',
    'commit',
    '-qm',
    message,
  ]);
}

function hookSetup(root: string, mode: '--activate' | '--check' | '--dry-run') {
  return execute(root, ['bun', setup, mode]);
}

function fixture() {
  const parent = mkdtempSync(join(tmpdir(), 'kit-worktree-hooks-'));
  temporary.push(parent);
  const root = join(parent, 'main');
  const peer = join(parent, 'peer with spaces');
  const remote = join(parent, 'remote.git');
  mkdirSync(root);
  git(root, 'init', '-q');
  cpSync(join(source, '.githooks'), join(root, '.githooks'), { recursive: true });
  for (const hook of ['check-staged.ts', 'commit-message.ts']) {
    const destination = join(root, 'plugins/engineering-standards/templates/hooks', hook);
    mkdirSync(join(destination, '..'), { recursive: true });
    cpSync(join(source, 'plugins/engineering-standards/templates/hooks', hook), destination);
  }
  mkdirSync(join(root, 'plugins/engineering-standards/.codex-plugin'), { recursive: true });
  writeFileSync(
    join(root, 'plugins/engineering-standards/.codex-plugin/plugin.json'),
    '{"version":"1.0.0"}\n',
  );
  writeFileSync(
    join(root, 'package.json'),
    JSON.stringify({
      type: 'module',
      version: '1.0.0',
      engineeringKit: { requireCommitScope: true },
      scripts: {
        check: 'bun verify.ts',
        'release:check-push': `bun ${JSON.stringify(join(source, 'scripts/release.ts'))} check-push`,
      },
    }),
  );
  writeFileSync(
    join(root, 'verify.ts'),
    "if ((await Bun.file('sample.ts').text()).includes('false')) throw new Error('fixture quality rejected');\n",
  );
  writeFileSync(join(root, 'sample.ts'), 'export const accepted = true;\n');
  writeFileSync(join(root, '.gitignore'), 'node_modules\n');
  cpSync(join(source, '.prettierrc.json'), join(root, '.prettierrc.json'));
  cpSync(
    join(source, 'plugins/engineering-standards/templates/quality/eslint.config.mjs'),
    join(root, 'eslint.config.mjs'),
  );
  git(root, 'add', '.');
  expect(commit(root).exitCode).toBe(0);
  git(root, 'worktree', 'add', '-qb', 'peer', peer);
  symlinkSync(join(source, 'node_modules'), join(root, 'node_modules'), 'dir');
  symlinkSync(join(source, 'node_modules'), join(peer, 'node_modules'), 'dir');
  git(root, 'init', '--bare', '-q', remote);
  git(root, 'remote', 'add', 'fixture', remote);
  git(root, 'push', '-q', 'fixture', 'HEAD:refs/heads/review');
  return { root, peer, remote };
}

test('activation from a linked worktree is repeatable and check covers every worktree', () => {
  const { root, peer } = fixture();
  expect(hookSetup(peer, '--check').exitCode).toBe(1);
  expect(hookSetup(peer, '--dry-run').exitCode).toBe(0);
  expect(execute(root, ['git', 'config', '--local', '--get', 'core.hooksPath']).exitCode).toBe(1);
  expect(hookSetup(peer, '--activate').exitCode).toBe(0);
  expect(hookSetup(root, '--activate').exitCode).toBe(0);
  const checked = hookSetup(peer, '--check');
  expect(checked.exitCode).toBe(0);
  const report = JSON.parse(checked.stdout.toString());
  expect(report.worktrees).toHaveLength(2);
  expect(report.worktrees.every((status: { active: boolean }) => status.active)).toBe(true);
  expect(git(root, 'config', '--local', '--get', 'core.hooksPath')).toBe('.githooks');
});

test('worktree overrides and default hook managers are preserved without partial activation', () => {
  const { root, peer } = fixture();
  git(root, 'config', 'extensions.worktreeConfig', 'true');
  git(peer, 'config', '--worktree', 'core.hooksPath', '.custom-hooks');
  const rejected = hookSetup(root, '--activate');
  expect(rejected.exitCode).toBe(1);
  expect(rejected.stderr.toString()).toContain('Existing hook manager');
  expect(git(peer, 'config', '--worktree', '--get', 'core.hooksPath')).toBe('.custom-hooks');
  expect(execute(root, ['git', 'config', '--local', '--get', 'core.hooksPath']).exitCode).toBe(1);
  git(peer, 'config', '--worktree', '--unset', 'core.hooksPath');
  const existing = join(root, '.git/hooks/pre-rebase');
  writeFileSync(existing, '#!/bin/sh\nexit 1\n');
  chmodSync(existing, 0o755);
  expect(hookSetup(peer, '--activate').stderr.toString()).toContain('Existing default hooks');
  expect(readFileSync(existing, 'utf8')).toContain('exit 1');
});

test('activation rejects a missing executable hook in another worktree', () => {
  const { root, peer } = fixture();
  chmodSync(join(peer, '.githooks/pre-push'), 0o644);
  const rejected = hookSetup(root, '--activate');
  expect(rejected.exitCode).toBe(1);
  expect(rejected.stderr.toString()).toContain('Missing executable .githooks/pre-push');
  expect(execute(root, ['git', 'config', '--local', '--get', 'core.hooksPath']).exitCode).toBe(1);
});

test('Git blocks an invalid staged commit in a worktree and preserves the unstaged correction', () => {
  const { peer } = fixture();
  expect(hookSetup(peer, '--activate').exitCode).toBe(0);
  const before = git(peer, 'rev-parse', 'HEAD');
  writeFileSync(join(peer, 'sample.ts'), 'debugger;\nexport {};\n');
  git(peer, 'add', 'sample.ts');
  writeFileSync(join(peer, 'sample.ts'), 'export const accepted = true;\n');
  const rejected = commit(peer);
  expect(rejected.exitCode).not.toBe(0);
  expect(rejected.stderr.toString() + rejected.stdout.toString()).toContain('no-debugger');
  expect(git(peer, 'rev-parse', 'HEAD')).toBe(before);
  expect(readFileSync(join(peer, 'sample.ts'), 'utf8')).toBe('export const accepted = true;\n');
  writeFileSync(join(peer, 'sample.ts'), 'export const accepted = 2;\n');
  git(peer, 'add', 'sample.ts');
  expect(commit(peer, 'invalid message').exitCode).not.toBe(0);
  expect(git(peer, 'rev-parse', 'HEAD')).toBe(before);
  expect(commit(peer).exitCode).toBe(0);
});

test('Git blocks version and quality failures before a worktree push reaches a local bare fixture', () => {
  const { peer, remote } = fixture();
  expect(hookSetup(peer, '--activate').exitCode).toBe(0);
  const remoteBefore = git(remote, 'rev-parse', 'refs/heads/review');
  writeFileSync(join(peer, 'sample.ts'), 'export const accepted = 2;\n');
  git(peer, 'add', 'sample.ts');
  expect(commit(peer).exitCode).toBe(0);
  expect(
    execute(peer, ['bun', join(source, 'scripts/release.ts'), 'check-range', remoteBefore, 'HEAD'])
      .exitCode,
  ).not.toBe(0);
  const versionFailure = execute(peer, ['git', 'push', 'fixture', 'HEAD:refs/heads/review']);
  expect(versionFailure.exitCode).not.toBe(0);
  expect(versionFailure.stderr.toString()).toContain('must exceed');
  expect(git(remote, 'rev-parse', 'refs/heads/review')).toBe(remoteBefore);
  const manifest = JSON.parse(readFileSync(join(peer, 'package.json'), 'utf8'));
  manifest.version = '1.0.1';
  writeFileSync(join(peer, 'package.json'), JSON.stringify(manifest));
  writeFileSync(
    join(peer, 'plugins/engineering-standards/.codex-plugin/plugin.json'),
    '{"version":"1.0.1"}\n',
  );
  const formatted = execute(peer, [
    'bun',
    join(source, 'node_modules/prettier/bin/prettier.cjs'),
    '--write',
    'package.json',
    'plugins/engineering-standards/.codex-plugin/plugin.json',
  ]);
  expect(formatted.exitCode).toBe(0);
  writeFileSync(join(peer, 'sample.ts'), 'export const accepted = false;\n');
  git(
    peer,
    'add',
    'sample.ts',
    'package.json',
    'plugins/engineering-standards/.codex-plugin/plugin.json',
  );
  expect(commit(peer).exitCode).toBe(0);
  const qualityFailure = execute(peer, ['git', 'push', 'fixture', 'HEAD:refs/heads/review']);
  expect(qualityFailure.exitCode).not.toBe(0);
  expect(qualityFailure.stderr.toString()).toContain('fixture quality rejected');
  expect(git(remote, 'rev-parse', 'refs/heads/review')).toBe(remoteBefore);
  writeFileSync(join(peer, 'sample.ts'), 'export const accepted = true;\n');
  git(peer, 'add', 'sample.ts');
  expect(commit(peer).exitCode).toBe(0);
  expect(execute(peer, ['git', 'push', 'fixture', 'HEAD:refs/heads/review']).exitCode).toBe(0);
  expect(git(remote, 'rev-parse', 'refs/heads/review')).toBe(git(peer, 'rev-parse', 'HEAD'));
  expect(
    execute(peer, ['bun', join(source, 'scripts/release.ts'), 'check-range', remoteBefore, 'HEAD'])
      .exitCode,
  ).toBe(0);
});
