import { compile } from "@tailwindcss/node"
import fs from "node:fs/promises"
import path from "node:path"

/**
 * Classifies one class token the `.ds-*` codemod (batch 16, #49, decision 8)
 * doesn't already know via `utility-mapping.md`/`UTILITY_MAP`:
 *
 * - `"style"` — a real, static Tailwind utility with no `.ds-*` counterpart
 *   (utility-mapping.md's "gap" classes — width/height beyond `w-full`,
 *   colour, padding/margin, border, font-weight/family, …). Resolved through
 *   Tailwind's own compiler (what `@tailwindcss/vite` itself calls against
 *   `chrome.css`, this app's real Tailwind entry) rather than re-derived by
 *   hand, so the value can't drift from what Tailwind would actually
 *   generate. `declaration` is ready to drop straight into `style=`.
 * - `"drop"` — a variant-prefixed or arbitrary-value class (`hover:`,
 *   `group-*`, `data-*:`, `peer-*`, `[…]`, `(--var)`). Decision 9 is explicit
 *   that the HTML tab is "markup, not behaviour": every one of these encodes
 *   interaction or responsive state a static, JS-less, single-viewport
 *   reference has no way to show anyway, so it's dropped rather than forced
 *   into a `style=` that could never express it (a hover state, a media
 *   query) or left as a dead class name.
 * - `"ignore"` — Tailwind doesn't recognise it as a utility at all: not ours.
 *   Third-party library classes (`recharts-*`, `rdp-*`) and ad hoc classes a
 *   demo defines and styles itself (`is-active`, `is-pos`) both land here —
 *   neither is part of what this package's own stylesheet promises, so they
 *   pass through untouched rather than failing a build over a class this
 *   codemod was never going to be the one styling.
 * - `"unresolved"` — Tailwind recognises it as a real static utility but the
 *   single-hop `var()` substitution below couldn't turn its rule into a
 *   standalone declaration. The only genuine "fail the build" case: a dead,
 *   unstyled class in a "buildless" tab is exactly the failure the batch's
 *   own headline claim exists to catch, so this one needs a human, not a
 *   guess.
 */
export type Resolution =
  | { kind: "style"; declaration: string }
  | { kind: "drop" }
  | { kind: "ignore" }
  | { kind: "unresolved" }

const CHROME_CSS = path.resolve(import.meta.dirname, "../src/styles/chrome.css")

let compilerPromise: ReturnType<typeof compile> | undefined
async function getCompiler() {
  if (!compilerPromise) {
    compilerPromise = fs
      .readFile(CHROME_CSS, "utf8")
      .then((css) =>
        compile(css, {
          base: path.dirname(CHROME_CSS),
          onDependency: () => {},
        })
      )
  }
  return compilerPromise
}

/** `--container-sm: 24rem;` -> Map{"--container-sm" => "24rem"}, off the compiled theme layer. */
function theme(css: string) {
  const vars = new Map<string, string>()
  for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    vars.set(m[1], m[2].trim())
  }
  return vars
}

/** One-hop `var(--x)` / `var(--x, fallback)` substitution against the theme map. */
function substitute(value: string, vars: Map<string, string>) {
  return value.replace(/var\((--[\w-]+)(?:,\s*([^)]+))?\)/g, (whole, name, fallback) => {
    return vars.get(name) ?? fallback ?? whole
  })
}

/** Tailwind's own CSS class-selector escaping — `.` and `/` are the two this repo's classes actually hit (`gap-0.5`, `basis-1/3`). */
function escapeSelector(className: string) {
  return className.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")
}

export async function resolveViaTailwind(className: string): Promise<Resolution> {
  if (/[:[(]/.test(className)) return { kind: "drop" }

  const compiler = await getCompiler()
  const css = compiler.build([className])
  const rule = new RegExp(`\\.${escapeSelector(className)}\\s*{([^}]*)}`).exec(css)
  if (!rule) return { kind: "ignore" }

  const vars = theme(css)
  const declarations = rule[1]
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => substitute(d, vars))

  if (!declarations.length) return { kind: "unresolved" }
  return { kind: "style", declaration: declarations.join("; ") }
}
