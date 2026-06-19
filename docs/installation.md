# Installation & integration

How to install the Diametral Design System in a real project — plain HTML, or any of the
popular frameworks. The system is **buildless**: at its core it is one stylesheet plus design
tokens, so most stacks need nothing more than a `<link>` (or one `import`) and the fonts.

> Already inside the repo? The [getting-started](getting-started.md) guide covers the
> from-the-filesystem path. This page is for **consuming the published package** in your own app.

---

## 1. What you get

The package `@diametral/design-system` ships several independent layers. Take only what you need —
each works on its own, and **none requires a build step to consume**.

| Layer | What it is | Entry |
|---|---|---|
| **CSS + tokens** (framework-agnostic) | The whole visual language as one stylesheet of `.ds-*` classes backed by `--ds-*` custom properties. | `@diametral/design-system/css/diametral.css` |
| **Design tokens** | The single source of truth as JSON. | `@diametral/design-system/tokens.json` |
| **Web Components** (optional) | A vanilla custom-element layer (`<ds-button>`, `<ds-status>`, …). | `@diametral/design-system/components` |
| **React components** (optional) | Real, typed React components (`Button`, `DataGrid`, …). | `@diametral/design-system/react` |
| **Tailwind preset** | Binds Tailwind `colors`/`spacing`/`fontFamily`/… to the `--ds-*` variables. | `@diametral/design-system/tailwind-preset` |
| **SCSS variables** | `$ds-*` variables, each resolving to the matching CSS var. | `@diametral/design-system/dist/tokens.scss` |
| **Assets** | Free font CSS (Fraunces fallback) + logo SVGs + license notes. The commercial **Ufficio** font is **not** bundled in the package — licensed users add it. | `@diametral/design-system/assets/*` |

The CSS and the tokens are the foundation; the Web Components and React layers render the **same**
`.ds-*` markup, so styling and theming always come from the one stylesheet. Change a token, every
layer follows.

---

## 2. Install

**From npm** (public registry) — no config, no token:

```bash
npm i @diametral/design-system    # or pnpm / yarn / bun
```

