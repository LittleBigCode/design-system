# Releasing & publishing

`@diametral/design-system` can be published to **two registries**. Nothing publishes
automatically without the steps below.

| Registry | Install friction | Trigger | Auth |
|---|---|---|---|
| **Public npm** (recommended) | none — `npm i @diametral/design-system`, no token | a published **GitHub Release** | repo secret `NPM_TOKEN` |
| **GitHub Packages** | needs an `.npmrc` scope + a `read:packages` token to install | pushing a **`v*` git tag** | built-in `GITHUB_TOKEN` (no secret) |

## One-time setup for public npm

1. **Own the scope.** Create the free npm org **`littlebigcode`** at npmjs.com (Add Organization),
   or change the package name (see "Different name" below).
2. **Add the token.** Create an npm **automation** access token (npmjs.com → Access Tokens →
   Granular/Automation, with publish rights to the org), then add it to the repo:
   GitHub → Settings → Secrets and variables → Actions → **New repository secret** → name `NPM_TOKEN`.

## Cut a release (public npm)

1. Bump `version` in `package.json` and add a `CHANGELOG.md` entry.
2. Commit, then create a **GitHub Release** (with tag `vX.Y.Z`):
   ```bash
   gh release create v0.2.1 --generate-notes
   ```
   This triggers `.github/workflows/publish-npm.yml`, which builds and runs
   `npm publish --access public --provenance`. (Or run that workflow via **workflow_dispatch**.)
3. Verify: `npm view @diametral/design-system version`.

> The package installs with **no auth** for consumers once it is public on npm. Provenance is
> attached automatically (the workflow has `id-token: write`).

## GitHub Packages (already wired)

Pushing a tag publishes to GitHub Packages via `.github/workflows/publish.yml`:

```bash
git tag v0.2.1 && git push origin v0.2.1
```

Consumers then need a project `.npmrc` (`@diametral:registry=https://npm.pkg.github.com`) and a
`read:packages` token — see [docs/installation.md](docs/installation.md).

## Different name (optional)

To publish unscoped (zero-org, e.g. `diametral-design-system`) or under another scope
(`@diametral/...`): change `name` in `package.json`, the `scope:` in the publish workflows
(and drop it for an unscoped name), and the references in `docs/installation.md` /
`README.md`. Unscoped public packages need neither an org nor `--access public`.

## Local checks before releasing

```bash
npm run build              # generates dist/ (tokens, bundled CSS, WC bundle)
npm publish --dry-run      # lists exactly what would ship (the package "files" allowlist)
```
