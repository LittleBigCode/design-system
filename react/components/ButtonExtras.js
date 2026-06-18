import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

export function ButtonGroup({ className, children, ...rest }) {
  return h("div", { className: cx("ds-button-group", className), role: "group", ...rest }, children);
}

export const IconButton = React.forwardRef(function IconButton(
  { label, variant, size, className, type = "button", children, ...rest }, ref
) {
  return h("button", {
    ref, type, "aria-label": label, title: label,
    className: cx("ds-button", "ds-button--icon",
      variant && `ds-button--${variant}`, size && `ds-button--${size}`, className),
    ...rest,
  }, children);
});

export function SplitButton({ children, onMain, variant, size, menu, className }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
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