It is published to the **public npm registry** — installs with no `.npmrc` and no token.
Live: [npmjs.com/package/@diametral/design-system](https://www.npmjs.com/package/@diametral/design-system).

`react` and `react-dom` are **optional peer dependencies** — add them *only* if you use the React
layer. CSS-only and Web Component consumers don't pull them in.

```bash
# only if you use @diametral/design-system/react
npm i react react-dom
```

**Without npm.** The system is plain CSS + fonts + SVG + a sprinkle of vanilla JS — no bundler
required. Either:

- **Copy** the `css/` and `assets/` folders into your project and link `css/diametral.css`, or
- Link it straight from a **CDN** that serves npm packages (unpkg, jsDelivr, esm.sh):

```html
<link rel="stylesheet" href="https://unpkg.com/@diametral/design-system/css/diametral.css">
```

---

## 3. Load the CSS + fonts

Three things to wire up once, at your app root.

**1 · The one stylesheet.** Everything is bundled behind a single entry that `@import`s the tokens,
reset, typography, and every component:

```js
// bundler / npm
import "@diametral/design-system/css/diametral.css";
```

```html
<!-- no build -->
<link rel="stylesheet" href="css/diametral.css">
```

**2 · The body font — Geist** (free, OFL):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**3 · The title font — Ufficio (opt-in, commercial).** The `--ds-font-title` token lists Ufficio
first, but the face is declared **only** in `assets/fonts/ufficio.css`. Import it *only if you hold
an Ufficio license*:

```html
<!-- only if you hold an Ufficio license -->
<link rel="stylesheet" href="assets/fonts/ufficio.css">
```

```js
// via npm
import "@diametral/design-system/assets/fonts/ufficio.css";
```

If you **don't** import it, the unknown family name is skipped and titles fall back to the free
**Fraunces** stack automatically — no token change needed. To load the free fonts (Fraunces + Geist)
explicitly in one shot, import `assets/fonts/fallback.css` instead. See
[fonts-and-licensing.md](fonts-and-licensing.md).

> **Global reset.** `css/diametral.css` includes a light global reset (`box-sizing`, zeroed
> margins, base body type). Every class is namespaced `.ds-*`, so it won't collide with your app's
> CSS or Tailwind utilities. If your app already has a reset and you want to avoid overlap, import
> `css/tokens.css` plus the individual `css/components/*.css` partials instead of the full bundle.

---

## 4. Per-stack quick starts

### Plain HTML / no build

Link the CSS, load the fonts, write `.ds-*` markup. Add the Web Components module if you want the
custom elements.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/diametral.css">
  <!-- optional Web Components -->
  <script type="module" src="components/index.js"></script>
</head>
<body>
  <!-- plain classes -->
  <button class="ds-button ds-button--primary">Save</button>

  <!-- or the optional custom elements -->
  <ds-button variant="primary">Save</ds-button>
  <ds-status status="success" heading="Approved"></ds-status>
</body>
</html>
```

### Vite (React)

Import the CSS once in `main.jsx`, then import components from the React entry.

```jsx
// main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import "@diametral/design-system/css/diametral.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
```

```jsx
// App.jsx
import { Button, DataGrid } from "@diametral/design-system/react";

export default function App() {
  return <Button variant="primary">Save</Button>;
}
```

Load the Geist `<link>` in `index.html`'s `<head>` (and `assets/fonts/ufficio.css` if licensed).

### Next.js (App Router)

Import the global CSS once in `app/layout.tsx`. The React components use hooks and event handlers,
so they are **client components** — render them inside a `"use client"` boundary.

```tsx
// app/layout.tsx
import "@diametral/design-system/css/diametral.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx (or any client component)
"use client";
import { Button, Status } from "@diametral/design-system/react";

export default function Page() {
  return <Button variant="primary">Save</Button>;
}
```

Fonts: either load Geist via the Google `<link>` in `layout.tsx`'s `<head>`, or use
[`next/font/google`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) and map
the token:

```tsx
import { Geist } from "next/font/google";
const geist = Geist({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });
// then apply geist.className to <body>, or set :root { --ds-font-sans: ... }
```

### Create React App

Import the CSS once in `index.js`.

```js
// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import "@diametral/design-system/css/diametral.css";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);
```

```jsx
// src/App.js
import { Button } from "@diametral/design-system/react";

export default function App() {
  return <Button variant="primary">Save</Button>;
}
```

### Angular

Add the stylesheet to the `styles` array in `angular.json`:

```json
// angular.json → projects.<app>.architect.build.options
"styles": [
  "node_modules/@diametral/design-system/css/diametral.css",
  "src/styles.scss"
]
```

…or `@import` it from `src/styles.scss`:

```scss
@import "@diametral/design-system/css/diametral.css";
```

Then use the `.ds-*` classes directly in templates. To use the **Web Components**, import the module
once (e.g. in `main.ts`) and allow custom elements in the modules/components that use them:

```ts
// main.ts
import "@diametral/design-system/components";
```

```ts
// the standalone component (or NgModule) that uses <ds-*> elements
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-root",
  template: `<ds-button variant="primary">Save</ds-button>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {}
```

### Vue

Import the CSS once in `main.js`:

```js
// main.js
import { createApp } from "vue";
import "@diametral/design-system/css/diametral.css";
import App from "./App.vue";

createApp(App).mount("#app");
```

Use the `.ds-*` classes in templates, or the **Web Components** — register the module once and Vue
will render the custom elements as-is:

```js
// main.js
import "@diametral/design-system/components";
```

```vue
<!-- App.vue -->
<template>
  <button class="ds-button ds-button--primary">Save</button>
  <ds-status status="success" heading="Approved"></ds-status>
</template>
```

> Vue treats any unknown hyphenated tag as a custom element by default. With Vite, if you ever need
> to be explicit, set `isCustomElement: (tag) => tag.startsWith("ds-")` in `@vitejs/plugin-vue`'s
> `compilerOptions`.

### CDN / import map (buildless React for prototyping)

Because the React components have no build dependency, you can run them straight from a CDN with an
import map — exactly what the live demo does. Great for a throwaway prototype or a CodePen; for a
real app, prefer npm + a bundler.

```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/@diametral/design-system/css/diametral.css">

<div id="app"></div>

<script type="importmap">
{ "imports": {
  "react": "https://esm.sh/react@18.3.1",
  "react-dom": "https://esm.sh/react-dom@18.3.1?external=react",
  "react-dom/client": "https://esm.sh/react-dom@18.3.1/client?external=react",
  "@diametral/design-system/react": "https://esm.sh/@diametral/design-system/react"
} }
</script>
<script type="module">
  import React from "react";
  import { createRoot } from "react-dom/client";
  import { Button } from "@diametral/design-system/react";
  createRoot(document.getElementById("app"))
    .render(React.createElement(Button, { variant: "primary" }, "Save"));
</script>
```

The `?external=react` query keeps a single React instance across the imports. See the full working
demo in [`examples/react.html`](../examples/react.html) and the notes in [react.md](react.md).

### Streamlit (Python)

Streamlit renders its own React widgets, so you don't install the package into
it. Set the brand colors in `.streamlit/config.toml`, inject the stylesheet with
`st.markdown`, and render `.ds-*` blocks as HTML. Full guide:
[`docs/streamlit.md`](streamlit.md). Runnable example (Docker):
[`examples/streamlit/`](../examples/streamlit/).

---

## 5. Tailwind

Add the preset to `presets` in your Tailwind config — it binds `colors`, `spacing`, `fontFamily`,
and the rest to the `--ds-*` custom properties:

```js
// tailwind.config.js
module.exports = {
  presets: [require("@diametral/design-system/tailwind-preset")],
  content: ["./src/**/*.{html,js,ts,jsx,tsx,vue}"],
};
```

Now Tailwind utilities resolve to the design tokens — e.g. `bg-accent`, `text-ink`, `p-4`, and
`font-title` emit `var(--ds-accent)`, `var(--ds-ink)`, `var(--ds-space-4)`, `var(--ds-font-title)`.
Because they are backed by the **variables**, runtime theming still works: flip
`data-theme="dark"` and the Tailwind-styled elements re-theme too.

**SCSS option.** Prefer SCSS variables? `dist/tokens.scss` exposes `$ds-*` variables (each resolving
to the CSS var, so theming still applies):

```scss
@use "@diametral/design-system/dist/tokens.scss" as ds;
.thing { color: ds.$ds-ink; padding: ds.$ds-space-4; }

// or the legacy syntax
@import "@diametral/design-system/dist/tokens.scss";
.thing { color: $ds-ink; }
```

> ℹ️ The Tailwind preset (`dist/tailwind-preset.cjs`) and `dist/tokens.scss` are **generated** by
> the design-system repo's build. If you are working from a clone (not the npm package), run
> `npm run build` (or `npm run build:tokens`) once to produce `dist/`. The published package ships
> `dist/` already, so installed consumers need nothing.

---

## 6. Theming

Dark mode (and any theme) is a one-liner — import the theme stylesheet and set the selector on a
root element:

```js
import "@diametral/design-system/css/diametral.css";
import "@diametral/design-system/css/themes/dark.css";
```

```html
<html data-theme="dark">   <!-- or class="dark", or class="dark-theme" -->
```

`css/themes/dark.css` targets `[data-theme="dark"]`, `.dark`, **and** `:root.dark-theme`, so it
drops in regardless of which convention your app uses. For OS-driven dark mode, add
`class="ds-auto-dark"` to `<html>`. Themes override only the **semantic** tokens — see
[theming.md](theming.md) for per-brand theming and the Tailwind/SCSS/shadcn notes.

---

## 7. TypeScript

No extra setup. Types ship with the React entry and are wired through the package `exports` map
(`react/index.d.ts`), so `import { Button } from "@diametral/design-system/react"` is fully typed
out of the box — typed props, `children`, event handlers, and `forwardRef` on `Button` / `Input`.

---

## 8. Troubleshooting

- **"node_modules JSX isn't transpiled."** It doesn't need to be. The React components are authored
  as plain ES modules with `React.createElement` (no JSX) and ship as valid JS — Vite, Next, CRA,
  Remix, etc. import them directly. You don't have to add `@diametral/design-system` to a
  `transpilePackages` / `transpileDependencies` allowlist.
- **Fonts don't load offline.** Geist and Ufficio load fine over `file://`; only the Google Fonts
  `<link>` needs a network. The system still renders with system fallbacks offline. Self-host the
  fonts (the bundled `assets/fonts/ufficio.css` is already local) or import
  `assets/fonts/fallback.css` if you want the free Fraunces/Geist files under your control.
- **Titles render in a serif, not Ufficio.** Expected unless you imported `assets/fonts/ufficio.css`
  (and hold a license). The token lists Ufficio first; without the `@font-face` it falls back to
  Fraunces / Georgia. See [fonts-and-licensing.md](fonts-and-licensing.md).
- **My app's reset and Diametral's overlap.** Skip the bundle's reset: import `css/tokens.css` plus
  the `css/components/*.css` partials you need instead of `css/diametral.css`.
- **CSP blocks the esm.sh demo.** The buildless CDN pattern pulls React from `https://esm.sh` and
  the CSS from a CDN. If your Content-Security-Policy is strict, allow those origins in
  `script-src` / `style-src` / `connect-src` — or just install from npm and bundle, which needs no
  external origins at runtime.

---

## See also

- [getting-started.md](getting-started.md) — the from-the-repo buildless path.
- [react.md](react.md) · [react/README.md](../react/README.md) — the React layer.
- [components/README.md](../components/README.md) — the Web Components layer.
- [tokens/README.md](../tokens/README.md) — the token model.
- [theming.md](theming.md) — themes and per-stack consumption.
- [fonts-and-licensing.md](fonts-and-licensing.md) — font roles and licenses.
