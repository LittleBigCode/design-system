/* build-components-manifest.mjs — derive a machine-readable component catalogue
   from the existing source of truth (CSS + Web Components + React types) and
   write it to tokens/components.json. Zero dependencies (Node built-ins only).

   The CSS BEM class names ARE the contract. For every `.ds-*` selector we group
   by BEM block: single hyphens are part of the block name (`ds-section-heading`,
   `ds-chart-legend`); only `__` separates an element and `--` a modifier. So
   `.ds-field__hint--error` -> block `field`, element `hint`, modifier `error`.

   Output (sorted for clean, reproducible diffs — no timestamp, so a regenerate
   in CI is a byte-for-byte drift check; see `--check`):
     {
       "version": "0.10.0",                       // mirrors package.json
       "count": <number of blocks>,
       "components": {
         "<block>": {
           "base": "ds-<block>",
           "elements": [ ... ],                    // BEM __parts, sorted
           "modifiers": [ ... ],                   // BEM --variants, sorted
           "webComponent": "ds-<block>",           // if components/ds-<block>.js exists
           "react": "Button",                      // if a react/ wrapper name matches
           "reactProps": [ { name, type, required } ],  // parsed from the .d.ts
           "description": "...", "status": "stable", "since": "0.4.0"  // sidecar, optional
         }
       },
       "reactComponents": [ ... ],                 // every React wrapper, sorted
       "webComponents": [ ... ]                    // every <ds-*> custom element, sorted
     }

   Sources:
     - css/components/*.css + css/base/*.css   -> base / elements / modifiers
     - components/ds-*.js                       -> webComponent + webComponents[]
     - react/components/*.d.ts                  -> react + reactProps + reactComponents[]
     - tokens/components.meta.json (optional)   -> curated description / status / since

   Usage:
     node scripts/build-components-manifest.mjs           # write tokens/components.json
     node scripts/build-components-manifest.mjs --check   # exit 1 if the file is stale */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");

/* ── helpers ─────────────────────────────────────────────────────────────── */

const stripCssComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, "");

// Normalised key for matching a CSS block to a React/Web component name,
// independent of casing and hyphenation: "section-heading" ~ "SectionHeading".
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// Parse one `.ds-…` class token into { block, element, modifier }.
// Single hyphens stay in each name; `__`/`--` are the only separators.
const CLASS_RE =
  /^ds-([a-z0-9]+(?:-[a-z0-9]+)*)(?:__([a-z0-9]+(?:-[a-z0-9]+)*))?(?:--([a-z0-9]+(?:-[a-z0-9]+)*))?$/;

function listFiles(dir, suffix) {
  const abs = join(root, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs)
    .filter((f) => f.endsWith(suffix))
    .sort()
    .map((f) => ({ name: f, abs: join(abs, f) }));
}

/* ── 1. CSS → blocks ─────────────────────────────────────────────────────── */

// blocks: Map<block, { elements:Set, modifiers:Set }>
const blocks = new Map();
const ensure = (b) =>
  blocks.get(b) || (blocks.set(b, { elements: new Set(), modifiers: new Set() }), blocks.get(b));

for (const { abs } of [...listFiles("css/components", ".css"), ...listFiles("css/base", ".css")]) {
  const src = stripCssComments(readFileSync(abs, "utf8"));
  // Every class token in any selector (a selector can hold several, e.g.
  // `.ds-input-group > .ds-input`). The leading `.` excludes `var(--ds-*)`.
  for (const m of src.matchAll(/\.(ds-[a-z0-9_-]+)/g)) {
    const parsed = CLASS_RE.exec(m[1]);
    if (!parsed) continue;
    const [, block, element, modifier] = parsed;
    const entry = ensure(block);
    if (element) entry.elements.add(element);
    if (modifier) entry.modifiers.add(modifier);
  }
}

/* ── 2. Web Components (components/ds-*.js) ──────────────────────────────── */

const webComponents = listFiles("components", ".js")
  .map(({ name }) => name.replace(/\.js$/, ""))
  .filter((n) => n.startsWith("ds-")); // skip index.js

/* ── 3. React wrappers (react/components/*.d.ts) ─────────────────────────── */

// Strip JS/TS comments without tripping over `//` inside string literals.
function stripJsComments(src) {
  let out = "";
  let str = null; // current quote char, or null
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    const n = src[i + 1];
    if (str) {
      out += c;
      if (c === "\\") { out += src[++i] ?? ""; continue; }
      if (c === str) str = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { str = c; out += c; continue; }
    if (c === "/" && n === "*") { i = src.indexOf("*/", i + 2); if (i < 0) break; i++; continue; }
    if (c === "/" && n === "/") { const nl = src.indexOf("\n", i); if (nl < 0) break; i = nl - 1; continue; }
    out += c;
  }
  return out;
}

