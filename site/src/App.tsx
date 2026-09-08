import { BrowserRouter, Route, Routes } from "react-router"

import { BlockPage } from "@/docs/blocks/block-page"
import { BlocksIndex } from "@/docs/blocks"
import { ComponentPage } from "@/docs/component-page"
import { DocsLayout } from "@/docs/docs-layout"
import { FoundationPage } from "@/docs/foundations/foundation-page"
import { FoundationsIndex } from "@/docs/foundations"
import { Installation } from "@/docs/installation"
import { Overview } from "@/docs/overview"
import { TemplatePage } from "@/docs/templates/template-page"
import { TemplatesIndex } from "@/docs/templates"
import { Theming } from "@/docs/theming"

export function App() {
  return (
    // Matches Vite's `base`: the site is served from a project subpath on
    // GitHub Pages, so the router has to strip the same prefix Vite prepends.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<DocsLayout />}>
          <Route index element={<Overview />} />
          <Route path="docs/:slug" element={<ComponentPage />} />
          <Route path="installation" element={<Installation />} />
          <Route path="theming" element={<Theming />} />
          <Route path="foundations" element={<FoundationsIndex />} />
          <Route path="foundations/:slug" element={<FoundationPage />} />
          <Route path="blocks" element={<BlocksIndex />} />
          <Route path="blocks/:slug" element={<BlockPage />} />
          <Route path="templates" element={<TemplatesIndex />} />
          <Route path="templates/:slug" element={<TemplatePage />} />
        </Route>
        {/* Deliberately NO catch-all redirect. A registry-derived route for a
            page that does not exist must 404 visibly — with `<Navigate to="/">`
            here it redirected silently and the gate passed green. */}
      </Routes>
    </BrowserRouter>
  )
}
