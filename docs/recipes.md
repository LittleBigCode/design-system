# Recipes

End-to-end recipes for **building a whole screen** with the Diametral React layer —
the layer *above* individual components. Each recipe wires real components, hooks,
and the form/data helpers into a copy-pasteable starting point.

## Recipes vs. components vs. blocks

The system has three altitudes, and this page sits at the top of the stack:

| Altitude | What it is | Where it lives |
|---|---|---|
| **Components** | One widget with a typed prop API — `Button`, `DataGrid`, `Drawer`, `StatCard`, `LineChart`. The atoms. | [components.md](components.md) · [react.md](react.md) · `examples/components/*` |
| **Blocks** | A small composition that solves one sub-problem — a validated `FormField` row, a `PageHeader` with actions, a four-state data view. The molecules. | [forms.md](forms.md) · [data.md](data.md) |
| **Recipes** | A *whole screen* assembled from blocks: an app shell, a CRUD list+detail, a dashboard, an auth gate. The organisms. | **this page** · the live [demo app](../examples/demo/app.js) |

Components answer *"what does a `Drawer` accept?"*; recipes answer *"how do I build a
list where clicking a row opens an edit drawer?"*. Everything below uses the real,
shipped APIs — the same ones the [live demo](../examples/demo.html) dogfoods.

Load the stylesheet once at your app root (every recipe assumes it):

```js
import "@diametral/design-system/css/diametral.css";
```

---

## 1. App shell

Wrap your whole router in [`<ConsoleLayout>`](../react/components/ConsoleLayout.d.ts):
a left sidebar built from a **grouped nav config**, a ⌘K command palette, an optional
Light/Dark/Sepia theme switcher, and a user avatar with sign-out. Your routed content
is the `children`.

The key idea is that **one nav config drives three things**: the sidebar buttons, the
`active` highlight, and — by default — the ⌘K palette (one "Go to" command per nav
item). Point `onNavigate(id)` at your router and you are done.

```jsx
import { ConsoleLayout, Badge, Button } from "@diametral/design-system/react";

// Grouped sidebar nav. `group` labels the section; each item needs an `id` + `label`
// (and an optional `badge`). This is the single source of truth for the sidebar.
const NAV = [
  { group: "Work", items: [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "reports",  label: "Reports" },
  ] },
  { group: "Talent", items: [
    { id: "candidates", label: "Candidates", badge: 7 },
    { id: "team",       label: "Team" },
  ] },
  { group: "Workspace", items: [
    { id: "inbox",    label: "Inbox", badge: 2 },
    { id: "settings", label: "Settings" },
  ] },
];

export function Shell({ route, navigate, onSignOut, children }) {
  return (
    <ConsoleLayout
      brand={{ name: "Diametral", sub: "Console" }}   // or pass any ReactNode wordmark
      nav={NAV}
      active={route}                                  // highlights the matching item
      onNavigate={navigate}                           // fired with the chosen item id
      user={{ initials: "VD", name: "Vincent", onSignOut }}
      themes                                          // Light/Dark/Sepia switcher on <html>
      searchPlaceholder="Search projects, people…"
      actions={<><Badge variant="accent">Production</Badge>
                 <Button variant="primary" onClick={() => navigate("projects")}>New</Button></>}
    >
      {children}
    </ConsoleLayout>
  );
}
```

**Deriving ⌘K commands.** Leave `commands` off and you get one "Go to" entry per nav
item for free. Pass `commands` to add app actions (and a "Sign out") on top — the
shape is `{ id, label, group?, hint?, onRun }`:

```jsx
const FLAT = NAV.flatMap((g) => g.items);
const commands = [
  ...FLAT.map((n) => ({ id: n.id, label: n.label, group: "Go to", onRun: () => navigate(n.id) })),
  { id: "new-project", label: "New project", group: "Actions", hint: "C", onRun: () => navigate("projects") },
  { id: "signout",     label: "Sign out",    group: "Actions", onRun: onSignOut },
];
// …then <ConsoleLayout commands={commands} … />
```

