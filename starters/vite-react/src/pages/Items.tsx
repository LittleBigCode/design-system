import { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  PageHeader,
  DataGrid,
  Tag,
  type DataGridColumn,
  type LoadPageArgs,
  type LoadPageResult,
} from "@diametral/design-system/react";

/* ---------------------------------------------------------------------------
   A tiny in-memory dataset stands in for your API. Swap `loadPage` below for a
   real `fetch(...)` that returns `{ rows, total }` and the grid keeps working —
   it already passes you the page, page size, sort and filters.
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

const columns: DataGridColumn<Item>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    filterable: true,
    render: (row) => <Link to={`/items/${row.id}`}>{row.name}</Link>,
  },
  { key: "owner", header: "Owner", sortable: true, filterable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => <Tag status={STATUS_TONE[row.status]}>{row.status}</Tag>,
  },
  { key: "updated", header: "Updated", sortable: true, align: "right" },
];

export default function Items() {
  // Local "server": filter → sort → paginate. Returns { rows, total }.
  const loadPage = useCallback(
    ({ page, pageSize, sort, filters }: LoadPageArgs): LoadPageResult<Item> => {
      let rows = DATA.filter((row) =>
        Object.entries(filters).every(([key, value]) =>
          String(row[key as keyof Item])
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      );

      if (sort) {
        const { key, dir } = sort;
        rows = [...rows].sort((a, b) => {
          const av = a[key as keyof Item];
          const bv = b[key as keyof Item];
          const cmp = av < bv ? -1 : av > bv ? 1 : 0;
          return dir === "asc" ? cmp : -cmp;
        });
      }

      const start = (page - 1) * pageSize;
      return { rows: rows.slice(start, start + pageSize), total: rows.length };
    },
    []
  );

  return (
    <>
      <PageHeader title="Items" subtitle="A server-style DataGrid over local data." />
      <DataGrid<Item>
        columns={columns}
        rowKey={(row) => row.id}
        loadPage={loadPage}
        pageSize={10}
        filterable
        columnToggle
      />
    </>
  );
}
