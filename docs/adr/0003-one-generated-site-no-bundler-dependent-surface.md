# ADR 0003 — One generated site; no bundler-dependent surface in the deploy

- **Status:** Accepted
- **Date:** 2026-09-07
- **Decided by:** Issue [#34](https://github.com/LittleBigCode/design-system/issues/34), superseding [ADR 0002](0002-repo-root-is-the-web-root.md)
- **Applies from:** the next `pages.yml` deploy

## Context

ADR 0002 gave `/` to the buildless showcase and mounted a Vite + React SPA — `site/`, the
"React workbench" — at `/react-workbench/`, because static HTML could not exercise the TSX
layer batches 1+ needed a harness for. That required a redirect fallback file
(`deploy/pages-redirect.html`), a second `npm ci`/build/install in every workflow that touched
either surface, a `404.html` SPA-fallback copy so the subpath's deep links survived a reload,
and a second Playwright config with its own baselines and CI job.

Issue [#32](https://github.com/LittleBigCode/design-system/issues/32) ported the workbench's
controls-rail behaviour (`site/src/docs/playground.tsx`, `format-jsx.ts`) and its variant-axis
extraction (`site/plugins/extract-variants.ts`) into `scripts/build-docs.mjs`, which now
generates a **Workbench** section directly into each static `examples/components/<slug>.html`
page at `npm run build` time. Issue [#33](https://github.com/LittleBigCode/design-system/issues/33)
moved `site/`'s regression specs onto the root Playwright harness, unedited except for how they
address a route. With both landed, `site/` no longer renders anything the generated pages
don't, and it stopped gating anything the root harness didn't already re-run.

## Decision

**One site, generated from the registry, no bundler-dependent surface anywhere in the
deploy.** `site/` and `deploy/` are deleted outright. `pages.yml` assembles
`css assets components examples emails dist` plus the generated `index.html` — no redirect,
no subpath mount, no `404.html` SPA-fallback copy. `ci.yml` drops the `site` job. The generated
Workbench section is the only surviving descendant of the React workbench; it carries none of
its anatomy/part-highlighting tree (out of scope for the port — see `examples/docs.js`'s header
comment).

## Consequences

- The property ADR 0002 protected — the canonical entry point never requires a bundler to
  render — now holds structurally rather than by mounting convention: there is only one
  entry point, and it is the buildless one.
- One Playwright config, one set of committed baselines, one CI job for visual regression and
  accessibility (`tests/`, consolidated by issue #33).
- The Workbench section a reader sees on a generated component page is not a strict subset of
  `site/`'s: it renders the template and cva-derived variant axes exactly as before, but it has
  no anatomy tree, no per-part index, and no `internal`/`recurses`/`in Shell` badges. A
  component's `parts` registry field is carried by the type but currently has no reader — see
  `.claude/skills/components-page/SKILL.md`.
- `scripts/build-components-md.mjs`'s generated links move from the old `/react-workbench/docs/<slug>`
  shape to `examples/components/<slug>.html`, resolving on the one served layout.
- `docs/absorption/batch-plan.md`'s "`examples/` travels verbatim" assumption (§8, task list
  item 8) is superseded: `examples/` is no longer static-only, it now also carries the
  generator-owned React pages. Recorded in `docs/absorption/corrections.md` rather than edited
  into that copy.

## Alternatives rejected

- **Keep the subpath mount, just let it go stale.** Cheapest, but load-bearing dead weight:
  two builds, two Playwright configs, a redirect and a 404 fallback trick, all for a page no
  route pointed at any more once #32 landed.
- **Delete `site/` but keep `deploy/pages-redirect.html`** in case `/` ever needs a redirect
  again. Rejected: the generated `index.html` from `scripts/build-docs.mjs` *is* the home page
  now, so a redirect would send `/` to itself through an extra hop, and a dead file with no
  reader is exactly what this ADR is closing out.
