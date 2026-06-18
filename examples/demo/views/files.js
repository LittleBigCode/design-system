import React from "react";
const { useState } = React;
import { h, F } from "../ui.js";
import {
  PageHeader, Button, FileUpload, Tag, Avatar, Dropdown, MenuItem,
  MenuDivider, Drawer, DescriptionList,
} from "../../../react/index.js";
import { FILES } from "../data.js";

const TYPE_STATUS = { PDF: "danger", Sheet: "success", Image: "info", Doc: "info", Markdown: null };

export function Files() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const openFile = (f) => { setSelected(f); setOpen(true); };
  const close = () => setOpen(false);

  return h(F, null,
    h(PageHeader, {
      title: "Files",
      subtitle: "Documents & assets",
      actions: h(Button, { variant: "primary" }, "Upload"),
    }),

    h("div", { style: { margin: "20px 0 24px" } },
      h(FileUpload, {
        multiple: true,
        hint: h(F, null, h("strong", null, "Click to upload"), " or drag and drop"),
        onFiles: () => {},
      })),

    h("table", { className: "ds-table ds-table--hover" },
      h("thead", null,
        h("tr", null,
          h("th", null, "Name"),
          h("th", null, "Type"),
          h("th", { className: "ds-table__num" }, "Size"),
          h("th", null, "Owner"),
          h("th", null, "Modified"),
          h("th", { style: { width: "1%" }, "aria-label": "Actions" }))),
      h("tbody", null,
        FILES.map((f) =>
          h("tr", { key: f.id },
            h("td", { className: "ds-table__name" },
              h("a", {
                href: "#",
                onClick: (e) => { e.preventDefault(); openFile(f); },
              }, f.name)),
            h("td", null, h(Tag, { status: TYPE_STATUS[f.type] ?? null }, f.type)),
            h("td", { className: "ds-table__num ds-numeric" }, f.size),
            h("td", null, h("div", { className: "row" }, h(Avatar, { size: "sm", initials: f.owner }), f.owner)),
            h("td", null, f.modified),
            h("td", { className: "ds-table__num" },
              h(Dropdown, {
                align: "end",
                trigger: h(Button, { className: "ds-table__row-action", "aria-label": "File actions" }, "⋯"),
              },
                h(MenuItem, { onClick: () => openFile(f) }, "Download"),
                h(MenuItem, { onClick: () => openFile(f) }, "Rename"),
                h(MenuDivider, null),
                h(MenuItem, { danger: true, onClick: () => {} }, "Delete")))))) ),

    h(Drawer, {
      open,
      onClose: close,
      placement: "right",
      heading: selected ? selected.name : "File",
      footer: h(F, null,
        h(Button, { onClick: close }, "Close"),
        h("span", { className: "ds-drawer__spacer" }),
        h(Button, { variant: "primary" }, "Download")),
    },
      selected
        ? h(DescriptionList, { items: [
            { term: "Name", desc: selected.name },
            { term: "Type", desc: h(Tag, { status: TYPE_STATUS[selected.type] ?? null }, selected.type) },
            { term: "Size", desc: h("span", { className: "ds-numeric" }, selected.size) },
            { term: "Owner", desc: h("div", { className: "row" }, h(Avatar, { size: "sm", initials: selected.owner }), selected.owner) },
            { term: "Modified", desc: selected.modified },
          ] })
        : null));
}
