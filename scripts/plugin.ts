import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dir, '..');
const marketplace = JSON.parse(
  readFileSync(resolve(root, '.agents/plugins/marketplace.json'), 'utf8'),
) as { name: string };
const manifest = JSON.parse(
  readFileSync(resolve(root, 'plugins/engineering-standards/.codex-plugin/plugin.json'), 'utf8'),
) as { name: string };
const selector = `${manifest.name}@${marketplace.name}`;
const binary = process.env.CODEX_BIN || 'codex';
const args = process.argv.slice(2);

function run(command: string[]): string {
  const result = Bun.spawnSync([binary, ...command], { cwd: root, stdout: 'pipe', stderr: 'pipe' });
  if (result.exitCode !== 0) {
    throw new Error(
      `Codex command failed: ${command.join(' ')}\n${result.stderr.toString()}\nSet CODEX_BIN to a working Codex executable if needed.`,
    );
  }
  return result.stdout.toString();
}

try {
  if (args.some((arg) => !['--check', '--dry-run'].includes(arg)))
    throw new Error('Use --check or --dry-run.');
  const commands = [
    ['plugin', 'marketplace', 'add', root, '--json'],
    ['plugin', 'add', selector, '--json'],
  ];
  if (args.includes('--dry-run')) {
    console.log(JSON.stringify({ executable: binary, commands }, null, 2));
  } else if (args.includes('--check')) {
    const result = JSON.parse(
      run(['plugin', 'list', '--marketplace', marketplace.name, '--json']),
    ) as {
      installed?: { pluginId: string; installed: boolean; enabled: boolean }[];
    };
    if (
      !result.installed?.some(
        (item) => item.pluginId === selector && item.installed && item.enabled,
      )
    ) {
      throw new Error(`${selector} is not installed and enabled.`);
    }
    console.log(`${selector} is installed and enabled. Verify skill discovery in a fresh session.`);
  } else {
    const listing = JSON.parse(run(['plugin', 'marketplace', 'list', '--json'])) as {
      marketplaces: { name: string; root: string }[];
    };
    const existing = listing.marketplaces.find((item) => item.name === marketplace.name);
    if (existing && resolve(existing.root) !== root) {
      throw new Error(
        `Marketplace ${marketplace.name} already points elsewhere. Reconcile it explicitly before installation.`,
      );
    }
    for (const command of commands) console.log(run(command).trim());
    console.log(
      'Plugin installed through Codex. Run setup:global after this step, then start a new session.',
    );
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
