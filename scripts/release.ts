import { bumpVersion, checkPush, committedVersion, compareVersions } from './lib/release.ts';

try {
  const [command, argument, head, ...extra] = process.argv.slice(2);
  if (command === 'bump' && argument && !head) {
    console.log(`Updated package and plugin to ${bumpVersion(process.cwd(), argument)}.`);
  } else if (command === 'check-push' && !head) {
    const checked = checkPush(process.cwd(), await Bun.stdin.text(), argument);
    console.log(`Plugin version gate passed for ${checked} branch update(s).`);
  } else if (command === 'check-range' && argument && head && extra.length === 0) {
    const before = committedVersion(process.cwd(), argument);
    const after = committedVersion(process.cwd(), head);
    if (compareVersions(after, before) <= 0) throw new Error(`${after} must exceed ${before}`);
    console.log(`Plugin version advanced: ${before} -> ${after}.`);
  } else {
    throw new Error(
      'Usage: release.ts bump patch|minor|major | check-push | check-range BASE HEAD',
    );
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
