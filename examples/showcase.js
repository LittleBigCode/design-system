/* ============================================================================
   Showcase behavior (showcase-only — not part of the product).
   Renders the nav rail (kept here so it lives in one place and works over
   file://), highlights the active page, wires copy-to-clipboard for code
   panels, the mobile menu toggle, and [data-open] modal triggers.
   ============================================================================ */

const NAV = [
  { label: null, items: [
    { k: "index", t: "Overview" },
    { k: "demo", t: "Demo app ▸" },
    { k: "kitchen-sink", t: "Kitchen sink" },
    { k: "react", t: "React demo" },
    { k: "theming", t: "Theming" },
    { k: "installation", t: "Installation" },
  ]},
  { label: "Foundations", items: [
    { k: "foundations/color", t: "Color" },
    { k: "foundations/typography", t: "Typography" },
    { k: "foundations/grid", t: "Grid system" },
    { k: "foundations/spacing", t: "Spacing" },
    { k: "foundations/layout", t: "Layout" },
    { k: "foundations/borders", t: "Borders & rules" },
    { k: "foundations/motion", t: "Motion" },
    { k: "foundations/no-radius", t: "No radius" },
    { k: "foundations/logo", t: "Logo" },
    { k: "foundations/iconography", t: "Iconography" },
    { k: "foundations/photography", t: "Photography" },
  ]},
  { label: "Actions", items: [
    { k: "components/buttons", t: "Buttons" },
    { k: "components/button-extras", t: "Button variants" },
    { k: "components/toggle", t: "Toggle switch" },
    { k: "components/segmented", t: "Segmented" },
  ]},
  { label: "Forms", items: [
    { k: "components/forms", t: "Form fields" },
    { k: "components/form-controls", t: "Form controls" },
    { k: "components/combobox", t: "Combobox" },
    { k: "components/tag-input", t: "Tag input" },
    { k: "components/number-input", t: "Number input" },
    { k: "components/date-picker", t: "Date picker" },
    { k: "components/date-range", t: "Date range" },
    { k: "components/file-upload", t: "File upload" },
    { k: "components/color-picker", t: "Color picker" },
    { k: "components/multi-select", t: "Multi-select" },
    { k: "components/time-picker", t: "Time picker" },
    { k: "components/date-time", t: "Date-time" },
  ]},
  { label: "Data display", items: [
    { k: "components/datagrid", t: "Data grid" },
    { k: "components/kanban", t: "Kanban" },
    { k: "components/table", t: "Table" },
    { k: "components/status-panel", t: "Status panel" },
    { k: "components/metrics", t: "Metrics" },
    { k: "components/card", t: "Card" },
    { k: "components/panel", t: "Panel" },
    { k: "components/description-list", t: "Description list" },
    { k: "components/badges", t: "Badges" },
    { k: "components/tag", t: "Tag" },
    { k: "components/chips", t: "Chips" },
    { k: "components/avatar", t: "Avatar" },
    { k: "components/timeline", t: "Timeline" },
    { k: "components/tree", t: "Tree view" },
    { k: "components/stat-card", t: "Stat card" },
    { k: "components/sparkline", t: "Sparkline" },
    { k: "components/bar-chart", t: "Bar chart" },
    { k: "components/charts", t: "Charts" },
    { k: "components/rating", t: "Rating" },
    { k: "components/calendar-view", t: "Calendar" },
    { k: "components/agenda", t: "Agenda" },
  ]},
  { label: "Feedback", items: [
    { k: "components/alert", t: "Alert" },
    { k: "components/callout", t: "Callout" },
    { k: "components/banner", t: "Banner" },
    { k: "components/toast", t: "Toast" },
    { k: "components/spinner", t: "Spinner" },
    { k: "components/progress", t: "Progress" },
    { k: "components/skeleton", t: "Skeleton" },
    { k: "components/empty-state", t: "Empty state" },
  ]},
  { label: "Navigation", items: [
    { k: "components/tabs", t: "Tabs" },
    { k: "components/breadcrumb", t: "Breadcrumb" },
    { k: "components/pagination", t: "Pagination" },
    { k: "components/vertical-nav", t: "Vertical nav" },
    { k: "components/stepper", t: "Stepper" },
    { k: "components/wizard", t: "Wizard" },
    { k: "components/dividers", t: "Dividers" },
  ]},
  { label: "Layout", items: [
    { k: "components/app-shell", t: "App shell" },
    { k: "components/toolbar", t: "Toolbar" },
    { k: "components/page-header", t: "Page header" },
    { k: "components/console-layout", t: "Console layout" },
  ]},
  { label: "Overlays", items: [
    { k: "components/modal", t: "Modal" },
    { k: "components/drawer", t: "Drawer" },
    { k: "components/menu", t: "Dropdown menu" },
    { k: "components/popover", t: "Popover" },
    { k: "components/tooltip", t: "Tooltip" },
    { k: "components/accordion", t: "Accordion" },
    { k: "components/command-palette", t: "Command palette" },
  ]},
  { label: "Utilities", items: [
    { k: "components/icons", t: "Icons" },
    { k: "components/email", t: "Email templates" },
    { k: "components/code-block", t: "Code block" },
    { k: "components/kbd", t: "Keyboard key" },
  ]},
  { label: "Platform", items: [
    { k: "components/web-components", t: "Web Components" },
  ]},
  { label: "Templates", items: [
    { k: "templates/login", t: "Login" },
    { k: "templates/dashboard", t: "Dashboard" },
    { k: "templates/error-404", t: "404 / Error" },
  ]},
  { label: "Blocks", items: [
    { k: "blocks/index", t: "Overview" },
    { k: "blocks/app-chrome", t: "App chrome" },
    { k: "blocks/auth", t: "Auth" },
    { k: "blocks/marketing", t: "Marketing" },
    { k: "blocks/data-detail", t: "Data & detail" },
  ]},
];

