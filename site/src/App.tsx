import { BrowserRouter, Route, Routes } from "react-router"

import { BlockCategoryPage } from "@/docs/blocks/category-page"
import { BlockPreview } from "@/docs/blocks/preview"
import { BlocksIndex } from "@/docs/blocks"
import { ComponentPage } from "@/docs/component-page"
import { DocsLayout } from "@/docs/docs-layout"
import { FoundationPage } from "@/docs/foundations/foundation-page"
import { FoundationsIndex } from "@/docs/foundations"
import { Installation } from "@/docs/installation"
import { KitchenSink } from "@/docs/kitchen-sink"
import { Overview } from "@/docs/overview"
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
          <Route path="kitchen-sink" element={<KitchenSink />} />
          <Route path="installation" element={<Installation />} />
          <Route path="theming" element={<Theming />} />
          <Route path="foundations" element={<FoundationsIndex />} />
          <Route path="foundations/:slug" element={<FoundationPage />} />
          <Route path="blocks" element={<BlocksIndex />} />
          <Route path="blocks/:category" element={<BlockCategoryPage />} />
        </Route>
        {/* Outside DocsLayout on purpose: the bare route is what the category
            page's iframe loads and what build-demo-markup.mjs scrapes, so it
            must carry no docs chrome. */}
        <Route
          path="blocks/:category/:variant/preview"
          element={<BlockPreview />}
        />
        {/* Deliberately NO catch-all redirect. A registry-derived route for a
            page that does not exist must 404 visibly — with `<Navigate to="/">`
            here it redirected silently and the gate passed green. */}
      </Routes>
    </BrowserRouter>
  )
}
