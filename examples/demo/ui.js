/* Shared render helpers for the demo views. */
import React from "react";
import { Tag, Progress } from "../../react/index.js";

export const h = React.createElement;
export const F = React.Fragment;
export const cx = (...a) => a.filter(Boolean).join(" ");

export const stageTag = (s) => h(Tag, { status: s === "Run" ? "success" : s === "Scale" ? "info" : null }, s);

export const progressCell = (v) => h("div", { className: "row", style: { gap: "8px" } },
  h("div", { style: { flex: 1 } }, h(Progress, { value: v })),
  h("span", { className: "ds-numeric", style: { fontSize: "12px", color: "var(--ds-ink-faint)", width: "38px", textAlign: "right" } }, v + "%"));

export const money = (n) => "€" + Number(n).toLocaleString("en-US");

export const statusTag = (s) => {
  const map = { Paid: "success", Pending: "warning", Overdue: "danger", Draft: null,
    Run: "success", Scale: "info", "On track": "success", "At risk": "warning", Blocked: "danger" };
  return h(Tag, { status: map[s] ?? null }, s);
};
