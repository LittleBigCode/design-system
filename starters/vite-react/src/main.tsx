import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// The single Diametral stylesheet — tokens, reset, typography and every
// component. Import it once, here, at the app root.
import "@diametral/design-system/css/diametral.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
