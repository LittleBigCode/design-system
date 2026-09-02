import { cx } from "../lib/cx.js";
import React from "react";

import type { ReactNode } from "react";


export interface SplitButtonProps {
  children?: ReactNode;
  onMain?: () => void;
  variant?: "primary" | "danger";
  size?: "sm" | "lg";
  /** Menu node rendered under the caret when open. */
  menu?: ReactNode;
  className?: string;
}
const h = React.createElement;

/* ButtonGroup moved to components/button-group.tsx in 1.0.0-beta.3, which adds
   the text and separator parts and the vertical orientation. */

/* IconButton moved to components/icon-button.tsx in 1.0.0-beta.3, when the
   source's four square sizes landed. Its props are unchanged. */

export function SplitButton({ children, onMain, variant, size, menu, className }: SplitButtonProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<any>(null);
  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e: any) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e: any) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const v = variant ? `ds-button--${variant}` : null;
  const s = size ? `ds-button--${size}` : null;
  return h("div", { className: cx("ds-split", className), ref },
    h("button", { type: "button", className: cx("ds-button", v, s), onClick: onMain }, children),
    h("button", {
      type: "button", "aria-label": "More actions", "aria-expanded": open,
      className: cx("ds-button", "ds-button--icon", v, s), onClick: () => setOpen((o) => !o),
    }, "▾"),
    open && menu ? h("div", { className: "ds-split__menu" }, menu) : null
  );
}
