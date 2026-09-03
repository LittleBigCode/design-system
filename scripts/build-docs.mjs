#!/usr/bin/env node
// Renders every static component doc page plus the generated home page and the
// committed examples/registry.js manifest — no regex parsing of the registry,
// no hand-maintained import map. `npm run build:docs` (tsc -p tsconfig.docs.json)
// must run first so dist/docs/registry.js and dist/docs/demos/**/*.js exist, and
// `npm run build:react` so dist/react exists (both are earlier steps in `npm run
// build`).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))

// -- import map: derived from what dist/react and the compiled demos actually
// import, pinned to the version installed in node_modules. Nothing here is
// hand-maintained, so Base UI subpaths, @dnd-kit/* and recharts all fall out
// of the same scan that already covers plain react/react-dom. --
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
  // Anchored to a real module-specifier charset (word chars, @, /, ., -) so the
  // English word "from" inside JSX prose text (e.g. `"Opens from ", side`, which
  // demos are full of once dist/docs/demos is in scope) can't be mistaken for an
  // import clause — a plain `[^"']*` capture would run on to the next unrelated
  // quote in the file.
  const re = /from\s+["']([@\w][\w@/.-]*)["']/g
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
  // Demos are compiled separately from the react barrel (tsconfig.docs.json vs
  // tsconfig.build.json), so a specifier a demo imports directly — recharts,
  // an `@dnd-kit/*` entry the barrel doesn't touch — can miss the barrel-only
  // scan. Union both trees rather than trusting one to cover the other.
  const specifiers = new Set([
    ...bareSpecifiersIn(listJsFiles(join(ROOT, "dist/react"))),
    ...bareSpecifiersIn(listJsFiles(join(ROOT, "dist/docs/demos"))),
  ])
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

function titleCase(slug) {
  return slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")
}

// -- legacy cross-linking: most slugs match the legacy examples/css/<slug>.html
// by name outright; a handful of semantically-equivalent pairs need an explicit
// map (switch/toggle above all — see issue #31). --
const LEGACY_ALIASES = {
  switch: "toggle",
  "toggle-group": "segmented",
  "button-group": "button-extras",
  "split-button": "button-extras",
  "icon-button": "buttons",
  select: "form-controls",
  checkbox: "form-controls",
  "checkbox-group": "form-controls",
  "radio-group": "form-controls",
  slider: "form-controls",
  meter: "form-controls",
  textarea: "form-controls",
  input: "forms",
  label: "forms",
  field: "forms",
  "field-array": "forms",
  "input-group": "forms",
  "number-field": "number-input",
  "tags-input": "tag-input",
  "date-range-picker": "date-range",
  "date-time-picker": "date-time",
  "dropdown-menu": "menu",
  "context-menu": "menu",
  menubar: "menu",
  command: "command-palette",
  dialog: "modal",
  "alert-dialog": "modal",
  sheet: "drawer",
  "data-table": "datagrid",
  calendar: "calendar-view",
  chart: "charts",
  "area-chart": "charts",
  "bar-chart": "charts",
  "pie-chart": "charts",
  "donut-chart": "charts",
  "radar-chart": "charts",
  "combo-chart": "charts",
  "funnel-chart": "charts",
  "scatter-chart": "charts",
  "waterfall-chart": "charts",
  "stacked-bar": "charts",
  "bullet-chart": "charts",
  gauge: "charts",
  heatmap: "charts",
  icon: "icons",
  collapsible: "accordion",
  empty: "empty-state",
  sidebar: "vertical-nav",
  status: "status-panel",
  separator: "dividers",
  snippet: "code-block",
  "hover-card": "popover",
  attachment: "file-upload",
  autocomplete: "combobox",
}

function legacySlugFor(slug, legacySlugs) {
  if (legacySlugs.has(slug)) return slug
  if (LEGACY_ALIASES[slug] && legacySlugs.has(LEGACY_ALIASES[slug])) return LEGACY_ALIASES[slug]
  const plural = `${slug}s`
  if (legacySlugs.has(plural)) return plural
  if (slug.endsWith("s") && legacySlugs.has(slug.slice(0, -1))) return slug.slice(0, -1)
  return null
}

// -- workbench: ported from site/plugins/extract-variants.ts (issue #32). Runs
// at `npm run build` time instead of Vite build time, over the same TS compiler
// API and the same react/components/*.tsx sources. --
function propertyName(name) {
  if (ts.isIdentifier(name)) return name.text
  if (ts.isStringLiteral(name)) return name.text
  return undefined
}

function objectProperty(object, key) {
  for (const property of object.properties) {
    if (!ts.isPropertyAssignment(property)) continue
    if (propertyName(property.name) === key) return property.initializer
  }
  return undefined
}

/** Pulls the variant axes out of every `cva()`/`variants()` call in a component
 *  file, keyed by the const it is assigned to (e.g. `buttonVariants`). */
function extractVariants(fileName, text) {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const found = {}

  const visit = (node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      ts.isCallExpression(node.initializer) &&
      ts.isIdentifier(node.initializer.expression) &&
      (node.initializer.expression.text === "cva" || node.initializer.expression.text === "variants")
    ) {
      const config = node.initializer.arguments[1]
      if (config && ts.isObjectLiteralExpression(config)) {
        const variantsNode = objectProperty(config, "variants")
        if (variantsNode && ts.isObjectLiteralExpression(variantsNode)) {
          const variants = {}
          for (const axis of variantsNode.properties) {
            if (!ts.isPropertyAssignment(axis)) continue
            const axisName = propertyName(axis.name)
            if (!axisName || !ts.isObjectLiteralExpression(axis.initializer)) continue
            const values = axis.initializer.properties
              .filter(ts.isPropertyAssignment)
              .map((value) => propertyName(value.name))
              .filter((value) => Boolean(value))
            if (values.length > 0) variants[axisName] = values
          }

          const defaults = {}
          const defaultsNode = objectProperty(config, "defaultVariants")
          if (defaultsNode && ts.isObjectLiteralExpression(defaultsNode)) {
            for (const entry of defaultsNode.properties) {
              if (!ts.isPropertyAssignment(entry)) continue
              const axisName = propertyName(entry.name)
              if (axisName && ts.isStringLiteral(entry.initializer)) defaults[axisName] = entry.initializer.text
            }
          }

          if (Object.keys(variants).length > 0) found[node.name.text] = { variants, defaults }
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(source)
  return found
}

function dedent(text) {
  const lines = text.split("\n")
  const indents = lines.slice(1).filter((line) => line.trim()).map((line) => line.match(/^ */)?.[0].length ?? 0)
  const shift = indents.length ? Math.min(...indents) : 0
  return [lines[0], ...lines.slice(1).map((line) => line.slice(shift))].join("\n")
}

/** Returns the JSX a playground file's default export renders, still carrying
 *  its `{...props}` marker. */
function extractTemplate(fileName, text) {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  let template

  const fromBody = (body) => {
    let result
    const walk = (node) => {
      if (result) return
      if (ts.isReturnStatement(node) && node.expression) {
        let expression = node.expression
        while (ts.isParenthesizedExpression(expression)) expression = expression.expression
        result = dedent(expression.getText(source))
        return
      }
      ts.forEachChild(node, walk)
    }
    walk(body)
    return result
  }

  const visit = (node) => {
    if (template) return
    const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined
    const isDefaultExport = modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword)
    if (ts.isFunctionDeclaration(node) && isDefaultExport && node.body) {
      template = fromBody(node.body)
      return
    }
    ts.forEachChild(node, visit)
  }

  visit(source)
  return template
}

function toPascal(slug) {
  return slug.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase())
}

/** `react/components/<slug>.tsx` or its PascalCase spelling — mirrors
 *  site/plugins/demo-source.ts's resolveComponent(). */
function resolveComponentFile(slug) {
  for (const name of [slug, toPascal(slug)]) {
    const file = join(ROOT, "react/components", `${name}.tsx`)
    if (existsSync(file)) return file
  }
  return undefined
}

const PLAYGROUNDS_DIR = join(ROOT, "examples/registry/playgrounds")
const playgroundSlugs = new Set(
  readdirSync(PLAYGROUNDS_DIR).filter((f) => f.endsWith(".tsx")).map((f) => f.slice(0, -".tsx".length))
)

/**
 * The small JSON payload the Workbench section reads at runtime: the JSX
 * template, its variant axes (extracted, not declared), the plain-prop
 * controls and editable text markers a `PlaygroundConfig` declares. `undefined`
 * for any slug with no landed playground file (still `_pending`) or no
 * declaration in examples/registry/playgrounds.ts.
 */
function buildWorkbenchPayload(slug) {
  if (!playgroundSlugs.has(slug)) return undefined
  const config = PLAYGROUNDS[slug]
  if (!config) return undefined

  const playgroundFile = join(PLAYGROUNDS_DIR, `${slug}.tsx`)
  const template = extractTemplate(playgroundFile, readFileSync(playgroundFile, "utf8"))
  if (!template) return undefined

  let axes = []
  if (config.variantsFrom) {
    const componentFile = resolveComponentFile(slug)
    const meta = componentFile && extractVariants(componentFile, readFileSync(componentFile, "utf8"))[config.variantsFrom]
    if (meta) {
      axes = Object.entries(meta.variants).map(([prop, options]) => ({ prop, options, default: meta.defaults[prop] }))
    }
  }

  return {
    template,
    axes,
    extras: config.extras ?? [],
    children: config.children,
    texts: config.texts,
    note: config.note,
  }
}

function buildImportLine(doc) {
  if (!doc.exports?.length) return null
  return `import { ${doc.exports.join(", ")} } from "${IMPORT_PATH}"`
}

function buildWorkbenchSection(workbench) {
  if (!workbench) return ""
  return `      <section class="docs-section" id="ex-workbench">
        <h2>Workbench</h2>
        ${workbench.note ? `<p class="docs-note">${prose(workbench.note)}</p>` : ""}
        <section class="ds-example">
          <header class="ds-example__bar">
            <span class="ds-label">Workbench</span>
            <button class="ds-button" type="button" data-copy-target="#workbench-code-out">Copy</button>
          </header>
          <div class="ds-workbench">
            <div class="ds-workbench__preview" id="workbench-preview">Loading…</div>
            <aside class="ds-workbench__rail" id="workbench-rail"></aside>
          </div>
          <pre class="ds-example__code" tabindex="0"><code id="workbench-code-out">Loading…</code></pre>
        </section>
      </section>`
}

function buildPage(doc, legacySlug) {
  const title = `${doc.name} · Diametral Design System`
  const intro = (doc.intro ?? []).map((p) => `        <p class="docs-note">${prose(p)}</p>`).join("\n")
  const importLine = buildImportLine(doc)
  const examples = doc.examples ?? []
  const workbench = buildWorkbenchPayload(doc.slug)

  const exampleSections = examples.map((example) => {
    const anchor = example.demo.replace("/", "-")
    const source = readFileSync(join(ROOT, "examples/registry/demos", `${example.demo}.tsx`), "utf8")
    return `      <section class="docs-section" id="ex-${anchor}">
        <h2>${escapeHtml(example.title)}</h2>
        ${example.description ? `<p class="docs-note">${prose(example.description)}</p>` : ""}
        <section class="ds-example">
          <header class="ds-example__bar">
            <span class="ds-label">${escapeHtml(example.title)}</span>
            <div class="ds-tabs ds-example__tabs" role="tablist" aria-label="${escapeHtml(example.title)} view">
              <button class="ds-tabs__tab" type="button" role="tab" aria-selected="true" data-tab="preview">Preview</button>
              <button class="ds-tabs__tab" type="button" role="tab" aria-selected="false" data-tab="code">Code</button>
              <button class="ds-tabs__tab" type="button" role="tab" aria-selected="false" data-tab="html">HTML</button>
            </div>
            <button class="ds-button" type="button" data-copy-target="#c-${anchor}">Copy</button>
          </header>
          <div class="ds-example__preview ds-example__preview--block" data-panel="preview" id="demo-${anchor}">Loading…</div>
          <pre class="ds-example__code" data-panel="code" tabindex="0" hidden><code id="c-${anchor}">${escapeHtml(source)}</code></pre>
          <pre class="ds-example__code" data-panel="html" tabindex="0" hidden><code id="h-${anchor}">Loading…</code></pre>
        </section>
      </section>`
  })
  const sections = [buildWorkbenchSection(workbench), ...exampleSections].filter(Boolean).join("\n\n")

  const tocLinks = [
    ...(workbench ? [`        <a href="#ex-workbench">Workbench</a>`] : []),
    ...examples.map((e) => `        <a href="#ex-${e.demo.replace("/", "-")}">${escapeHtml(e.title)}</a>`),
  ]
  const toc = tocLinks.length > 1
    ? `      <nav class="docs-toc" aria-label="On this page">
        <p class="docs-toc__label ds-label">On this page</p>
${tocLinks.join("\n")}
      </nav>`
    : ""

  const mounts = examples.map((example, i) => {
    const anchor = example.demo.replace("/", "-")
    const varName = `Demo${i}`
    return { varName, anchor, importPath: `../../dist/docs/demos/${example.demo}.js` }
  })
  const imports = mounts.map((m) => `    import ${m.varName} from "${m.importPath}"`).join("\n")
  // Every mount is wrapped in ToastProvider, not just toast's own demo: it is
  // the ambient context the real app mounts once at its root
  // (examples/demo/app.js), and each example here gets its own independent
  // root, so any demo that calls useToast() needs its own provider ancestor.
  const renders = mounts.map((m) => `    {
      const el = document.getElementById("demo-${m.anchor}")
      createRoot(el).render(h(ToastProvider, null, h(${m.varName})))
      const out = document.getElementById("h-${m.anchor}")
      if (out) {
        const capture = () => { out.textContent = window.__dsPrettyHtml ? window.__dsPrettyHtml(el.innerHTML) : el.innerHTML }
        // A portal-heavy mount (Base UI's Select above all) commits after the
        // frame render() returns in, so a single rAF can still read the
        // "Loading…" placeholder — wait for the actual mutation instead of
        // guessing a delay. A synchronous commit (most demos) is covered by
        // the immediate check below, since it beats the observer to firing.
        const mo = new MutationObserver(() => { capture(); mo.disconnect() })
        mo.observe(el, { childList: true, subtree: true })
        if (el.innerHTML !== "Loading…") { capture(); mo.disconnect() }
      }
    }`).join("\n")

  const workbenchImport = workbench
    ? `\n    import WorkbenchSubject from "../../dist/docs/playgrounds/${doc.slug}.js"\n    import { mountWorkbench } from "../docs.js"`
    : ""
  // `<` guarded so a text/note field can never accidentally close the script
  // element early — none do today, but the payload is otherwise unescaped.
  const workbenchMount = workbench
    ? `\n    mountWorkbench({
      Subject: WorkbenchSubject,
      payload: ${JSON.stringify(workbench).replace(/</g, "\\u003c")},
      preview: document.getElementById("workbench-preview"),
      rail: document.getElementById("workbench-rail"),
      code: document.getElementById("workbench-code-out"),
    })`
    : ""

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
<body data-page="components/${doc.slug}">
  <div class="docs">
    <aside class="docs-rail" id="docsRail"></aside>
    <main class="docs-main">
      <header class="docs-head">
        <span class="ds-badge ds-badge--accent">${escapeHtml(doc.category)}</span>
        <h1 class="ds-title ds-title--xl">${escapeHtml(doc.name)}</h1>
        <p class="docs-lede">${prose(doc.description)}</p>
        ${legacySlug ? `<p class="docs-note docs-crosslink"><a href="../css/${legacySlug}.html">→ See the HTML &amp; CSS version</a></p>` : ""}
${intro}
        ${importLine ? `<div class="docs-import">
          <pre class="docs-import__code" tabindex="0"><code id="import-line">${escapeHtml(importLine)}</code></pre>
          <button class="ds-button" type="button" data-copy-target="#import-line">Copy</button>
        </div>` : ""}
      </header>

      <div class="docs-examplesrow${tocLinks.length > 1 ? "" : " docs-examplesrow--single"}">
        <div class="docs-examplesrow__main">
${sections}
        </div>
${toc}
      </div>

      <footer class="docs-foot">
        <span>Diametral Design System</span>
      </footer>
    </main>
  </div>

  <script type="module">
    import { createRoot } from "react-dom/client"
    import { createElement as h } from "react"
    import { ToastProvider } from "${IMPORT_PATH}"
${imports}${workbenchImport}

${renders}${workbenchMount}
  </script>
  <!-- The theme toggle itself lives in the sticky top bar showcase.js renders
       on every page — see wireTheme() there — not per-page any more. -->
</body>
</html>
`
}

function buildRegistryJs(components, categories, legacySlugs) {
  const bySlug = {}
  for (const doc of components) {
    bySlug[doc.slug] = {
      name: doc.name,
      description: doc.description,
      category: doc.category,
      exampleCount: doc.examples?.length ?? 0,
      legacy: legacySlugFor(doc.slug, legacySlugs),
    }
  }
  const categoryGroups = categories
    .map((name) => ({ name, slugs: components.filter((c) => c.category === name).map((c) => c.slug) }))
    .filter((g) => g.slugs.length > 0)
  const legacy = [...legacySlugs].sort().map((slug) => ({ slug, name: titleCase(slug) }))

  return `// GENERATED by scripts/build-docs.mjs — do not hand-edit.
// The manifest the sidebar, search and generated home page read at runtime on
// every page (plain ES module, no build step for the browser).
export const CATEGORIES = ${JSON.stringify(categoryGroups, null, 2)}

export const COMPONENTS = ${JSON.stringify(bySlug, null, 2)}

export const LEGACY = ${JSON.stringify(legacy, null, 2)}
`
}

function buildHomePage(components, categories) {
  const categoryCards = categories
    .map((name) => {
      const slugs = components.filter((c) => c.category === name).map((c) => c.slug)
      if (slugs.length === 0) return ""
      return `        <p class="ds-label" style="margin:18px 0 10px">${escapeHtml(name)}</p>
        <div class="docs-cards">
${slugs.map((slug) => {
        const doc = components.find((c) => c.slug === slug)
        return `          <a class="docs-card" href="examples/components/${slug}.html"><div class="docs-card__name">${escapeHtml(doc.name)}</div><div class="docs-card__desc">${escapeHtml(doc.description)}</div></a>`
      }).join("\n")}
        </div>`
    })
    .filter(Boolean)
    .join("\n\n")

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Diametral Design System</title>
  <link rel="icon" href="assets/logo/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/fonts/ufficio.css">
  <link rel="stylesheet" href="css/diametral.css">
  <link rel="stylesheet" href="css/themes/dark.css">
  <link rel="stylesheet" href="examples/shell.css">
  <!-- Generated by scripts/build-docs.mjs — do not hand-edit. -->
  <script type="module" src="examples/showcase.js"></script>
  <style>
    .hero { padding: 24px 0 8px; }
    .hero__mark { width: 84px; height: 84px; color: var(--ds-ink); }
    .hero__name { font-size: 64px; line-height: 1; margin: 22px 0 12px; }
    .hero__tag { font-size: var(--ds-text-sm); letter-spacing: 0.18em; text-transform: uppercase; color: var(--ds-accent-ink); }
    .hero__dna { margin: 28px 0 0; font-size: var(--ds-text-md); letter-spacing: 0.06em; }
    .hero__dna b { font-weight: 400; }
    .hero__lede { margin-top: 12px; max-width: 56ch; color: var(--ds-ink-soft); line-height: 1.5; }
    .palette-strip { display: grid; grid-template-columns: repeat(6, 1fr); border: 1px solid var(--ds-ink); margin: 40px 0; }
    .palette-strip > div { border-right: 1px solid var(--ds-rule); background: var(--ds-surface); }
    .palette-strip > div:last-child { border-right: none; }
    .palette-strip .chip { height: 96px; }
    .palette-strip .meta { padding: 10px 12px; }
    .palette-strip .n { font-size: 12px; color: var(--ds-ink); }
    .palette-strip .h { font-size: 11px; color: var(--ds-ink-faint); font-variant-numeric: tabular-nums; margin-top: 2px; }
  </style>
</head>
<body data-page="index">
  <div class="docs">
    <aside class="docs-rail" id="docsRail"></aside>
    <main class="docs-main">

      <section class="hero">
        <svg class="hero__mark" viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <circle cx="28" cy="28" r="24"/><rect x="12" y="12" width="32" height="32"/><line x1="12" y1="44" x2="44" y2="12"/>
        </svg>
        <h1 class="hero__name ds-title">Diametral</h1>
        <p class="hero__tag">Design System — Welcome to (the real)</p>
        <p class="hero__dna"><b>Minimal</b> · <b>Enduring</b> · <b>Elegant</b></p>
        <p class="hero__lede">A flat, buildless design system extracted from the Diametral brand: 1px rules, no shadows, no border-radius, Ufficio headings over Geist body. Refined and structured — deliberately away from tech and consulting clichés.</p>
        <p style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
          <a class="ds-button ds-button--primary ds-button--lg" href="examples/demo.html" style="text-decoration:none">▸ Open the live demo app</a>
          <a class="ds-button ds-button--lg" href="examples/installation.html" style="text-decoration:none">Installation guide</a>
        </p>
      </section>

      <section class="palette-strip" aria-label="Primary palette">
        <div><div class="chip" style="background:#161616"></div><div class="meta"><div class="n">Noir</div><div class="h">#161616</div></div></div>
        <div><div class="chip" style="background:#767884"></div><div class="meta"><div class="n">Gris</div><div class="h">#767884</div></div></div>
        <div><div class="chip" style="background:#9f8667"></div><div class="meta"><div class="n">Marron</div><div class="h">#9F8667</div></div></div>
        <div><div class="chip" style="background:#aab0a6"></div><div class="meta"><div class="n">Kaki</div><div class="h">#AAB0A6</div></div></div>
        <div><div class="chip" style="background:#d5d3c4"></div><div class="meta"><div class="n">Beige</div><div class="h">#D5D3C4</div></div></div>
        <div><div class="chip" style="background:#f4fbda"></div><div class="meta"><div class="n">Jaune</div><div class="h">#F4FBDA</div></div></div>
      </section>

      <section class="docs-section">
        <p class="ds-gridlabel" style="margin-bottom:16px">The system in numbers</p>
        <div class="ds-statgrid">
          <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Components</div><div class="ds-statgrid__value">${components.length}</div></div>
          <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Categories</div><div class="ds-statgrid__value">${categories.filter((name) => components.some((c) => c.category === name)).length}</div></div>
          <div class="ds-statgrid__cell"><div class="ds-statgrid__label">HTML &amp; CSS pages</div><div class="ds-statgrid__value">67</div></div>
          <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Themes</div><div class="ds-statgrid__value">2</div></div>
        </div>
      </section>

      <section class="docs-section">
        <h2>Foundations</h2>
        <div class="docs-cards">
          <a class="docs-card" href="examples/foundations/color.html"><div class="docs-card__name">Color</div><div class="docs-card__desc">Brand, semantic &amp; status tokens</div></a>
          <a class="docs-card" href="examples/foundations/typography.html"><div class="docs-card__name">Typography</div><div class="docs-card__desc">Ufficio + Geist, the type scale</div></a>
          <a class="docs-card" href="examples/foundations/spacing.html"><div class="docs-card__name">Spacing</div><div class="docs-card__desc">The spacing scale</div></a>
          <a class="docs-card" href="examples/foundations/layout.html"><div class="docs-card__name">Layout</div><div class="docs-card__desc">Containers, grid, sticky patterns</div></a>
          <a class="docs-card" href="examples/foundations/borders.html"><div class="docs-card__name">Borders &amp; rules</div><div class="docs-card__desc">1px lines, no shadows</div></a>
          <a class="docs-card" href="examples/foundations/motion.html"><div class="docs-card__name">Motion</div><div class="docs-card__desc">Transitions &amp; the fade-in</div></a>
          <a class="docs-card" href="examples/foundations/no-radius.html"><div class="docs-card__name">No radius</div><div class="docs-card__desc">The flat parti pris</div></a>
          <a class="docs-card" href="examples/foundations/logo.html"><div class="docs-card__name">Logo</div><div class="docs-card__desc">The mark, construction &amp; usage</div></a>
          <a class="docs-card" href="examples/foundations/iconography.html"><div class="docs-card__name">Iconography</div><div class="docs-card__desc">Line icons, 1.5 stroke</div></a>
          <a class="docs-card" href="examples/foundations/photography.html"><div class="docs-card__name">Photography</div><div class="docs-card__desc">Natural macro textures</div></a>
        </div>
      </section>

      <section class="docs-section">
        <h2>Components <span class="ds-badge">${components.length} React</span></h2>
        <p class="docs-note">Generated from <code>examples/registry.js</code> — every entry links a live React example, and the ones with a matching HTML &amp; CSS page cross-link to it.</p>

${categoryCards}

        <p class="ds-label" style="margin:18px 0 10px">Platform</p>
        <div class="docs-cards">
          <a class="docs-card" href="examples/react.html"><div class="docs-card__name">React</div><div class="docs-card__desc">The React component layer</div></a>
        </div>
      </section>

      <section class="docs-section">
        <h2>HTML &amp; CSS <span class="ds-badge ds-badge--secondary">Legacy, 67 pages</span></h2>
        <p class="docs-note">Hand-written <code>.ds-*</code> markup and <code>&lt;ds-*&gt;</code> web components — a different contract than the React pages above. See the <a href="examples/css/accordion.html">HTML &amp; CSS group</a> in the sidebar for the full list.</p>
      </section>

      <section class="docs-section">
        <h2>Live demo app <span class="ds-badge ds-badge--accent" style="vertical-align:middle">Live React</span></h2>
        <p class="docs-note">One full app — login, dashboard, projects &amp; project detail, kanban board, recruiting pipeline → CV, team, reports, calendar, invoices, knowledge base, files — rendered live in the browser with no build.</p>
        <div class="docs-cards">
          <a class="docs-card" href="examples/demo.html"><div class="docs-card__name">▸ Console (demo app)</div><div class="docs-card__desc">14 views · ⌘K palette · live charts &amp; data grid</div></a>
          <a class="docs-card" href="examples/installation.html"><div class="docs-card__name">Installation guide</div><div class="docs-card__desc">npm · Vite · Next · Angular · Vue · CDN</div></a>
        </div>
      </section>

      <section class="docs-section">
        <h2>Templates</h2>
        <div class="docs-cards">
          <a class="docs-card" href="examples/templates/login.html"><div class="docs-card__name">Login</div><div class="docs-card__desc">Centered sign-in screen</div></a>
          <a class="docs-card" href="examples/templates/dashboard.html"><div class="docs-card__name">Dashboard</div><div class="docs-card__desc">App shell + KPIs + live data grid</div></a>
          <a class="docs-card" href="examples/templates/error-404.html"><div class="docs-card__name">404 / Error</div><div class="docs-card__desc">Empty-state page</div></a>
        </div>
      </section>

      <section class="docs-section">
        <h2>Blocks</h2>
        <p class="docs-note">Composed, copy-paste sections — app chrome, auth, marketing and data/detail — built from the components and the visible grid system.</p>
        <div class="docs-cards">
          <a class="docs-card" href="examples/blocks/index.html"><div class="docs-card__name">Blocks gallery</div><div class="docs-card__desc">App chrome · Auth · Marketing · Data &amp; detail</div></a>
        </div>
      </section>

      <section class="docs-section">
        <h2>Principles</h2>
        <p class="docs-note">Flat &amp; sharp — 1px borders, no shadows, no border-radius. &nbsp;·&nbsp; White / whitesmoke surfaces, black ink. &nbsp;·&nbsp; Ufficio titles over Geist body, uppercase labels at 0.08em, tabular numerals. Read more in the repository's <code>docs/principles.md</code>.</p>
      </section>

      <footer class="docs-foot">
        <span>Diametral Design System</span>
        <a href="examples/kitchen-sink.html">Kitchen sink →</a>
        <span>Ufficio is a commercial font — see docs/fonts-and-licensing.md.</span>
      </footer>
    </main>
  </div>
</body>
</html>
`
}

const { COMPONENTS, CATEGORIES } = await import(join(ROOT, "dist/docs/registry.js"))
const { PLAYGROUNDS } = await import(join(ROOT, "dist/docs/playgrounds.js"))

const legacySlugs = new Set(
  readdirSync(join(ROOT, "examples/css")).filter((f) => f.endsWith(".html")).map((f) => f.slice(0, -".html".length))
)
const IMPORT_PATH = "@diametral/design-system/react"

const outDir = join(ROOT, "examples/components")
mkdirSync(outDir, { recursive: true })
for (const doc of COMPONENTS) {
  const legacySlug = legacySlugFor(doc.slug, legacySlugs)
  writeFileSync(join(outDir, `${doc.slug}.html`), buildPage(doc, legacySlug))
}
console.log(`wrote ${COMPONENTS.length} pages to examples/components/`)

writeFileSync(join(ROOT, "examples/registry.js"), buildRegistryJs(COMPONENTS, CATEGORIES, legacySlugs))
console.log("wrote examples/registry.js")

writeFileSync(join(ROOT, "index.html"), buildHomePage(COMPONENTS, CATEGORIES))
console.log("wrote index.html")
