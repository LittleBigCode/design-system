/* Work views: Projects (→ project detail), Board. */
import { DataGrid, StatCard, Avatar, Button, Kanban, Tag } from "../../../react/index.js";
import { h, F, stageTag, progressCell } from "../ui.js";
import { loadProjects, TASKS, TASK_COLS } from "../data.js";

export function Projects({ go, select }) {
  const open = (r) => { select({ project: r }); go("project"); };
  const columns = [
    { key: "name", header: "Project", sortable: true, filterable: true,
      render: (r) => h("button", { onClick: () => open(r), className: "linklike" }, r.name) },
    { key: "client", header: "Client", sortable: true, filterable: true },
    { key: "owner", header: "Owner", render: (r) => h(Avatar, { initials: r.owner, size: "sm" }) },
    { key: "stage", header: "Stage", sortable: true, render: (r) => stageTag(r.stage) },
    { key: "progress", header: "Progress", width: "180px", render: (r) => progressCell(r.progress) },
    { key: "margin", header: "Margin %", sortable: true, align: "right", render: (r) => h("span", { className: "ds-numeric", style: { color: r.margin < 0 ? "var(--ds-danger)" : "var(--ds-success)" } }, r.margin + " %") },
    { key: "_open", header: "", width: "84px", render: (r) => h(Button, { size: "sm", onClick: () => open(r) }, "Open") },
  ];
  return h(F, null,
    h("div", { className: "ph" }, "Projects"),
    h("div", { className: "psub" }, "Delivery tracking — Discovery · Design · Build · Scale · Run"),
    h("div", { className: "grid4", style: { marginBottom: "20px" } },
      h(StatCard, { label: "On track", value: "71" }),
      h(StatCard, { label: "At risk", value: "9", delta: "2", deltaDir: "down" }),
      h(StatCard, { label: "Blocked", value: "6" }),
      h(StatCard, { label: "This quarter", value: "+12", deltaDir: "up" })),
    h(DataGrid, { title: "All projects", columns, loadPage: loadProjects, lazyMode: "pagination", pageSize: 8, selectable: true, filterable: true, expandable: true, editable: true, reorderable: true, onCellEdit: (r, k, v) => { r[k] = v; }, renderDetail: (r) => h("div", null, `${r.name} — ${r.client} · ${r.stage} · ${r.progress}% · margin ${r.margin}%`) }));
}

export function Board() {
  return h(F, null,
    h("div", { className: "ph" }, "Board"),
    h("div", { className: "psub" }, "Drag a card between columns to update its status."),
    h(Kanban, {
      columns: TASK_COLS, items: TASKS,
      renderCard: (t) => h("div", null,
        h("div", { className: "ds-kanban__card-title" }, t.title),
        h("div", { className: "ds-kanban__card-meta" }, h(Tag, null, t.tag), h(Avatar, { initials: t.who, size: "sm" }))),
    }));
}
