import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { roles } from './lib/install.ts';
import { parseVersion } from './lib/release.ts';

const root = resolve(import.meta.dir, '..');
const plugin = join(root, 'plugins/engineering-standards');
const errors: string[] = [];
const excluded = new Set(['.git', 'node_modules', '.local', 'coverage', 'dist']);
const read = (path: string) => readFileSync(path, 'utf8');
const assert = (condition: unknown, message: string) => {
  if (!condition) errors.push(message);
};

function walk(path: string): string[] {
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    if (excluded.has(entry.name)) return [];
    const target = join(path, entry.name);
    if (entry.isSymbolicLink()) {
      errors.push(`Unexpected distributed symlink: ${target}`);
      return [];
    }
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function checkSkills(): void {
  const names = readdirSync(join(plugin, 'skills'));
  for (const name of names) {
    const folder = join(plugin, 'skills', name);
    const source = read(join(folder, 'SKILL.md'));
    const match = source.match(/^---\n([\s\S]*?)\n---\n/);
    assert(match, `${name}: missing YAML frontmatter`);
    if (!match?.[1]) continue;
    const frontmatter = Bun.YAML.parse(match[1]) as Record<string, unknown>;
    assert(
      frontmatter.name === name &&
        typeof frontmatter.description === 'string' &&
        frontmatter.description.length > 20,
      `${name}: invalid identity or trigger description`,
    );
    const metadata = Bun.YAML.parse(read(join(folder, 'agents/openai.yaml'))) as {
      interface: { short_description: string; default_prompt: string };
      policy: { allow_implicit_invocation: boolean };
    };
    assert(
      metadata.policy.allow_implicit_invocation === true,
      `${name}: automatic discovery disabled`,
    );
    assert(
      metadata.interface.default_prompt.includes(`$${name}`),
      `${name}: starter prompt missing skill invocation`,
    );
  }
  assert(names.length === 7, 'Expected seven focused skills.');
}

try {
  const manifest = JSON.parse(read(join(plugin, '.codex-plugin/plugin.json'))) as Record<
    string,
    unknown
  >;
  assert(
    manifest.name === 'engineering-standards' && manifest.license === 'MIT',
    'Invalid plugin identity/license.',
  );
  parseVersion(manifest.version);
  const packageJson = JSON.parse(read(join(root, 'package.json'))) as { version: string };
  assert(packageJson.version === manifest.version, 'Root package and plugin versions must match.');
  assert(
    !('mcpServers' in manifest) && !('apps' in manifest) && !('hooks' in manifest),
    'Unexpected active plugin integrations.',
  );
  const marketplace = JSON.parse(read(join(root, '.agents/plugins/marketplace.json'))) as {
    plugins: { source: { path: string } }[];
  };
  assert(
    marketplace.plugins[0]?.source.path === './plugins/engineering-standards',
    'Marketplace source must be repository-relative.',
  );
  for (const role of roles) {
    const profile = Bun.TOML.parse(read(join(root, 'global/agents', `${role}.toml`))) as Record<
      string,
      unknown
    >;
    assert(
      profile.name === role && profile.description && profile.developer_instructions,
      `Invalid role: ${role}`,
    );
    assert(
      !('model' in profile) && !('model_reasoning_effort' in profile),
      `${role}: model pin prevents dynamic choice`,
    );
    if (role === 'code_reviewer')
      assert(profile.sandbox_mode === 'read-only', 'Reviewer must be read-only.');
  }
  checkSkills();
  for (const file of walk(root)) {
    const name = relative(root, file);
    if (name === 'bun.lock') continue;
    const text = read(file);
    assert(!/\/Users\/[a-zA-Z0-9_.-]+\//.test(text), `Machine-specific path: ${name}`);
    assert(
      !/git config(?: --\S+)* user\.(?:name|email)\s+["'][^<$]/.test(text),
      `Hardcoded Git identity: ${name}`,
    );
    if (/\.(?:ts|js|mjs)$/.test(name)) {
      assert(
        text.trimEnd().split('\n').length <= 400,
        `Source exceeds 400 physical lines: ${name}`,
      );
    }
    if (!name.endsWith('.md')) continue;
    for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const href = match[1]?.split('#')[0];
      if (!href || /^(?:https?:|mailto:|#)/.test(href)) continue;
      const target = resolve(dirname(file), decodeURIComponent(href));
      try {
        assert(statSync(target), `Broken link: ${name} -> ${href}`);
      } catch {
        errors.push(`Broken link: ${name} -> ${href}`);
      }
    }
  }
} catch (error) {
  errors.push(error instanceof Error ? error.message : String(error));
}

if (errors.length) {
  errors.forEach((error) => console.error(error));
  process.exitCode = 1;
} else console.log('Plugin, roles, skill metadata, local links, and source limits validated.');
