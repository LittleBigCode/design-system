import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

// The faces the tokens name, loaded before the stylesheet that names them.
// Nothing loaded them before, so every heading rendered in the title stack's
// last resort — Georgia — and every body line in system-ui, which is most of
// why the site did not look like the charter. Ufficio is the licensed title
// face and ships in this repo; it is imported here (the docs site is the
// showcase and Diametral holds the license) and stays opt-in for consumers.
import "@fontsource-variable/geist"
import "@fontsource-variable/geist-mono"
import "@diametral/design-system/assets/fonts/ufficio.css"

// The one deliverable: `dist/diametral.css`, resolved through the package's own
// `exports` map via the `file:..` install, so a broken map fails here rather
// than in a consumer. Written by the root `npm run build` — a hard prerequisite.
import "@diametral/design-system/dist/diametral.css"
import { Toaster } from "@diametral/design-system/react"

import { ThemeProvider } from "@/components/theme-provider"

import { App } from "./App.tsx"
import "@/styles/chrome.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      {/* Toaster both provides the toast context and mounts the portal +
          viewport, so it has to wrap the tree rather than sit beside it —
          ToastProvider swapped onto this in batch 13 (#46). */}
      <Toaster>
        <App />
      </Toaster>
    </ThemeProvider>
  </StrictMode>
)
