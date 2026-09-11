# Direction reset — incoming is the model

Not a derived artifact, and not a corrections row. The four copies beside this
file record what was *measured*; `corrections.md` records what execution proved
wrong about a measurement. This file records a change of **policy**: the
absorption's default verdict is reversed, on the owner's instruction, 2026-09-04.

## The reversal

The ledgers were written to answer "what does the incumbent keep?". They
answered it consistently: `css-ledger.md` carries **24 `frozen`** verdicts
against **2 `wholesale replacement`**, and the React layer that came out of it
is two naming conventions bolted together — 26 of incoming's 120 components
never imported, ~18 more beaten by an older PascalCase incumbent.

That is the wrong default. `@diametral/ui` is the model. This package is the
**distribution**: same name, same install, buildless CSS, `--ds-*` tokens.
What the incumbent contributes is *additives* — what incoming does not have —
not a veto on what incoming does have.

## Decisions

| # | Decision | Consequence |
| --- | --- | --- |
| 1 | Incoming's site owns `/`. | `site/` is the docs site, not a `/react-workbench/` verification harness. Reverses [#34](https://github.com/LittleBigCode/design-system/issues/34) (retire `site/`). The buildless showcase at `/` retires; installation, theming, foundations, tokens and blocks fold in as pages. |
| 2 | Incoming's CSS wins file-for-file wherever both exist. | The 24 `frozen` verdicts in `css-ledger.md` are void. Incumbent CSS survives only for components incoming does not ship. |
| 3 | Incoming's 120 components are the React layer. See [`api-swaps.md`](./api-swaps.md) for the 28 replaced exports. | Import the 26 missing (`tabs`, `dialog`, `alert-dialog`, `carousel`, `sidebar`, `resizable`, `data-table`, `command`, `input-otp`, `toggle-group`, `split-button`, `multi-select`, `message-scroller`, …); replace every PascalCase incumbent with an incoming counterpart. Only `AppShell`, `ConsoleLayout`, `icons` and `ButtonExtras` are genuine additives. `react/index.tsx` is wrong that Tabs and Modal have "no absorbed counterpart at all". |
| 4 | Take incoming's dependencies; stop hand-rolling. | Adds `cmdk`, `embla-carousel-react`, `input-otp`, `react-resizable-panels`, `@tanstack/react-table`, `@shadcn/react`. `date-fns` is already a transitive peer of `@base-ui/react`, so it is not new. `react/lib/monthGrid.ts` and the local `cva` substitute retire. Only `./react` pulls these — CSS, tokens and web components stay dependency-free. |
| 5 | Publish the barrel **and** per-component subpaths. | `./react` stays; `./react/*` added, and is the documented default so importing a Badge does not drag `@tanstack/react-table` past the bundler. |
| 6 | Root is the package; all site content moves into `site/`. | Root keeps only what `package.json` `files` publishes. `index.html` and the 657 files under `examples/` move; the demo registry moves to `site/src/registry/demos/`, ending the `import.meta.glob("../../../examples/…")` reach-up. Not incoming's literal monorepo, and `npm i @diametral/design-system` is untouched. |
| 7 | Ship a `.ds-*` utility layer. | ~40 layout/text utilities. The top 30 Tailwind utilities in the demos cover 79% of 1,653 uses; the top 100 cover 94%. Needed by decision 8's HTML tab. New public API — keep it small. |
| 8 | Two code tabs per example: React (as incoming authored it, Tailwind wrappers intact) and HTML (pure `.ds-*`, buildless). | Tailwind stays a `site/`-only build dependency, per `site/src/styles/chrome.css`'s existing rule. The HTML tab is derived from the React demo at build time, so it cannot drift. |
| 9 | The HTML tab is markup, not behaviour. | One live preview per example (React). 67 of 115 components are interactive and only 12 `<ds-*>` elements exist; the HTML tab prints classes and ARIA plus a note on what JS to wire. **The web-component layer is not grown to cover them.** |
| 10 | `diametral.css` declares `--ds-*` only. | Codemod incoming's ~20 unprefixed global slots (`--border`→`--ds-rule`, `--ring`→`--ds-focus-ring`, `--foreground`→`--ds-ink`, …) across its 110 CSS files. Nothing unprefixed reaches a consumer's `:root`. `themes/{dark,ocean,sepia}.css` keep working unchanged — they are additives. |
| 11 | Keep the 11-PR stack; add a reversal series on top. | Batches 1–5 are net-new and untouched by this reset. Batches 9+ stack on [#27](https://github.com/LittleBigCode/design-system/pull/27) and apply decisions 1–10. Nothing merges until the queue is done. Batch 0.3's charte pass, batch 6 and batch 7 get written then unwritten inside the unmerged stack; this file is why. |
| 12 | Restore incoming's docs chrome verbatim, retokenised to `--ds-*`. | `docs-layout`, `docs-search`, `component-page`, `overview`, `playground`, `workbench`, `anatomy`. The local copy diverged (209 lines changed) only to route around the missing `Sidebar`; decision 3 removes that reason. The docs site is then built from the library's own components. |
| 13 | Peer stays `react >=18`. | No React-19-only API is used and `@base-ui/react` accepts `17 \|\| 18 \|\| 19`. CI must run an 18 job to keep the claim honest, and each of decision 4's five new deps needs its 18 support confirmed. |

## What this does not change

The additives are kept, and they are the reason this package is the
distribution rather than incoming being republished: `css/themes/` (three
themes, `dark.css` activating under `[data-theme]`, `.dark` and
`:root.dark-theme` — incoming has only `.dark`), `emails/`, `keycloak/`,
`configs/`, `starters/`, the Tailwind preset, the Figma token build, the
12 `<ds-*>` web components, and `AppShell` / `ConsoleLayout` / `icons` /
`ButtonExtras` on the React side.

## Known defects in the plan as written

- `examples/components/*.html` are **not** CSS examples. Each carries an import
  map pulling React 19 from esm.sh and mounts `dist/docs/demos/<slug>/*.js`.
  All 118 are React demo pages in static-HTML clothing, redundant with `site/`.
  Under decision 6 they are deleted, not moved.
- 348 of incoming's 443 demos are present. The remaining 95 are imported under
  decision 3.