Wire `active` / `onNavigate` to whatever router you use — a `useState` route (as the
demo does), React Router's `useLocation` + `useNavigate`, Next's `usePathname` +
`router.push`, etc. `ConsoleLayout` is a **full-page** shell, so render exactly one,
at the root of the authenticated app.

---

## 2. CRUD list + detail

A [`<DataGrid loadPage>`](../react/components/DataGrid.d.ts) list whose rows open a
[`<Drawer>`](../react/components/Drawer.d.ts) holding a validated form. The form layer
is [`useForm`](forms.md) + [`FormField`](../react/components/FormField.js): `useForm`
holds values/errors and hands you a `register(name)` spread plus a `handleSubmit`, and
each `FormField` renders a labelled row with the matching inline error.

The grid owns paging/sorting/filtering via `loadPage` (build one from a REST endpoint
with [`restLoadPage`](data.md)); the drawer owns create/edit; deleting is a row action.

```jsx
import { useState } from "react";
import {
  DataGrid, Drawer, useForm, FormField,
  Input, Select, Button, Toolbar,
} from "@diametral/design-system/react";
import { restLoadPage } from "@diametral/design-system/react/hooks/restLoadPage";

const STATUS = [
  { value: "draft",    label: "Draft" },
  { value: "active",   label: "Active" },
  { value: "archived", label: "Archived" },
];
const EMPTY = { name: "", status: "draft", owner: "" };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Name is required";
  if (!v.owner.trim()) e.owner = "Pick an owner";
  return e; // {} === valid
}

export function Projects() {
  const [editing, setEditing] = useState(null); // null = closed; {} = create; row = edit
  const [reloadKey, setReloadKey] = useState(0); // bump to force the grid to refetch

  const columns = [
    { key: "name",   header: "Name",   sortable: true, filterable: true },
    { key: "status", header: "Status", render: (r) => STATUS.find((s) => s.value === r.status)?.label },
    { key: "owner",  header: "Owner" },
    {
      key: "_actions", header: "", align: "right", width: 96,
      render: (r) => (
        <Button size="sm" variant="danger"
          onClick={async (ev) => {
            ev.stopPropagation();           // don't also open the drawer
            await fetch(`/api/projects/${r.id}`, { method: "DELETE" });
            setReloadKey((k) => k + 1);
          }}>Delete</Button>
      ),
    },
  ];

  return (
    <>
      <Toolbar>
        <Button variant="primary" onClick={() => setEditing({ ...EMPTY })}>New project</Button>
      </Toolbar>

      <DataGrid
        key={reloadKey}                      // remount → loadPage runs again after a write
        columns={columns}
        pageSize={20}
        filterable
        rowKey={(r) => r.id}
        loadPage={restLoadPage("/api/projects")}
        emptyMessage="No projects match your filters."
        expandable={(row) => /* row click → open the edit drawer */ (setEditing(row), null)}
      />

      <ProjectDrawer
        record={editing}
        onClose={() => setEditing(null)}
        onSaved={() => { setEditing(null); setReloadKey((k) => k + 1); }}
      />
    </>
  );
}

// One drawer handles both create (record === {}) and edit (record has an id).
function ProjectDrawer({ record, onClose, onSaved }) {
  const isEdit = !!record?.id;
  const form = useForm({ initialValues: record ?? EMPTY, validate });

  const submit = form.handleSubmit(async (values) => {
    await fetch(isEdit ? `/api/projects/${record.id}` : "/api/projects", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    onSaved();
  });

  return (
    <Drawer
      open={record != null}
      onClose={onClose}
      heading={isEdit ? "Edit project" : "New project"}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={submit} loading={form.isSubmitting}>
            {isEdit ? "Save changes" : "Create project"}
          </Button>
        </>
      }
    >
      <form onSubmit={submit} noValidate>
        <FormField label="Name" htmlFor="p-name" error={form.errors.name}>
          <Input id="p-name" {...form.register("name")} />
        </FormField>
        <FormField label="Status" htmlFor="p-status" error={form.errors.status}>
          <Select id="p-status" options={STATUS} {...form.register("status")} />
        </FormField>
        <FormField label="Owner" htmlFor="p-owner" error={form.errors.owner}>
          <Input id="p-owner" {...form.register("owner")} />
        </FormField>
      </form>
    </Drawer>
  );
}
```

