import React from "react";
const { useState } = React;
import { h, F } from "../ui.js";
import {
  PageHeader, Toolbar, DateRangePicker, Select, StatCard, Card,
  BarChart, StackedBar, GaugeChart, LineChart, PieChart, DonutChart,
} from "../../../react/index.js";
import { FUNNEL, UTIL_BY_DEPT, ENTITY_SPLIT, MARGIN_TREND, MONTHS } from "../data.js";

const ENTITY_OPTS = [
  { value: "all", label: "All entities" },
  { value: "LBC_FR", label: "LBC_FR" },
  { value: "LBC_BE", label: "LBC_BE" },
  { value: "LBC_US", label: "LBC_US" },
  { value: "LBC_CH", label: "LBC_CH" },
];

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
        h(BarChart, { data: FUNNEL.map((d) => ({ label: d.stage, value: d.value })) }))),
      h(Card, { title: "Margin trend" }, h("div", { className: "card-pad" },
        h(LineChart, { series: MARGIN_TREND, labels: MONTHS, width: 640, height: 240 })))),
    h("div", { className: "grid-2", style: { marginTop: "16px" } },
      h(Card, { title: "Revenue by entity" }, h("div", { className: "card-pad", style: { display: "grid", placeItems: "center" } },
        h(PieChart, { data: ENTITY_SPLIT, size: 200 }))),
      h(Card, { title: "Utilization by dept" }, h("div", { className: "card-pad", style: { display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-around" } },
        UTIL_BY_DEPT.map((d) => h(GaugeChart, { key: d.label, value: d.value, label: d.label, size: 150 }))))));
}
