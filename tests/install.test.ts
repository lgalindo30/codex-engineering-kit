import { afterEach, describe, expect, test } from 'bun:test';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import {
  install,
  inspectInstallation,
  restore,
  type InstallOptions,
} from '../scripts/lib/install.ts';
import { applyChanges, atomicWrite, safePath, snapshot } from '../scripts/lib/files.ts';

const temporary: string[] = [];
function fixture(): InstallOptions {
  const directory = mkdtempSync(join(tmpdir(), 'engineering-kit-'));
  temporary.push(directory);
  return {
    source: resolve(import.meta.dir, '..'),
    home: join(directory, 'codex'),
    dryRun: false,
    replaceExisting: false,
  };
}
function put(home: string, name: string, content: string): void {
  atomicWrite(safePath(home, name), { content, mode: 0o600 });
}
afterEach(() => {
  temporary.splice(0).forEach((path) => rmSync(path, { recursive: true, force: true }));
});

describe('global installation', () => {
  test('dry run does not create target or metadata', () => {
    const options = fixture();
    expect(install({ ...options, dryRun: true })).toHaveLength(2);
    expect(existsSync(options.home)).toBe(false);
  });

  test('repeat install is a no-op and restore preserves original files and unrelated agent', () => {
    const options = fixture();
    const config =
      '# Personal settings\nmodel = "user-selected-model"\n[agents]\nmax_threads = 2\n[projects."/work"]\ntrust_level = "trusted"\n';
    put(options.home, 'config.toml', config);
    put(options.home, 'AGENTS.md', '# Existing preferences\nKeep this.\n');
    put(options.home, 'agents/custom.toml', 'name = "custom"\n');
    install(options);
    expect(inspectInstallation(options.home)).toEqual([]);
    expect(install(options)).toEqual([]);
    expect(
      Object.keys(
        JSON.parse(readFileSync(join(options.home, '.engineering-kit/state.json'), 'utf8')).entries,
      ),
    ).toEqual(['agents/code_reviewer.toml']);
    expect(readFileSync(join(options.home, 'AGENTS.md'), 'utf8')).toContain('Keep this.');
    const parsed = Bun.TOML.parse(
      readFileSync(join(options.home, 'config.toml'), 'utf8'),
    ) as Record<string, unknown>;
    expect(parsed.model).toBe('user-selected-model');
    expect(parsed.projects).toEqual({ '/work': { trust_level: 'trusted' } });
    restore(options.home, false);
    expect(readFileSync(join(options.home, 'config.toml'), 'utf8')).toBe(config);
    expect(readFileSync(join(options.home, 'AGENTS.md'), 'utf8')).toBe(
      '# Existing preferences\nKeep this.\n',
    );
    expect(existsSync(join(options.home, 'agents/code_reviewer.toml'))).toBe(false);
    expect(readFileSync(join(options.home, 'agents/custom.toml'), 'utf8')).toBe(
      'name = "custom"\n',
    );
  });

  test('agent collisions fail before writing any managed file, replacement is backed and reversible', () => {
    const options = fixture();
    const original = 'name = "code_reviewer"\nmodel_reasoning_effort = "high"\n';
    put(options.home, 'agents/code_reviewer.toml', original);
    expect(() => install(options)).toThrow('Existing agent conflict');
    expect(existsSync(join(options.home, 'AGENTS.md'))).toBe(false);
    install({ ...options, replaceExisting: true });
    expect(existsSync(join(options.home, '.engineering-kit/backups'))).toBe(true);
    restore(options.home, false);
    expect(readFileSync(join(options.home, 'agents/code_reviewer.toml'), 'utf8')).toBe(original);
  });

  test('local modifications block update and restore without destroying edits', () => {
    const options = fixture();
    install(options);
    put(options.home, 'agents/code_reviewer.toml', '# Local customization\n');
    expect(() => install(options)).toThrow('Locally modified');
    expect(() => restore(options.home, false)).toThrow('Refusing to restore');
    expect(readFileSync(join(options.home, 'agents/code_reviewer.toml'), 'utf8')).toBe(
      '# Local customization\n',
    );
  });

  test('reviewed reconciliation restores later user additions exactly', () => {
    const options = fixture();
    install(options);
    const config = '# Personal configuration\n[preferences]\nkeep = true\n';
    const instructions = '# Later personal preference\n';
    put(options.home, 'config.toml', config);
    put(options.home, 'AGENTS.md', instructions);
    install({ ...options, replaceExisting: true });
    expect(install(options)).toEqual([]);
    restore(options.home, false);
    expect(readFileSync(join(options.home, 'config.toml'), 'utf8')).toBe(config);
    expect(readFileSync(join(options.home, 'AGENTS.md'), 'utf8')).toBe(instructions);
    expect(existsSync(join(options.home, 'agents/code_reviewer.toml'))).toBe(false);
  });

  test('personal instruction overrides are ignored, malformed state paths cannot escape', () => {
    const options = fixture();
    install(options);
    put(options.home, 'AGENTS.override.md', '# Override\n');
    expect(inspectInstallation(options.home)).toEqual([]);
    put(
      options.home,
      '.engineering-kit/state.json',
      JSON.stringify({
        version: 1,
        entries: { '../outside': { original: null, installedHash: 'fake' } },
      }),
    );
    expect(() => restore(options.home, false)).toThrow('Invalid installation state entry');
  });

  test('symlinked agents directory is refused', () => {
    const options = fixture();
    mkdirSync(options.home);
    const outside = join(options.home, '..', 'outside');
    mkdirSync(outside);
    symlinkSync(outside, join(options.home, 'agents'));
    expect(() => install(options)).toThrow('Refusing symlink');
    expect(existsSync(join(outside, 'backend.toml'))).toBe(false);
  });

  test('restore dry run leaves installation untouched', () => {
    const options = fixture();
    install(options);
    expect(restore(options.home, true)).toHaveLength(2);
    expect(inspectInstallation(options.home)).toEqual([]);
  });
});

