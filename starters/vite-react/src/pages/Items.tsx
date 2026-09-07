import { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  PageHeader,
  DataTable,
  Tag,
  type ColumnDef,
} from "@diametral/design-system/react";

/* ---------------------------------------------------------------------------
   A tiny in-memory dataset stands in for your API. Swap `loadPage` below for a
   real `fetch(...)` that returns `{ rows, total }` and the table keeps working —
   it already passes you the page, page size, sort and column filters.
   --------------------------------------------------------------------------- */
type Item = {
  id: number;
  name: string;
  owner: string;
  status: "active" | "draft" | "archived";
  updated: string;
};

const STATUSES: Item["status"][] = ["active", "draft", "archived"];
const OWNERS = ["Vincent", "Amira", "Léo", "Sora", "Mateo"];

const DATA: Item[] = Array.from({ length: 128 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  owner: OWNERS[i % OWNERS.length],
  status: STATUSES[i % STATUSES.length],
  updated: new Date(Date.now() - i * 36e5).toISOString().slice(0, 10),
}));

const STATUS_TONE: Record<Item["status"], "success" | "info" | "warning"> = {
  active: "success",
  draft: "info",
  archived: "warning",
};

const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <Link to={`/items/${row.original.id}`}>{row.original.name}</Link>,
  },
  { accessorKey: "owner", header: "Owner" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Tag status={STATUS_TONE[row.original.status]}>{row.original.status}</Tag>
    ),
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) => (
      <span className="tabular-nums">{row.original.updated}</span>
    ),
  },
];

export default function Items() {
  // Local "server": filter → sort → paginate. Returns { rows, total }.
  const loadPage = useCallback(
    ({
      page,
      pageSize,
      sort,
      filters,
    }: {
      page: number;
      pageSize: number;
      sort: { id: string; desc: boolean }[];
      filters: { id: string; value: unknown }[];
    }) => {
      let rows = DATA.filter((row) =>
        filters.every(({ id, value }) =>
          String(row[id as keyof Item])
            .toLowerCase()
            .includes(String(value).toLowerCase())
        )
      );

      for (const { id, desc } of [...sort].reverse()) {
        rows = [...rows].sort((a, b) => {
          const av = a[id as keyof Item];
          const bv = b[id as keyof Item];
          const cmp = av < bv ? -1 : av > bv ? 1 : 0;
          return desc ? -cmp : cmp;
        });
      }

      const start = (page - 1) * pageSize;
      return Promise.resolve({
        rows: rows.slice(start, start + pageSize),
        total: rows.length,
      });
    },
    []
  );

  return (
    <>
      <PageHeader title="Items" subtitle="A server-style DataTable over local data." />
      <DataTable<Item>
        columns={columns}
        rowKey={(row) => String(row.id)}
        loadPage={loadPage}
        pageSize={10}
        searchColumn="name"
        columnToggle
      />
    </>
  );
}
