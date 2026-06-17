/* ============================================================================
   Showcase behavior (showcase-only — not part of the product).
   Renders the nav rail (kept here so it lives in one place and works over
   file://), highlights the active page, wires copy-to-clipboard for code
   panels, the mobile menu toggle, and [data-open] modal triggers.
   ============================================================================ */

const NAV = [
  { label: null, items: [
    { k: "index", t: "Overview" },
    { k: "kitchen-sink", t: "Kitchen sink" },
    { k: "react", t: "React demo" },
  ]},
  { label: "Foundations", items: [
    { k: "foundations/color", t: "Color" },
    { k: "foundations/typography", t: "Typography" },
    { k: "foundations/spacing", t: "Spacing" },
    { k: "foundations/layout", t: "Layout" },
    { k: "foundations/borders", t: "Borders & rules" },
    { k: "foundations/motion", t: "Motion" },
    { k: "foundations/no-radius", t: "No radius" },
    { k: "foundations/logo", t: "Logo" },
    { k: "foundations/iconography", t: "Iconography" },
    { k: "foundations/photography", t: "Photography" },
  ]},
  { label: "Components", items: [
    { k: "components/status-panel", t: "Status panel" },
    { k: "components/buttons", t: "Buttons" },
    { k: "components/toggle", t: "Toggle switch" },
    { k: "components/badges", t: "Badges" },
    { k: "components/tabs", t: "Tabs" },
    { k: "components/forms", t: "Form fields" },
    { k: "components/chips", t: "Chips" },
    { k: "components/banner", t: "Banner" },
    { k: "components/callout", t: "Callout" },
    { k: "components/panel", t: "Panel" },
    { k: "components/segmented", t: "Segmented" },
    { k: "components/metrics", t: "Metrics" },
    { k: "components/modal", t: "Modal" },
    { k: "components/table", t: "Table" },
    { k: "components/dividers", t: "Dividers" },
    { k: "components/web-components", t: "Web Components" },
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
