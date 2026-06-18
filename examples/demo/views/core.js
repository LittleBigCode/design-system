/* Core views: Overview, Inbox, Settings. */
import React from "react";
import {
  StatCard, Sparkline, LineChart, DonutChart, Card,
  Avatar, Tooltip, IconButton, Button, Field, Textarea, EmptyState,
  Tabs, Input, FieldHint, Select, Switch, useToast,
} from "../../../react/index.js";
import { h, F } from "../ui.js";
import { MESSAGES, SERIES, MONTHS } from "../data.js";
const { useState } = React;

export function Overview() {
  return h(F, null,
    h("div", { className: "ph" }, "Overview"),
    h("div", { className: "psub" }, "Pricing performance across all entities · Q2 2026"),
    h("div", { className: "grid4" },
      h(StatCard, { label: "Active projects", value: "86", delta: "8 this week", deltaDir: "up" }),
      h(StatCard, { label: "Avg. margin", value: "24.6 %", delta: "2.1 pts", deltaDir: "up" }),
      h(StatCard, { label: "At-risk rate", value: "5.2 %", delta: "0.4 pts", deltaDir: "down" }),
      h(StatCard, { label: "Revenue · 30d", value: "€4.51M" }, h(Sparkline, { data: [40, 44, 42, 50, 48, 57, 54, 62, 60, 71, 68, 80], fill: true, width: 200, height: 36 }))),
    h("div", { className: "grid2", style: { marginTop: "16px" } },
      h(Card, { title: "Revenue vs cost" }, h("div", { className: "card-pad" }, h(LineChart, { series: SERIES, labels: MONTHS, width: 700, height: 240 }))),
      h(Card, { title: "Revenue by entity" }, h("div", { className: "card-pad", style: { display: "grid", placeItems: "center" } },
        h(DonutChart, { data: [{ label: "LBC_FR", value: 46 }, { label: "LBC_BE", value: 28 }, { label: "LBC_US", value: 19 }, { label: "LBC_CH", value: 11 }], centerLabel: "104", size: 200 })))));
}

export function Inbox() {
  const [sel, setSel] = useState(MESSAGES[0].id);
  const [read, setRead] = useState(() => new Set());
  const cur = MESSAGES.find((m) => m.id === sel);
  const open = (id) => { setSel(id); setRead((s) => new Set(s).add(id)); };
  return h(F, null,
    h("div", { className: "ph", style: { marginBottom: "16px" } }, "Inbox"),
    h("div", { className: "ib" },
      h("div", { className: "ib__list" }, MESSAGES.map((m) => {
        const unread = m.unread && !read.has(m.id);
        return h("div", { key: m.id, className: "ib__row" + (m.id === sel ? " on" : ""), onClick: () => open(m.id) },
          h(Avatar, { initials: m.init, size: "sm" }),
          h("div", { style: { minWidth: 0, flex: 1 } },
            h("div", { className: "row", style: { justifyContent: "space-between" } }, h("b", { style: { fontWeight: unread ? 600 : 400, fontSize: "13.5px" } }, m.from), h("span", { style: { color: "var(--ds-ink-faint)", fontSize: "12px" } }, m.time)),
            h("div", { style: { fontSize: "13px", fontWeight: unread ? 500 : 400 } }, m.subj),
            h("div", { style: { fontSize: "12.5px", color: "var(--ds-ink-faint)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, m.snip)),
          unread ? h("span", { className: "ib__dot" }) : null);
      })),
      h("div", { className: "ib__read" }, cur ? h("div", null,
        h("div", { className: "row", style: { gap: "12px", marginBottom: "16px" } },
          h(Avatar, { initials: cur.init }),
          h("div", { style: { flex: 1 } }, h("div", { className: "ph", style: { fontSize: "19px" } }, cur.subj), h("div", { style: { color: "var(--ds-ink-faint)", fontSize: "13px" } }, cur.from)),
          h(Tooltip, { label: "Archive" }, h(IconButton, { label: "Archive" }, "▾")), h(Button, { variant: "primary" }, "Reply")),
        h("p", { style: { lineHeight: 1.6, color: "var(--ds-ink-soft)", maxWidth: "62ch" } }, cur.body),
        h("div", { style: { marginTop: "18px" } }, h(Field, { label: "Reply" }, h(Textarea, { rows: 3, placeholder: "Write a reply…" })), h("div", { style: { marginTop: "10px" } }, h(Button, { variant: "primary" }, "Send")))) : h(EmptyState, { title: "No message selected" }))));
}

export function Settings() {
  const toast = useToast();
  const [name, setName] = useState("Vincent Devillers");
  const items = [
    { id: "profile", label: "Profile", content: h("div", { style: { paddingTop: "18px", display: "grid", gap: "16px", maxWidth: "520px" } },
      h(Field, { label: "Name" }, h(Input, { value: name, onChange: (e) => setName(e.target.value) }), !name ? h(FieldHint, { status: "error" }, "Name is required") : null),
      h(Field, { label: "Email" }, h(Input, { type: "email", defaultValue: "vincent@diametral.io" })),
      h(Field, { label: "Role" }, h(Select, { options: ["Director", "Manager", "Consultant"] }))) },
    { id: "notif", label: "Notifications", content: h("div", { style: { paddingTop: "18px", display: "grid", gap: "14px", maxWidth: "520px" } },
      h("label", { className: "ds-input-row" }, h("span", null, "Email digests"), h(Switch, { defaultChecked: true })),
      h("label", { className: "ds-input-row" }, h("span", null, "Push alerts"), h(Switch, {}))) },
  ];
  return h(F, null,
    h("div", { className: "ph" }, "Settings"),
    h("div", { className: "psub" }, "Account preferences"),
    h(Tabs, { items }),
    h("div", { style: { marginTop: "22px", display: "flex", gap: "10px" } },
      h(Button, {}, "Cancel"),
      h(Button, { variant: "primary", onClick: () => toast.show({ type: "success", title: "Saved", message: "Your settings were updated." }) }, "Save changes")));
}
