import { createHash, randomUUID } from 'node:crypto';
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';

export interface Snapshot {
  content: string;
  mode: number;
}

export interface Change {
  path: string;
  before: Snapshot | null;
  after: Snapshot | null;
}

export const hash = (value: string) => createHash('sha256').update(value).digest('hex');

export function safePath(home: string, name: string): string {
  const root = resolve(home);
  const target = resolve(root, name);
  if (!target.startsWith(`${root}${sep}`))
    throw new Error(`Path escapes target directory: ${name}`);
  const parts = relative(root, target).split(sep);
  let cursor = root;
  for (const part of parts) {
    cursor = join(cursor, part);
    try {
      if (lstatSync(cursor).isSymbolicLink()) throw new Error(`Refusing symlink: ${cursor}`);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    }
  }
  return target;
}

export function snapshot(path: string): Snapshot | null {
  try {
    const stat = lstatSync(path);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`Not a regular file: ${path}`);
    return { content: readFileSync(path, 'utf8'), mode: stat.mode & 0o777 };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}

export function atomicWrite(path: string, value: Snapshot | null): void {
  if (!value) {
    rmSync(path, { force: true });
    return;
  }
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  const temporary = `${path}.${randomUUID()}.tmp`;
  try {
    writeFileSync(temporary, value.content, { mode: value.mode, flag: 'wx' });
    renameSync(temporary, path);
  } finally {
    rmSync(temporary, { force: true });
  }
}

export function applyChanges(changes: Change[], write: typeof atomicWrite = atomicWrite): void {
  for (const change of changes) {
    if (JSON.stringify(snapshot(change.path)) !== JSON.stringify(change.before)) {
      throw new Error(`File changed during setup: ${change.path}`);
    }
  }
  const applied: Change[] = [];
  try {
    for (const change of changes) {
      // Include the current write so a partially failed implementation is restored too.
      applied.push(change);
      write(change.path, change.after);
    }
  } catch (error) {
    for (const change of applied.reverse()) atomicWrite(change.path, change.before);
    throw error;
  }
}

export function withLock<T>(home: string, action: () => T): T {
  mkdirSync(home, { recursive: true, mode: 0o700 });
  const path = safePath(home, '.engineering-kit.lock');
  if (existsSync(path))
    throw new Error('Another setup may be running: .engineering-kit.lock exists.');
  mkdirSync(path, { mode: 0o700 });
  try {
    return action();
  } finally {
    rmSync(path, { recursive: true });
  }
}
