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

const KEY = /^\.\/demos\/(.*)\.tsx$/

export type Demo = {
  key: string
  Component: ComponentType
  code: string
  html: string
}

const demos = new Map<string, Demo>()

for (const [file, mod] of Object.entries(modules)) {
  const key = KEY.exec(file)?.[1]
  if (!key) continue
  const source = sources[key]
  if (!source) continue
  demos.set(key, {
    key,
    Component: mod.default,
    code: source.code,
    html: source.html,
  })
}

export function getDemo(key: string): Demo | undefined {
  return demos.get(key)
}

export function demoKeysFor(slug: string): string[] {
  return [...demos.keys()].filter((key) => key.startsWith(`${slug}/`)).sort()
}
