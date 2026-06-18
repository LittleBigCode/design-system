/* ----------------------------------------------------------------------------
   Popover / Signpost — a trigger that toggles a bordered .ds-popover panel.
   Toggles on trigger click, closes on outside-click and Escape. Works controlled
   (open / onOpenChange) or uncontrolled (defaultOpen). Positioned with inline
   styles (simple top / bottom / left / right placement around the trigger).
   Styling comes from css/components/popover.css (global stylesheet).

   The trigger may be a render prop (fn receiving { open, toggle, ref, props }) or
   a single element. `children` is the popover body content.
   ---------------------------------------------------------------------------- */
import React from "react";

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

const POS = {
  top:    { left: "50%", bottom: "calc(100% + 10px)", transform: "translateX(-50%)" },
  bottom: { left: "50%", top: "calc(100% + 10px)", transform: "translateX(-50%)" },
  left:   { right: "calc(100% + 10px)", top: "50%", transform: "translateY(-50%)" },
  right:  { left: "calc(100% + 10px)", top: "50%", transform: "translateY(-50%)" },
};

export function Popover({
  trigger,
  placement = "bottom",
  open,
  defaultOpen = false,
  onOpenChange,
  title,
  arrow = false,
  className,
  children,
  ...rest
}) {
  const controlled = open !== undefined;
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = controlled ? open : internal;

  const rootRef = React.useRef(null);
  const triggerRef = React.useRef(null);

  const setOpen = (next) => {
    if (!controlled) setInternal(next);
    if (onOpenChange) onOpenChange(next);
  };
  const toggle = () => setOpen(!isOpen);

  React.useEffect(() => {
    if (!isOpen) return undefined;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        if (triggerRef.current && triggerRef.current.focus) triggerRef.current.focus();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const triggerProps = {
    ref: triggerRef,
    onClick: toggle,
    "aria-haspopup": "dialog",
    "aria-expanded": isOpen,
  };

  const renderedTrigger =
    typeof trigger === "function"
      ? trigger({ open: isOpen, toggle, ref: triggerRef, props: triggerProps })
      : React.isValidElement(trigger)
        ? React.cloneElement(trigger, triggerProps)
        : h("button", { type: "button", className: "ds-button", ...triggerProps }, trigger);

  return h("span", {
    ref: rootRef,
    className: cx("ds-popover-host", className),
    style: { position: "relative", display: "inline-flex" },
    ...rest,
  },
    renderedTrigger,
    isOpen
      ? h("div", {
          className: cx("ds-popover", `ds-popover--${placement}`),
          role: "dialog",
          style: { position: "absolute", ...POS[placement] },
        },
          arrow ? h("span", { className: "ds-popover__arrow", "aria-hidden": "true" }) : null,
          title != null ? h("div", { className: "ds-popover__title" }, title) : null,
          h("div", { className: "ds-popover__body" }, children)
        )
      : null
  );
}
