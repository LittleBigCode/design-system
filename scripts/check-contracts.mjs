/* ============================================================================
   check-contracts.mjs — the release-blocking contract checks.

   Four assertions, all cheap, all zero-dependency. They exist because each one
   guards a failure that is invisible in a diff and only shows up in a consumer's
   browser:

     1. class-resolution — every `ds-*` class a binding renders resolves to a
        selector defined in the shipped stylesheet. Without this, an absorbed
        component renders `ds-foo__bar`, nothing defines it, and every non-React
        binding silently gets an unstyled element.

     2. layer-purity — css/, tokens/, components/ and emails/ import nothing
        external. This is what makes "zero-dependency CSS, tokens and web
        components" a fact rather than an aspiration; it catches the first
        convenience import someone adds to a web component before a Keycloak
        build breaks.

     3. no-cascade-layers — no `@layer` survives in the shipped CSS. The
        `@layer utilities` strip is paid once upstream on `migration-source-v1`,
        so this is not an enforcement mechanism forcing every batch to strip: it
        is an invariant guard that should never fire.

     4. use-client — every file in react/components/ starts with a `"use client"`
        directive. Without this, a Next App Router consumer's server-component
        graph silently absorbs a stateful component instead of erroring.

   Usage: node scripts/check-contracts.mjs   (run `npm run build` first)
   Exits 1 on any failure.
   ============================================================================ */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, relative, resolve } from "node:path";

// `--root <dir>` points the checks at an installed copy instead of the working
// tree. The parity guarantee is a property of the shipped artifact: a class that
// resolves in-repo but whose stylesheet never makes the tarball is exactly the
// failure this exists to stop.
const rootArg = process.argv.indexOf("--root");
const root =
  rootArg !== -1 && process.argv[rootArg + 1]
    ? resolve(process.argv[rootArg + 1])
    : join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const fail = (check, msg) => failures.push(`[${check}] ${msg}`);

function walk(dir, exts) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return walk(p, exts);
    return exts.includes(extname(p)) ? [p] : [];
  });
}

// Comments are not code: an example import inside a docblock is not a real
// dependency, and a class named in prose is not a rendered class.
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

/* -- 1. class resolution -------------------------------------------------- */

const bundle = join(root, "dist", "diametral.css");
if (!existsSync(bundle)) {
  console.error(
    "check-contracts: dist/diametral.css is missing. Run `npm run build` first.",
  );
  process.exit(1);
}
const css = readFileSync(bundle, "utf8");

// Every class name the stylesheet actually defines. Read from selectors only —
// the file is generated, so a `ds-` mention inside a comment cannot define one.
const defined = new Set(
  [...css.matchAll(/\.(ds-[A-Za-z0-9_-]+)/g)].map((m) => m[1]),
);

// A `ds-*` token only counts when it is a *class*, so tokens are read from
// `className` expressions alone. Reading every string in the file instead
// reports `var(--ds-chart-1)`, `id: "ds-cmdk-list"` and the `ds-open` /
// `ds-close` CustomEvent names — none of which is a class.
const CLASS = /(?<![-\w])(ds-[A-Za-z0-9_-]+)/g;

// Read the className expression starting at `i`, stopping at the comma or brace
// that ends it at bracket depth 0. JSX (`className={…}`) and object-literal
// (`className: cx(…)`) forms both fall out of the same scan.
function classNameExpr(src, i) {
  let depth = 0;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if ("([{".includes(c)) depth++;
    else if (")]}".includes(c)) {
      if (depth === 0) return src.slice(i, j);
      depth--;
    } else if (c === "," && depth === 0) return src.slice(i, j);
    else if (c === "\n" && depth === 0) return src.slice(i, j);
  }
  return src.slice(i);
}

