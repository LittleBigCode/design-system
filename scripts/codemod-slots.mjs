#!/usr/bin/env node
// Batch 9 (#42) global slot codemod. Rewrites the unprefixed shadcn-style
// custom properties migration-source-v1's CSS references (see slot-mapping.json)
// to their --ds-* equivalents, in place, on the files given as argv.
//
// Usage: node scripts/codemod-slots.mjs css/components/accordion.css [...]

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { vars, literals } = JSON.parse(
  readFileSync(path.join(__dirname, "slot-mapping.json"), "utf8"),
);

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("usage: node scripts/codemod-slots.mjs <file.css> [...]");
  process.exit(1);
}

for (const file of files) {
  let css = readFileSync(file, "utf8");

  for (const [literal, replacement] of Object.entries(literals)) {
    if (literal.startsWith("_")) continue;
    css = css.split(literal).join(replacement);
  }

  for (const [slot, replacement] of Object.entries(vars)) {
    // var(--slot) and var(--slot, fallback) — replace only the exact property
    // name. `\b` is not enough: "-" is a non-word char, so `\bvar\(--muted\b`
    // also matches inside `var(--muted-foreground` (hyphen bleed). Require the
    // next char to end the identifier — `,` (a fallback) or `)` (the end).
    css = css.replace(
      new RegExp(`var\\(${slot}(?=[,)])`, "g"),
      `var(${replacement}`,
    );
  }

  writeFileSync(file, css);
}

console.log(`codemodded ${files.length} file(s)`);
