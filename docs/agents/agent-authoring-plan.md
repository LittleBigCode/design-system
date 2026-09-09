# Making agents build well with this system

A five-part plan. The problem it solves: an agent following `docs/for-claude.md`
produces timid, primitive-level UI — eight flat rows where the docs site's own
sidebar has grouped, iconed, collapsible nav. The agent is not being
uncreative; it is working from a vocabulary that stops at "card, tag, table".

## What the repo actually shows

| Fact | Value |
|---|---|
| `.ds-*` selectors in `css/components/` (120 files) | **817** |
| Distinct `ds-` classes named in `docs/for-claude.md` | **73** (~9%) |
| `css/components/sidebar.css` — largest stylesheet in the system | 17.4 KB, 30 classes, **0 mentions in the brief** |
| `llms.txt` claims for-claude.md holds "every component with copy-paste HTML" | false |
| `site/` in `package.json` `files` | **no** — blocks/templates unreachable from an npm install |
| Block routing | `/blocks/:slug` → `BLOCKS` map + `sections.ts`, 3 edits total |
| Visual gate target | `vite preview` under `/design-system`; `tests/harness.ts`'s `ALL_ROUTES` is `/` + `/docs/:slug` only — **no block route is gated**, new or existing |

Two structural notes:

- Plans 1–3 all edit `docs/for-claude.md` and should land as one commit.
  Splitting them means three passes over the same file and three chances to
  contradict each other.
- Plan 4 is the only one that authors new UI. Plans 1, 2, 3 and 5 are routing
  and honesty fixes.
- The `site/`-not-shipped fact shapes plan 1: a routing table pointing only at
  `site/src/...` works in this repo and breaks for every npm consumer.

---

## Plan 1 — Route the brief at the composition layer ✅ done

**Goal.** `docs/for-claude.md` stops dead-ending at primitives. An agent
building a nav is told where the good nav lives before it starts.

**Files.** `docs/for-claude.md`, `llms.txt`

### Steps

1. **Insert a routing section** immediately after `## Principles` — high in the
   file, so an agent reading top-down hits it before the primitive catalogue.

   ```markdown
   ## Before you build — start from the composition that exists

   Do not assemble a screen from the primitives below. Find the row that
   matches what you are building, read that source, and start from it.

   | Building | Read first | Live |
   |---|---|---|
   | App shell, sidebar nav | `css/components/sidebar.css`, `site/src/docs/docs-layout.tsx` | /blocks/nav-shell |
   | Page header, toolbar, filter bar, stat band | `site/src/docs/blocks/app-chrome.tsx` | /blocks/app-chrome |
   | Sign in, sign up, 2FA, forgot password | `site/src/docs/blocks/auth.tsx` | /blocks/auth |
   | Hero, feature grid, pricing, footer | `site/src/docs/blocks/marketing.tsx` | /blocks/marketing |
   | Detail view, empty state, faceted filter, activity feed | `site/src/docs/blocks/data-detail.tsx` | /blocks/data-detail |
   | A whole dashboard | `site/src/docs/templates/dashboard.tsx` | /templates/dashboard |
   | React screen wiring (list+detail, CRUD, auth gate) | `docs/recipes.md` | — |

   Paths are repo-relative. Installed from npm, `site/` is not present — use the
   live column: https://littlebigcode.github.io/design-system + the path.
   ```

   The `/blocks/nav-shell` row forward-references plan 4. Either land plan 4
   first, or point that row at `/templates/dashboard` until it exists.

2. **Add the standing rule** as the last line of that section:

   > A primitive is a fallback. If a block already contains the thing you are
   > building, copying it and changing the content is the correct move, not a
   > shortcut.

3. **Fix `llms.txt`** — three edits:
   - Replace `every component with copy-paste HTML` with `principles, tokens,
     and the ~70 most-used classes, plus where to find the rest`.
   - Move `[Recipes](docs/recipes.md)` out of `## Optional` into `## Core reference`.
   - Add one Core line:
     `- [Blocks & templates](https://littlebigcode.github.io/design-system/blocks): whole compositions — app chrome, auth, marketing, data+detail.`

