# Issue resolution order

Launch order for the open queue as of 2026-09-07: #39, #33, #41, #15, #18, #34,
#28, and the batch chain #42–#49 (batches 9–16, tracked by #3). Derived from
each issue's own "Blocked by" / "Not this issue" / "Why not fixed in #33"
sections — not re-litigated here, only sequenced.

## Prerequisite (not an issue, but blocks all of them)

The working tree has an unresolved `git stash pop` conflict (4 files DU, 2
files UU: `examples/shell.css`, `tests/a11y.spec.js`, plus
`docs/absorption/corrections.md`, `examples/registry/playgrounds/speed-dial.tsx`,
`scripts/build-docs.mjs`, `site/tests/batch7-rewiring-regress.spec.ts`). Nothing
below can be tested or committed until that's resolved. Separate task — flagged,
not sequenced here.

## Phase 1 — gating spine (serial, blocks batch 9)

Batch 9 (#42) needs a root test harness that actually tells the truth about
generated pages. It doesn't yet, so this phase runs before touching the batch
chain at all.

1. **#39** — regress-spec fixes (`scripts/build-docs.mjs`, `examples/shell.css`,
   component behavior). In progress on this branch. Land first: #33's
   acceptance criteria requires these specs passing against generated pages.
2. **#33** — tests migration (`package.json`, `tests/*`, `tests/harness.ts`,
   the two test workflows). Blocked by #39. While in this file scope, fold in
   **#18 item 3** (the a11y-suite click timeout) — same file
   (`tests/a11y.spec.js`), no reason to touch it twice.

Serialize 1→2 because #33 asserts on #39's output; don't start #33 until #39
is merged.

## Phase 1, parallel track — independent defects

None of these share a file with Phase 1, and none block it. Land in any
order, any time, by #33's close at the latest — #33 ships a
`tests/a11y-allowlist.js` for exactly the failures these fix, so a fix that
lands late just costs an allowlist entry instead of a red gate.

- **#41** — a11y defects on `collapsible`/`marker`/`direction`/`heatmap` +
  dark-mode `.ds-badge--accent` + `.docs-crosslink` contrast. File scope is
  `css/`, component source, `examples/shell.css` (different rules than #39
  touches) — explicitly outside #33 per its own "Why not fixed in #33".
- **#15** — 9 held components' pre-existing axe violations (date/time-picker
  family, `tags-input`, 4 components' color-contrast). Entirely different
  components; no overlap with #39/#33/#41.
- **#18 items 1–2** — the font-check/manifest disagreement (`ci.yml`,
  `package.json`, `docs/fonts-and-licensing.md`) and committing the 12 missing
  visual baselines. Different files from everything above (item 3 is the only
  piece of #18 that overlaps Phase 1).

Run these three in parallel with each other and with Phase 1 — no incident,
no shared files.

## Phase 2 — serial, depends on Phase 1

- **#34** (retire `site/`) — explicitly blocked by #32 (done) and #33. Do not
  start until #33 is closed.

## Phase 3 — batch chain, strictly serial (#3's own rule)

`#42 → #43 → #44 → #45 → #46 → #47 → #48 → #49` (batches 9–16). #3 states this
directly: "strictly ordered... no parallelism to win." One `ready-for-agent`
label live at a time; each batch branches from the prior batch's landed state,
so running two at once isn't a schedule optimization, it's a guaranteed merge
conflict against a moving pin.

Start #42 only after Phase 1 is merged — otherwise batch 9's own PR gets
judged by the same unreliable gate #39 just proved was lying (this is exactly
how #39 surfaced: mid-way through closing batch 8 / PR #27).

Flag before running **#47 (batch 14, repo restructure)** and **#48 (batch 15,
site ownership)**: their titles overlap #34's intent (retire `site/`, root
becomes the site) closely enough to be the same work under two numbers.
Confirm scope against #34 before starting either rather than duplicating it.

## Phase 4 — cutover

- **#28** (1.0.0 cutover) — its own body gives sub-issue order 1–6, of which
  "tests migration" (#33) and "delete site/" (#34) are two of the six.
  Effectively closes once the batch chain and #34 are both done.

## Publish-hold overlay

Per standing policy (independent of the sequencing above): no batch PR
merges and no beta publishes until the *entire* queue above — through #49 and
#28 — is finished. That's a merge/publish gate, not a work-order constraint;
it doesn't change when work starts, only when it lands.

## Summary

```
Prereq:  resolve stash conflict (blocks everything)
Phase 1: #39 → #33 (+#18.3 folded in)         ─┐ serial
         #41, #15, #18.1-2                     ┘ parallel, no deadline pressure
Phase 2: #34                                    serial, after #33
Phase 3: #42→43→44→45→46→47→48→49               serial, no exceptions
Phase 4: #28                                    after Phase 3 + #34
```