Notes that keep this honest:

- **One drawer, two modes.** `record === {}` (create) vs. `record.id` (edit). `useForm`
  seeds from `record` via `initialValues`. Because the drawer only mounts the form when
  it is open, switching rows re-seeds cleanly; if you keep it mounted, call
  `form.reset(nextRecord)` when `record` changes.
- **Submit lives in the footer.** The footer `Button` calls the same `submit` handler
  and shows `form.isSubmitting`; the `<form onSubmit>` makes Enter work too.
- **Refetching after writes.** `DataGrid` reloads on page/sort/filter changes; after a
  create/edit/delete, bump a `key` (or any state in the `loadPage` closure) to force a
  fresh fetch. Stop row-click propagation on the delete button so it doesn't also open
  the drawer.

---

## 3. Dashboard

A row of [`StatCard`](../react/components/StatCard.d.ts)s over a chart
([`LineChart`](../react/components/LineChart.d.ts) /
[`DonutChart`](../react/components/DonutChart.d.ts)). `StatCard` takes a `label`,
`value`, and a signed `delta` (`deltaDir` colors it and prepends ▲/▼); drop a
`Sparkline` in as its `children` for an inline trend.

```jsx
import {
  StatCard, Sparkline, LineChart, DonutChart,
  Card, PageHeader,
} from "@diametral/design-system/react";

export function Dashboard() {
  return (
    <>
      <PageHeader title="Overview" subtitle="Last 30 days" />

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <StatCard label="Revenue" value="€128.4k" delta="+12.5%" deltaDir="up">
          <Sparkline data={[8, 9, 7, 11, 10, 13, 15]} fill />
        </StatCard>
        <StatCard label="Active projects" value="42" delta="+3" deltaDir="up" />
        <StatCard label="Churn" value="1.8%" delta="-0.4 pts" deltaDir="down" />
        <StatCard label="Avg. margin" value="34%" delta="+1.2 pts" deltaDir="up" />
      </div>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "2fr 1fr", marginTop: 16 }}>
        <Card title="Revenue trend">
          <LineChart
            height={220}
            labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
            series={[
              { name: "2026", data: [82, 91, 88, 104, 118, 128] },
              { name: "2025", data: [70, 74, 77, 81, 86, 92] },
            ]}
          />
        </Card>
        <Card title="Revenue by segment">
          <DonutChart
            centerLabel="€128k"
            data={[
              { label: "Enterprise", value: 64 },
              { label: "Mid-market", value: 41 },
              { label: "SMB",        value: 23 },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
```

`StatCard` deltas are colored by `deltaDir`, not by parsing the string — pass
`"up"`/`"down"` to match the sign of your change. Charts default the series colors from
the shared palette, so a single-series `LineChart` needs only `data={[…]}`.

---

## 4. Loading / empty / error

Every async view should resolve to exactly one of four states, rendered in priority
order so the user always sees the most specific signal first. The
[data layer](data.md) gives you [`useResource`](../react/hooks/useResource.js) (track
`{ data, error, loading, reload }`) and the trio
[`Skeleton`](../react/components/Skeleton.d.ts) /
[`EmptyState`](../react/components/EmptyState.d.ts) /
[`Alert`](../react/components/Alert.d.ts).

