# Data layer

A small set of helpers for wiring tables and async data to the design system
with **consistent loading / empty / error / data states**. They live in
[`react/hooks/`](../react/hooks/), are plain-JS ES modules (no build step), and
ship hand-written TypeScript types.

- [`useResource(fetcher, deps?)`](../react/hooks/useResource.js) — run an async
  fetcher and track `{ data, error, loading, reload }`.
- [`restLoadPage(baseUrl, options?)`](../react/hooks/restLoadPage.js) — turn a
  REST endpoint into a [`<DataGrid loadPage>`](../react/components/DataGrid.d.ts)
  function that resolves `{ rows, total }`.

## The four-state convention

Every async view resolves to exactly one of four states. Render them in this
order so the user always sees the most specific signal first:

| State       | What to show                              | Component                              |
| ----------- | ----------------------------------------- | -------------------------------------- |
| **loading** | placeholder bars where content will land  | [`Skeleton`](../react/components/Skeleton.d.ts) |
| **error**   | a `danger` status message + retry         | [`Alert`](../react/components/Alert.d.ts) |
| **empty**   | a friendly "nothing here yet" panel       | [`EmptyState`](../react/components/EmptyState.d.ts) |
| **data**    | the actual content                        | your view                              |

Branch in that priority: `loading` → `error` → empty (`!data || data.length === 0`)
→ data. Don't show a spinner *and* stale data, and don't flash an empty state
while the first request is still in flight.

### Props at a glance

- **`Skeleton`** — `variant` (`"text" | "line" | "circle" | "block"`),
  `width`, `height`, `count` (render N stacked lines).
- **`Alert`** — `type` (`"info" | "success" | "warning" | "danger"`),
  `dismissible`, `onDismiss`, `icon`, `app`.
- **`EmptyState`** — `icon`, `title`, `description`, `actions`.

## `useResource`

`useResource(fetcher, deps = [])` runs `await fetcher()` on mount and again
whenever `deps` change. It returns:

- `data` — the resolved value (or `undefined` until the first success),
- `error` — the thrown/rejected value (or `null`),
- `loading` — `true` while a run is in flight,
- `reload()` — re-run the fetcher on demand (returns the run's promise).

It guards against `setState`-after-unmount and ignores out-of-order responses,
so a slow earlier request can never clobber a newer one.

```jsx
import { useResource } from "@diametral/design-system/react/hooks/useResource";
import { Skeleton, Alert, EmptyState, Button } from "@diametral/design-system/react";

function ItemList() {
  const { data, error, loading, reload } = useResource(
    () => fetch("/api/items").then((r) => r.json()),
    [] // re-runs when these change
  );

  // 1. loading
  if (loading) return <Skeleton count={5} />;

  // 2. error
  if (error)
    return (
      <Alert type="danger">
        Couldn’t load items. <Button onClick={reload}>Retry</Button>
      </Alert>
    );

  // 3. empty
  if (!data || data.length === 0)
    return (
      <EmptyState
        title="No items yet"
        description="Items you create will show up here."
        actions={<Button variant="primary">New item</Button>}
      />
    );

  // 4. data
  return (
    <ul>
      {data.map((it) => (
        <li key={it.id}>{it.name}</li>
      ))}
    </ul>
  );
}
```

Pass `deps` to refetch on input changes — e.g. a search box:

```jsx
const { data, loading } = useResource(
  () => fetch(`/api/items?q=${encodeURIComponent(query)}`).then((r) => r.json()),
  [query]
);
```

## `restLoadPage` + `<DataGrid>`

For tables, let `<DataGrid>` own the loading/empty states and just give it a
`loadPage` function. `restLoadPage(baseUrl, options)` builds one from a
json-server-style endpoint. The returned function receives
`{ page, pageSize, sort, filters }` from the grid and fetches:

```
${baseUrl}?_page=${page}&_limit=${pageSize}
  &_sort=<sort.key>&_order=<sort.dir>     // when a column is sorted
  &<name>=<value>                          // one param per non-empty filter
```

It resolves `{ rows, total }` — `total` is read from the `X-Total-Count`
response header (so the pager knows the full count beyond the current page),
falling back to the returned array's length when the header is absent.

```jsx
import { DataGrid } from "@diametral/design-system/react";
import { restLoadPage } from "@diametral/design-system/react/hooks/restLoadPage";

const columns = [
  { key: "name", header: "Name", sortable: true, filterable: true },
  { key: "price", header: "Price", align: "right", sortable: true },
];

function ItemsTable() {
  return (
    <DataGrid
      columns={columns}
      pageSize={20}
      filterable
      loadPage={restLoadPage("/api/items")}
      emptyMessage="No items match your filters."
    />
  );
}
```

The grid calls `loadPage` on mount and whenever the page, sort, or filters
change. Set the empty copy with the grid's own `emptyMessage` prop; it renders
while `rows` is empty.

### Options

`restLoadPage(baseUrl, options)` accepts:

- `totalHeader` — header carrying the unfiltered total. Default `"X-Total-Count"`.
- `fetchOptions` — forwarded to `fetch` (e.g. `headers`, `credentials`, `signal`).
- `pageParam` / `limitParam` / `sortParam` / `orderParam` — override the query
  param names (defaults `_page` / `_limit` / `_sort` / `_order`).

```jsx
loadPage={restLoadPage("/api/items", {
  totalHeader: "X-Total",
  fetchOptions: { credentials: "include" },
})}
```
