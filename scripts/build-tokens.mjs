/* ============================================================================
   build-tokens.mjs — generate multi-stack token artifacts from tokens.json.
   Zero dependencies (Node built-ins only). Emits to dist/:
     - tokens.css            (:root { --ds-* } — flat, generated mirror of css/tokens.css)
     - tokens.scss           ($ds-* SCSS variables)
     - tailwind-preset.cjs   (theme.extend bound to the CSS variables)
   A token whose $value is "{ref}" emits var(--ref).
   ============================================================================ */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const json = JSON.parse(readFileSync(join(root, "tokens", "tokens.json"), "utf8"));

// Walk the tree, collecting every leaf token (an object with a "name" + "$value").
const tokens = [];
(function walk(node) {
  if (node && typeof node === "object") {
    if (typeof node.name === "string" && "$value" in node) {
      tokens.push({ name: node.name, value: String(node["$value"]), type: node["$type"] || "other" });
    } else {
      for (const k of Object.keys(node)) if (k[0] !== "$") walk(node[k]);
    }
  }
})(json);

const resolve = (v) => v.replace(/\{([^}]+)\}/g, (_, ref) => `var(--${ref})`);
const header = (kind) => `/* Diametral Design System — ${kind}. GENERATED from tokens/tokens.json. Do not edit by hand. */\n`;

mkdirSync(join(root, "dist"), { recursive: true });

/* ---- tokens.css ---------------------------------------------------------- */
const css = header("design tokens") + ":root {\n" +
  tokens.map((t) => `  --${t.name}: ${resolve(t.value)};`).join("\n") +
  "\n}\n";
writeFileSync(join(root, "dist", "tokens.css"), css);

/* ---- tokens.scss --------------------------------------------------------- */
const scss = header("SCSS variables") +
  tokens.map((t) => `$${t.name}: ${resolve(t.value)};`).join("\n") + "\n";
writeFileSync(join(root, "dist", "tokens.scss"), scss);

/* ---- tailwind-preset.cjs ------------------------------------------------- */
const colors = {}, spacing = {}, fontSize = {}, fontFamily = {}, borderRadius = {}, maxWidth = {}, zIndex = {};
for (const t of tokens) {
  const ref = `var(--${t.name})`;
  if (t.type === "color") colors[t.name.replace(/^ds-/, "")] = ref;
  else if (/^ds-space-/.test(t.name)) spacing[t.name.replace("ds-space-", "")] = ref;
  else if (/^ds-text-/.test(t.name)) fontSize[t.name.replace("ds-text-", "")] = ref;
  else if (/^ds-radius-/.test(t.name)) borderRadius[t.name.replace("ds-radius-", "")] = ref;
  else if (/^ds-maxw-/.test(t.name)) maxWidth[t.name.replace("ds-maxw-", "")] = ref;
  else if (/^ds-z-/.test(t.name)) zIndex[t.name.replace("ds-z-", "")] = ref;
  else if (t.type === "fontFamily") fontFamily[t.name.replace("ds-font-", "")] = ref;
}
const preset =
  header("Tailwind preset") +
  "module.exports = {\n  theme: {\n    extend: {\n" +
  `      colors: ${JSON.stringify(colors, null, 8)},\n` +
  `      spacing: ${JSON.stringify(spacing, null, 8)},\n` +
  `      fontSize: ${JSON.stringify(fontSize, null, 8)},\n` +
  `      fontFamily: ${JSON.stringify(fontFamily, null, 8)},\n` +
  `      borderRadius: ${JSON.stringify(borderRadius, null, 8)},\n` +
  `      maxWidth: ${JSON.stringify(maxWidth, null, 8)},\n` +
  `      zIndex: ${JSON.stringify(zIndex, null, 8)},\n` +
  "    },\n  },\n};\n";
writeFileSync(join(root, "dist", "tailwind-preset.cjs"), preset);

console.log(`build-tokens: ${tokens.length} tokens -> dist/tokens.css, dist/tokens.scss, dist/tailwind-preset.cjs`);