// Within a className expression, a template chunk followed by `${…}` can only
// be checked as a prefix — its full name is not knowable statically.
const INTERPOLATED = /`([^`\\\n$]*?)\$\{/g;
const STRING = /(["'`])((?:[^\\\n]|\\.)*?)\1/g;

// In the working tree the React layer is TSX under react/; in an installed copy
// it is the emit under dist/react/. Whichever is present gets checked.
const sources = [
  ...walk(join(root, "react"), [".jsx", ".tsx"]),
  ...walk(join(root, "dist", "react"), [".js"]),
  ...walk(join(root, "components"), [".js"]),
  ...walk(join(root, "emails"), [".js"]),
];

for (const file of sources) {
  const src = stripComments(readFileSync(file, "utf8"));
  const where = relative(root, file);

  for (const m of src.matchAll(/className\s*[:=]/g)) {
    const expr = classNameExpr(src, m.index + m[0].length);

    const prefixes = new Set(
      [...expr.matchAll(INTERPOLATED)]
        .map(([, head]) => head.match(/(?<![-\w])(ds-[A-Za-z0-9_-]*)$/)?.[1])
        .filter(Boolean),
    );
    for (const cls of prefixes) {
      if (![...defined].some((d) => d.startsWith(cls))) {
        fail(
          "class-resolution",
          `${where}: "${cls}${"${…}"}" matches no defined selector prefix`,
        );
      }
    }

    for (const [, , body] of expr.matchAll(STRING)) {
      for (const [, cls] of body.matchAll(CLASS)) {
        // Skip the static head of an interpolated chunk: already prefix-checked.
        if (prefixes.has(cls)) continue;
        // `"ds-status--" + status` — a trailing hyphen means the name is
        // completed at runtime, so only the prefix is checkable.
        if (cls.endsWith("-")) {
          if (![...defined].some((d) => d.startsWith(cls))) {
            fail(
              "class-resolution",
              `${where}: "${cls}" + \u2026 matches no defined selector prefix`,
            );
          }
          continue;
        }
        if (!defined.has(cls)) {
          fail("class-resolution", `${where}: "${cls}" resolves to no selector`);
        }
      }
    }
  }
}

/* -- 2. layer purity ------------------------------------------------------ */

const isRelative = (spec) => spec.startsWith("./") || spec.startsWith("../");

for (const file of [
  ...walk(join(root, "components"), [".js"]),
  ...walk(join(root, "emails"), [".js"]),
]) {
  const src = stripComments(readFileSync(file, "utf8"));
  const where = relative(root, file);
  const specs = [
    ...[...src.matchAll(/\bfrom\s*["']([^"']+)["']/g)].map((m) => m[1]),
    ...[...src.matchAll(/\bimport\s*\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]),
    ...[...src.matchAll(/\brequire\s*\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]),
  ];
  for (const spec of specs) {
    if (!isRelative(spec)) {
      fail("layer-purity", `${where}: imports "${spec}" — this layer imports nothing`);
    }
  }
}

for (const file of [
  ...walk(join(root, "css"), [".css"]),
  ...walk(join(root, "tokens"), [".css", ".js", ".mjs"]),
]) {
  const src = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  const where = relative(root, file);
  for (const [, spec] of src.matchAll(/@import\s+(?:url\(\s*)?["']([^"']+)["']/g)) {
    if (!isRelative(spec)) {
      fail("layer-purity", `${where}: @import "${spec}" — this layer imports nothing`);
    }
  }
}

/* -- 3. no cascade layers ------------------------------------------------- */

for (const file of walk(join(root, "css"), [".css"])) {
  const src = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  if (/@layer\b/.test(src)) {
    fail(
      "no-cascade-layers",
      `${relative(root, file)}: contains @layer — the strip is paid upstream; this should never fire`,
    );
  }
}

/* -- 4. use-client directive ----------------------------------------------- */

for (const file of walk(join(root, "react", "components"), [".tsx"])) {
  const src = readFileSync(file, "utf8");
  const firstLine = src.split("\n").find((l) => l.trim() !== "") ?? "";
  if (!/^["']use client["'];?$/.test(firstLine.trim())) {
    fail("use-client", `${relative(root, file)}: missing "use client" as the first line`);
  }
}

/* -- report --------------------------------------------------------------- */

if (failures.length) {
  for (const f of failures) console.error(`✖ ${f}`);
  console.error(`\ncheck-contracts: ${failures.length} failure(s)`);
  process.exit(1);
}
console.log(
  `check-contracts: clean — ${defined.size} defined classes, ${sources.length} source files`,
);
