import React from "react";
const { useState } = React;
import { h, F } from "../ui.js";
import {
  Toolbar,
  DateRangePicker,
  Select,
  StatCard,
  Card,
  BarChart,
  Gauge,
  LineChart,
  PieChart,
} from "../../../dist/react/index.js";
import {
  PageHeader,
} from "../compat.js";
import { FUNNEL, UTIL_BY_DEPT, ENTITY_SPLIT, MARGIN_TREND, MONTHS } from "../data.js";

const ENTITY_OPTS = [
  { value: "all", label: "All entities" },
  { value: "LBC_FR", label: "LBC_FR" },
  { value: "LBC_BE", label: "LBC_BE" },
  { value: "LBC_US", label: "LBC_US" },
  { value: "LBC_CH", label: "LBC_CH" },
];

/* The charts take a `config` — one entry per series or slice, keyed by the field
   name in the row — plus recharts rows. An entry with no colour takes the next
   slot of the --ds-chart-* ramp, which is what keeps a chart on-brand for free. */
const FUNNEL_CONFIG = { value: { label: "Deals" } };
const MARGIN_CONFIG = { margin: { label: "Margin %" } };
const MARGIN_ROWS = MARGIN_TREND[0].data.map((margin, i) => ({ month: MONTHS[i], margin }));
const ENTITY_CONFIG = Object.fromEntries(ENTITY_SPLIT.map((d) => [d.label, { label: d.label }]));

const STATS = [
  { label: "Win rate", value: "21 %" },
  { label: "Avg margin", value: "24.6 %" },
  { label: "Utilization", value: "79 %" },
  { label: "Pipeline", value: "€4.5M" },
];

export function Reports() {
  const [entity, setEntity] = useState("all");
  return h(F, null,
    h(PageHeader, {
      title: "Reports",
      subtitle: "Portfolio analytics · Q2 2026",
      actions: h(Toolbar, null,
        h(DateRangePicker, { defaultValue: { start: "2026-04-01", end: "2026-06-30" } }),
        h(Select, { options: ENTITY_OPTS, value: entity, onChange: (e) => setEntity(e.target.value) })),
    }),
    h("div", { className: "ds-statgrid", style: { marginTop: "16px" } },
      STATS.map((s) => h("div", { key: s.label, className: "ds-statgrid__cell" },
        h("div", { className: "ds-statgrid__label" }, s.label),
        h("div", { className: "ds-statgrid__value ds-numeric" }, s.value)))),
    h("div", { className: "grid-2", style: { marginTop: "16px" } },
      h(Card, { title: "Sales funnel" }, h("div", { className: "card-pad" },
        h(BarChart, { config: FUNNEL_CONFIG, data: FUNNEL, xAxisKey: "stage" }))),
      h(Card, { title: "Margin trend" }, h("div", { className: "card-pad" },
        h(LineChart, { config: MARGIN_CONFIG, data: MARGIN_ROWS, xAxisKey: "month" })))),
    h("div", { className: "grid-2", style: { marginTop: "16px" } },
      h(Card, { title: "Revenue by entity" }, h("div", { className: "card-pad", style: { display: "grid", placeItems: "center" } },
        h(PieChart, { config: ENTITY_CONFIG, data: ENTITY_SPLIT, valueKey: "value", nameKey: "label" }))),
      h(Card, { title: "Utilization by dept" }, h("div", { className: "card-pad", style: { display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-around" } },
        UTIL_BY_DEPT.map((d) => h(Gauge, { key: d.label, value: d.value, label: d.label, size: 150 }))))));
}
