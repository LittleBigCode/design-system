# React

Real React components live in [`react/`](../react/) and are documented in
[`react/README.md`](../react/README.md). A live, buildless demo is at
[`examples/react.html`](../examples/react.html).

## Install

```bash
npm i @diametral/design-system react react-dom
```

```jsx
// once, at your app root
import "@diametral/design-system/css/diametral.css";

import { Button, Status, Metric, Modal } from "@diametral/design-system/react";
```

`react` / `react-dom` are **optional peer dependencies** — CSS-only and Web Component
consumers don't pull them in.

Since `1.0.0-beta.1` the React layer declares two real `dependencies`:
`@base-ui/react` and `@phosphor-icons/react`. Base UI is where the behaviour of the
absorbed components lives — focus management, dismissal, positioning, ARIA wiring — and it
is adopted deliberately ([ADR 0001](adr/0001-base-ui-as-a-substrate.md)). The
zero-dependency promise is restated rather than dropped: **CSS, tokens and Web Components
import nothing**, which is what the three surfaces that cannot afford tooling consume, and a
release-blocking `layer-purity` check keeps it a fact. A CSS-only npm consumer installs the
graph but never loads it.

Each component's **binding tier** is recorded in its
[`docs/components.md`](components.md) entry: CSS parity is guaranteed for every binding,
behaviour parity is React-only and named as such.

A handful of components go one step further and ship **no binding at all** — the stylesheet
is the entire contract, and any markup rendering its `.ds-*` classes gets the look. Since
`1.0.0-beta.2` these are `resizable` and `message-scroller`: each one's React binding
existed only to wrap a narrow third-party dependency (`react-resizable-panels`,
`@shadcn/react`), and acquiring a dependency to re-export its behaviour is the trade ADR
0001 declines. Their docs pages print no import line and say so; batch 3 adds `carousel`
and `input-otp` on the same rule.

## How it works

The components are authored in TypeScript and compiled by `tsc` alone — no bundler, no
transform beyond JSX — so the emit under `dist/react/` is plain ES modules:

- **No build step** is needed to *consume* them — they are valid JS that any bundler
  (Vite, Next, CRA, Remix, …) imports directly.
- They render the same `.ds-*` markup as the rest of the system, so styling and theming come
  from the global stylesheet and the CSS variables — change a token, every React component
  follows.
- Full **TypeScript types** ship in [`react/index.tsx`](react/index.tsx).

They are genuine React components: typed props, `children`, event handlers, `forwardRef`
(`Button`, `Input`), controlled/uncontrolled state (`Switch`, `Tabs`, `Segmented`), and a
portaled `Modal` that closes on Escape / backdrop.

## Buildless in the browser

Because they have no build dependency, you can run them straight from a CDN with an import
map — this is exactly what the live demo does:

```html
<script type="importmap">
{ "imports": {
  "react": "https://esm.sh/react@18.3.1",
  "react-dom": "https://esm.sh/react-dom@18.3.1?external=react",
  "react-dom/client": "https://esm.sh/react-dom@18.3.1/client?external=react"
} }
</script>```

The absorbed components need their substrate mapped too — the barrel imports it, so an
import map that omits these resolves nothing:

```html
<script type="importmap">
{ "imports": {
  "@base-ui/react/": "https://esm.sh/@base-ui/react@1.7.0/?external=react,react-dom",
  "@phosphor-icons/react": "https://esm.sh/@phosphor-icons/react@2.1.10?external=react"
} }
</script>
<script type="module">
  import React from "react";
  import { createRoot } from "react-dom/client";
  import { Button } from "../dist/react/index.js";
  createRoot(document.getElementById("app"))
    .render(React.createElement(Button, { variant: "primary" }, "Save"));
</script>
```

See the full component table in [`react/README.md`](../react/README.md).
