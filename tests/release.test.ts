import { afterEach, expect, test } from 'bun:test';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { bumpVersion, checkPush, versionFiles } from '../scripts/lib/release.ts';

const roots: string[] = [];
const zero = '0'.repeat(40);
afterEach(() => roots.splice(0).forEach((root) => rmSync(root, { recursive: true, force: true })));

function git(root: string, ...args: string[]): string {
  const result = Bun.spawnSync(['git', ...args], { cwd: root });
  if (result.exitCode !== 0) throw new Error(result.stderr.toString());
  return result.stdout.toString().trim();
}

function files(root: string, version: string, plugin = version): void {
  versionFiles.forEach((file, index) => {
    mkdirSync(dirname(join(root, file)), { recursive: true });
    writeFileSync(join(root, file), `${JSON.stringify({ version: index ? plugin : version })}\n`);
  });
}

function fixture(): string {
  const root = mkdtempSync(join(tmpdir(), 'kit-release-'));
  roots.push(root);
  git(root, 'init', '-q');
  git(root, 'config', 'user.name', 'Test');
  git(root, 'config', 'user.email', 'test@example.invalid');
  git(root, 'config', 'core.hooksPath', '/dev/null');
  files(root, '1.0.0');
  return root;
}

function commit(root: string): string {
  git(root, 'add', '.');
  git(root, 'commit', '-qm', 'test', '--allow-empty');
  return git(root, 'rev-parse', 'HEAD');
}

const input = (next: string, old: string, branch = 'main') =>
  `refs/heads/${branch} ${next} refs/heads/${branch} ${old}\n`;

test('checks the outgoing committed tree rather than an uncommitted version bump', () => {
  const root = fixture();
  const old = commit(root);
  const next = commit(root);
  files(root, '1.0.1');
  expect(() => checkPush(root, input(next, old))).toThrow('must exceed');
  const bumped = commit(root);
  files(root, '0.0.1');
  expect(checkPush(root, input(bumped, old))).toBe(1);
});

test('checks every branch and rejects a decreasing force push', () => {
  const root = fixture();
  const old = commit(root);
  files(root, '2.0.0');
  const next = commit(root);
  expect(checkPush(root, input(next, old) + input(next, zero, 'new'))).toBe(2);
  expect(() => checkPush(root, input(old, next))).toThrow('must exceed');
});

test('initial branches establish a baseline; deletions, tags, and unchanged refs need no bump', () => {
  const root = fixture();
  const next = commit(root);
  expect(checkPush(root, input(next, zero))).toBe(1);
  expect(checkPush(root, input(zero, next))).toBe(0);
  expect(checkPush(root, input(next, next))).toBe(0);
  expect(checkPush(root, `refs/tags/v1.0.0 ${next} refs/tags/v1.0.0 ${zero}\n`)).toBe(0);
});

test('missing remote objects produce a fetch instruction', () => {
  const root = fixture();
  const next = commit(root);
  expect(() => checkPush(root, input(next, 'a'.repeat(40)))).toThrow('Fetch the remote branch');
});

test('rejects malformed versions and mismatched committed manifests', () => {
  const root = fixture();
  files(root, '1.0.0', '1.0.1');
  expect(() => checkPush(root, input(commit(root), zero))).toThrow('versions differ');
  files(root, '1.0.0-beta');
  expect(() => checkPush(root, input(commit(root), zero))).toThrow('stable');
});

test('version bump synchronizes both files with semver resets and rejects invalid input', async () => {
  const root = fixture();
  expect(bumpVersion(root, 'patch')).toBe('1.0.1');
  expect(bumpVersion(root, 'minor')).toBe('1.1.0');
  expect(bumpVersion(root, 'major')).toBe('2.0.0');
  for (const file of versionFiles) {
    expect((await Bun.file(join(root, file)).json()).version).toBe('2.0.0');
  }
  expect(() => bumpVersion(root, 'unknown')).toThrow('Usage');
  files(root, '2.0.0', '2.0.1');
  expect(() => bumpVersion(root, 'patch')).toThrow('reconcile');
});

test('new branches must exceed the greatest fetched version for the target remote', () => {
  const root = fixture();
  const first = commit(root);
  git(root, 'update-ref', 'refs/remotes/origin/main', first);
  files(root, '1.1.0');
  const latest = commit(root);
  git(root, 'update-ref', 'refs/remotes/origin/develop', latest);
  expect(() => checkPush(root, input(latest, zero), 'origin')).toThrow('must exceed');
  files(root, '1.1.1');
  expect(checkPush(root, input(commit(root), zero), 'origin')).toBe(1);
  expect(checkPush(root, input(first, zero), 'empty')).toBe(1);
});
