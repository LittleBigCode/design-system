# ADR 0003 — Blocks are shipped source: one file feeds the site, npm and agents

- **Status:** Accepted
- **Date:** 2026-09-15
- **Decided by:** maintainer interview, 2026-09-15; executes in [#55](https://github.com/LittleBigCode/design-system/issues/55), then [#56](https://github.com/LittleBigCode/design-system/issues/56) and [#57](https://github.com/LittleBigCode/design-system/issues/57)
- **Applies from:** after [#54](https://github.com/LittleBigCode/design-system/pull/54) merges

## Context

Batch 15 (#48) added five blocks and three templates to the docs site. They are the layer
`docs/recipes.md` calls "molecules": compositions between a component and a whole screen.
`docs/for-claude.md` and `llms.txt` tell an agent to start from a block rather than assemble a
screen from primitives.

Four properties of that layer contradict the instruction:

- **Not shipped.** They live under `site/src/docs/`, which `package.json` `files` excludes. An
  agent working from an npm install cannot read them. `for-claude.md` carries a ponytail note
  admitting this and falling back to the live URL.
- **Hand-typed twice.** Each block is a JSX tree of literal `.ds-*` classes *and* a separate
  HTML string beside it. Batch 16 (#49) removed exactly this drift hazard from every component
  example by scraping the HTML tab from the rendered React demo; blocks were left on the old
  model.
- **One instance per pattern.** "Sign in" is one card. There is no second sign in to choose
  from, which is the whole point of a blocks library (compare shadcn's `login-01…05`).
- **Not gate-covered.** `site/tests/harness.ts` enumerates `COMPONENTS` only. A broken block
  page passes CI.

The grouping is also by screen zone (`marketing` = hero + pricing + footer), which is not an
axis a variant can vary along.

## Decision

**A block variant is one React file at the repo root, published in the package, and every
other surface derives from it.**

- **Home:** `blocks/<category>/<category>-NN.tsx`. `"blocks"` joins `files`. Consumers and
  agents copy the file and own it — the shadcn model, not an import.
- **Authored in React** from `@diametral/design-system/react`. The site globs `blocks/` as a
  second demo root; the HTML tab is scraped by `build-demo-markup.mjs` exactly as component
  demos are. Nothing is hand-typed twice.
- **Flat, single-purpose categories, numeric variants**: `login`, `sidebar`, `hero`,
  `dashboard`… with `-01`, `-02`. Templates fold in as full-screen variants (`dashboard-01`,
  `login-02`, `error-01`); the `/templates` section is removed.
- **Category page is full-bleed** and stacks every variant: Preview / React / HTML tabs, copy,
  and a desktop / tablet / mobile toggle that sets the width of an **iframe** onto a bare
  `/blocks/:category/:variant/preview` route. The bare route is also the standalone view and
  the screenshot target.
- **One registry**, `site/src/registry/blocks.ts`, feeds the routes, the sidebar, the test
  harness, and `docs/agent-index.json`'s new `blocks` array (slug, category, path, url).
  `for-claude.md`'s hand-kept table is replaced by the generated list.

## Consequences

- The five block pages and three template pages are deleted, not kept beside the new system.
  Their content survives as the 25 `-01` (and `-02`) variants in #55's migration map, rewritten
  onto React components while moving. Where a page's JSX and its HTML string disagreed, the JSX
  wins.
- Block routes enter the a11y and visual gates for the first time. Every block baseline is
  regenerated once.
- The iframe is required, not optional: 26 component stylesheets respond to the viewport with
  `@media` width queries, including `sidebar.css` and `app-shell.css`. Shrinking a wrapper
  `div` would show a layout that no real viewport produces.
- `build-demo-markup.mjs` visits block routes in addition to `/docs/<slug>`, and
  `check-contracts.mjs`'s class-resolution rule applies to scraped block HTML.
- The `docs/recipes.md` altitude table stays correct (components / blocks / recipes) with the
  blocks row pointing at `blocks/`.
- Distribution by CLI (`npx … add login-01`) is **not** decided here. Publishing the source
  files is the precondition for it; the command itself is a separate project if ever wanted.

## Alternatives rejected

- **Keep blocks in `site/src`, ship a generated `docs/blocks.md` dump.** Cheaper now; the file
  the agent reads is a copy, and the hand-typed dual markup stays.
- **Export blocks as React components** (`import { Login01 } from '…/react/blocks'`). Makes
  every block a public API with props to maintain. A block is a starting point one edits, not a
  widget one configures.
- **Zone groups with variants inside** (`auth/login-01`). Two-level nav, fewer top-level
  entries, but the group is not what varies.
- **Viewport toggle by shrinking a wrapper.** No standalone route needed, but `@media` rules
  never fire, so the "mobile" view lies.
- **Full shadcn parity (3–5 variants per category) in the first PR.** ~70 files on top of the
  infrastructure. Deferred: #55 ships the infrastructure and the migration, #56 and #57 prove
  it with one wide variant and one breakpoint-sensitive variant, further variants are
  one small issue each.