```jsx
import { useResource } from "@diametral/design-system/react/hooks/useResource";
import { Skeleton, EmptyState, Alert, Button } from "@diametral/design-system/react";

export function ProjectList({ query }) {
  const { data, error, loading, reload } = useResource(
    () => fetch(`/api/projects?q=${encodeURIComponent(query)}`).then((r) => r.json()),
    [query] // re-runs whenever the search changes
  );

  // 1. loading — placeholder bars where content will land
  if (loading) return <Skeleton count={5} />;

  // 2. error — danger status + retry
  if (error) return (
    <Alert type="danger">
      Couldn’t load projects. <Button onClick={reload}>Retry</Button>
    </Alert>
  );

  // 3. empty — friendly "nothing here yet"
  if (!data || data.length === 0) return (
    <EmptyState
      title="No projects yet"
      description="Projects you create will show up here."
      actions={<Button variant="primary">New project</Button>}
    />
  );

  // 4. data — the actual content
  return (
    <ul>{data.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
  );
}
```

Branch in that priority: `loading` → `error` → empty (`!data || data.length === 0`) →
data. Don't show a spinner *and* stale data, and don't flash the empty state while the
first request is still in flight. For **tables**, skip this hand-rolling entirely — give
`<DataGrid>` a `loadPage` (see recipe 2) and it owns its own loading/empty states; set
the empty copy with the grid's `emptyMessage` prop.

---

## 5. Auth gate

Render a sign-in screen until the user is authenticated, then mount the
[app shell](#1-app-shell) (recipe 1). The shell's `user.onSignOut` flips the flag back.
The design system ships a **sign-in template** at
[`examples/templates/login.html`](../examples/templates/login.html) — in React, build
the same screen from DS components (`Card` + `FormField`/`Field` + `Input` + `Button`),
exactly as the [demo app](../examples/demo/app.js) does.

```jsx
import { useState } from "react";
import {
  Card, Wordmark, FormField, Input, Button, ToastProvider,
} from "@diametral/design-system/react";
import { Shell } from "./Shell.jsx"; // recipe 1

function Login({ onSignIn }) {
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await signIn(/* read form fields */); onSignIn(); }
    finally { setLoading(false); }
  };
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <form onSubmit={submit} style={{ width: 360, maxWidth: "100%" }}>
        <Card>
          <div style={{ padding: "26px 24px" }}>
            <Wordmark name="Diametral" />
            <h1 className="ds-title ds-title--lg" style={{ margin: "16px 0 4px" }}>Sign in</h1>
            <p style={{ color: "var(--ds-ink-soft)", margin: "0 0 20px" }}>Welcome back to the Console.</p>
            <FormField label="Email" htmlFor="email">
              <Input id="email" type="email" autoComplete="email" required />
            </FormField>
            <FormField label="Password" htmlFor="password">
              <Input id="password" type="password" autoComplete="current-password" required />
            </FormField>
            <Button type="submit" variant="primary" block loading={loading}>Sign in</Button>
          </div>
        </Card>
      </form>
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);
  // ToastProvider at the root so any screen can raise toasts.
  return (
    <ToastProvider>
      {authed
        ? <Shell route="overview" navigate={() => {}} onSignOut={() => setAuthed(false)}>
            {/* routed content */}
          </Shell>
        : <Login onSignIn={() => setAuthed(true)} />}
    </ToastProvider>
  );
}
```

Keep the gate at the very top of the tree (above the router) so unauthenticated users
never mount shell-only code. Swap the `authed` boolean for your real session check
(a context value, a SWR/React-Query session query, a cookie probe) — the structure
stays the same: **`<Login>` until authenticated, then `<Shell>`**.

---

## See also

- [react.md](react.md) — the React layer overview and the full component list.
- [forms.md](forms.md) · [data.md](data.md) — the form and data blocks these recipes lean on.
- [components.md](components.md) — every component, at a glance.
- The live [demo app](../examples/demo.html) ([source](../examples/demo/app.js)) — a real
  console that dogfoods every recipe on this page.
