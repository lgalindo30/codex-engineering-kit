import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import {
  applyChanges,
  hash,
  safePath,
  snapshot,
  withLock,
  type Change,
  type Snapshot,
} from './files.ts';

export const roles = ['code_reviewer'] as const;
const stateName = '.engineering-kit/state.json';
const begin = '<!-- codex-engineering-kit:begin -->';
const end = '<!-- codex-engineering-kit:end -->';
const active = ['AGENTS.md', ...roles.map((role) => `agents/${role}.toml`)];

interface Entry {
  original: Snapshot | null;
  installedHash: string;
}

interface State {
  version: 1;
  entries: Record<string, Entry>;
}

export interface InstallOptions {
  source: string;
  home: string;
  dryRun: boolean;
  replaceExisting: boolean;
}

function readState(home: string): State {
  const file = snapshot(safePath(home, stateName));
  if (!file) return { version: 1, entries: {} };
  const value = JSON.parse(file.content) as State;
  if (value.version !== 1 || !value.entries || typeof value.entries !== 'object') {
    throw new Error('Unsupported or invalid installation state.');
  }
  for (const [name, entry] of Object.entries(value.entries)) {
    if (!active.includes(name) || typeof entry.installedHash !== 'string') {
      throw new Error('Invalid installation state entry.');
    }
    if (
      entry.original !== null &&
      (typeof entry.original?.content !== 'string' || !Number.isInteger(entry.original.mode))
    ) {
      throw new Error('Invalid original file snapshot.');
    }
  }
  return value;
}

export function mergeInstructions(existing: string, instructions: string): string {
  const block = `${begin}\n${instructions.trim()}\n${end}`;
  const start = existing.indexOf(begin);
  const finish = existing.indexOf(end);
  if (start >= 0 || finish >= 0) {
    if (
      start < 0 ||
      finish < start ||
      existing.indexOf(begin, start + begin.length) >= 0 ||
      existing.indexOf(end, finish + end.length) >= 0
    ) {
      throw new Error('Malformed or duplicate managed AGENTS.md markers.');
    }
    return existing.slice(0, start) + block + existing.slice(finish + end.length);
  }
  return `${existing.trimEnd()}${existing.trim() ? '\n\n' : ''}${block}\n`;
}

function desiredFiles(options: InstallOptions): Record<string, string> {
  const read = (name: string) => readFileSync(join(options.source, 'global', name), 'utf8');
  return {
    'AGENTS.md': mergeInstructions(
      snapshot(safePath(options.home, 'AGENTS.md'))?.content ?? '',
      read('AGENTS.md'),
    ),
    ...Object.fromEntries(
      roles.map((role) => [`agents/${role}.toml`, read(`agents/${role}.toml`)]),
    ),
  };
}

function backups(home: string, changes: Change[]): Change[] {
  const id = `${new Date().toISOString().replaceAll(':', '-')}-${randomUUID()}`;
  return changes
    .filter((change) => change.before)
    .map((change, index) => ({
      path: safePath(home, `.engineering-kit/backups/${id}/${index}.json`),
      before: null,
      after: {
        content: JSON.stringify({ path: change.path, snapshot: change.before }, null, 2) + '\n',
        mode: 0o600,
      },
    }));
}

function reconcileEntry(
  name: string,
  content: string,
  before: Snapshot | null,
  entry: Entry | undefined,
  replaceExisting: boolean,
): Entry {
  const drifted = entry && (!before || hash(before.content) !== entry.installedHash);
  if (drifted && !replaceExisting) {
    throw new Error(
      `Locally modified managed file: ${name}. Review before using --replace-existing.`,
    );
  }
  if (
    !entry &&
    name.startsWith('agents/') &&
    before &&
    before.content !== content &&
    !replaceExisting
  ) {
    throw new Error(
      `Existing agent conflict: ${name}. Use --replace-existing only after reviewing it.`,
    );
  }
  return {
    original: !entry || drifted ? before : entry.original,
    installedHash: hash(content),
  };
}

function installPlan(options: InstallOptions): Change[] {
  const state = readState(options.home);
  const changes: Change[] = [];
  for (const [name, content] of Object.entries(desiredFiles(options))) {
    const path = safePath(options.home, name);
    const before = snapshot(path);
    state.entries[name] = reconcileEntry(
      name,
      content,
      before,
      state.entries[name],
      options.replaceExisting,
    );
    if (before?.content !== content) {
      changes.push({ path, before, after: { content, mode: before?.mode ?? 0o600 } });
    }
  }
  const statePath = safePath(options.home, stateName);
  const stateBefore = snapshot(statePath);
  const content = JSON.stringify(state, null, 2) + '\n';
  if (stateBefore?.content !== content) {
    changes.push({ path: statePath, before: stateBefore, after: { content, mode: 0o600 } });
  }
  return changes;
}

export function install(options: InstallOptions): string[] {
  const run = () => {
    const changes = installPlan(options);
    if (!options.dryRun) applyChanges([...backups(options.home, changes), ...changes]);
    return changes.map((change) => change.path);
  };
  return options.dryRun ? run() : withLock(options.home, run);
}

export function restore(home: string, dryRun: boolean): string[] {
  const run = () => {
    const state = readState(home);
    const changes: Change[] = [];
    for (const [name, entry] of Object.entries(state.entries)) {
      const path = safePath(home, name);
      const before = snapshot(path);
      if (!before || hash(before.content) !== entry.installedHash) {
        throw new Error(
          `Refusing to restore over local changes: ${name}. Back up and reconcile this file first.`,
        );
      }
      changes.push({ path, before, after: entry.original });
    }
    const statePath = safePath(home, stateName);
    if (snapshot(statePath))
      changes.push({ path: statePath, before: snapshot(statePath), after: null });
    if (!dryRun) applyChanges([...backups(home, changes), ...changes]);
    return changes.map((change) => change.path);
  };
  return dryRun ? run() : withLock(home, run);
}

export function inspectInstallation(home: string): string[] {
  const problems: string[] = [];
  const state = readState(home);
  for (const name of active) {
    const current = snapshot(safePath(home, name));
    if (!current) problems.push(`Missing ${name}`);
    else if (!state.entries[name]) problems.push(`Not managed by this installer: ${name}`);
    else if (hash(current.content) !== state.entries[name]?.installedHash)
      problems.push(`Changed since installation: ${name}`);
  }
  const override = snapshot(safePath(home, 'AGENTS.override.md'));
  if (override?.content.trim()) problems.push('AGENTS.override.md shadows global AGENTS.md.');
  return problems;
}
