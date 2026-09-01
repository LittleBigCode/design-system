import { cx } from "../lib/cx.js";
import React from "react";

import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Content of the full-width top header region (e.g. a Wordmark + actions). */
  header?: ReactNode;
  /** Content of the left sidebar region (typically a VerticalNav). Omit to render a header + main only. */
  sidebar?: ReactNode;
  /** The scrolling main content area. */
  children?: ReactNode;
  /** Controlled narrow-screen sidebar state: `true` hides the sidebar, `false` reveals it. */
  collapsed?: boolean;
  /** Uncontrolled initial narrow-screen state. Defaults to `true` (collapsed). */
  defaultCollapsed?: boolean;
  /** Fires when the in-header toggle is pressed, with the next collapsed value. */
  onToggle?: (collapsed: boolean) => void;
}
const h = React.createElement;

/* ---- AppShell -----------------------------------------------------------
   A full application scaffold laid out on a CSS grid: a full-width `header`
   region, a left `sidebar` (holds a vertical nav), and the scrolling `main`
   content (children). At narrow widths the sidebar collapses behind a toggle
   button rendered into the header.

   Collapsible state works controlled (`collapsed` + `onToggle`) or uncontrolled
   (`defaultCollapsed`). `collapsed` reflects the narrow-screen open/closed
   state — when false the `is-sidebar-open` modifier is applied so the CSS
   drops the sidebar back into the layout. */
export const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  { header, sidebar, children, collapsed, defaultCollapsed = true, onToggle, className, ...rest },
  ref
) {
  const controlled = collapsed !== undefined;
  const [internal, setInternal] = React.useState(defaultCollapsed);
  const isCollapsed = controlled ? collapsed : internal;

  const toggle = () => {
    const next = !isCollapsed;
    if (!controlled) setInternal(next);
    if (onToggle) onToggle(next);
  };

  return h("div", {
    ref,
    className: cx("ds-shell", !isCollapsed && "is-sidebar-open", className),
    ...rest,
  },
    h("header", { className: "ds-shell__header" },
      sidebar != null
        ? h("button", {
            type: "button",
            className: "ds-shell__toggle",
            "aria-label": "Toggle navigation",
            "aria-expanded": !isCollapsed,
            onClick: toggle,
          }, "☰")
        : null,
      header
    ),
    sidebar != null
      ? h("aside", { className: "ds-shell__sidebar" }, sidebar)
      : null,
    h("main", { className: "ds-shell__main" }, children)
  );
});
