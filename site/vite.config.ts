import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import { demoSource } from "./plugins/demo-source"

// https://vite.dev/config/
export default defineConfig({
  // site/ is the docs site (issue #47 / direction.md decision 6): GitHub Pages
  // serves it at the project-pages subpath, not a nested react-workbench route
  // any more. Every emitted asset URL needs that prefix; `App.tsx` reads the
  // same value back out of `import.meta.env.BASE_URL` for the router's basename.
  base: "/design-system/",
  build: {
    assetsDir: "_app",
  },
  plugins: [react(), tailwindcss(), demoSource()],
  resolve: {
    /**
     * The `file:..` install is a symlink, so the package's own emit under
     * `../dist/react/` resolves `react` and `react-dom` against the *repo
     * root's* node_modules — which has neither, because the package declares
     * them as optional peers. Vite then substitutes its optional-peer stub and
     * `createPortal` silently disappears from Toaster, Drawer and
     * Command. Deduping pins both to this app's copies.
     *
     * `recharts` joins the list for a sharper version of the same failure: the
     * /docs/chart demos import `Bar`, `XAxis` and friends themselves and hand
     * them to the package's `ChartContainer`, so two copies put the children
     * and the container on different recharts contexts and the plot renders
     * empty, with no error. tests/chart-marks.spec.ts is what catches it. The
     * package declares recharts an optional peer for the same reason: a chart's
     * children are written by the consumer, so there can only be one copy.
     */
    dedupe: ["react", "react-dom", "recharts"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // registry.ts, demos/ and playgrounds/{,.ts} moved back under
      // src/registry/ (issue #47, the repo restructure) alongside demos.ts and
      // playground-registry.ts — "@registry" is kept as a stable alias name.
      "@registry": path.resolve(__dirname, "./src/registry"),
    },
  },
})
