import { readFile } from 'node:fs/promises';

const path = Bun.argv[2];
if (!path) throw new Error('Missing commit message file.');
const firstLine = (await readFile(path, 'utf8')).split('\n')[0] ?? '';
const conventional =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9][a-z0-9._/-]*\))?!?: .+/;
const packageJson = await Bun.file('package.json').json();
const needsScope = Boolean(
  packageJson.workspaces || packageJson.engineeringKit?.requireCommitScope,
);
const match = conventional.exec(firstLine);
if (!match || (needsScope && !match[2])) {
  process.stderr.write(
    `Use a Conventional Commit${needsScope ? ' with a scope' : ''}, for example: feat(api): add customer validation\n`,
  );
  process.exitCode = 1;
}
