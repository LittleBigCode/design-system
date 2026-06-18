/* The Diametral Console demo app: login → shell with grouped nav + ⌘K palette.
   demo.html is a thin loader that calls mount(). Views live in ./views/*.js. */
import React from "react";
import { createRoot } from "react-dom/client";
import {
  Wordmark, Button, Input, Badge, Avatar, Tooltip, Card, Field, Kbd, Segmented,
  ToastProvider, CommandPalette,
} from "../../react/index.js";
import { h, F } from "./ui.js";
import { Overview, Inbox, Settings } from "./views/core.js";
import { Projects, Board } from "./views/work.js";
import { Candidates, CV, Training } from "./views/talent.js";
import { ProjectDetail } from "./views/project-detail.js";
import { Reports } from "./views/reports.js";
import { Team, PersonProfile } from "./views/team.js";
import { CalendarView } from "./views/calendar.js";
import { Invoices } from "./views/invoices.js";
import { Knowledge } from "./views/knowledge.js";
import { Files } from "./views/files.js";
const { useState, useEffect } = React;

const NAV = [
  { group: "Work", items: [
    { id: "overview", label: "Overview", view: Overview },
    { id: "projects", label: "Projects", view: Projects },
    { id: "board", label: "Board", view: Board },
    { id: "reports", label: "Reports", view: Reports },
    { id: "invoices", label: "Invoices", view: Invoices },
  ] },
  { group: "Talent", items: [
    { id: "candidates", label: "Candidates", view: Candidates, badge: 7 },
    { id: "team", label: "Team", view: Team },
    { id: "training", label: "Training", view: Training },
  ] },
  { group: "Workspace", items: [
    { id: "calendar", label: "Calendar", view: CalendarView },
    { id: "knowledge", label: "Knowledge base", view: Knowledge },
    { id: "files", label: "Files", view: Files },
    { id: "inbox", label: "Inbox", view: Inbox, badge: 2 },
    { id: "settings", label: "Settings", view: Settings },
  ] },
];
const FLAT = NAV.flatMap((g) => g.items);
// Drill-down views reached from a parent (not in the sidebar) + which nav item stays active.
const HIDDEN = { cv: CV, project: ProjectDetail, person: PersonProfile };
const ACTIVE_FOR = { cv: "candidates", project: "projects", person: "team" };

function Shell({ onSignOut }) {
  const [view, setView] = useState("overview");
  const [sel, setSel] = useState({});
  const [cmdOpen, setCmdOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const go = (v) => setView(v);
  const select = (o) => setSel((s) => ({ ...s, ...o }));
  const activeId = ACTIVE_FOR[view] || view;
  const Body = HIDDEN[view] || (FLAT.find((n) => n.id === view) || {}).view || Overview;

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCmdOpen((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
  }, [theme]);

  const commands = [
    ...FLAT.map((n) => ({ id: n.id, label: n.label, group: "Go to", onRun: () => go(n.id) })),
    { id: "new-project", label: "New project", group: "Actions", hint: "C", onRun: () => go("projects") },
    { id: "signout", label: "Sign out", group: "Actions", onRun: onSignOut },
  ];

  return h("div", { className: "ap" },
    h("header", { className: "ds-app-bar ap__bar" }, h("div", { className: "ds-app-bar__inner" },
      h(Wordmark, { sub: "Console" }),
      h("button", { className: "ap__search", onClick: () => setCmdOpen(true) },
        h("span", null, "Search projects, people…"),
        h(Kbd, null, "⌘K")),
      h("div", { className: "ds-app-bar__actions" },
        h(Segmented, { items: [{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }, { value: "sepia", label: "Sepia" }], value: theme, onChange: setTheme }),
        h(Badge, { variant: "accent" }, "Production"),
        h(Button, { variant: "primary", onClick: () => go("projects") }, "New"),
        h(Tooltip, { label: "Sign out" }, h("span", { onClick: onSignOut, style: { cursor: "pointer" } }, h(Avatar, { initials: "VD", size: "sm" })))))),
    h("aside", { className: "ap__side" }, h("nav", { className: "ds-vnav" },
      NAV.map((g) => h("div", { key: g.group, className: "ds-vnav__group" },
        h("p", { className: "ds-label ap__navlabel" }, g.group),
        g.items.map((n) => h("button", {
          key: n.id,
          className: "ds-vnav__item ap__navitem" + (activeId === n.id ? " is-active" : ""),
          onClick: () => go(n.id),
        }, h("span", null, n.label), n.badge ? h(Badge, null, n.badge) : null)))))),
    h("main", { className: "ap__main" }, h("div", { className: "ap__wrap" }, h(Body, { go, sel, select }))),
    h(CommandPalette, { open: cmdOpen, onClose: () => setCmdOpen(false), commands, placeholder: "Jump to a page or run a command…" }));
}

function Login({ onSignIn }) {
  const [loading, setLoading] = useState(false);
  const submit = (e) => { e.preventDefault(); setLoading(true); setTimeout(onSignIn, 600); };
  return h("div", { style: { minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" } },
    h("form", { onSubmit: submit, style: { width: "360px", maxWidth: "100%" } }, h(Card, null, h("div", { style: { padding: "26px 24px" } },
      h("div", { style: { marginBottom: "18px" } }, h(Wordmark, {})),
      h("div", { className: "ph", style: { fontSize: "22px", marginBottom: "4px" } }, "Sign in"),
      h("div", { className: "psub", style: { margin: "0 0 20px" } }, "Welcome back to the Console."),
      h("div", { style: { display: "grid", gap: "14px" } },
        h(Field, { label: "Email" }, h(Input, { type: "email", defaultValue: "vincent@diametral.io", required: true })),
        h(Field, { label: "Password" }, h(Input, { type: "password", defaultValue: "password", required: true })),
        h(Button, { variant: "primary", block: true, loading, type: "submit" }, "Sign in"),
        h("div", { style: { textAlign: "center" } }, h(Button, { block: true }, "Continue with SSO")))))));
}

function App() {
  const [authed, setAuthed] = useState(false);
  return h(ToastProvider, null, authed ? h(Shell, { onSignOut: () => setAuthed(false) }) : h(Login, { onSignIn: () => setAuthed(true) }));
}

export function mount() {
  const el = document.getElementById("app");
  el.removeAttribute("style"); // drop the loading-state grid centering so .ap fills the width
  createRoot(el).render(h(App));
}
