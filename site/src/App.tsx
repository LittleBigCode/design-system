import { BrowserRouter, Route, Routes } from "react-router"

import { ComponentPage } from "@/docs/component-page"
import { DocsLayout } from "@/docs/docs-layout"
import { Overview } from "@/docs/overview"

export function App() {
  return (
    // Matches Vite's `base`: the site is served from a project subpath on
    // GitHub Pages, so the router has to strip the same prefix Vite prepends.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<DocsLayout />}>
          <Route index element={<Overview />} />
          <Route path="docs/:slug" element={<ComponentPage />} />
        </Route>
        {/* Deliberately NO catch-all redirect. A registry-derived route for a
            page that does not exist must 404 visibly — with `<Navigate to="/">`
            here it redirected silently and the gate passed green. */}
      </Routes>
    </BrowserRouter>
  )
}
