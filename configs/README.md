# Diametral — shareable configs

Drop-in developer-experience configs so every app that builds on the Diametral
Design System is consistent out of the box: same linting, same formatting, same
TypeScript baseline, same editor snippets.

These live under the published package, so any consuming app can reference them
directly (`@diametral/design-system/configs/...`) **or** copy them in and tweak.

| File | What it is |
| ---- | ---------- |
| [`eslint.config.mjs`](./eslint.config.mjs) | Modern flat ESLint config (ESLint v9+) for a React + optional-TS app. |
| [`prettier.config.cjs`](./prettier.config.cjs) | Prettier formatting rules. |
| [`tsconfig.base.json`](./tsconfig.base.json) | Base `tsconfig` to `extends`. |
| [`diametral.code-snippets`](./diametral.code-snippets) | VS Code snippets for common DS usage. |

---

## ESLint — `eslint.config.mjs`

A flat config (the ESLint v9 format). Recommended JS rules + `eslint-plugin-react`
and `eslint-plugin-react-hooks`, browser + ES2023 globals, `no-unused-vars` as a
warning, and `react-hooks/rules-of-hooks` as an error. TypeScript support is
**optional** and loaded lazily — if `typescript-eslint` is installed it lints
your `.ts`/`.tsx`, otherwise it's skipped.

**Peer dependencies** (installed by the app — the design system does not ship
them, so apps own the versions):

```sh
npm i -D eslint @eslint/js globals eslint-plugin-react eslint-plugin-react-hooks
# Optional, only if you use TypeScript:
npm i -D typescript typescript-eslint
```

**Adopt it** — create `eslint.config.mjs` at your app root:

```js
import diametral from "@diametral/design-system/configs/eslint.config.mjs";
export default diametral;
```

Or extend it:

```js
import diametral from "@diametral/design-system/configs/eslint.config.mjs";
export default [
  ...diametral,
  { rules: { "no-console": "warn" } },
];
```

Prefer to own the file outright? Copy `eslint.config.mjs` into your repo.

---

## Prettier — `prettier.config.cjs`

`printWidth: 100`, `semi: true`, `singleQuote: false`, `trailingComma: "es5"`.

**Adopt it** — point Prettier at the shared file:

```sh
prettier --config node_modules/@diametral/design-system/configs/prettier.config.cjs --write .
```

…or add a `prettier` key to your `package.json`:

```json
{ "prettier": "@diametral/design-system/configs/prettier.config.cjs" }
```

…or just copy `prettier.config.cjs` to your repo root.

---

## TypeScript — `tsconfig.base.json`

Targets `ES2022`, `module`/`moduleResolution` `"bundler"`, `jsx: "react-jsx"`,
`strict: true`, `esModuleInterop`, `skipLibCheck`, and the `DOM` + `ES2023` libs
(plus a few extra safety rails: `noUncheckedIndexedAccess`, `isolatedModules`).

**Adopt it** — in your app's `tsconfig.json`:

```json
{
  "extends": "@diametral/design-system/configs/tsconfig.base.json",
  "include": ["src"]
}
```

`noEmit` is on (assumes a bundler like Vite emits the JS). Override anything you
need in your own `compilerOptions`.

---

## VS Code snippets — `diametral.code-snippets`

Snippets for everyday DS usage. Prefixes:

| Prefix | Expands to |
| ------ | ---------- |
| `dsbtn` | `<Button variant="…">…</Button>` |
| `dscard` | `<Card title="…">…</Card>` |
| `dsfield` | `<Field>` wrapping a labelled `<Input>` |
| `dspageheader` | `<PageHeader title subtitle actions />` |
| `dsconsole` | A `<ConsoleLayout>` app-shell skeleton |
| `dsstat` | `<StatCard>` KPI tile |
| `dsimport` | Import DS React components + the stylesheet |
| `dsframe` | A `.ds-frame` CSS block (CSS/SCSS/LESS) |
| `dstokens` | Common `--ds-*` token references (CSS/SCSS/LESS) |

**Adopt it** — two ways:

- **Per project:** copy `diametral.code-snippets` into your repo's `.vscode/`
  folder. VS Code picks up any `*.code-snippets` file there automatically.
- **Globally:** run *Snippets: Configure Snippets → New Global Snippets file…*
  from the Command Palette and paste the contents in.

Each snippet is `scope`-restricted (JS/TS/React for components, CSS/SCSS/LESS for
the styling ones), so they only suggest in relevant files.
