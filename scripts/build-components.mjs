/* ============================================================================
   build-components.mjs — concatenate the Web Component modules into a single
   classic script (dist/components/diametral-components.js) for <script src>
   usage. Strips the `export ` keyword so each class is just defined + registered.
   The ESM entry (components/index.js) remains the preferred path; this is a
   convenience bundle. Zero dependencies.
   ============================================================================ */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "components");

const ORDER = [
  "ds-button.js", "ds-badge.js", "ds-callout.js", "ds-panel.js",
  "ds-section-heading.js", "ds-status.js", "ds-switch.js", "ds-tabs.js",
  "ds-segmented.js", "ds-modal.js",
];

let out = "/* Diametral Design System — Web Components bundle (classic script). GENERATED. */\n";
out += "(function () {\n\"use strict\";\n";
for (const f of ORDER) {
  let src = readFileSync(join(dir, f), "utf8");
  src = src.replace(/^export\s+/gm, "");   // export class -> class
  out += `\n/* ${f} */\n` + src + "\n";
}
out += "})();\n";

mkdirSync(join(root, "dist", "components"), { recursive: true });
writeFileSync(join(root, "dist", "components", "diametral-components.js"), out);
console.log(`build-components: dist/components/diametral-components.js (${out.length}b)`);
