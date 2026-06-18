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

## How it works

The components are authored as plain ES modules with `React.createElement` (no JSX), so:

- **No build step** is needed to ship or consume them — they are valid JS that any bundler
  (Vite, Next, CRA, Remix, …) imports directly.
- They render the same `.ds-*` markup as the rest of the system, so styling and theming come
  from the global stylesheet and the CSS variables — change a token, every React component
  follows.
- Full **TypeScript types** ship in [`react/index.d.ts`](../react/index.d.ts).

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
</script>
<script type="module">
  import React from "react";
  import { createRoot } from "react-dom/client";
  import { Button } from "../react/index.js";
  createRoot(document.getElementById("app"))
    .render(React.createElement(Button, { variant: "primary" }, "Save"));
</script>
```

See the full component table in [`react/README.md`](../react/README.md).
