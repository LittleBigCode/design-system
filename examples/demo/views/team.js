import React from "react";
const { useState } = React;
import { h, F } from "../ui.js";
import { PageHeader, Toolbar, Select, Input, Card, Avatar, Progress, Tag, Button, DescriptionList, GaugeChart, Timeline, SectionHeading } from "../../../react/index.js";
import { TEAM, DEPTS } from "../data.js";

const deptTag = (d) => h(Tag, { status: d === "Data" ? "info" : d === "Engineering" ? "success" : d === "Product" ? "warning" : null }, d);
const utilStatus = (v) => (v >= 90 ? "danger" : v >= 75 ? "warning" : "success");

export function Team({ go, select }) {
  const [dept, setDept] = useState("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const people = TEAM.filter((u) =>
    (dept === "All" || u.dept === dept) &&
    (q === "" || u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)));

  return h(F, null,
    h(PageHeader, { title: "Team", subtitle: "People directory." }),
    h("div", { className: "row", style: { gap: "12px", marginBottom: "22px" } },
      h(Select, {
        value: dept,
        onChange: (e) => setDept(e.target.value),
        options: DEPTS.map((d) => ({ value: d, label: d })),
        style: { width: "180px" },
      }),
      h(Input, {
        type: "search",
        placeholder: "Search name or role…",
        value: query,
        onChange: (e) => setQuery(e.target.value),
        style: { flex: 1, maxWidth: "320px" },
      })),
    h("div", { className: "grid3" },
      people.map((u) => h(Card, { key: u.id },
        h("div", { className: "card-pad", style: { display: "grid", gap: "12px" } },
          h("div", { className: "row", style: { gap: "12px" } },
            h(Avatar, { initials: u.init }),
            h("div", { style: { minWidth: 0 } },
              h("div", { style: { fontWeight: 700 } }, u.name),
              h("div", { className: "psub", style: { margin: 0 } }, u.role))),
          h("div", null, deptTag(u.dept)),
          h("div", null,
            h("div", { style: { fontSize: "12px", color: "var(--ds-ink-faint)", marginBottom: "6px" } }, "Utilization"),
            h(Progress, { value: u.util, status: utilStatus(u.util) })),
          h("div", { className: "ds-numeric", style: { fontSize: "13px", color: "var(--ds-ink-soft)" } }, u.projects + " active projects"),
          h(Button, { block: true, onClick: () => { select({ person: u }); go("person"); } }, "View profile"))))));
}

export function PersonProfile({ go, sel }) {
  const u = (sel && sel.person) || TEAM[0];

  return h(F, null,
    h("div", { className: "row", style: { marginBottom: "16px" } },
      h(Button, { onClick: () => go("team") }, "← Team")),
    h(PageHeader, { title: u.name, subtitle: u.role + " · " + u.loc }),
    h("div", { className: "grid2" },
      h("div", { style: { display: "grid", gap: "16px" } },
        h(Card, null, h("div", { className: "card-pad" },
          h(DescriptionList, { items: [
            { term: "Department", desc: deptTag(u.dept) },
            { term: "Location", desc: u.loc },
            { term: "Active projects", desc: String(u.projects) },
            { term: "Utilization", desc: u.util + "%" },
          ] }))),
        h(Card, { title: "Recent work" }, h("div", { className: "card-pad" },
          h(Timeline, { items: [
            { time: "This week", title: "Shipped pricing matrix v2", body: "Rolled out the new delegation thresholds to production.", status: "success" },
            { time: "Last week", title: "Joined Acme delivery", body: "Picked up the build phase for the staffing workstream.", status: "info" },
            { time: "Earlier", title: "Quarterly review", body: "Closed out Q1 reporting and planned the next track.", status: "neutral" },
          ] })))),
      h("div", { style: { display: "grid", gap: "16px" } },
        h(Card, null, h("div", { className: "card-pad", style: { display: "grid", placeItems: "center" } },
          h(GaugeChart, {
            value: u.util,
            label: "Utilization",
            thresholds: [{ at: 0, color: "var(--ds-success)" }, { at: 75, color: "var(--ds-warning)" }, { at: 90, color: "var(--ds-danger)" }],
          }))),
        h(Card, { title: "Skills" }, h("div", { className: "card-pad", style: { display: "grid", gap: "16px" } },
          h("div", { className: "ds-chips" }, u.skills.map((s) => h(Tag, { key: s }, s))),
          h("div", { className: "row", style: { gap: "10px" } },
            h(Button, { variant: "primary" }, "Message"),
            h(Button, null, "Assign")))))));
}