4. **Note the ceiling.** Above the table:
   `<!-- ponytail: paths point into site/, unreachable from an npm install; plan 5's agent-index.json inlines them -->`

**Verify.** `grep -c "blocks/" docs/for-claude.md` returns ≥ 5. Then the real
check: fresh agent, prompt *"build an admin nav with the Diametral design
system"*, confirm it reaches for `.ds-sidebar-*` rather than `.ds-card` + `<ul>`.

**Estimate.** 25 min.

**Skipped.** Inlining block HTML into `docs/`. Add when plan 5 generates it.

---

## Plan 2 — Replace Don'ts-only with positive heuristics ✅ done

**Goal.** The brief's guidance is currently four prohibitions and zero
heuristics. Prohibitions cap ambition — an agent minimises surface area to
avoid violating rules it cannot fully model. That is the direct cause of the
eight-flat-rows sidebar.

**Files.** `docs/for-claude.md`

### Steps

1. **Derive, do not invent.** Read four sources and extract the rules the
   system already follows:
   - `site/src/docs/docs-layout.tsx` — grouping, active state, collapsible behaviour
   - `site/src/docs/blocks/app-chrome.tsx` — header density, action placement
   - `site/src/docs/foundations/grid.tsx` — ruled columns, registration marks
   - `site/src/docs/foundations/borders.tsx` — the two rule weights and when each applies

2. **Rename `## Don'ts` → `## Composition rules`**, with `### Do` above the
   existing prohibitions, which are kept verbatim under `### Don't`.

3. **Write 8–12 heuristics, grouped.** Shape:

   ```markdown
   ### Do

   **Density**
   - A nav over 6 items groups. Every group gets a label *and* an icon.
   - A section is open when the reader is inside it. Never seed all-collapsed.

   **Structure**
   - Every panel edge is a real 1px rule. `--ds-rule` for structure,
     `--ds-rule-soft` for subdivision inside an already-ruled box.
   - A stat row is a `.ds-statgrid`, never three `.ds-card`s in a flex.

   **State**
   - The active row is the only filled surface in its panel. One at a time.
   - Counts live in `.ds-sidebar-menu-badge`, not in the label text.

   **Hierarchy**
   - One `.ds-button--primary` per screen region. Everything else is default.
   - `.ds-kicker` above a title, never beside it.
   ```

4. **Enforce the citation rule while writing.** Every heuristic must name a file
   in this repo that already follows it. If you cannot cite one, cut the
   heuristic — it is taste you are inventing, and it will contradict the system
   later.

**Verify.** Each bullet traceable to a file. Re-run the plan-1 agent prompt; the
nav should come back grouped, with icons, one active row.

**Estimate.** 40 min — 30 of it reading the four sources.

**Skipped.** A full pattern language. Twelve rules that are all obeyed beat
forty that are half-aspirational.

---

## Plan 3 — Declare which layer the agent is targeting ✅ done

**Goal.** The brief teaches buildless `.ds-*` HTML. The site — and the best
examples — are React. `docs/react.md` and `docs/recipes.md` exist but nothing
tells an agent when to switch, so it silently picks the layer the brief
describes, which is the weaker one for app work.

**Files.** `docs/for-claude.md`, `llms.txt`

### Steps

1. **Add a decision block above `## Setup`** — the first thing in the file:

   ```markdown
   ## Pick your layer first

   | Your project | Use | Read |
   |---|---|---|
   | React | `@diametral/design-system/react` — 123 typed components | `docs/react.md`, `docs/recipes.md`, then this file for tokens and look |
   | Anything else (static, Vue, Angular, Django, Streamlit, email) | `.ds-*` classes | this file |

   The React layer is strictly larger. Interactive components — sidebar
   collapse, combobox, drawer, dialog, data-table — ship their behaviour there.
   In the class layer you wire that yourself.
   ```

2. **Add parity warnings inline** where an HTML-layer agent will otherwise ship
   something dead. Minimum set: sidebar collapse, drawer, dialog, combobox,
   data-table. One sentence each, matching the registry's existing `wiring`
   convention — name the real event, not "add JavaScript".

