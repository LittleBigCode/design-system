# Diametral starter — Vite + React + TypeScript

A clone-and-go application shell pre-wired with the
[Diametral design system](https://www.npmjs.com/package/@diametral/design-system).
You get an authenticated `ConsoleLayout` (app bar, grouped sidebar, ⌘K palette,
Light/Dark/Sepia theme switcher) with routing, a dashboard, a data grid, a detail
page and a login screen — running in minutes.

## Stack

- **Vite 5** + **React 18** + **TypeScript 5**
- **react-router-dom 6** for routing
- **`@diametral/design-system`** for every UI piece (CSS + React components)

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

Any credentials sign you in (the auth gate is a `useState` in `src/App.tsx` —
wire it to your real auth). Other scripts:

```bash
npm run build    # tsc -b && vite build
npm run preview  # serve the production build
```

## How it's wired

- **`index.html`** loads the Geist Google font (the design system expects it) and
  hosts `<div id="root">`.
- **`src/main.tsx`** imports the one stylesheet
  `@diametral/design-system/css/diametral.css`, then renders `<App>` inside a
  `<BrowserRouter>`.
- **`src/App.tsx`** is the auth gate → `<Login>` or the shell. The shell renders
  `<ConsoleLayout>` (from `@diametral/design-system/react`) with a grouped `nav`,
  the `active` item derived from the current route, an `onNavigate` that calls
  `navigate(...)`, the theme switcher (`themes`), a `user`, and `<Routes>` as its
  children.
- **`src/pages/`** — `Dashboard` (StatCards + an AreaChart), `Items` (a `DataGrid`
  with a local `loadPage` that filters/sorts/paginates in memory), `ItemDetail`
  (reached from the grid via the route param) and `Login`.

## Adding a page

1. Create `src/pages/MyPage.tsx` and `export default` a component.
2. In `src/App.tsx`, add a `<Route path="/my-page" element={<MyPage />} />`
   inside `<Routes>`.
3. To surface it in the sidebar, add a matching entry to **both** `ROUTES`
   (`{ id: "my-page", path: "/my-page" }`) and the `NAV` group
   (`{ id: "my-page", label: "My page" }`). The id ties the sidebar highlight,
   the ⌘K "Go to" command and `onNavigate` together.

That's it — `active` highlighting (longest-path match, so `/items/42` keeps
**Items** lit) and the command palette update automatically.

## Using design-system components

Import React components from the `/react` entry; the CSS is already loaded in
`main.tsx`:

```tsx
import { Button, Callout } from "@diametral/design-system/react";
```

See the [design-system docs](https://littlebigcode.github.io/design-system/) for
the full catalogue and theming options.
