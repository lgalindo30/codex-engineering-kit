import { afterEach, describe, expect, test } from 'bun:test';
import { mkdtemp, mkdir, readFile, realpath, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import {
  applyProject,
  parseOptions,
} from '../plugins/engineering-standards/scripts/apply-project.ts';

const temporary: string[] = [];
async function directory(): Promise<string> {
  const path = await realpath(await mkdtemp(join(tmpdir(), 'engineering-project-')));
  temporary.push(path);
  return path;
}
afterEach(async () => {
  await Promise.all(temporary.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe('project quality scaffolding', () => {
  test('dry run does not create target directories or files', async () => {
    const target = join(await directory(), 'new-project');
    const plan = await applyProject({ target, profile: 'backend', dryRun: true });
    expect(plan.length).toBeGreaterThan(5);
    expect(plan.every((file) => file.action === 'create')).toBe(true);
    expect(await Bun.file(join(target, 'package.json')).exists()).toBe(false);
    expect(await Bun.file(join(target, 'AGENTS.md')).exists()).toBe(false);
  });

  test('creation is repeatable and does not create frameworks or install hooks', async () => {
    const target = join(await directory(), 'project');
    await applyProject({ target, profile: 'backend', dryRun: false });
    const repeat = await applyProject({ target, profile: 'backend', dryRun: false });
    expect(repeat.every((file) => file.action === 'unchanged')).toBe(true);
    const packageJson = await Bun.file(join(target, 'package.json')).json();
    expect(packageJson.dependencies).toBeUndefined();
    expect(packageJson.scripts.check).toContain('format:check');
    expect(await Bun.file(join(target, '.codex/hooks.json')).exists()).toBe(false);
    expect(await readFile(join(target, 'bunfig.toml'), 'utf8')).toContain('86400');
  });

  test('conflicts abort before writing any files and preserve existing content', async () => {
    const target = await directory();
    await writeFile(join(target, 'tsconfig.json'), '{"custom":true}\n');
    await expect(applyProject({ target, profile: 'frontend', dryRun: false })).rejects.toThrow(
      'nothing was written',
    );
    expect(await readFile(join(target, 'tsconfig.json'), 'utf8')).toBe('{"custom":true}\n');
    expect(await Bun.file(join(target, 'package.json')).exists()).toBe(false);
  });

  test('refuses file symlinks without touching their destinations', async () => {
    const root = await directory();
    const target = join(root, 'project');
    await mkdir(target);
    const protectedFile = join(root, 'private-config');
    await writeFile(protectedFile, 'untouched');
    await symlink(protectedFile, join(target, '.prettierrc.json'));
    await expect(applyProject({ target, profile: 'monorepo', dryRun: false })).rejects.toThrow(
      'nothing was written',
    );
    expect(await readFile(protectedFile, 'utf8')).toBe('untouched');
    expect(await Bun.file(join(target, 'package.json')).exists()).toBe(false);
  });

  test('rejects a symlink target and invalid arguments', async () => {
    const root = await directory();
    const target = join(root, 'alias');
    await symlink(root, target);
    await expect(applyProject({ target, profile: 'backend', dryRun: false })).rejects.toThrow(
      'symbolic-link target',
    );
    expect(() => parseOptions(['--target', root, '--profile', 'unknown'])).toThrow('Profile');
    expect(() => parseOptions(['--target', '--profile', 'backend'])).toThrow();
    expect(() => parseOptions(['--target', root, '--profile', 'backend', '--force'])).toThrow(
      'Unknown',
    );
  });
});

describe('opt-in project hooks', () => {
  const hook = resolve('plugins/engineering-standards/templates/hooks/check-stop.ts');
  const stagedHook = resolve('plugins/engineering-standards/templates/hooks/check-staged.ts');

  function git(target: string, ...args: string[]): void {
    const result = Bun.spawnSync(['git', ...args], { cwd: target });
    if (result.exitCode !== 0) throw new Error(result.stderr.toString());
  }

  test('Stop blocks a failure then reports an unchanged failure without looping', async () => {
    const target = await directory();
    git(target, 'init', '-q');
    await writeFile(
      join(target, 'package.json'),
      JSON.stringify({ scripts: { check: 'bun -e "process.exit(1)"' } }),
    );
    const first = Bun.spawnSync(['bun', hook], { cwd: target, stdin: new Blob(['{}']) });
    expect(first.exitCode).toBe(0);
    expect(JSON.parse(first.stdout.toString()).decision).toBe('block');
    const repeat = Bun.spawnSync(['bun', hook], {
      cwd: target,
      stdin: new Blob(['{"stop_hook_active":true}']),
    });
    const response = JSON.parse(repeat.stdout.toString());
    expect(response.decision).toBeUndefined();
    expect(response.systemMessage).toContain('remain unsuccessful');
  });

  test('Stop skips a documentation-only change', async () => {
    const target = await directory();
    git(target, 'init', '-q');
    await writeFile(join(target, 'README.md'), '# Planning\n');
    const result = Bun.spawnSync(['bun', hook], { cwd: target, stdin: new Blob(['{}']) });
    expect(result.exitCode).toBe(0);
    expect(JSON.parse(result.stdout.toString())).toEqual({});
  });

  test.each(['page.astro', 'styles.css', 'migration.sql'])(
    'Stop checks a change confined to %s',
    async (file) => {
      const target = await directory();
      git(target, 'init', '-q');
      await writeFile(
        join(target, 'package.json'),
        JSON.stringify({ scripts: { check: 'bun -e "process.exit(1)"' } }),
      );
      git(target, 'add', 'package.json');
      git(
        target,
        '-c',
        'user.name=Test Fixture',
        '-c',
        'user.email=fixture@example.invalid',
        'commit',
        '-qm',
        'Fixture',
      );
      await writeFile(join(target, file), 'changed');
      const result = Bun.spawnSync(['bun', hook], { cwd: target, stdin: new Blob(['{}']) });
      expect(result.exitCode).toBe(0);
      expect(JSON.parse(result.stdout.toString()).decision).toBe('block');
    },
  );

  test('Stop emits JSON on success and runs checks from the repository root', async () => {
    const target = await directory();
    const launchDirectory = await directory();
    const subdirectory = join(target, 'nested');
    await mkdir(subdirectory);
    git(target, 'init', '-q');
    await writeFile(
      join(target, 'package.json'),
      JSON.stringify({ scripts: { check: 'bun verify.ts' } }),
    );
    await writeFile(join(target, 'verify.ts'), "await Bun.write('.check-ran', process.cwd());\n");
    const result = Bun.spawnSync(['bun', hook], {
      cwd: launchDirectory,
      stdin: new Blob([JSON.stringify({ cwd: subdirectory })]),
    });
    expect(result.exitCode).toBe(0);
    expect(JSON.parse(result.stdout.toString())).toEqual({});
    expect(await readFile(join(target, '.check-ran'), 'utf8')).toBe(target);
  });

  test('pre-commit checks the staged version and preserves partially staged files', async () => {
    const target = await directory();
    await applyProject({ target, profile: 'backend', dryRun: false });
    await symlink(resolve('node_modules'), join(target, 'node_modules'), 'dir');
    git(target, 'init', '-q');
    const sourcePath = join(target, 'sample.ts');
    const formatted = 'export const value = 1;\n';
    const unformatted = 'export const value=2\n';
    await writeFile(sourcePath, formatted);
    git(target, 'add', '.');
    await writeFile(sourcePath, unformatted);
    const pass = Bun.spawnSync(['bun', stagedHook], { cwd: target });
    if (pass.exitCode !== 0)
      throw new Error(`${pass.stdout.toString()}\n${pass.stderr.toString()}`);
    expect(pass.exitCode).toBe(0);
    expect(await readFile(sourcePath, 'utf8')).toBe(unformatted);
    git(target, 'add', 'sample.ts');
    await writeFile(sourcePath, formatted);
    const fail = Bun.spawnSync(['bun', stagedHook], { cwd: target });
    expect(fail.exitCode).not.toBe(0);
    expect(await readFile(sourcePath, 'utf8')).toBe(formatted);
  });
});
