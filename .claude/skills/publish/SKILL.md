---
name: publish
description: Publish a new version of @diametral/design-system to npm — cut a beta/prerelease or a stable release, retarget a release at the current branch tip, or diagnose a failed publish run. Use whenever the user asks to publish, release, ship a version, cut a beta, bump and publish, or says "publish beta", "release it", "push a new version to npm", "why did the publish fail".
---

# Publishing @diametral/design-system

Publishing is **tag-driven**. Creating the GitHub release *is* the publish —
`.github/workflows/publish-npm.yml` fires on `push: tags: ["v*"]` and on
`release: published`, then derives the dist-tag and runs `npm publish`. There is
no `npm publish` for a human to run.

## The dist-tag rule

The workflow greps `version` from `package.json` for a `-`:

| version | dist-tag | effect |
| --- | --- | --- |
| `5.0.0-beta`, `1.0.0-beta.13` — any `-` | `next` | `latest` untouched |
| `5.0.0` — plain semver | `latest` | becomes the default install for everyone |

Load-bearing: `latest` must keep pointing at a version the published docs
actually describe. Never hand-run a bare `npm publish` — it would move `latest`.

## Procedure

1. **Bump and document.**
   ```bash
   npm version <version> --no-git-tag-version
   ```
   Add a `CHANGELOG.md` entry under the new version. Commit both plus
   `package-lock.json`.

2. **Push.** The tag must point at a commit the remote already has, or the
   workflow checks out nothing.
   ```bash
   git push origin <branch>
   ```

3. **Preflight — do not skip.**
   ```bash
   scripts/preflight-publish.sh
   ```
   Clean-clones HEAD, installs only the root, and runs the full build,
   contract checks and a `--dry-run` pack. Prints the resolved dist-tag.
   See *Why the working tree lies* below.

4. **Create the release at the branch tip.**
   ```bash
   gh release create v<version> --title "v<version>" --generate-notes \
     --prerelease --target "$(git rev-parse HEAD)"
   ```
   Drop `--prerelease` for a stable release. `--target` needs a **full SHA or a
   branch name** — an abbreviated SHA returns `HTTP 422 target_commitish is
   invalid`, and a malformed one returns `HTTP 500`.

5. **Verify.**
   ```bash
   gh run list --workflow publish-npm.yml --limit 2
   npm view @diametral/design-system dist-tags
   ```
   Both triggers fire, so **two runs appear per release** — the tag push and the
   release event. `concurrency` serializes them without cancelling.

## Retargeting a release at a newer commit

The tag is pinned to a commit; new commits on the branch do not move it. To
publish a newer tip under the same version, delete and recreate — safe as long
as the version never reached npm, because npm version numbers can never be
reused.

```bash
gh release delete v<version> --yes --cleanup-tag
scripts/preflight-publish.sh
gh release create v<version> --title "v<version>" --generate-notes \
  --prerelease --target "$(git rev-parse HEAD)"
```

If the version *did* publish, do not retag — bump to a new prerelease instead.

## Why the working tree lies

`npm run check` passing locally does **not** predict CI. `site/` installs this
package as `file:..`, leaving a pnpm link at
`site/node_modules/@diametral/design-system`. `tsc -p tsconfig.docs.json`
typechecks `site/src/registry/**`, walks up from those files, finds that link
and resolves subpath imports (`@diametral/design-system/react/tabs`) through the
real exports map. CI never installs `site/`, so the link is absent and the same
import is unresolvable.

Two consecutive `5.0.0-beta` publishes died on this class of gap. Always run the
preflight, which reproduces the CI condition instead of trusting the working
tree.

## Known traps

- **The publish workflow builds; it must also install.** It once went
  `checkout` → `setup-node` → `npm run build` with no install step, so
  `build:react` compiled against an empty `node_modules` and failed with 200+
  `TS2307`. It hid for 13 betas because the React layer is new to this major.
- **Publishing is gated on the docs site typechecking.** `npm run build` chains
  `build:docs`, which typechecks `site/` — code that is not in the `files`
  allowlist and never ships. A broken demo file can block a release. Structural
  fix (unmade): take `build:docs` out of the release path.
- **`ci.yml` triggers on `branches: [main, v1]`.** Work on any other branch —
  `migration-v2` included — is only covered via `pull_request`, so pushes there
  get no CI.
- **`npm publish` refuses a prerelease without `--tag`.** Expected; the
  workflow supplies it. A bare `--dry-run` erroring this way is not a fault.
- **`rtk` can fabricate git output.** When a `git` call fails under the rtk
  hook, plausible-looking file lists may be synthesized. `git status
  --porcelain=v2 --branch` and `git for-each-ref` proved trustworthy;
  `git diff --stat` did not.
