import { cx } from "../lib/cx.js";
/* ConsoleLayout — turnkey application chrome.
   Give it a `nav` (grouped items), the `active` id and `onNavigate`, and it
   renders the app bar, a data-driven sidebar, an optional ⌘K command palette and
   an optional Light/Dark/Sepia theme switcher around your page content. */
import React from "react";
import { Wordmark } from "../index.js";
import { Badge } from "../index.js";
import { Avatar, AvatarFallback } from "./avatar.js";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip.js";
import { Kbd } from "./kbd.js";
import { Segmented } from "../index.js";
import { CommandPalette } from "./CommandPalette.js";

import type { ReactNode } from "react";
import type { Command } from "./CommandPalette";

export interface ConsoleNavItem {
  id: string;
  label: ReactNode;
  badge?: ReactNode;
}
export interface ConsoleNavGroup {
  group?: string;
  items: ConsoleNavItem[];
}
export interface ConsoleUser {
  initials?: ReactNode;
  name?: ReactNode;
  onSignOut?: () => void;
  signOutLabel?: string;
}
export interface ConsoleLayoutProps {
  /** Wordmark element, or `{ name, sub }` to build one. */
  brand?: ReactNode | { name?: string; sub?: ReactNode };
  /** Grouped sidebar navigation. */
  nav?: ConsoleNavGroup[];
  /** Active item id (highlights the matching nav button). */
  active?: string;
  /** Fired with the chosen item id. */
  onNavigate?: (id: string) => void;
  /** ⌘K commands. Defaults to one "Go to" entry per nav item. */
  commands?: Command[];
  /** Right-aligned user avatar + sign-out. */
  user?: ConsoleUser;
  /** Extra app-bar action elements. */
  actions?: ReactNode;
  /** Show the ⌘K search trigger + command palette. Default true. */
  search?: boolean;
  searchPlaceholder?: string;
  /** Render a Light/Dark/Sepia switcher that drives `data-theme` on <html>. */
  themes?: boolean;
  /** Force the top load bar on (it also flashes briefly on every navigation). */
  loading?: boolean;
  children?: ReactNode;
  className?: string;
}
const h = React.createElement;
const { useState, useEffect } = React;

export function ConsoleLayout({
  brand, nav = [], active, onNavigate, commands, user, actions,
  search = true, searchPlaceholder = "Search…", themes = false, loading = false, children, className,
}: ConsoleLayoutProps) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [navLoading, setNavLoading] = useState(false);

  useEffect(() => {
    if (!search) return undefined;
    const onKey = (e: any) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmdOpen((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [search]);

  useEffect(() => {
    if (!themes) return;
    const root = document.documentElement;
    if (theme === "light") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
  }, [theme, themes]);

  // Flash the top load bar briefly on each navigation, for a sense of activity.
  useEffect(() => {
    setNavLoading(true);
    const t = setTimeout(() => setNavLoading(false), 500);
    return () => clearTimeout(t);
  }, [active]);

  const flat = nav.flatMap((g) => g.items || []);
  const cmds = commands || flat.map((n) => ({ id: n.id, label: n.label, group: "Go to", onRun: () => onNavigate && onNavigate(n.id) }));
  /* A `{ name, sub }` brand pairs the words with the square monogram: the
     horizontal lockup already spells "Diametral", so setting it beside the name
     would say it twice. With no brand at all the horizontal lockup stands alone. */
  const brandNode = brand && typeof brand === "object" && !React.isValidElement(brand)
    ? h(Wordmark, { variant: "square", name: (brand as any).name ?? "Diametral", sub: (brand as any).sub })
    : (brand || h(Wordmark, null));

  return h("div", { className: cx("ds-console", className) },
    h("header", { className: "ds-app-bar ds-console__bar" }, h("div", { className: "ds-app-bar__inner" },
      brandNode,
      search ? h("button", { className: "ds-console__search", onClick: () => setCmdOpen(true) },
        h("span", null, searchPlaceholder), h(Kbd, null, "⌘K")) : null,
      h("div", { className: "ds-app-bar__actions" },
        themes ? h(Segmented, { items: [{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }, { value: "sepia", label: "Sepia" }], value: theme, onChange: setTheme }) : null,
        actions || null,
        /* Re-wired in 1.0.0-beta.8 onto the absorbed Tooltip's composition:
           the old `label` prop is a <TooltipContent> child now. The trigger was
           a <span onClick> — not focusable, so the sign-out control was mouse
           only. TooltipTrigger renders a real <button>, which fixes that on the
           way past; the aria-label is what actually names it, since the popup
           is visual-only and wires no description. */
        user ? h(Tooltip, null,
          h(TooltipTrigger, {
            onClick: user.onSignOut,
            "aria-label": user.signOutLabel || "Sign out",
            style: { cursor: "pointer", background: "none", border: 0, padding: 0 },
          }, h(Avatar, { size: "sm" }, h(AvatarFallback, null, user.initials))),
          h(TooltipContent, null, user.signOutLabel || "Sign out")
        ) : null))),
    h("aside", { className: "ds-console__side" }, h("nav", { className: "ds-vnav" },
      nav.map((g, gi) => h("div", { key: g.group || gi, className: "ds-vnav__group" },
        g.group ? h("p", { className: "ds-label ds-console__navlabel" }, g.group) : null,
        (g.items || []).map((n) => h("button", {
          key: n.id,
          className: cx("ds-vnav__item ds-console__navitem", active === n.id && "is-active"),
          onClick: () => onNavigate && onNavigate(n.id),
        }, h("span", null, n.label), n.badge != null ? h(Badge, null, n.badge) : null)))))),
    h("main", { className: "ds-console__main" },
      h("div", { className: cx("ds-loadbar", (loading || navLoading) && "is-loading"), "aria-hidden": "true" }),
      h("div", { className: "ds-console__wrap" }, h("div", { key: active, className: "ds-fade-in" }, children))),
    search ? h(CommandPalette, { open: cmdOpen, onClose: () => setCmdOpen(false), commands: cmds, placeholder: "Jump to a page or run a command…" }) : null);
}
