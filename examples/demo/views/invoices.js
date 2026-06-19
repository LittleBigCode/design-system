/* Invoices: billing overview + lazy grid with a per-row detail drawer. */
import React from "react";
const { useState } = React;
import { h, F, money, statusTag } from "../ui.js";
import {
  PageHeader, Button, StatCard, Card, BarChart, Timeline,
  DataGrid, Drawer, DescriptionList,
} from "../../../react/index.js";
import { REVENUE_BARS } from "../data.js";
import { jsonLoadPage } from "../api.js";

// Datatable backed by a static JSON through the demo API (fetch + client-side
// filter/sort/paginate). The DataGrid shows skeleton rows while it loads.
const loadInvoicesPage = jsonLoadPage("invoices.json");

const PAYMENTS = [
  { time: "Today 10:42", title: "Acme — INV-2026-1012", body: "€48,200 received via SEPA.", status: "success" },
  { time: "Today 08:15", title: "Globex — INV-2026-1007", body: "€31,750 received via card.", status: "success" },
  { time: "Yesterday", title: "Stark — INV-2026-1003", body: "Partial payment €12,000 of €40,000.", status: "info" },
  { time: "Mon", title: "Wayne — INV-2026-1031", body: "€27,400 received via wire.", status: "success" },
];

export function Invoices() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const view = (r) => { setSelected(r); setOpen(true); };
  const close = () => setOpen(false);

  const columns = [
    { key: "number", header: "Number", sortable: true, filterable: true },
    { key: "client", header: "Client", sortable: true, filterable: true },
    { key: "amount", header: "Amount", sortable: true, align: "right",
      render: (r) => h("span", { className: "ds-numeric" }, money(r.amount)) },
    { key: "status", header: "Status", sortable: true, render: (r) => statusTag(r.status) },
    { key: "due", header: "Due", sortable: true },
    { key: "_view", header: "", width: "84px",
      render: (r) => h(Button, { size: "sm", onClick: () => view(r) }, "View") },
  ];

  return h(F, null,
    h(PageHeader, {
      title: "Invoices",
      subtitle: "Billing & payments",
      actions: h(Button, { variant: "primary" }, "New invoice"),
    }),

    h("div", { className: "grid4", style: { margin: "20px 0 24px" } },
      h(StatCard, { label: "Outstanding", value: "€184k" }),
      h(StatCard, { label: "Paid (MTD)", value: "€312k", deltaDir: "up" }),
      h(StatCard, { label: "Overdue", value: "€42k", delta: "5", deltaDir: "up" }),
      h(StatCard, { label: "Avg days to pay", value: "34" })),

    h("div", { className: "grid-2", style: { marginBottom: "24px" } },
      h(Card, { title: "Revenue" },
        h("div", { className: "psub", style: { marginBottom: "12px" } },
          "Billed revenue per month (€k)."),
        h(BarChart, { data: REVENUE_BARS, style: { width: "100%", height: "220px" } })),
      h(Card, { title: "Recent payments" },
        h(Timeline, { items: PAYMENTS }))),

    h(DataGrid, {
      title: "All invoices",
      columns,
      loadPage: loadInvoicesPage,
      lazyMode: "pagination",
      pageSize: 8,
      filterable: true,
    }),

    h(Drawer, {
      open, onClose: close, placement: "right",
      heading: selected ? selected.number : "Invoice",
      footer: h("div", { className: "row", style: { gap: "8px", justifyContent: "flex-end" } },
        h(Button, { onClick: close }, "Close"),
        h(Button, { variant: "primary", onClick: close }, "Send reminder")),
    },
      selected ? h(DescriptionList, { items: [
        { term: "Number", desc: selected.number },
        { term: "Client", desc: selected.client },
        { term: "Amount", desc: h("span", { className: "ds-numeric" }, money(selected.amount)) },
        { term: "Status", desc: statusTag(selected.status) },
        { term: "Due date", desc: selected.due },
      ] }) : null));
}
