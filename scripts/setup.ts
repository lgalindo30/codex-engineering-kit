import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { inspectInstallation, install, restore } from './lib/install.ts';

const args = process.argv.slice(2);
const mode = args.shift();
const flags = new Set(['--dry-run', '--replace-existing']);
let home = process.env.CODEX_HOME || resolve(homedir(), '.codex');
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--codex-home') {
    const value = args[++i];
    if (!value || value.startsWith('--')) throw new Error('--codex-home requires a directory.');
    home = resolve(value);
  } else if (!flags.has(args[i] ?? '')) throw new Error(`Unknown argument: ${args[i]}`);
}

try {
  if (mode === 'doctor') {
    const problems = inspectInstallation(home);
    problems.forEach((problem) => console.error(problem));
    console.log(
      problems.length
        ? 'Global setup needs attention.'
        : 'Managed global files match installation state.',
    );
    console.log(
      'Plugin availability: run bun run setup:plugin --check with a working Codex executable.',
    );
    console.log(
      'Start a fresh Codex session to verify role discovery, model selection, and effective limits.',
    );
    process.exitCode = problems.length ? 1 : 0;
  } else if (mode === 'install' || mode === 'restore') {
    const dryRun = args.includes('--dry-run');
    const paths =
      mode === 'install'
        ? install({
            source: resolve(import.meta.dir, '..'),
            home,
            dryRun,
            replaceExisting: args.includes('--replace-existing'),
          })
        : restore(home, dryRun);
    console.log(`${dryRun ? 'Would change' : 'Changed'} ${paths.length} files:`);
    paths.forEach((path) => console.log(path));
    if (!dryRun && mode === 'install')
      console.log('Global files installed. Install the plugin separately and start a new session.');
  } else
    throw new Error(
      'Usage: setup.ts install|doctor|restore [--dry-run] [--replace-existing] [--codex-home PATH]',
    );
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
