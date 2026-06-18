/* ----------------------------------------------------------------------------
   Drawer / off-canvas panel — a full-height .ds-drawer panel anchored to an edge
   of the viewport over a .ds-drawer-overlay scrim. Portals to <body>, closes on
   Escape and backdrop click, like Modal in react/index.js. Placement picks the
   docking edge ("right" default · "left" · "top" · "bottom"); the panel slides
   in via a transform (held still for prefers-reduced-motion, see the CSS).
   Styling: css/components/drawer.css (global stylesheet).
   ---------------------------------------------------------------------------- */
import React from "react";
import { createPortal } from "react-dom";

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

export function Drawer({ open, onClose, placement = "right", heading, footer, className, children }) {
  // Mount the overlay first, then flip `is-open` on the next frame so the panel
  // transitions in from its off-screen transform rather than snapping into place.
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    if (!open) { setShown(false); return undefined; }
    const id = requestAnimationFrame(() => setShown(true));
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  const node = h("div", {
    className: cx("ds-drawer-overlay", shown && "is-open"),
    onClick: (e) => { if (e.target === e.currentTarget) onClose && onClose(); },
  },
    h("div", {
      className: cx("ds-drawer", `ds-drawer--${placement}`, className),
      role: "dialog", "aria-modal": "true",
    },
      h("div", { className: "ds-drawer__head" },
        h("h2", { className: "ds-drawer__title" }, heading),
        h("button", {
          className: "ds-button ds-drawer__close", type: "button",
          "aria-label": "Close", onClick: () => onClose && onClose(),
        }, "Close")
      ),
      h("div", { className: "ds-drawer__body" }, children),
      footer != null ? h("div", { className: "ds-drawer__foot" }, footer) : null
    )
  );
  return createPortal(node, document.body);
}