3. **Mirror in `llms.txt`.** Its opening block presents the class layer as *the*
   system. Add the React entry point beside it.

**Verify.** `sed -n 1,30p docs/for-claude.md | grep -c "design-system/react"` ≥ 1.

**Estimate.** 30 min.

**Skipped.** A per-component parity matrix across all 123. Five warnings cover
the components where the gap actually bites.

---

## Plan 4 — Promote `docs-layout.tsx` to a documented block ✅ done

**Goal.** The best nav in the repo is site plumbing. Nothing that generates
agent-facing docs reads it. Make it a block.

**Files.**
- new `site/src/docs/blocks/nav-shell.tsx`
- `site/src/docs/blocks/block-page.tsx` — add to the `BLOCKS` map
- `site/src/docs/sections.ts` — add to the `BLOCKS` array

Routes are `/blocks/:slug`, so those three edits are the whole registration.
`sections.ts` feeds both the index grid and the sidebar (per its own header
comment), so the nav row appears for free.

### Steps

1. **Extract the patterns** from `docs-layout.tsx`. The seven that make it good:
   category icons per group; collapsible group with open-when-inside
   (`useSectionOpen`, `undefined` seed); active row; `SidebarMenuBadge` counts;
   `SidebarRail`; header with search trigger; footer with theme toggle.

2. **Write `nav-shell.tsx` following `app-chrome.tsx`'s shape exactly** —
   `Section` + `Example` from `@/docs/foundation-example`, each `Example`
   carrying a `code` string of `.ds-sidebar-*` HTML plus the rendered children.
   Four sections:
   - Flat menu (`.ds-sidebar`, `-content`, `-menu`, `-menu-item`, `-menu-button`)
   - Grouped with labels and icons (`-group`, `-group-label`, `-group-content`)
   - Nested and collapsible (`-menu-sub`, `-menu-sub-item`, `-menu-sub-button`)
   - Full shell (`-header`, `-footer`, `-rail`, `-inset`, `-menu-badge`)

   Section 4 is the payload — the one an agent copies. Sections 1–3 exist so it
   understands what it copied.

3. **Add the wiring sentence.** The class layer has no collapse behaviour: name
   the real events — toggle `aria-expanded` on the group trigger, toggle
   `data-state` on the container, persist the rail's collapsed flag.

4. **Register.** The `BLOCKS` map in `block-page.tsx`, then the `sections.ts` row:

   ```ts
   ["nav-shell", "Nav shell", "Sidebar, grouped nav, rail and inset — the left edge of an application screen."],
   ```

5. **Backfill plan 1's table row** to point at `/blocks/nav-shell`.

**Verify.** `cd site && npm run dev`, open `/blocks/nav-shell`, confirm it
appears in the sidebar under Blocks without further edits. Then `npm run test:a11y`.

**Gate caveat (corrected in execution).** Both gates walk `tests/harness.ts`'s
`ALL_ROUTES`, which is `/` plus one route per registry component. No block page
has ever been gated, so `npm run test:a11y` says nothing about this one. Axe was
run directly against `/blocks/nav-shell` in both themes instead: zero
critical/serious, and the four moderate landmark/region findings are byte-for-byte
the set `/blocks/app-chrome` already produces. Gating blocks means adding them to
`PAGE_ROUTES`, which pulls all five block pages into both suites at once — a
separate decision, not this block's.

**Estimate.** 2–3 h. The bulk is transcribing 30 `.ds-sidebar-*` classes into
accurate `code` strings — those strings are what agents copy, so a wrong one is
worse than a missing section.

**Skipped.** Mobile sheet variant. `.ds-sidebar-sheet-content` exists; add a
fifth section when someone asks.

---

## Plan 5 — Generate `docs/agent-index.json` ✅ done

**Goal.** An agent that greps "sidebar" lands on the richest example, not the
alphabetically-first one. `site/src/registry/demo-markup.json` (1.5 MB) already
holds this but sits in `site/`, unshipped.

**Files.** new `scripts/build-agent-index.mjs`, new generated
`docs/agent-index.json`, `package.json` build chain,
`site/src/registry/registry.ts` (one optional field), `llms.txt`

