#!/usr/bin/env node
/**
 * Regenerates the React-component index inside docs/components.md from
 * site/src/registry/registry.ts — the same array that generates the docs-site
 * routes and, through them, the visual and a11y gates.
 *
 * One source, so drift is structurally impossible: a component cannot appear in
 * the prose without being gate-covered, and cannot be gate-covered without
 * appearing in the prose.
 *
 * Only the block between the two markers is touched. Everything else in
 * components.md is hand-written `.ds-*` class documentation whose anchors
 * README.md and llms.txt link into, and it is left alone.
 */
import { readFileSync, writeFileSync } from "node:fs";

const REGISTRY = "site/src/registry/registry.ts";
const TARGET = "docs/components.md";
const BEGIN = "<!-- BEGIN generated: react-components (npm run build) -->";
const END = "<!-- END generated: react-components -->";
const SITE = "https://littlebigcode.github.io/design-system";

/** The COMPONENTS array only — PENDING holds entries for unlanded batches. */
function componentsBlock(source) {
  const start = source.indexOf("export const COMPONENTS: ComponentDoc[] = [");
  if (start < 0) throw new Error(`${REGISTRY}: no COMPONENTS array`);
  const end = source.indexOf("export const PENDING", start);
  return source.slice(start, end < 0 ? undefined : end);
}

/**
 * Entries are matched on the field order the registry is written in. A shape
 * this does not recognise throws rather than being skipped: a silently dropped
 * component is exactly the drift this script exists to prevent.
 */
/**
 * Either quote style: prettier rewrites a double-quoted string to single quotes
 * when its own content contains a double quote, which `radio-group`'s
 * description (`<input type="radio">`) does.
 */
const STR = String.raw`(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')`;

/** The literal's value, with its quotes stripped and its escapes resolved. */
function unquote(literal) {
  const quote = literal[0];
  return literal
    .slice(1, -1)
    .replace(new RegExp(String.raw`\\${quote}`, "g"), quote)
    .replace(/\\\\/g, "\\");
}

function parse(block) {
  const ENTRY = new RegExp(
    String.raw`\{\s*slug: (${STR}),\s*name: (${STR}),\s*category: (${STR}),` +
      String.raw`\s*exports: \[([^\]]*)\],\s*description:\s*(${STR})`,
    "g"
  );
  const found = [...block.matchAll(ENTRY)].map((m) => ({
    slug: unquote(m[1]),
    name: unquote(m[2]),
    category: unquote(m[3]),
    exports: [...m[4].matchAll(new RegExp(STR, "g"))].map((e) => unquote(e[0])),
    description: unquote(m[5]),
  }));

  const declared = (block.match(/^\s{4}slug: ['"]/gm) ?? []).length;
  if (found.length !== declared) {
    throw new Error(
      `${REGISTRY}: parsed ${found.length} of ${declared} entries. An entry ` +
        `does not follow the slug/name/category/exports/description field ` +
        `order this script matches on — fix the entry or this parser, but do ` +
        `not leave a component out of docs/components.md.`
    );
  }
  return found;
}

function render(components) {
  const byCategory = new Map();
  for (const c of components) {
    if (!byCategory.has(c.category)) byCategory.set(c.category, []);
    byCategory.get(c.category).push(c);
  }

  const lines = [
    "## React components",
    "",
    `The ${components.length} components exported from ` +
      "[`@diametral/design-system/react`](react.md). Every row has a live page " +
      "with runnable examples, and every page is what the visual and " +
      "accessibility gates drive — so this table and the tested surface cannot " +
      "disagree.",
    "",
    "> Generated from `site/src/registry/registry.ts` by " +
      "`scripts/build-components-md.mjs`. Edit the registry, then run " +
      "`npm run build`.",
    "",
  ];

  for (const [category, items] of byCategory) {
    lines.push(`### ${category}`, "");
    lines.push("| Component | Imports | What it is |");
    lines.push("| --- | --- | --- |");
    for (const c of items.sort((a, b) => a.name.localeCompare(b.name))) {
      const names = c.exports.map((e) => `\`${e}\``).join(", ");
      lines.push(
        `| [${c.name}](${SITE}/docs/${c.slug}) | ${names} | ${c.description} |`
      );
    }
    lines.push("");
  }
  return lines.join("\n");
}

const components = parse(componentsBlock(readFileSync(REGISTRY, "utf8")));
const doc = readFileSync(TARGET, "utf8");
const from = doc.indexOf(BEGIN);
const to = doc.indexOf(END);
if (from < 0 || to < 0) {
  throw new Error(
    `${TARGET}: missing the generated-block markers. Add\n  ${BEGIN}\n  ${END}\n` +
      `where the React component index belongs.`
  );
}

const next =
  doc.slice(0, from + BEGIN.length) +
  "\n\n" +
  render(components) +
  "\n" +
  doc.slice(to);

if (next !== doc) {
  writeFileSync(TARGET, next);
  console.log(
    `build-components-md: ${components.length} components -> ${TARGET}`
  );
} else {
  console.log(`build-components-md: ${TARGET} already current`);
}
