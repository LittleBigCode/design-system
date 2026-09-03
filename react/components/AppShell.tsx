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
  /** Remember the collapsed state in a cookie for a week. Defaults to `true`. */
  persist?: boolean;
  /** Bind ⌘B / Ctrl+B to the toggle. Defaults to `true`. */
  shortcut?: boolean;
}
const h = React.createElement;

/* ---- sidebar's two cherry-picks -----------------------------------------
   `sidebar` is incumbent-holds: its 23 composition parts do not port, but #164
   A3 keeps two behaviours, and AppShell is the target component that owns the
   surface they belong to.

   One adaptation, deliberate. The source writes this cookie and never reads it:
   it is a Next.js pattern where a server component reads `sidebar_state` and
   feeds it back as `defaultOpen`. This package is buildless and has no server,
   so a write-only cookie would persist nothing at all. The read is done here,
   on mount, and it only seeds the UNCONTROLLED default — a caller passing
   `collapsed` still owns the state outright, exactly as before. */
const SHELL_COOKIE = "ds_shell_sidebar";
const SHELL_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function readCollapsedCookie(): boolean | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${SHELL_COOKIE}=(true|false)`)
  );
  return match ? match[1] === "true" : undefined;
}

/* ---- AppShell -----------------------------------------------------------
   A full application scaffold laid out on a CSS grid: a full-width `header`
   region, a left `sidebar` (holds a vertical nav), and the scrolling `main`
   content (children). At narrow widths the sidebar collapses behind a toggle
   button rendered into the header.

   Collapsible state works controlled (`collapsed` + `onToggle`) or uncontrolled
   (`defaultCollapsed`). `collapsed` reflects the narrow-screen open/closed
   state — when false the `is-sidebar-open` modifier is applied so the CSS
   drops the sidebar back into the layout.

   `persist` (a week-long cookie) and `shortcut` (⌘B / Ctrl+B) are `sidebar`'s
   two cherry-picks, landed in 1.0.0-beta.8. Both default on; both are no-ops
   without a `sidebar`. */
export const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  { header, sidebar, children, collapsed, defaultCollapsed = true, onToggle, persist = true, shortcut = true, className, ...rest },
  ref
) {
  const controlled = collapsed !== undefined;
  // Lazy initialiser: the cookie is read once, on mount, and never re-read — a
  // later write must not resurrect a stale value on an unrelated re-render.
  const [internal, setInternal] = React.useState(
    () => (persist ? readCollapsedCookie() : undefined) ?? defaultCollapsed
  );
  const isCollapsed = controlled ? collapsed : internal;

  const toggle = React.useCallback(() => {
    const next = !isCollapsed;
    if (!controlled) setInternal(next);
    if (persist && typeof document !== "undefined") {
      document.cookie = `${SHELL_COOKIE}=${next}; path=/; max-age=${SHELL_COOKIE_MAX_AGE}`;
    }
    if (onToggle) onToggle(next);
  }, [isCollapsed, controlled, persist, onToggle]);

  // ⌘B / Ctrl+B, bound only when there is a sidebar to toggle.
  React.useEffect(() => {
    if (!shortcut || sidebar == null) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcut, sidebar, toggle]);

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
            /* Announces the cherry-picked shortcut, so it is discoverable by a
               screen reader rather than only by knowing it is there. */
            "aria-keyshortcuts": shortcut ? "Meta+B Control+B" : undefined,
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
