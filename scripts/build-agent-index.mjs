#!/usr/bin/env node
/**
 * Emits docs/agent-index.json: every shipped component, block and template,
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
const SECTIONS = "site/src/docs/sections.ts";
const CSS_DIR = "css/components";
const OUT = "docs/agent-index.json";
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

/** `[slug, name, description]` rows from a `SectionItem[]` const in sections.ts. */
function sectionRows(source, constName) {
  const start = source.indexOf(`export const ${constName} = [`);
  if (start < 0) throw new Error(`${SECTIONS}: no ${constName} array`);
  const end = source.indexOf("] as const satisfies", start);
  if (end < 0) throw new Error(`${SECTIONS}: ${constName} has no closing`);
  const block = source.slice(start, end);

  const ROW = new RegExp(String.raw`\[(${STR}),\s*(${STR}),\s*(${STR})\]`, "g");
  const found = [...block.matchAll(ROW)].map((m) => ({
    slug: unquote(m[1]),
    name: unquote(m[2]),
    description: unquote(m[3]),
  }));

  const declared = (block.match(/^\s*\[/gm) ?? []).length;
  if (found.length !== declared) {
    throw new Error(
      `${SECTIONS}: parsed ${found.length} of ${declared} ${constName} rows. A ` +
        `row does not follow the [slug, name, description] shape this script ` +
        `matches on — fix the row or this parser, but do not leave one out.`
    );
  }
  return found;
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

const sectionsSrc = readFileSync(SECTIONS, "utf8");
const blocks = sectionRows(sectionsSrc, "BLOCKS").map((b) => ({
  ...b,
  url: `${SITE}/blocks/${b.slug}`,
}));
const templates = sectionRows(sectionsSrc, "TEMPLATES").map((t) => ({
  ...t,
  url: `${SITE}/templates/${t.slug}`,
}));

writeFileSync(
  OUT,
  JSON.stringify({ generated: "npm run build", components, blocks, templates }, null, 2) + "\n"
);
console.log(
  `build-agent-index: ${components.length} components, ${blocks.length} blocks, ${templates.length} templates -> ${OUT}`
);
