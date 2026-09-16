import * as React from "react"
import { useParams } from "react-router"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@diametral/design-system/react"

import { getDemo } from "@/registry/demos"
import { BLOCKS } from "@/registry/blocks"

/** Posted to the parent frame so `BlockFrame` can size its iframe to the block
 *  rather than to an arbitrary fixed height. */
export type BlockHeightMessage = { type: "ds-block-height"; height: number }

/**
 * Measured on the block's own wrapper, not on `body` or `documentElement`:
 * both are stretched to the viewport by the stylesheet, so either would report
 * the frame's current height straight back and the frame could never shrink to
 * fit a 48px toolbar. A full-screen variant is `min-h-svh`, so its wrapper
 * does fill the frame — which is the right answer for that one.
 */
function useReportHeight() {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const node = ref.current
    if (!node || window.parent === window) return
    const observer = new ResizeObserver(([entry]) =>
      window.parent.postMessage(
        {
          type: "ds-block-height",
          height: Math.ceil(entry.contentRect.height),
        } satisfies BlockHeightMessage,
        "*"
      )
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return ref
}

/**
 * The bare route — no docs chrome, no wrapper column. It is what the category
 * page's iframe loads (so the 26 stylesheets with `@media` width queries see a
 * real viewport), the standalone view, and the target
 * `site/scripts/build-demo-markup.mjs` scrapes the HTML tab from.
 *
 * Same "no catch-all redirect" rule as the other registry-derived routes: an
 * unknown variant 404s visibly rather than silently rendering something else.
 */
export function BlockPreview() {
  const { category = "", variant = "" } = useParams()
  const ref = useReportHeight()

  const registered = BLOCKS.find(([slug]) => slug === category)?.[3].some(
    ([name]) => name === variant
  )
  const demo = registered ? getDemo(`${category}/${variant}`) : undefined

  if (!demo) {
    return (
      <Empty className="mt-12">
        <EmptyHeader>
          <EmptyTitle>Unknown block</EmptyTitle>
          <EmptyDescription>
            No block variant is registered under "{category}/{variant}".
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  const { Component } = demo
  return (
    <div ref={ref} data-demo-key={demo.key}>
      <Component />
    </div>
  )
}
