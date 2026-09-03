import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import { demoSource } from "./plugins/demo-source"

// https://vite.dev/config/
export default defineConfig({
  // The React workbench is a verification harness, not the docs site: the repo
  // root IS the web root (pages.yml copies css/, assets/, examples/ verbatim, and
  // examples/*.html link ../css/diametral.css the way a consumer would), so the
  // buildless showcase keeps `/` and this app takes a subpath under it. Every
  // emitted asset URL needs that full prefix; `App.tsx` reads the same value back
  // out of `import.meta.env.BASE_URL` for the router's basename.
  base: "/design-system/react-workbench/",
  build: {
    // NOT the default "assets": pages.yml fills `_site/assets` with the fonts
    // and logos that `examples/*.html` link as `../assets/fonts/ufficio.css`.
    // The SPA's hashed bundles would merge into that directory and the copy
    // order would decide which survives.
    assetsDir: "_app",
  },
  plugins: [react(), tailwindcss(), demoSource()],
  resolve: {
    /**
     * The `file:..` install is a symlink, so the package's own emit under
     * `../dist/react/` resolves `react` and `react-dom` against the *repo
     * root's* node_modules — which has neither, because the package declares
     * them as optional peers. Vite then substitutes its optional-peer stub and
     * `createPortal` silently disappears from ToastProvider, Drawer and
     * CommandPalette. Deduping pins both to this app's copies.
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
      // registry.ts, demos/ and playgrounds/{,.ts} moved to examples/registry/
      // (issue #30, the docs-generator tracer bullet) — everything left under
      // src/registry/ (demos.ts, playground-registry.ts) still resolves via "@".
      "@registry": path.resolve(__dirname, "../examples/registry"),
    },
  },
})
