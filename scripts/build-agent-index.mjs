#!/usr/bin/env node
/**
 * Emits docs/agent-index.json: every shipped component and block variant,
 * machine-readable, with each component's examples ordered richest-first.
 * `site/src/registry/demo-markup.json` already holds this shape but sits in
 * `site/`, unshipped — `docs/` is already in package.json's `files`.
 *
 * Component slug/name/category/exports/description come from the same
 * `parse`/`componentsBlock` build-components-md.mjs uses, so the two outputs
 * cannot drift on those fields. Examples (with their `featured` flag) aren't
 * part of that shared parser — components.md never renders them — so they get
 * their own regex here, scoped to build-agent-index's own concern.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { componentsBlock, parse, STR, unquote } from "./build-components-md.mjs";

const REGISTRY = "site/src/registry/registry.ts";
const BLOCK_REGISTRY = "site/src/registry/blocks.ts";
const CSS_DIR = "css/components";
const OUT = "docs/agent-index.json";
const FOR_CLAUDE = "docs/for-claude.md";
const BLOCKS_TABLE_START = "<!-- blocks-table:start -->";
const BLOCKS_TABLE_END = "<!-- blocks-table:end -->";
const SITE = "https://littlebigcode.github.io/design-system";

/**
 * Each entry starts at `  {\n    slug: "...`. Slicing between consecutive
 * starts gives one entry's full text, examples array included.
 */
function examplesBySlug(block) {
  const START = new RegExp(String.raw`\{\s*\n\s{4}slug: (${STR})`, "g");
  const starts = [...block.matchAll(START)];
  const EXAMPLE = new RegExp(
    String.raw`demo:\s*(${STR}),\s*title:\s*(${STR})(?:,\s*featured:\s*(true))?`,
    "g"
  );

  const bySlug = new Map();
  starts.forEach((m, i) => {
    const slug = unquote(m[1]);
    const entry = block.slice(m.index, starts[i + 1]?.index ?? block.length);
    const examplesArray = entry.match(/examples:\s*\[([\s\S]*?)\n\s{4}\],/);
    const examples = examplesArray
      ? [...examplesArray[1].matchAll(EXAMPLE)].map(([, demo, title, featured]) => ({
          demo: unquote(demo),
          title: unquote(title),
          ...(featured ? { featured: true } : {}),
        }))
      : [];
    if (examplesArray) {
      const declared = (examplesArray[1].match(/^\s{6}\{$/gm) ?? []).length;
      if (examples.length !== declared) {
        throw new Error(
          `${REGISTRY}: "${slug}" declares ${declared} examples but only ` +
            `${examples.length} matched demo/title order — fix the entry or ` +
            `this parser, but do not leave an example silently dropped.`
        );
      }
    }
    // Richest-first: the (at most one) featured example moves to the front.
    examples.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    bySlug.set(slug, examples);
  });
  return bySlug;
}

/**
 * The block registry's rows. Evaluated rather than regex-scraped: blocks.ts is
 * this repo's own file, its `BLOCKS` literal is plain nested arrays of strings
 * once the `as const satisfies` tail is cut off, and a hand-rolled parser for a
 * two-level tuple would be more code with more ways to silently drop a row.
 */
function blockRows() {
  const source = readFileSync(BLOCK_REGISTRY, "utf8");
  const start = source.indexOf("export const BLOCKS = [");
  const end = source.indexOf("] as const satisfies", start);
  if (start < 0 || end < 0)
    throw new Error(`${BLOCK_REGISTRY}: no BLOCKS array to read`);
  const literal = source.slice(source.indexOf("[", start), end + 1);
  return new Function(`return ${literal}`)();
}

const registrySrc = readFileSync(REGISTRY, "utf8");
const block = componentsBlock(registrySrc);
const examples = examplesBySlug(block);

const components = parse(block).map((c) => {
  const cssPath = `${CSS_DIR}/${c.slug}.css`;
  return {
    slug: c.slug,
    name: c.name,
    category: c.category,
    exports: c.exports,
    description: c.description,
    ...(existsSync(cssPath) ? { css: cssPath } : {}),
    url: `${SITE}/docs/${c.slug}`,
    examples: examples.get(c.slug) ?? [],
  };
});

/* One row per variant, not per category: the variant is what an agent copies,
   and `path` is where it copies it from — a real file in the published package
   (ADR 0003), not a docs-site route it cannot read from an npm install. */
const blocks = blockRows().flatMap(([category, , , variants]) =>
  variants.map(([slug, description]) => {
    const path = `blocks/${category}/${slug}.tsx`;
    if (!existsSync(path))
      throw new Error(`${BLOCK_REGISTRY}: "${slug}" has no source at ${path}`);
    return {
      slug,
      category,
      description,
      path,
      url: `${SITE}/blocks/${category}/${slug}/preview`,
    };
  })
);

writeFileSync(
  OUT,
  JSON.stringify({ generated: "npm run build", components, blocks }, null, 2) + "\n"
);

/* docs/for-claude.md's blocks table used to be hand-kept, and carried a
   ponytail note admitting the paths it pointed at were not in the package. Both
   are gone: the table is written from the same rows as agent-index.json, and
   the paths it names now ship. */
const table = [
  "| Building | Copy | Live |",
  "|---|---|---|",
  ...blocks.map(
    (b) => `| ${b.description} | \`${b.path}\` | /blocks/${b.category} |`
  ),
].join("\n");
const claude = readFileSync(FOR_CLAUDE, "utf8");
const [head, rest] = claude.split(BLOCKS_TABLE_START);
if (rest === undefined)
  throw new Error(`${FOR_CLAUDE}: no ${BLOCKS_TABLE_START} marker`);
const tail = rest.slice(rest.indexOf(BLOCKS_TABLE_END));
writeFileSync(
  FOR_CLAUDE,
  `${head}${BLOCKS_TABLE_START}\n\n${table}\n\n${tail}`
);

console.log(
  `build-agent-index: ${components.length} components, ${blocks.length} blocks -> ${OUT}`
);
