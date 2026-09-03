/* ============================================================================
   Showcase behavior (showcase-only — not part of the product).
   Renders the sticky top bar (brand, search, theme toggle) and the nav rail
   (kept as DOM injection so it works over file://) from examples/registry.js,
   highlights the active page, wires copy-to-clipboard for code panels, the
   Preview/Code/HTML example tabs, the mobile menu toggle, [data-open] modal
   triggers, and the ⌘K search palette.
   ============================================================================ */

// Everything the generated registry does NOT drive: overview, foundations,
// templates and blocks stay a small hand-maintained list. Component
// categories and the legacy HTML & CSS group are built from
// examples/registry.js at runtime instead.
const OVERVIEW_ITEMS = [
  { path: "index", label: "Overview" },
  { path: "demo", label: "Demo app ▸" },
  { path: "kitchen-sink", label: "Kitchen sink" },
  { path: "react", label: "React demo" },
  { path: "theming", label: "Theming" },
  { path: "installation", label: "Installation" },
];
const FOUNDATIONS_ITEMS = [
  { path: "foundations/color", label: "Color" },
  { path: "foundations/typography", label: "Typography" },
  { path: "foundations/grid", label: "Grid system" },
  { path: "foundations/spacing", label: "Spacing" },
  { path: "foundations/layout", label: "Layout" },
  { path: "foundations/borders", label: "Borders & rules" },
  { path: "foundations/motion", label: "Motion" },
  { path: "foundations/no-radius", label: "No radius" },
  { path: "foundations/logo", label: "Logo" },
  { path: "foundations/iconography", label: "Iconography" },
  { path: "foundations/photography", label: "Photography" },
];
const TEMPLATES_ITEMS = [
  { path: "templates/login", label: "Login" },
  { path: "templates/dashboard", label: "Dashboard" },
  { path: "templates/error-404", label: "404 / Error" },
];
const BLOCKS_ITEMS = [
  { path: "blocks/index", label: "Overview" },
  { path: "blocks/app-chrome", label: "App chrome" },
  { path: "blocks/auth", label: "Auth" },
  { path: "blocks/marketing", label: "Marketing" },
  { path: "blocks/data-detail", label: "Data & detail" },
];

const MARK = '<svg class="ds-wordmark__mark" viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="28" cy="28" r="24"/><rect x="12" y="12" width="32" height="32"/><line x1="12" y1="44" x2="44" y2="12"/></svg>';

const CURRENT = document.body.dataset.page || "index";
// "index" is the one page living at the repo root; every other data-page is
// examples-relative ("demo", "components/x", "foundations/x"…).
const DEPTH = CURRENT === "index" ? 0 : CURRENT.includes("/") ? 2 : 1;
const TO_ROOT = "../".repeat(DEPTH);

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function hrefFor(path) {
  return path === "index" ? `${TO_ROOT}index.html` : `${TO_ROOT}examples/${path}.html`;
}

async function loadRegistry() {
  try {
    // A module-relative import resolves against showcase.js's own URL, not the
    // page's — and registry.js sits right next to it in examples/ regardless
    // of which depth the current page loaded showcase.js from, so no TO_ROOT
    // adjustment belongs here (unlike the page-relative <a href>s below).
    return await import("./registry.js");
  } catch {
    return null; // registry.js missing (e.g. before the first `npm run build`) — nav still works without categories/search.
  }
}

function navLinks(items) {
  return items.map(({ path, label }) => {
    const cur = path === CURRENT ? ' aria-current="page"' : "";
    return `<a href="${hrefFor(path)}"${cur}>${escapeHtml(label)}</a>`;
  }).join("");
}

function navGroup(label, items, { forceOpen = false } = {}) {
  const open = forceOpen || items.some((it) => it.path === CURRENT);
  return `<details class="docs-nav__group"${open ? " open" : ""}>
    <summary class="docs-nav__label ds-label">${escapeHtml(label)}</summary>
    <div class="docs-nav__links">${navLinks(items)}</div>
  </details>`;
}

function renderTopbar() {
  const header = document.createElement("header");
  header.className = "docs-topbar";
  header.innerHTML = `
    <a class="docs-topbar__brand" href="${hrefFor("index")}" style="text-decoration:none;color:inherit">
      ${MARK}<span class="ds-wordmark__name ds-title">Diametral</span>
    </a>
    <button class="docs-topbar__search" type="button" id="docsSearchBtn" aria-haspopup="dialog">
      <span>Search components…</span><span class="ds-kbd">⌘K</span>
    </button>
    <button class="ds-button" id="theme-toggle" type="button">Dark theme</button>
  `;
  document.body.prepend(header);
}

