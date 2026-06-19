/* ConsoleLayout — turnkey application chrome.
   Give it a `nav` (grouped items), the `active` id and `onNavigate`, and it
   renders the app bar, a data-driven sidebar, an optional ⌘K command palette and
   an optional Light/Dark/Sepia theme switcher around your page content. */
import React from "react";
import { Wordmark } from "../index.js";
import { Badge } from "../index.js";
import { Avatar } from "./Avatar.js";
import { Tooltip } from "./Tooltip.js";
import { Kbd } from "./Kbd.js";
import { Segmented } from "../index.js";
import { CommandPalette } from "./CommandPalette.js";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");
const { useState, useEffect } = React;

export function ConsoleLayout({
  brand, nav = [], active, onNavigate, commands, user, actions,
  search = true, searchPlaceholder = "Search…", themes = false, loading = false, children, className,
}) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [navLoading, setNavLoading] = useState(false);

  useEffect(() => {
    if (!search) return undefined;
    const onKey = (e) => {
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
  const brandNode = brand && typeof brand === "object" && !React.isValidElement(brand)
    ? h(Wordmark, { name: brand.name, sub: brand.sub }) : (brand || h(Wordmark, null));

  return h("div", { className: cx("ds-console", className) },
    h("header", { className: "ds-app-bar ds-console__bar" }, h("div", { className: "ds-app-bar__inner" },
      brandNode,
      search ? h("button", { className: "ds-console__search", onClick: () => setCmdOpen(true) },
        h("span", null, searchPlaceholder), h(Kbd, null, "⌘K")) : null,
      h("div", { className: "ds-app-bar__actions" },
        themes ? h(Segmented, { items: [{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }, { value: "sepia", label: "Sepia" }], value: theme, onChange: setTheme }) : null,
        actions || null,
        user ? h(Tooltip, { label: user.signOutLabel || "Sign out" }, h("span", { onClick: user.onSignOut, style: { cursor: "pointer" } }, h(Avatar, { initials: user.initials, size: "sm" }))) : null))),
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
