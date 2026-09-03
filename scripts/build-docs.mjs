#!/usr/bin/env node
// Renders a static component doc page from the compiled registry emit plus the
// demo sources' raw text — no regex parsing of the registry, no hand-maintained
// import map. `npm run build:docs` (tsc -p tsconfig.docs.json) must run first so
// dist/docs/registry.js and dist/docs/demos/**/*.js exist, and `npm run build:react`
// so dist/react exists (both are earlier steps in `npm run build`).
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))

// The remaining 120 slugs land in the next issue; this is the tracer bullet.
const SLUGS = ["switch"]

// -- import map: derived from what dist/react actually imports, pinned to the
// version installed in node_modules. Nothing here is hand-maintained. --
function listJsFiles(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...listJsFiles(path))
    else if (entry.name.endsWith(".js")) out.push(path)
  }
  return out
}

function bareSpecifiersIn(files) {
  const specifiers = new Set()
  const re = /from\s+["']([^."'][^"']*)["']/g
  for (const file of files) {
    for (const m of readFileSync(file, "utf8").matchAll(re)) specifiers.add(m[1])
  }
  return specifiers
}

function packageNameOf(specifier) {
  const parts = specifier.split("/")
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
}

function installedVersionOf(pkg) {
  return JSON.parse(readFileSync(join(ROOT, "node_modules", pkg, "package.json"), "utf8")).version
}

function buildImportMap() {
  const reactVersion = installedVersionOf("react")
  const reactDomVersion = installedVersionOf("react-dom")
  const imports = {
    react: `https://esm.sh/react@${reactVersion}`,
    "react-dom": `https://esm.sh/react-dom@${reactDomVersion}?external=react`,
    "react-dom/client": `https://esm.sh/react-dom@${reactDomVersion}/client?external=react`,
    "@diametral/design-system/react": "../../dist/react/index.js",
  }
  const specifiers = bareSpecifiersIn(listJsFiles(join(ROOT, "dist/react")))
  for (const specifier of specifiers) {
    if (imports[specifier]) continue
    const pkg = packageNameOf(specifier)
    const subpath = specifier.slice(pkg.length)
    // ?bundle: some of these (@phosphor-icons/react above all) eagerly
    // re-export one file per icon; unbundled esm.sh serves each as its own
    // request, which stalls the page on hundreds of round trips.
    imports[specifier] = `https://esm.sh/${pkg}@${installedVersionOf(pkg)}${subpath}?external=react,react-dom&bundle`
  }
  return { imports }
}

// -- templating helpers --
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

// Registry prose is backticks-only markup — turn `code` spans into <code>.
function prose(str) {
  return escapeHtml(str).replace(/`([^`]+)`/g, "<code>$1</code>")
}

function buildPage(slug, doc) {
  const title = `${doc.name} · Diametral Design System`
  const intro = (doc.intro ?? []).map((p) => `        <p class="docs-note">${prose(p)}</p>`).join("\n")

  const sections = (doc.examples ?? []).map((example) => {
    const anchor = example.demo.replace("/", "-")
    const source = readFileSync(join(ROOT, "examples/registry/demos", `${example.demo}.tsx`), "utf8")
    return `      <section class="docs-section">
        <h2>${escapeHtml(example.title)}</h2>
        ${example.description ? `<p class="docs-note">${prose(example.description)}</p>` : ""}
        <section class="ds-example">
          <header class="ds-example__bar"><span class="ds-label">Rendered by React</span></header>
          <div class="ds-example__preview ds-example__preview--block" id="demo-${anchor}">Loading…</div>
          <pre class="ds-example__code"><code id="c-${anchor}">${escapeHtml(source)}</code></pre>
        </section>
      </section>`
  }).join("\n\n")

  const mounts = (doc.examples ?? []).map((example, i) => {
    const anchor = example.demo.replace("/", "-")
    const varName = `Demo${i}`
    return { varName, anchor, importPath: `../../dist/docs/demos/${example.demo}.js` }
  })
  const imports = mounts.map((m) => `    import ${m.varName} from "${m.importPath}"`).join("\n")
  const renders = mounts.map((m) =>
    `    createRoot(document.getElementById("demo-${m.anchor}")).render(h(${m.varName}))`
  ).join("\n")

  const importMap = JSON.stringify(buildImportMap(), null, 2).replace(/\n/g, "\n  ")

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="icon" href="../../assets/logo/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/fonts/ufficio.css">
  <link rel="stylesheet" href="../../css/diametral.css">
  <link rel="stylesheet" href="../../css/themes/dark.css">
  <link rel="stylesheet" href="../shell.css">
  <!-- Generated by scripts/build-docs.mjs — do not hand-edit.
       The import map must precede any module script (incl. showcase.js) or it is ignored. -->
  <script type="importmap">
  ${importMap}
  </script>
  <script type="module" src="../showcase.js"></script>
</head>
<body data-page="components/${slug}">
  <div class="docs">
    <aside class="docs-rail" id="docsRail"></aside>
    <main class="docs-main">
      <header class="docs-head">
        <p class="ds-kicker">Components</p>
        <h1 class="ds-title ds-title--xl">${escapeHtml(doc.name)}</h1>
        <p class="docs-lede">${prose(doc.description)}</p>
        <button class="ds-button" id="theme-toggle" type="button">Dark theme</button>
${intro}
      </header>

${sections}

      <footer class="docs-foot">
        <span>Diametral Design System</span>
      </footer>
    </main>
  </div>

  <script type="module">
    import { createRoot } from "react-dom/client"
    import { createElement as h } from "react"
${imports}

${renders}

    document.getElementById("theme-toggle").addEventListener("click", () => {
      const html = document.documentElement
      if (html.getAttribute("data-theme") === "dark") html.removeAttribute("data-theme")
      else html.setAttribute("data-theme", "dark")
    })
  </script>
</body>
</html>
`
}

const { COMPONENTS } = await import(join(ROOT, "dist/docs/registry.js"))

for (const slug of SLUGS) {
  const doc = COMPONENTS.find((c) => c.slug === slug)
  if (!doc) throw new Error(`No registry entry for slug "${slug}"`)
  const outDir = join(ROOT, "examples/components")
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, `${slug}.html`), buildPage(slug, doc))
  console.log(`wrote examples/components/${slug}.html`)
}
