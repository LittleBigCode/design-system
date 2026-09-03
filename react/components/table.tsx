"use client"

import * as React from "react"

import { cx } from "../lib/cx.js"

/* Table — the composed data table.
   ---------------------------------------------------------------------------
   New to the package: 0.11 shipped table.css and nothing that rendered it, so
   there is no incumbent symbol here to replace. `DataGrid` is the other table
   in this library and stays what it is — sorting, selection, editing, its own
   state. This one is the markup, for a table whose rows a caller writes.

   `<Table>` wraps itself in a scroll container, which is where the horizontal
   overflow lives; that container is also what tells table.css to drop the 0.11
   frame, so the hand-written `.ds-table` fixtures keep their box.

   The source kept `text-start` a literal Tailwind class on TableHead for a
   tailwind-merge dedupe. Baked into .ds-table-head. */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="ds-table-container">
      <table data-slot="table" className={cx("ds-table", className)} {...props} />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cx("ds-table-header", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cx("ds-table-body", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cx("ds-table-footer", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cx("ds-table-row", className)}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cx("ds-table-head", className)}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cx("ds-table-cell", className)}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cx("ds-table-caption", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}