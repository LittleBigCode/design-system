---
name: components-page
description: Document a component on the Diametral docs site following the canonical page structure (intro → workbench → examples). Use whenever the user asks to document a component, write or improve a component's docs page, add examples or demos for a component, add or fix a playground/workbench, or says "document X", "add examples for X", "X's page is empty", "showcase X's possibilities" — even if they don't mention the docs site by name.
---

# Component documentation page

Every component page in `site/` is generated from data — there is no per-component page file. Documenting a component means editing three places; the shared template (`site/src/docs/component-page.tsx`) renders whatever it finds:

1. **Registry entry** — `site/src/registry/registry.ts` (intro, examples, part notes)
2. **Demo files** — `site/src/registry/demos/<slug>/*.tsx` (one file per example)
3. **Playground** — `site/src/registry/playgrounds/<slug>.tsx` + an entry in `site/src/registry/playgrounds.ts` (powers the Workbench)

**Before writing anything, read `references/exemplar.md` (in this skill's directory).** It is a complete annotated worked example — all four surfaces of one component (Panel) documented to the house standard, plus the `PlaygroundConfig` type contract. Match its register: the field discipline, the demo realism, the sparseness. It travels with the skill, so it stays the standard even if the live Panel files drift.

The page renders: unlabeled intro (badge, name, description, intro paragraphs, import line) → **Workbench** h2 (only when a playground exists) → **Examples** h2 with one h3 subsection per example → a nested TOC (sections level 1, examples level 2). All of this is automatic; you never touch the template to document a component.

## Step 1 — Registry entry

Fields and their jobs (don't blur them):

- `description` — a one-line tagline, ideally positioning the component against a sibling ("Card without the shadow"). Not a paragraph.
- `intro?: string[]` — one to two when-to-use paragraphs, one `Prose` block each. Paragraph 1: what it is and when to reach for it. Paragraph 2 (optional): the one architectural fact that changes how you use it (the exemplar's: the root owns `--panel-spacing`). Skip `intro` entirely rather than padding it — the page falls back to the description cleanly.
- `examples` — each entry is **one use case backed by one demo file** (`demo: "<slug>/<file>"`). Titles name the use, not the prop ("Settings rows", not "Rows"; "Form section", not "With footer"). Descriptions say when you'd build this and name the one non-obvious mechanism in backticks.
- `parts?: Record<string, string>` — gotcha notes surfaced when a part is selected in the Workbench. Deliberately sparse: only write an entry when a part has a constraint the nesting can't show ("Bottom padding is keyed off `.border-b`"). Silence is correct for obvious parts.
  **The index that surfaces these only renders when the module exports more than one component, or exports a type** (`hasAnatomy` in `site/src/docs/anatomy.tsx`). A slug with exactly one component export and no type export — `tags-input` — has no index, so a `parts` entry there is dead config that still type-checks and formats clean. Put the constraint in an `intro` paragraph or the relevant example `description` instead.

Prose fields render through `Prose`, which supports **backticks only** — no markdown links, bold, or lists.

## Step 2 — Demo files

One file per example in `site/src/registry/demos/<slug>/`. They auto-register via glob (key = `<slug>/<file-name>`); a demo file with no registry entry still renders, as an "orphan" at the end of Examples — so always pair the file with a registry `examples` entry.

Conventions (full worked demos are in `references/exemplar.md`, Surface 2):

- Default-export a single component named `<Component><UseCase>` (e.g. `PanelFormSection`).
- Realistic content — real labels, plausible values, working sub-components (a footer with `Cancel`/`Save` buttons, not `<Button>Action</Button>`). The demo's code is shown verbatim in the Code tab, so it doubles as copy-paste documentation.
- **No comments.** The demo's code is shown verbatim in the Code tab and reads as copy-paste output; a non-obvious why belongs in the registry example `description`, not in the file.
- Constrain width on the demo root (`w-full max-w-sm`-style), not the preview.

A demo is also where a part the playground cannot show lands (see Step 3). Prefer extending the demo whose use case already implies it — the sidebar's row actions and loading skeleton went into the existing `shell` demo, its rail into `collapsible-icon`, the only demo with a collapsible sidebar for it to position against — over writing a new demo that exists to display one export.

**Choosing the example set**: cover the component's distinct *shapes of use*, not its prop matrix. The exemplar's set — Basic (self-contained summary), Settings rows (a divided list), Form section (fields + acting footer) — each answers "when would I build this?". Variant sweeps (sizes, tones) earn a demo only when the axis is the component's point. Three to five examples is the healthy range.

## Step 3 — Playground (Workbench)

Two coordinated pieces:

**`playgrounds/<slug>.tsx`** — a typed template that renders the subject with prop pass-through (`{...props}`). Render **every exported component part you reasonably can**: the Workbench's code strip doubles as the anatomy navigator, so an unrendered part is unselectable. Groups, labels, separators, shortcuts, submenus, badges, footers and action slots all belong in the template — a select that shows no `SelectGroup` is documenting half its grammar. Type-only exports (`export type { TimeValue }`) are not parts — they are listed under their own **Types** heading in the index, and selecting one shows its declaration where a part note would go, so there is nothing to render for them. Place a literal `{children}` marker for the main editable text and `{key}` markers for each entry in `texts`.

Three kinds of part stay out, and each has somewhere else to be:

- **Parts the component renders itself** — `DialogContent` opens with a `DialogPortal`, `ProgressTrack` is drawn by `Progress`. The index badges these `internal` on its own; writing one into the template double-renders it.
- **A different composition** — chips mode for combobox, a group for avatar, `CommandDialog` for command. One template cannot be both, and a contrived one stops being copy-pasteable.
- **Parts that restructure the whole preview** — sidebar's header, footer, trigger, rail and inset are app-shell furniture around a static sidebar. The template caps at a readable size (one screen of code strip); overflow goes to a demo.

For the last two, the index badges the row with the example that shows it (`in Shell`) instead of a dead end, which only works if a demo actually writes the part. Keep the playground the *shape* documentation and let the demos carry the rest.

Give the subject its accessible name with `aria-label` directly rather than an `sr-only` span plus `aria-labelledby` — the span is invisible in the preview but still prints into the generated snippet, which makes the copyable code read as boilerplate the component does not need.

**`PLAYGROUNDS[slug]` in `playgrounds.ts`** — only what cva cannot know (the full `PlaygroundConfig` type contract is at the end of `references/exemplar.md`):

- `variantsFrom` — name of the cva const; variant axes are parsed from it at build time, never listed here.
- `extras` — plain props worth exposing (`boolean`, `text`, `select`). Use `always: true` only for props the component requires.
- `children` / `texts` — editable text content with sensible defaults and short labels. Each key needs a matching literal `{key}` marker in the template's JSX.
- `note` — one sentence, only when the subject genuinely needs explaining (the exemplar's explains why `size` isn't a cva axis).

## Landing a slug the registry still filters out

The registry is filtered to what this package ships, so a component absorbed by
a batch is invisible until two moves happen **together**:

1. Lift its entry out of `PENDING` into `COMPONENTS` in `site/src/registry/registry.ts`.
2. `git mv site/src/registry/_pending/demos/<slug> site/src/registry/demos/` — and
   its playground, if it has one, out of `_pending/playgrounds/`.

Either move alone breaks the build: the eager glob in `demos.ts` bundles
whatever is under `demos/`, and a route with no demo renders an empty page.
Rewrite the moved files' imports to the barrel while you are in them — the
parked demos still carry `@diametral/ui/components/*` specifiers, which is why
`tsconfig.app.json` excludes `_pending`.

## Verify

1. `npx prettier --check <files you touched>` — **never** `npm run format` (it rewrites the whole repo).
2. `npm --prefix site run typecheck`.
3. `npm --prefix site run build` — the demo-source plugin fails the build for a part written in no playground and no demo, naming each one. It is the coverage gate, so a green build is the proof that no index row reads "no example". A part that genuinely has nowhere to appear goes in `ANATOMY_EXCEPTIONS` (`site/plugins/demo-source.ts`) with its reason — five entries today, all exports whose composition does not exist. Reach for a template or demo line first.
4. Dev server (`npm --prefix site run dev`, port 5173): open `/docs/<slug>` — intro paragraphs render with code spans, Workbench controls work and every part is selectable, each example previews and its Code tab matches, TOC nests and its anchors scroll. In the index, every row is either live, `internal`, `recurses`, or names an example (`in Shell`); a row reading **"not shown"** means the part is in a demo the page does not list, and one reading **"no example"** should have failed step 3.
