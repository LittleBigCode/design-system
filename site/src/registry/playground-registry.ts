import type { ComponentType } from "react"

import { templates, variants } from "virtual:demo-source"

import { PLAYGROUNDS, type Control } from "@/registry/playgrounds"

/**
 * The panel drives an arbitrary prop bag, while each playground file is typed
 * against its own component. This is the single place that boundary is crossed.
 */
type Subject = ComponentType<Record<string, unknown>>

export type Axis = {
  prop: string
  options: string[]
  /** From `defaultVariants`; when absent the prop starts unset. */
  default?: string
}

export type Playground = {
  slug: string
  Subject: Subject
  template: string
  axes: Axis[]
  extras: Control[]
  children?: { default: string; label?: string }
  texts?: Record<string, { default: string; label?: string }>
  note?: string
}

const modules = import.meta.glob<{ default: Subject }>("./playgrounds/*.tsx", {
  eager: true,
})

const KEY = /^\.\/playgrounds\/(.*)\.tsx$/

const playgrounds = new Map<string, Playground>()

for (const [file, mod] of Object.entries(modules)) {
  const slug = KEY.exec(file)?.[1]
  if (!slug) continue

  const config = PLAYGROUNDS[slug]
  const template = templates[slug]
  if (!config || !template) continue

  const meta = variants[slug]
  const axes: Axis[] = meta
    ? Object.entries(meta.variants).map(([prop, options]) => ({
        prop,
        options,
        default: meta.defaults[prop],
      }))
    : []

  playgrounds.set(slug, {
    slug,
    Subject: mod.default,
    template,
    axes,
    extras: config.extras ?? [],
    children: config.children,
    texts: config.texts,
    note: config.note,
  })
}

export function getPlayground(slug: string): Playground | undefined {
  return playgrounds.get(slug)
}

export function hasPlayground(slug: string): boolean {
  return playgrounds.has(slug)
}
