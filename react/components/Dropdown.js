/* ----------------------------------------------------------------------------
   Dropdown — a trigger that toggles a .ds-menu of actions.
   Manages open state, closes on outside-click and Escape, and moves focus
   between [role=menuitem] entries with ArrowUp / ArrowDown. The trigger may be a
   render prop (fn receiving { open, toggle, ref, props }) or a single element.
   Render MenuItem children for the rows. Styling: css/components/menu.css.
   ---------------------------------------------------------------------------- */
import React from "react";

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

export function MenuItem({ as = "button", danger, className, children, ...rest }) {
  const isButton = as === "button";
  return h(as, {
    className: cx("ds-menu__item", danger && "ds-menu__item--danger", className),
    role: "menuitem",
    tabIndex: -1,
    ...(isButton ? { type: "button" } : null),
    ...rest,
  }, children);
}

export function MenuDivider({ className, ...rest }) {
  return h("div", { className: cx("ds-menu__divider", className), role: "separator", ...rest });
}

export function MenuHeader({ className, children, ...rest }) {
  return h("div", { className: cx("ds-menu__header", className), ...rest }, children);
}

export function Dropdown({ trigger, children, align = "start", className, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const triggerRef = React.useRef(null);

  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  // Outside-click + Escape close.
  React.useEffect(() => {
    if (!open) return undefined;
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
  }, [open]);

  // Focus the first item when opening.
  React.useEffect(() => {
    if (!open || !menuRef.current) return;
    const items = menuRef.current.querySelectorAll('[role="menuitem"]:not([disabled])');
    if (items.length) items[0].focus();
  }, [open]);

  const onMenuKeyDown = (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(
      menuRef.current.querySelectorAll('[role="menuitem"]:not([disabled])')
    );
    if (!items.length) return;
    const idx = items.indexOf(document.activeElement);
    const next =
      e.key === "ArrowDown"
        ? (idx + 1) % items.length
        : (idx - 1 + items.length) % items.length;
    items[next].focus();
  };

  const triggerProps = {
    ref: triggerRef,
    onClick: toggle,
    "aria-haspopup": "menu",
    "aria-expanded": open,
  };

  const renderedTrigger =
    typeof trigger === "function"
      ? trigger({ open, toggle, ref: triggerRef, props: triggerProps })
      : React.isValidElement(trigger)
        ? React.cloneElement(trigger, triggerProps)
        : h("button", { type: "button", className: "ds-button", ...triggerProps }, trigger);

  return h("div", {
    ref: rootRef,
    className: cx("ds-dropdown", className),
    style: { position: "relative", display: "inline-flex" },
    ...rest,
  },
    renderedTrigger,
    open
      ? h("div", {
          ref: menuRef,
          className: "ds-menu",
          role: "menu",
          onKeyDown: onMenuKeyDown,
          style: {
            position: "absolute",
            top: "calc(100% + 6px)",
            [align === "end" ? "right" : "left"]: 0,
          },
        },
          // Close the menu after an item action fires.
          React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            if (child.type !== MenuItem) return child;
            return React.cloneElement(child, {
              onClick: (e) => {
                if (child.props.onClick) child.props.onClick(e);
                if (!e.defaultPrevented) close();
              },
            });
          })
        )
      : null
  );
}
