import { afterEach, describe, expect, test } from 'bun:test';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { applyChanges, atomicWrite, snapshot } from '../scripts/lib/files.ts';

const temporary: string[] = [];
function fixture(): string {
  const directory = mkdtempSync(join(tmpdir(), 'engineering-kit-files-'));
  temporary.push(directory);
  return directory;
}

afterEach(() => {
  temporary.splice(0).forEach((path) => rmSync(path, { recursive: true, force: true }));
});

describe('file transactions', () => {
  test('failed writes roll back earlier changes', () => {
    const directory = fixture();
    const path = join(directory, 'one');
    const other = join(directory, 'two');
    atomicWrite(path, { content: 'before', mode: 0o600 });
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
    const directory = fixture();
    const path = join(directory, 'one');
    atomicWrite(path, { content: 'before', mode: 0o600 });
    const before = snapshot(path);
    writeFileSync(path, 'concurrent change');
    expect(() => applyChanges([{ path, before, after: null }])).toThrow('changed during setup');
    expect(readFileSync(path, 'utf8')).toBe('concurrent change');
  });
});