describe('safe configuration and transactions', () => {
  test('failed writes roll back earlier changes', () => {
    const options = fixture();
    const path = join(options.home, 'one');
    const other = join(options.home, 'two');
    put(options.home, 'one', 'before');
    let calls = 0;
    expect(() =>
      applyChanges(
        [
          { path, before: snapshot(path), after: { content: 'after', mode: 0o600 } },
          { path: other, before: null, after: { content: 'new', mode: 0o600 } },
        ],
        (target, content) => {
          if (++calls === 2) throw new Error('Disk failure');
          atomicWrite(target, content);
        },
      ),
    ).toThrow('Disk failure');
    expect(readFileSync(path, 'utf8')).toBe('before');
    expect(existsSync(other)).toBe(false);
  });

  test('a concurrent edit is detected before writes', () => {
    const options = fixture();
    put(options.home, 'config.toml', '# Before');
    const path = join(options.home, 'config.toml');
    const before = snapshot(path);
    writeFileSync(path, '# Concurrent change');
    expect(() => applyChanges([{ path, before, after: null }])).toThrow('changed during setup');
    expect(readFileSync(path, 'utf8')).toBe('# Concurrent change');
  });
});

test('configuration remains untouched during install, repeat install and restore', () => {
  const options = fixture();
  install(options);
  expect(existsSync(join(options.home, 'config.toml'))).toBe(false);
  expect(existsSync(join(options.home, 'AGENTS.md'))).toBe(false);
  const config = '# Personal\n[agents]\nenabled = false\n';
  put(options.home, 'config.toml', config);
  install(options);
  expect(readFileSync(join(options.home, 'config.toml'), 'utf8')).toBe(config);
  expect(install(options)).toEqual([]);
  restore(options.home, false);
  expect(readFileSync(join(options.home, 'config.toml'), 'utf8')).toBe(config);
});
