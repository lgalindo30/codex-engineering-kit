// Install only in a trusted project after reviewing its check command.
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

type HookInput = { stop_hook_active?: boolean; turn_id?: string; cwd?: string };
type FailureState = { fingerprint: string; attempts: number; output: string };
const input = JSON.parse(await Bun.stdin.text()) as HookInput;

function git(args: string[]): string {
  const result = Bun.spawnSync(['git', ...args]);
  if (result.exitCode !== 0) throw new Error(result.stderr.toString());
  return result.stdout.toString();
}

try {
  if (input.cwd) process.chdir(input.cwd);
  process.chdir(git(['rev-parse', '--show-toplevel']).trim());
  const files = new Set([
    ...git(['diff', '--name-only', '-z']).split('\0'),
    ...git(['diff', '--cached', '--name-only', '-z']).split('\0'),
    ...git(['ls-files', '--others', '--exclude-standard', '-z']).split('\0'),
  ]);
  const relevant = [...files].some(
    (file) =>
      /\.(?:[cm]?[jt]sx?|astro|vue|svelte|css|scss|sass|less|html?|sql|json|toml|ya?ml|sh)$/.test(
        file,
      ) || /(?:^|\/)(?:Dockerfile|bun\.lock|\.editorconfig)$/.test(file),
  );
  if (!relevant) {
    process.stdout.write('{}');
    process.exit(0);
  }
  const statePath = git(['rev-parse', '--git-path', 'codex-quality-stop.json']).trim();
  const hash = createHash('sha256');
  for (const file of [...files].filter(Boolean).sort()) {
    hash.update(file);
    try {
      hash.update(await readFile(file));
    } catch {
      hash.update('<deleted>');
    }
  }
  const fingerprint = hash.digest('hex');
  let previous: FailureState | undefined;
  try {
    previous = JSON.parse(await readFile(statePath, 'utf8')) as FailureState;
  } catch {
    /* No prior failure. */
  }
  if (input.stop_hook_active && previous?.fingerprint === fingerprint) {
    process.stdout.write(
      JSON.stringify({
        systemMessage: `Quality checks remain unsuccessful and files have not changed. Report the failed or unavailable checks; do not claim verification passed.\n${previous.output}`,
      }),
    );
    process.exit(0);
  }
  const result = Bun.spawnSync(['bun', 'run', 'check'], { stdout: 'pipe', stderr: 'pipe' });
  const output = `${result.stdout.toString()}\n${result.stderr.toString()}`.slice(-12000);
  if (result.exitCode !== 0) {
    const attempts = input.stop_hook_active ? (previous?.attempts ?? 0) + 1 : 1;
    await writeFile(statePath, JSON.stringify({ fingerprint, attempts, output }));
    if (attempts >= 3) {
      // Bound repair attempts even when each attempt changes the failing files.
      process.stdout.write(
        JSON.stringify({
          systemMessage: `Quality checks remain unsuccessful. Report the failed or unavailable checks to the user; do not claim verification passed.\n${output}`,
        }),
      );
    } else {
      process.stdout.write(
        JSON.stringify({
          decision: 'block',
          reason: `Project quality checks failed. Fix applicable failures or explain the blocker.\n${output}`,
        }),
      );
    }
  } else {
    process.stdout.write('{}');
  }
} catch (error) {
  const message = `Quality verification unavailable: ${error instanceof Error ? error.message : String(error)}. Report this limitation to the user.`;
  process.stdout.write(
    JSON.stringify(
      input.stop_hook_active ? { systemMessage: message } : { decision: 'block', reason: message },
    ),
  );
}
