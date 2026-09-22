import { afterEach, expect, test } from 'bun:test';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { inspectReferenceGraph, inspectSkillReferences } from '../scripts/lib/skill-references.ts';

const roots: string[] = [];
function fixture(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'skill-knowledge-'));
  roots.push(root);
  for (const [name, content] of Object.entries(files)) {
    const path = join(root, name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
  }
  return join(root, 'skill');
}
afterEach(() => roots.splice(0).forEach((path) => rmSync(path, { recursive: true, force: true })));

test('follows nested local knowledge and tolerates reachable cycles', () => {
  const skill = fixture({
    'skill/SKILL.md': '[Tests](references/testing.md)',
    'skill/references/testing.md': '[Cases](cases/regression.md#example)',
    'skill/references/cases/regression.md': '[Back](../testing.md)\n## Example',
  });
  expect(inspectSkillReferences(skill)).toEqual([]);
});

test('detects orphan knowledge even when orphan files reference one another', () => {
  const skill = fixture({
    'skill/SKILL.md': '# Skill',
    'skill/references/a.md': '[B](b.md)',
    'skill/references/b.md': '[A](a.md)',
  });
  expect(inspectSkillReferences(skill)).toEqual([
    'Unreachable reference: references/a.md',
    'Unreachable reference: references/b.md',
  ]);
});

test('rejects missing targets and references owned by another skill', () => {
  const skill = fixture({
    'skill/SKILL.md': '[Missing](references/missing.md)\n[Other](../other/references/test.md)',
    'other/references/test.md': '# Other policy',
  });
  expect(inspectSkillReferences(skill)).toEqual([
    'Broken reference: SKILL.md -> references/missing.md',
    'Knowledge outside allowed roots: SKILL.md -> ../other/references/test.md',
  ]);
});

test('permits optional shared assets and external sources without adopting their references', () => {
  const skill = fixture({
    'skill/SKILL.md':
      '[Assets](../templates/README.md)\n[Script](../scripts/helper.ts)\n[Source](https://example.com/docs)',
    'templates/README.md': '[Template content](references/example.md)',
    'scripts/helper.ts': '// Optional helper',
  });
  expect(
    inspectSkillReferences(skill, [join(skill, '..', 'templates'), join(skill, '..', 'scripts')]),
  ).toEqual([]);
});

test('rejects external documents unless their asset root is explicitly allowed', () => {
  const skill = fixture({
    'skill/SKILL.md':
      '[Other](../other/README.md)\n[Docs](../docs/guide.md)\n[Asset](../templates/file.md)',
    'other/README.md': '# Another skill document',
    'docs/guide.md': '# External guidance',
    'templates/file.md': '# Optional template',
  });
  expect(inspectSkillReferences(skill)).toEqual([
    'Knowledge outside allowed roots: SKILL.md -> ../other/README.md',
    'Knowledge outside allowed roots: SKILL.md -> ../docs/guide.md',
    'Knowledge outside allowed roots: SKILL.md -> ../templates/file.md',
  ]);
});

test('follows documents anywhere within the current skill', () => {
  const skill = fixture({
    'skill/SKILL.md': '[Guide](guide.md)',
    'skill/guide.md': '[Reference](references/rules.md)\n[Missing](missing.md)',
    'skill/references/rules.md': '# Local rules',
  });
  expect(inspectSkillReferences(skill)).toEqual(['Broken reference: guide.md -> missing.md']);
});

test('shared policy may serve multiple skills and follow shared links', () => {
  const skill = fixture({
    'skill/SKILL.md': '[Auth](../references/auth.md)',
    'other/SKILL.md': '[Dates](../references/dates.md)',
    'references/auth.md': '[Dates](dates.md)',
    'references/dates.md': '# Date semantics',
  });
  expect(
    inspectReferenceGraph([skill, join(skill, '..', 'other')], join(skill, '..', 'references')),
  ).toEqual([]);
});

test('shared policy cannot send readers back into a technology skill', () => {
  const skill = fixture({
    'skill/SKILL.md': '[Auth](../references/auth.md)',
    'references/auth.md': '[Implementation](../skill/SKILL.md)',
  });
  expect(inspectReferenceGraph([skill], join(skill, '..', 'references'))[0]).toContain(
    'Knowledge outside allowed roots',
  );
});

test('rejects other skill documents outside references even within an allowed asset root', () => {
  const skill = fixture({
    'skill/SKILL.md': '[Other](../other/README.md)\n[Shared](../references/quality.md)',
    'other/SKILL.md': '# Other skill',
    'other/README.md': '# Other guidance',
    'other/docs/guide.md': '# Other nested guidance',
    'references/quality.md': '[Other guide](../other/docs/guide.md)\n[Caller](../skill/guide.md)',
    'skill/guide.md': '# Caller guidance',
  });
  const problems = inspectReferenceGraph(
    [skill, join(skill, '..', 'other')],
    join(skill, '..', 'references'),
    [join(skill, '..')],
  );
  expect(problems).toEqual([
    `${skill}: Knowledge outside allowed roots: SKILL.md -> ../other/README.md`,
    `${skill}: Knowledge outside allowed roots: ../references/quality.md -> ../other/docs/guide.md`,
    `${skill}: Knowledge outside allowed roots: ../references/quality.md -> ../skill/guide.md`,
  ]);
});

test('allows declared shared script and template assets while checking their link targets', () => {
  const skill = fixture({
    'skill/SKILL.md': '[Shared](../references/quality.md)',
    'references/quality.md':
      '[Template](../templates/references/example.md)\n[Script](../scripts/check.ts)\n[Missing](../scripts/missing.ts)',
    'templates/references/example.md': '# Template asset',
    'scripts/check.ts': '// Script asset',
  });
  const problems = inspectReferenceGraph([skill], join(skill, '..', 'references'), [
    join(skill, '..', 'templates'),
    join(skill, '..', 'scripts'),
  ]);
  expect(problems).toEqual([
    `${skill}: Broken reference: ../references/quality.md -> ../scripts/missing.ts`,
  ]);
});

test('detects unused shared policy and broken links within reachable shared policy', () => {
  const skill = fixture({
    'skill/SKILL.md': '[Auth](../references/auth.md)',
    'references/auth.md': '[Missing](missing.md)',
    'references/orphan.md': '# Unused policy',
  });
  const problems = inspectReferenceGraph([skill], join(skill, '..', 'references'));
  expect(problems.some((problem) => problem.includes('Broken reference'))).toBe(true);
  expect(problems).toContain('Unreachable shared reference: orphan.md');
});
