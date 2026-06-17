/* ============================================================================
   build-css.mjs — inline the @import chain of css/diametral.css into a single
   file (dist/diametral.css) plus a conservatively minified dist/diametral.min.css.
   Zero dependencies. The minifier only strips comments and collapses runs of
   whitespace to a single space — it never removes spaces around punctuation, so
   descendant combinators (e.g. `.ds-field :is(...)`) are preserved.
   ============================================================================ */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cssDir = join(root, "css");

const IMPORT_RE = /@import\s+url\(\s*["']([^"']+)["']\s*\)\s*;/g;

function inline(file, seen = new Set()) {
  const abs = resolve(file);
  if (seen.has(abs)) return "";
  seen.add(abs);
  // Strip comments first so example @import lines inside comment blocks are not
  // treated as real imports.
  const src = readFileSync(abs, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  return src.replace(IMPORT_RE, (_, rel) => {
    const target = resolve(dirname(abs), rel);
    return `\n/* << ${rel} >> */\n` + inline(target, seen);
  });
}

const bundled = inline(join(cssDir, "diametral.css"));
mkdirSync(join(root, "dist"), { recursive: true });
const header = "/* Diametral Design System — bundled stylesheet. GENERATED. */\n";
writeFileSync(join(root, "dist", "diametral.css"), header + bundled);

const min = bundled
  .replace(/\/\*[\s\S]*?\*\//g, "")  // strip comments
  .replace(/\s+/g, " ")               // collapse whitespace (keeps single descendant spaces)
  .trim();
writeFileSync(join(root, "dist", "diametral.min.css"), min);

console.log(`build-css: dist/diametral.css (${bundled.length}b) + dist/diametral.min.css (${min.length}b)`);
