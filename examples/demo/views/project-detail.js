import React from "react";
const { useState } = React;
import { h, F, stageTag } from "../ui.js";
import {
  PageHeader, Breadcrumb, Button, Stepper, AreaChart, Timeline,
  DescriptionList, Avatar, AvatarGroup, GaugeChart, Callout, Card,
  Drawer, Field, Input,
} from "../../../react/index.js";
import { PROJECTS, STAGES, BURNDOWN, SPRINTS, RISKS, ACTIVITY, PEOPLE } from "../data.js";

export function ProjectDetail({ go, sel }) {
  const p = (sel && sel.project) || PROJECTS[0];
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(p.name);
  const [client, setClient] = useState(p.client);

  const activeStep = Math.max(0, STAGES.indexOf(p.stage));
  const team = PEOPLE.slice(0, 5);

  const close = () => setOpen(false);

  return h(F, null,
    h(PageHeader, {
      breadcrumb: h(Breadcrumb, { items: [
        { label: "Projects", href: "#projects" },
        { label: p.name },
      ] }),
      title: p.name,
      subtitle: `${p.client} · ${p.stage}`,
      actions: h(F, null,
        h(Button, { onClick: () => setOpen(true) }, "Edit"),
        h(Button, { variant: "primary", onClick: () => go("project") }, "New milestone")),
    }),

    h("div", { style: { margin: "20px 0 24px" } },
      h(Stepper, { steps: STAGES.map((s) => ({ label: s })), active: activeStep })),

    h("div", { className: "grid2" },
      // LEFT column
      h("div", null,
        h(Card, { title: "Burn-down", style: { marginBottom: "20px" } },
          h("div", { className: "psub", style: { marginBottom: "12px" } },
            "Planned vs. actual remaining work across the engagement."),
          h(AreaChart, { series: BURNDOWN, labels: SPRINTS, width: 640, height: 220 })),
        h(Card, { title: "Activity" },
          h(Timeline, { items: ACTIVITY }))),

      // RIGHT column
      h("div", null,
        h(Card, { title: "Overview", className: "card-pad" },
          h(DescriptionList, { items: [
            { term: "Client", desc: p.client },
            { term: "Owner", desc: h("span", { className: "row", style: { gap: "8px" } },
              h(Avatar, { initials: p.owner, size: "sm" }), p.owner) },
            { term: "Stage", desc: stageTag(p.stage) },
            { term: "Progress", desc: h("span", { className: "ds-numeric" }, `${p.progress}%`) },
            { term: "Margin", desc: h("span", { className: "ds-numeric", style: {
              color: p.margin < 0 ? "var(--ds-danger)" : "var(--ds-success)" } }, `${p.margin}%`) },
          ] }),
          h("div", { style: { marginTop: "16px" } },
            h("div", { className: "psub", style: { marginBottom: "8px" } }, "Team"),
            h(AvatarGroup, { max: 5 }, team.map((init) => h(Avatar, { key: init, initials: init }))))),

        h(Card, { title: "Progress", className: "card-pad", style: { marginTop: "20px" } },
          h("div", { style: { display: "flex", justifyContent: "center" } },
            h(GaugeChart, {
              value: p.progress, max: 100, size: 200, label: "complete",
              thresholds: [
                { at: 0, color: "var(--ds-danger)" },
                { at: 40, color: "var(--ds-warning)" },
                { at: 70, color: "var(--ds-success)" },
              ],
              format: (v) => `${Math.round(v)}%`,
            }))),

        h("div", { style: { marginTop: "20px" } },
          h("div", { className: "psub", style: { marginBottom: "10px" } }, "Risks"),
          RISKS.map((r, i) => h(Callout, {
            key: i, type: r.type, heading: r.heading,
            style: i ? { marginTop: "12px" } : null,
          }, r.body))))),

    // Edit drawer
    h(Drawer, {
      open, onClose: close, placement: "right", heading: "Edit project",
      footer: h("div", { className: "row", style: { gap: "8px", justifyContent: "flex-end" } },
        h(Button, { onClick: close }, "Cancel"),
        h(Button, { variant: "primary", onClick: close }, "Save")),
    },
      h("div", { className: "prose", style: { marginBottom: "16px" } },
        h("p", null, "Update the engagement details. Changes sync to the delivery board.")),
      h(Field, { label: "Project name", htmlFor: "pd-name" },
        h(Input, { id: "pd-name", value: name, onChange: (e) => setName(e.target.value) })),
      h(Field, { label: "Client", htmlFor: "pd-client" },
        h(Input, { id: "pd-client", value: client, onChange: (e) => setClient(e.target.value) }))));
}
