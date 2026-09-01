import { cx } from "../lib/cx.js";
import React from "react";

import type {
  ButtonHTMLAttributes, HTMLAttributes, ReactNode,
  ForwardRefExoticComponent, RefAttributes,
} from "react";


export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name (also used as the title tooltip). */
  label: string;
  variant?: "primary" | "danger";
  size?: "sm" | "lg";
}

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

export function ButtonGroup({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return h("div", { className: cx("ds-button-group", className), role: "group", ...rest }, children);
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, variant, size, className, type = "button", children, ...rest }, ref
) {
  return h("button", {
    ref, type, "aria-label": label, title: label,
    className: cx("ds-button", "ds-button--icon",
      variant && `ds-button--${variant}`, size && `ds-button--${size}`, className),
    ...rest,
  }, children);
});

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