// Body of `interface <name> … { … }` — find the opener at angle-bracket depth 0
// (so `extends Omit<…>` is skipped), then brace-match to its close.
function interfaceBody(src, name) {
  const at = src.search(new RegExp(`\\binterface\\s+${name}\\b`));
  if (at < 0) return null;
  let i = at, angle = 0;
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === "<") angle++;
    else if (c === ">") angle--;
    else if (c === "{" && angle <= 0) break;
  }
  if (src[i] !== "{") return null;
  let depth = 0;
  const start = i + 1;
  for (; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}" && --depth === 0) return src.slice(start, i);
  }
  return null;
}

// Split an interface body into top-level member declarations, then keep the
// `name?: type` ones. Tracks (){}[]<> nesting and strings so a union/object/
// function type spanning `;`-free lines stays in one piece.
function parseMembers(body) {
  const decls = [];
  let buf = "", str = null, depth = 0;
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (str) {
      buf += c;
      if (c === "\\") { buf += body[++i] ?? ""; continue; }
      if (c === str) str = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { str = c; buf += c; continue; }
    if ("([{<".includes(c)) depth++;
    else if (")]}>".includes(c)) depth--;
    if ((c === ";" || c === "\n") && depth <= 0) { decls.push(buf); buf = ""; continue; }
    buf += c;
  }
  decls.push(buf);

  const props = [];
  for (const raw of decls) {
    const d = raw.trim();
    if (!d) continue;
    const m = /^(?:readonly\s+)?["']?([A-Za-z_$][\w$-]*)["']?\s*(\?)?\s*:\s*([\s\S]+)$/.exec(d);
    if (!m) continue; // index/call signatures, methods, blank lines
    props.push({
      name: m[1],
      type: m[3].replace(/\s+/g, " ").trim(),
      required: !m[2],
    });
  }
  return props;
}

const reactComponents = [];
const reactByNorm = new Map(); // norm(name) -> { name, props }
for (const { name, abs } of listFiles("react/components", ".d.ts")) {
  const comp = name.replace(/\.d\.ts$/, "");
  if (!/^[A-Z]/.test(comp)) continue; // skip icons.d.ts and other non-components
  reactComponents.push(comp);
  let props = [];
  try {
    const src = stripJsComments(readFileSync(abs, "utf8"));
    const body = interfaceBody(src, `${comp}Props`) || interfaceBody(src, "[A-Za-z]+Props");
    if (body) props = parseMembers(body);
  } catch { /* unparseable .d.ts -> ship the name without props */ }
  reactByNorm.set(norm(comp), { name: comp, props });
}
reactComponents.sort();

/* ── 4. Curated sidecar (optional) ───────────────────────────────────────── */

let meta = {};
const metaPath = join(root, "tokens", "components.meta.json");
if (existsSync(metaPath)) meta = JSON.parse(readFileSync(metaPath, "utf8"));

/* ── 5. Assemble ─────────────────────────────────────────────────────────── */

const webSet = new Set(webComponents);
const components = {};
for (const block of [...blocks.keys()].sort()) {
  const { elements, modifiers } = blocks.get(block);
  const entry = {
    base: `ds-${block}`,
    elements: [...elements].sort(),
    modifiers: [...modifiers].sort(),
  };
  if (webSet.has(`ds-${block}`)) entry.webComponent = `ds-${block}`;

  const react = reactByNorm.get(norm(block));
  if (react) {
    entry.react = react.name;
    if (react.props.length) entry.reactProps = react.props;
  }

  const side = meta[block];
  if (side) {
    if (side.description) entry.description = side.description;
    if (side.status) entry.status = side.status;
    if (side.since) entry.since = side.since;
  }
  components[block] = entry;
}

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const manifest = {
  version: pkg.version,
  count: Object.keys(components).length,
  components,
  reactComponents,
  webComponents: [...webComponents].sort(),
};

/* ── 6. Write or check ───────────────────────────────────────────────────── */

const outPath = join(root, "tokens", "components.json");
const json = JSON.stringify(manifest, null, 2) + "\n";

if (check) {
  const current = existsSync(outPath) ? readFileSync(outPath, "utf8") : "";
  if (current !== json) {
    console.error(
      "build-components-manifest: tokens/components.json is STALE.\n" +
        "  Run `npm run build:manifest` and commit the result."
    );
    process.exit(1);
  }
  console.log(`build-components-manifest: tokens/components.json in sync (${manifest.count} components).`);
} else {
  writeFileSync(outPath, json);
  const withReact = Object.values(components).filter((c) => c.react).length;
  const withWc = Object.values(components).filter((c) => c.webComponent).length;
  console.log(
    `build-components-manifest: ${manifest.count} components -> tokens/components.json ` +
      `(${withWc} web components, ${withReact} React-mapped of ${reactComponents.length} wrappers)`
  );
}
