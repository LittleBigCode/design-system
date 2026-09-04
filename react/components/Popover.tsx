"use client"

import { cx } from "../lib/cx.js";
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

import type {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from "react";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export interface PopoverTriggerArgs {
  open: boolean;
  toggle: () => void;
  ref: Ref<HTMLElement>;
  props: {
    ref: Ref<HTMLElement>;
    onClick: () => void;
    "aria-haspopup": "dialog";
    "aria-expanded": boolean;
  };
}

export interface PopoverProps extends Omit<HTMLAttributes<HTMLSpanElement>, "title"> {
  /**
   * The trigger: a render prop receiving open-state + props to spread, a single
   * element to clone props onto, or any node (wrapped in a default button).
   */
  trigger: ((args: PopoverTriggerArgs) => ReactElement) | ReactNode;
  /** Where the popover sits relative to the trigger. Defaults to "bottom". */
  placement?: PopoverPlacement;
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. Defaults to false. */
  defaultOpen?: boolean;
  /** Fires whenever the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Optional uppercase title rendered above the body. */
  title?: ReactNode;
  /** Render the pointing arrow on the popover edge. Defaults to false. */
  arrow?: boolean;
  /** The popover body content. */
  children?: ReactNode;
}

const h = React.createElement;

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
}: PopoverProps) {
  const controlled = open !== undefined;
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = controlled ? open : internal;

  // A role="dialog" must have an accessible name. Prefer a string title; if the
  // caller passes aria-label / aria-labelledby through, honour that; otherwise
  // fall back to a generic label so assistive tech still announces the dialog.
  const ariaLabelledByRest = rest["aria-labelledby"];
  const ariaLabelRest = rest["aria-label"];
  const dialogName =
    ariaLabelledByRest != null
      ? { "aria-labelledby": ariaLabelledByRest }
      : { "aria-label": ariaLabelRest != null ? ariaLabelRest : (typeof title === "string" ? title : "Popover") };
  // Don't also leak the naming attrs onto the host span.
  const { ["aria-label"]: _al, ["aria-labelledby"]: _alb, ...hostRest } = rest;

  const rootRef = React.useRef<any>(null);
  const triggerRef = React.useRef<any>(null);

  const setOpen = (next: any) => {
    if (!controlled) setInternal(next);
    if (onOpenChange) onOpenChange(next);
  };
  const toggle = () => setOpen(!isOpen);

  React.useEffect(() => {
    if (!isOpen) return undefined;
    const onDocClick = (e: any) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e: any) => {
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
    "aria-haspopup": "dialog" as const,
    "aria-expanded": isOpen,
  };

  const renderedTrigger =
    typeof trigger === "function"
      ? trigger({ open: isOpen, toggle, ref: triggerRef, props: triggerProps })
      : React.isValidElement(trigger)
        ? React.cloneElement(trigger as React.ReactElement<any>, triggerProps)
        : h("button", { type: "button", className: "ds-button", ...triggerProps }, trigger);

  return h("span", {
    ref: rootRef,
    className: cx("ds-popover-host", className),
    style: { position: "relative", display: "inline-flex" },
    ...hostRest,
  },
    renderedTrigger,
    isOpen
      ? h("div", {
          className: cx("ds-popover", `ds-popover--${placement}`),
          role: "dialog",
          ...dialogName,
          style: { position: "absolute", ...POS[placement] },
        },
          arrow ? h("span", { className: "ds-popover__arrow", "aria-hidden": "true" }) : null,
          title != null ? h("div", { className: "ds-popover__title" }, title) : null,
          h("div", { className: "ds-popover__body" }, children)
        )
      : null
  );
}