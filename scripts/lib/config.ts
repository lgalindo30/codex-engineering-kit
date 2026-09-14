export const agentDefaults = {
  enabled: true,
  max_concurrent_threads_per_session: 5,
  default_subagent_model: 'gpt-5.6-terra',
  default_subagent_reasoning_effort: 'medium',
} as const;

export function parseConfig(source: string): Record<string, unknown> {
  return Bun.TOML.parse(source) as Record<string, unknown>;
}

/** Update only our scalar keys, preserving comments and unrelated TOML tables. */
export function mergeConfig(source: string): string {
  const parsed = parseConfig(source);
  const lines = source.split('\n');
  let start = lines.findIndex((line) => /^\s*\[agents\]\s*(?:#.*)?$/.test(line));
  if (start < 0) {
    // Inline/dotted scalar declarations cannot safely coexist with a new table.
    if (lines.some((line) => /^\s*agents\s*[.=]/.test(line))) {
      throw new Error('Use an explicit [agents] table before installing configuration defaults.');
    }
    if (parsed.agents !== undefined && typeof parsed.agents !== 'object') {
      throw new Error('The existing agents setting is not a TOML table.');
    }
    if (lines.at(-1) !== '') lines.push('');
    lines.push('[agents]');
    start = lines.length - 1;
  }
  let end = lines.findIndex((line, index) => index > start && /^\s*\[/.test(line));
  if (end < 0) end = lines.length;
  for (const [key, value] of Object.entries(agentDefaults)) {
    const matcher = new RegExp(`^\\s*(?:${key}|"${key}"|'${key}')\\s*=`);
    const index = lines.findIndex((line, i) => i > start && i < end && matcher.test(line));
    const replacement = `${key} = ${JSON.stringify(value)}`;
    if (index >= 0) {
      lines[index] = replacement;
    } else {
      lines.splice(end, 0, replacement);
      end++;
    }
  }
  // Do not leave the legacy limit alongside the new one: it is an alias.
  for (let i = end - 1; i > start; i--) {
    if (/^\s*(?:max_threads|"max_threads"|'max_threads')\s*=/.test(lines[i] ?? '')) {
      lines.splice(i, 1);
    }
  }
  const output = `${lines.join('\n').trimEnd()}\n`;
  const result = parseConfig(output).agents as Record<string, unknown>;
  for (const [key, value] of Object.entries(agentDefaults)) {
    if (result[key] !== value) throw new Error(`Unable to configure agents.${key}`);
  }
  return output;
}
