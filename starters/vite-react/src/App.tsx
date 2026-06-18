import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  ConsoleLayout,
  Badge,
  Button,
  type ConsoleNavGroup,
} from "@diametral/design-system/react";

import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import ItemDetail from "./pages/ItemDetail";
import Login from "./pages/Login";

/* ---------------------------------------------------------------------------
   Navigation model
   ---------------------------------------------------------------------------
   One source of truth: each entry has the ConsoleLayout nav `id` plus the
   route `path` it maps to. The sidebar (`nav`), the active-item highlight and
   `onNavigate` all derive from this. Add a page = add a line here + a <Route>.
   --------------------------------------------------------------------------- */
type NavEntry = { id: string; path: string };

const ROUTES: NavEntry[] = [
  { id: "dashboard", path: "/" },
  { id: "items", path: "/items" },
];

const NAV: ConsoleNavGroup[] = [
  {
    group: "Overview",
    items: [{ id: "dashboard", label: "Dashboard" }],
  },
  {
    group: "Manage",
    items: [{ id: "items", label: "Items", badge: 128 }],
  },
];

/** Pick the nav id whose path best matches the current location. */
function activeId(pathname: string): string {
  // Longest matching path wins so "/items/42" still highlights "items".
  const match = [...ROUTES]
    .sort((a, b) => b.path.length - a.path.length)
    .find((r) => (r.path === "/" ? pathname === "/" : pathname.startsWith(r.path)));
  return match?.id ?? "dashboard";
}

function Shell({ onSignOut }: { onSignOut: () => void }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onNavigate = (id: string) => {
    const entry = ROUTES.find((r) => r.id === id);
    if (entry) navigate(entry.path);
  };

  return (
    <ConsoleLayout
      brand={{ name: "Diametral", sub: "Starter" }}
      nav={NAV}
      active={activeId(pathname)}
      onNavigate={onNavigate}
      themes
      searchPlaceholder="Search the app…"
      user={{ initials: "VD", name: "Vincent Devillers", onSignOut }}
      actions={
        <>
          <Badge variant="accent">Demo</Badge>
          <Button variant="primary" onClick={() => navigate("/items")}>
            New item
          </Button>
        </>
      }
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </ConsoleLayout>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);

  if (!authed) return <Login onSignIn={() => setAuthed(true)} />;
  return <Shell onSignOut={() => setAuthed(false)} />;
}
