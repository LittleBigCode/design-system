import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

// The one deliverable: `dist/diametral.css`, resolved through the package's own
// `exports` map via the `file:..` install, so a broken map fails here rather
// than in a consumer. Written by the root `npm run build` — a hard prerequisite.
import "@diametral/design-system/dist/diametral.css"
import { ToastProvider } from "@diametral/design-system/react"

import { ThemeProvider } from "@/components/theme-provider"

import { App } from "./App.tsx"
import "@/styles/chrome.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      {/* ToastProvider both provides the toast context and mounts the portal +
          viewport, so it has to wrap the tree rather than sit beside it. */}
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
)
