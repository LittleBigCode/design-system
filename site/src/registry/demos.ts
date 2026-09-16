import type { ComponentType } from "react"

import { sources } from "virtual:demo-source"

type DemoModule = { default: ComponentType }

/**
 * The live component and its printed source come from the same file, resolved
 * by the same key — so a code block cannot drift from the preview above it.
 * `modules` is the executed component; `sources` (built by the demo-source Vite
 * plugin) is that file's text, highlighted at build time.
 */
const modules = import.meta.glob<DemoModule>("./demos/**/*.tsx", {
  eager: true,
})

/**
 * The second root (ADR 0003): block variants ship at the repo root rather than
 * under `site/`, and the demo-source plugin globs them into the same
 * `sources` map, so they join the same demo registry under the same keys.
 */
const blockModules = import.meta.glob<DemoModule>(
  "../../../blocks/**/*.tsx",
  { eager: true }
)

const KEY = /^\.\/demos\/(.*)\.tsx$/
const BLOCK_KEY = /^\.\.\/\.\.\/\.\.\/blocks\/(.*)\.tsx$/

export type Demo = {
  key: string
  Component: ComponentType
  code: string
  html: string
  /** The buildless `.ds-*` markup reference (decision 8). See demo-source.ts. */
  markup?: string
  markupHtml?: string
}

const demos = new Map<string, Demo>()
/** Block keys, so `demoKeysFor` can stay a question about one component's
 *  demos: `blocks/sidebar/` and `demos/sidebar/` share a first segment. */
const blockKeys = new Set<string>()

for (const [file, mod] of [
  ...Object.entries(modules),
  ...Object.entries(blockModules),
]) {
  const key = (KEY.exec(file) ?? BLOCK_KEY.exec(file))?.[1]
  if (!key) continue
  if (BLOCK_KEY.test(file)) blockKeys.add(key)
  const source = sources[key]
  if (!source) continue
  demos.set(key, {
    key,
    Component: mod.default,
    code: source.code,
    html: source.html,
    markup: source.markup,
    markupHtml: source.markupHtml,
  })
}

export function getDemo(key: string): Demo | undefined {
  return demos.get(key)
}

export function demoKeysFor(slug: string): string[] {
  return [...demos.keys()]
    .filter((key) => key.startsWith(`${slug}/`) && !blockKeys.has(key))
    .sort()
}