function renderRail(registry) {
  const rail = document.getElementById("docsRail");
  if (!rail) return;

  const overview = `<div class="docs-nav__group docs-nav__group--plain">${navLinks(OVERVIEW_ITEMS)}</div>`;
  const foundations = navGroup("Foundations", FOUNDATIONS_ITEMS, { forceOpen: true });

  let categoryGroups = "";
  let legacyGroup = "";
  if (registry) {
    categoryGroups = registry.CATEGORIES.map((cat) => {
      const items = cat.slugs.map((slug) => ({
        path: `components/${slug}`,
        label: registry.COMPONENTS[slug]?.name ?? slug,
      }));
      return navGroup(cat.name, items);
    }).join("");
    const legacyItems = registry.LEGACY.map((l) => ({ path: `css/${l.slug}`, label: l.name }));
    legacyGroup = navGroup("HTML & CSS", legacyItems);
  }

  const templates = navGroup("Templates", TEMPLATES_ITEMS, { forceOpen: true });
  const blocks = navGroup("Blocks", BLOCKS_ITEMS, { forceOpen: true });

  rail.innerHTML =
    `<button class="ds-button docs-menu-btn" type="button" aria-expanded="false">Menu</button>
     <nav class="docs-rail__nav docs-nav" aria-label="Design system">
       ${overview}${foundations}${categoryGroups}${legacyGroup}${templates}${blocks}
     </nav>`;

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

function wireTheme() {
  const KEY = "ds-theme";
  const html = document.documentElement;
  try {
    if (localStorage.getItem(KEY) === "dark") html.setAttribute("data-theme", "dark");
  } catch {}
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const sync = () => {
    btn.textContent = html.getAttribute("data-theme") === "dark" ? "Light theme" : "Dark theme";
  };
  sync();
  btn.addEventListener("click", () => {
    const isDark = html.getAttribute("data-theme") === "dark";
    if (isDark) html.removeAttribute("data-theme");
    else html.setAttribute("data-theme", "dark");
    try { localStorage.setItem(KEY, isDark ? "light" : "dark"); } catch {}
    sync();
  });
}

function wireSearch(registry) {
  const btn = document.getElementById("docsSearchBtn");
  if (!btn) return;

  const entries = registry
    ? [
        ...Object.entries(registry.COMPONENTS).map(([slug, c]) => ({
          path: `components/${slug}`, name: c.name, group: c.category,
        })),
        ...registry.LEGACY.map((l) => ({ path: `css/${l.slug}`, name: l.name, group: "HTML & CSS" })),
      ]
    : [];

  const overlay = document.createElement("div");
  overlay.className = "ds-overlay docs-search";
  overlay.innerHTML = `
    <div class="ds-modal docs-search__modal" role="dialog" aria-modal="true" aria-label="Search components">
      <div class="ds-modal__body docs-search__body">
        <input class="ds-input docs-search__input" type="text" placeholder="Search components…" autocomplete="off">
        <div class="docs-search__results" id="docsSearchResults"></div>
      </div>
    </div>`;
  document.body.append(overlay);
  const input = overlay.querySelector("input");
  const results = overlay.querySelector("#docsSearchResults");

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    const matches = (q
      ? entries.filter((e) => e.name.toLowerCase().includes(q) || e.group.toLowerCase().includes(q))
      : entries
    ).slice(0, 40);
    results.innerHTML = matches.map((e) =>
      `<a class="docs-search__result" href="${hrefFor(e.path)}"><span>${escapeHtml(e.name)}</span><span class="docs-search__result-group">${escapeHtml(e.group)}</span></a>`
    ).join("") || `<p class="docs-note">No matches.</p>`;
  }

  function open() {
    overlay.classList.add("is-open");
    input.value = "";
    renderResults("");
    input.focus();
  }
  function close() {
    overlay.classList.remove("is-open");
  }

  btn.addEventListener("click", open);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  input.addEventListener("input", () => renderResults(input.value));
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      open();
    } else if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      close();
    }
  });
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

// Switches the Preview / Code / HTML tabs a generated component page renders
// per example (scripts/build-docs.mjs). Delegated so it needs no per-example wiring.
function wireExampleTabs() {
  document.addEventListener("click", (e) => {
    const tab = e.target.closest('.ds-example [role="tab"]');
    if (!tab) return;
    const example = tab.closest(".ds-example");
    const which = tab.dataset.tab;
    example.querySelectorAll('[role="tab"]').forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
    example.querySelectorAll("[data-panel]").forEach((p) => { p.hidden = p.dataset.panel !== which; });
  });
}

// Turns a mounted React example's innerHTML into readable indented markup for
// the HTML tab. Shared via `window` so every generated page's inline mount
// script can call it without duplicating it 100+ times over.
function prettyHtml(html) {
  const root = document.createElement("div");
  root.innerHTML = html;
  const lines = [];
  const walk = (node, depth) => {
    for (const child of node.childNodes) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName.toLowerCase();
        const attrs = [...child.attributes].map((a) => ` ${a.name}="${a.value}"`).join("");
        const indent = "  ".repeat(depth);
        if (child.children.length === 0) {
          const text = child.textContent.trim();
          lines.push(text ? `${indent}<${tag}${attrs}>${text}</${tag}>` : `${indent}<${tag}${attrs}></${tag}>`);
        } else {
          lines.push(`${indent}<${tag}${attrs}>`);
          walk(child, depth + 1);
          lines.push(`${indent}</${tag}>`);
        }
      } else if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
        lines.push(`${"  ".repeat(depth)}${child.textContent.trim()}`);
      }
    }
  };
  walk(root, 0);
  return lines.join("\n");
}
window.__dsPrettyHtml = prettyHtml;

renderTopbar();
wireTheme();
loadRegistry().then((registry) => {
  renderRail(registry);
  wireSearch(registry);
});
wireCopy();
wireModalTriggers();
wireExampleTabs();
