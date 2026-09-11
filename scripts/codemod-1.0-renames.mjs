#!/usr/bin/env node
/* Codemod for the 28 API swaps' seven loud renames (batch 13, #46) — the ones
   that fail to build rather than silently misbehave, so a wrong automatic
   rewrite costs nothing a human wouldn't have caught anyway. The other 21
   rows are NOT here on purpose: most are decomposed (config props become
   composition), and api-swaps.md's own words are the reason — "a wrong
   automatic rewrite is worse than a build error." Rewrite those call sites
   by hand; docs/migration/from-0.11.md has the recipe for each.

   Usage: node scripts/codemod-1.0-renames.mjs <path> [...morePaths]
   Rewrites every .ts/.tsx/.js/.jsx file under the given path(s) in place. */
import fs from "node:fs";
import path from "node:path";

const RENAMES = [
  ["DataGrid", "DataTable"],
  ["TagInput", "TagsInput"],
  ["NumberInput", "NumberField"],
  ["CommandPalette", "Command"],
  ["FormField", "Field"],
  ["VerticalNav", "Sidebar"],
  ["Radio", "RadioGroupItem"],
];

const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);
const SKIP_DIRS = new Set(["node_modules", "dist", ".git"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (EXTENSIONS.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

function rewrite(text) {
  let next = text;
  const hits = [];
  for (const [from, to] of RENAMES) {
    const pattern = new RegExp(`\\b${from}\\b`, "g");
    const count = (next.match(pattern) || []).length;
    if (count) {
      next = next.replace(pattern, to);
      hits.push(`${from} -> ${to} (${count})`);
    }
  }
  return { next, hits };
}

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error("Usage: node scripts/codemod-1.0-renames.mjs <path> [...morePaths]");
  process.exit(1);
}

let changedFiles = 0;
for (const target of targets) {
  const files = fs.statSync(target).isDirectory() ? walk(target) : [target];
  for (const file of files) {
    const original = fs.readFileSync(file, "utf8");
    const { next, hits } = rewrite(original);
    if (!hits.length) continue;
    fs.writeFileSync(file, next);
    changedFiles++;
    console.log(`${file}: ${hits.join(", ")}`);
  }
}

console.log(`\ncodemod-1.0-renames: ${changedFiles} file(s) changed.`);
console.log(
  "Re-run your typecheck: a renamed import that resolves and compiles is " +
    "either genuinely compatible (SplitButton, TagsInput, NumberField, " +
    "RadioGroupItem) or needs the composition rewrite by hand — see " +
    "docs/migration/from-0.11.md."
);
