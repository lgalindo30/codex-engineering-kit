# Versioning and pushes

Every push that advances a remote branch must contain a committed plugin version greater
than that branch's previous remote version, even for documentation-only changes. Use stable SemVer
(`major.minor.patch`) and keep the root package and plugin manifest versions identical.

Before creating the commit that will be pushed:

```sh
bun run release:bump patch
bun run check
```

Use `minor` for compatible new capabilities and `major` for breaking changes. The bump command updates
both version files together; it does not stage files, create commits, push, or install anything. Review
and commit the version changes with the rest of the authorized work. One bump covers a batch of commits
pushed together; another push advancing the same remote branch needs another higher version.

The repository's `pre-push` hook reads Git's ref-update input and checks versions in each outgoing
**committed tree** against the old remote object ID. An uncommitted bump cannot satisfy the check.
The hook also runs the regular quality command. Enable repository hooks with:

```sh
git config --local core.hooksPath .githooks
```

For new branches, the hook requires a version above the greatest version among locally fetched
remote-tracking branches of the target named remote. Fetch the target remote before pushing a new
branch: stale tracking refs cannot reveal newer versions elsewhere on the server. If no tracking
branches exist, creation establishes an initial baseline and requires valid, synchronized version
files but no artificial increment. This bootstrap rule is a local limitation, not proof that the
remote is empty. Push through a named remote; URL-only pushes cannot discover a tracking baseline. Tag-only pushes, branch deletions, and unchanged refs do not
need an increment. A force push to an existing branch still requires a higher version. Multiple branch
updates are checked independently. If the old remote object is missing locally, fetch that remote
branch and retry; the hook does not guess a baseline or perform network operations itself.

For automated comparisons of two existing commits, use:

```sh
bun run release:check-range BASE_COMMIT HEAD_COMMIT
```

Hooks are local safeguards and can be bypassed or absent on another clone. They are not remote server
enforcement. Configure protected branches and required CI checks separately if stronger enforcement
is needed. A commit made through another tool or directly on GitHub does not run these local hooks.

After obtaining a new revision, install dependencies and run `bun run check`, then rerun the documented
plugin/global installation and doctor commands. Increasing the plugin version allows Codex to identify
new plugin content instead of reusing the previous version's cache. A successful version check alone
does not prove plugin installation or behavior; validate the actual installed version as documented in
[installation.md](installation.md).