const MARK = '<svg class="ds-wordmark__mark" viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="28" cy="28" r="24"/><rect x="12" y="12" width="32" height="32"/><line x1="12" y1="44" x2="44" y2="12"/></svg>';

function renderRail() {
  const rail = document.getElementById("docsRail");
  if (!rail) return;
  const current = document.body.dataset.page || "index";
  const prefix = current.includes("/") ? "../" : "";
  const groups = NAV.map((g) => {
    const links = g.items.map((it) => {
      const cur = it.k === current ? ' aria-current="page"' : "";
      return `<a href="${prefix}${it.k}.html"${cur}>${it.t}</a>`;
    }).join("");
    const label = g.label
      ? `<p class="docs-nav__label ds-label">${g.label}</p>`
      : "";
    return `<div class="docs-nav__group">${label}${links}</div>`;
  }).join("");

  rail.innerHTML =
    `<a class="docs-rail__brand" href="${prefix}index.html" style="text-decoration:none;color:inherit">
       ${MARK}<span class="ds-wordmark__name ds-title">Diametral</span>
     </a>
     <button class="ds-button docs-menu-btn" type="button" aria-expanded="false">Menu</button>
     <nav class="docs-rail__nav docs-nav" aria-label="Design system">${groups}</nav>`;

  const btn = rail.querySelector(".docs-menu-btn");
  btn.addEventListener("click", () => {
    const open = rail.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Keep the left rail's scroll position stable across full page navigations
  // (this is a multi-page static site, so every click reloads the page).
  const KEY = "ds-rail-scroll";
  const saved = sessionStorage.getItem(KEY);
  if (saved != null) rail.scrollTop = parseInt(saved, 10) || 0;

  // Make sure the active item is visible even after restoring (e.g. when arriving
  // via a prev/next link to a page whose nav entry is outside the saved window).
  const active = rail.querySelector('a[aria-current="page"]');
  if (active) {
    const a = active.getBoundingClientRect();
    const r = rail.getBoundingClientRect();
    if (a.top < r.top || a.bottom > r.bottom) {
      active.scrollIntoView({ block: "center" });
    }
  }

  rail.addEventListener(
    "scroll",
    () => sessionStorage.setItem(KEY, String(rail.scrollTop)),
    { passive: true }
  );
}

function wireCopy() {
  document.addEventListener("click", async (e) => {
    const trigger = e.target.closest("[data-copy-target]");
    if (!trigger) return;
    const code = document.querySelector(trigger.getAttribute("data-copy-target"));
    if (!code) return;
    const text = code.textContent;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      ta.remove();
    }
    const label = trigger.textContent;
    trigger.textContent = "Copied";
    setTimeout(() => { trigger.textContent = label; }, 1200);
  });
}

function wireModalTriggers() {
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open]");
    if (!t) return;
    const el = document.querySelector(t.getAttribute("data-open"));
    if (!el) return;
    if (typeof el.open === "function") el.open();
    else el.setAttribute("open", "");
  });
}

renderRail();
wireCopy();
wireModalTriggers();
