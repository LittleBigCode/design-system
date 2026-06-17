# Contributing

> **Minimal · Enduring · Elegant.** Keep changes small, square, and buildless.

## The cardinal rule — the showcase must dogfood the system

**A component is not done until it exists everywhere the system expects it.** A component is
complete only when it has all five of:

1. **A CSS partial** under `css/components/` (e.g. `css/components/tooltip.css`).
2. **An `@import` line** in `css/diametral.css` so the bundle picks it up.
3. **A docs entry** in [`docs/components.md`](docs/components.md) (purpose, canonical markup,
   variants, Web Component if any, link to the showcase page).
4. **A showcase page** under `examples/` (e.g. `examples/components/tooltip.html`) that
   renders the real component — the showcase consumes the system exactly as a user would.
5. **A CHANGELOG entry** in [`CHANGELOG.md`](CHANGELOG.md).

If any of the five is missing, the component is not finished. The showcase is not an
afterthought; it is how we prove the system works by *using* it.

## Add a token

1. Edit **`tokens/tokens.json`** — it is the single source of truth. Place the token in the
   right tier (1 primitives → 2 semantic → 3 scale) and give it a `name` of `ds-…`.
2. Mirror the change into **`css/tokens.css`** in the matching tier block. (The two are kept
   in sync by hand; the JSON is canonical.)
3. Run `npm run build:tokens` to regenerate `dist/tokens.css`, `dist/tokens.scss`, and
   `dist/tailwind-preset.cjs`.
4. Use `{ref}` braces in the JSON `$value` to reference another token — the generator emits
   `var(--ref)`. See [`tokens/README.md`](tokens/README.md).
5. Add a **CHANGELOG** entry. New tokens are a **minor** bump; renames/removals are **major** —
   see [`docs/versioning.md`](docs/versioning.md).

## Add a component

Follow the **cardinal rule** above (partial → `@import` → docs → showcase → changelog), and
respect the naming and authoring conventions:

- **Class names** are `.ds-name` (e.g. `.ds-tooltip`).
- **Modifiers** are BEM-light: `.ds-name--variant` (e.g. `.ds-button--primary`,
  `.ds-status--success`).
- **Elements** are `.ds-name__part` (e.g. `.ds-status__head`, `.ds-modal__foot`).
- **State** is expressed with `.is-*` classes (`.is-active`, `.is-on`, `.is-pos`) and/or ARIA
  attributes (`[aria-selected="true"]`, `[aria-pressed="true"]`, `[disabled]`) — match the
  pattern of the existing components.
- **Tokens** are `--ds-*`. Components read **semantic** tokens only (Tier 2) plus scale (Tier
  3); never reach past them to a raw primitive in component CSS.
- **No corners.** Any bordered or filled surface uses `border-radius: var(--ds-radius-none)` —
  never a literal radius. See [`docs/no-radius.md`](docs/no-radius.md).
- **No shadows.** Separation is hairlines (`--ds-rule`, `--ds-rule-soft`) and background
  shifts (`--ds-bg-alt`), not elevation.
- A **Web Component** is optional. If you add one, it renders **light DOM** with `.ds-*`
  classes (so tokens cascade in and there is no duplicated CSS), and you document its tag and
  attributes in [`components/README.md`](components/README.md) and in the component's docs
  entry.

## The no-build rule

**Nothing may require a build step to *consume* the system.** The hand-authored `css/` tree
and the `components/` ES modules must work with a single `<link>` and an optional
`<script type="module">` — no bundler, transpiler, or framework. The `dist/` folder is a
**convenience only** (Tailwind preset, SCSS, minified bundle); it is generated, gitignored, and
must never become a prerequisite for using the design system. If a contribution can only work
after `npm run build`, it does not belong in the consume path.

## Preview locally

The showcase is static HTML and dogfoods the system. From the repo root:

```bash
python3 -m http.server 8080
# then open http://localhost:8080/examples/
```

It also works straight from the filesystem — open `examples/index.html` in a browser.
`examples/kitchen-sink.html` renders every component on one page, which is the fastest way to
eyeball a change across the whole system.

## Versioning

Every user-visible change needs a **CHANGELOG** entry under the right SemVer bucket
(major / minor / patch). See [`docs/versioning.md`](docs/versioning.md).