`docs/` is already in `package.json` `files`, so the output ships without
touching that list.

### Steps

1. **Add `featured?: boolean` to the `Example` type** in `registry.ts`. Default
   ordering stays registry order; set `featured` only on the components whose
   best example is not their first. Candidates by demo count: `data-table` (11
   demos), `sidebar`, `card`, `form`, `kanban`, `command`, `select`, `input`.

2. **Export the parser from `build-components-md.mjs`** rather than copying it.
   That regex is fragile and deliberately throws on an unrecognised entry shape;
   two independent copies means one silently drifts. A one-line `export` change.

3. **Write `scripts/build-agent-index.mjs`.** Same contract as its sibling:
   parse, throw loudly on a shape it does not recognise, never skip. Emit:

   ```json
   {
     "generated": "npm run build",
     "components": [{
       "slug": "sidebar", "name": "Sidebar", "category": "Navigation",
       "exports": ["Sidebar", "SidebarProvider", "..."],
       "description": "...",
       "css": "css/components/sidebar.css",
       "url": "https://littlebigcode.github.io/design-system/components/sidebar",
       "examples": [
         {"demo": "sidebar/shell", "title": "Application shell", "featured": true},
         {"demo": "sidebar/basic", "title": "Basic"}
       ]
     }],
     "blocks":    [{"slug": "app-chrome", "name": "...", "description": "...", "url": "..."}],
     "templates": [{"slug": "dashboard",  "name": "...", "description": "...", "url": "..."}]
   }
   ```

   Blocks and templates read from `sections.ts` — the same arrays the sidebar
   and index pages use, so a new block cannot appear on the site but be missing
   from the index.

4. **Wire into the chain** in `package.json`, immediately after
   `build-components-md.mjs`:

   ```
   ... && node scripts/build-components-md.mjs && node scripts/build-agent-index.mjs && npm run build:docs
   ```

5. **Point `llms.txt` at it:**
   `- [Agent index](docs/agent-index.json): every component, its category, its CSS file, and its examples richest-first — machine-readable.`

**Verify.**

```bash
node scripts/build-agent-index.mjs && python3 -c "
import json; d=json.load(open('docs/agent-index.json'))
assert len(d['components'])==122, len(d['components'])
assert d['blocks'] and d['templates']
print('ok', len(d['components']), 'components')"
```

Then break a registry entry's field order deliberately and confirm the script
throws instead of emitting a short file.

**Corrected in execution.**

- The shipped count is 122, not 123 — `docs/components.md`'s own header already
  said 122 before this plan touched anything, so the plan's number was stale.
- `featured` landed on 7 of the 8 candidates, not 8. Richness was judged by
  demo file line count (an objective stand-in for "richest"), and `command`'s
  own richest demo (`command/basic`, 5 commands/3 groups) is already first —
  the plan's own rule ("only when the best example isn't the first") says
  leave it alone.
- `css` is only emitted when `css/components/<slug>.css` actually exists — 25
  of 122 slugs share a stylesheet with a sibling (dialog/alert-dialog,
  toggle-group/toggle-group-primitive, the chart family, …) with no
  `<slug>.css` of their own, and guessing a wrong path is worse than omitting
  the field for those.
- Noticed, not fixed: `data-table` has 11 demo files but only 2
  (`basic`, `editable`) are registered as `examples` in the registry, so the
  other 9 are undocumented and outside this index. Separate scope from adding
  `featured`.

**Estimate.** 2 h.

**Skipped.** Embedding demo source text in the JSON. Paths plus the live URL are
enough for an agent that has the repo or network; inlining 123 demos makes the
file too large to read in one pass — the exact failure `demo-markup.json`
already has.

---

## Sequencing

1. **Plans 1 + 2 + 3 as one commit** — all edit `for-claude.md`. ~1 h 35 m.
   This is where the behaviour change lives.
2. **Plan 4** — 2–3 h. Backfill plan 1's table row when it lands.
3. **Plan 5** — 2 h. Do last; it indexes whatever 1–4 produced.

Total ~6 h. Plans 1–3 alone should move output quality most, because they fix
routing to examples that already exist.
