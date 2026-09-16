import * as React from "react"

import { Segmented } from "@diametral/design-system/react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@diametral/design-system/react/tabs"

import type { BlockHeightMessage } from "@/docs/blocks/preview"
import { CodeBlock } from "@/docs/code-block"
import { getDemo } from "@/registry/demos"

/**
 * Widths, not scale factors: 26 component stylesheets respond to the viewport
 * with `@media` width queries (sidebar, app-shell, grid…), and a query reads
 * the *frame's* width, so the preview has to be a real iframe onto the bare
 * route. Shrinking a wrapper div would show a layout no real viewport produces
 * (ADR 0003).
 */
const VIEWPORTS = [
  { value: "desktop", label: "Desktop" },
  { value: "tablet", label: "Tablet" },
  { value: "mobile", label: "Mobile" },
]

const WIDTHS: Record<string, number | undefined> = {
  desktop: undefined,
  tablet: 768,
  mobile: 390,
}

export function BlockFrame({
  category,
  name,
  description,
}: {
  category: string
  name: string
  description: string
}) {
  const [viewport, setViewport] = React.useState("desktop")
  // Tall to start, then the frame shrinks to whatever the block reports. Not
  // the other way round: a full-screen variant is `min-h-svh`, so its content
  // height IS the frame height and growing from a short seed would lock it
  // there.
  const [height, setHeight] = React.useState(720)
  const frame = React.useRef<HTMLIFrameElement>(null)

  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow) return
      const data = event.data as BlockHeightMessage | undefined
      if (data?.type !== "ds-block-height") return
      setHeight(Math.max(160, data.height))
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  const demo = getDemo(`${category}/${name}`)
  const source = `blocks/${category}/${name}.tsx`

  if (!demo) {
    return (
      <section className="border border-dashed border-border p-4">
        <p className="text-sm text-destructive">
          Missing source file <code className="font-mono text-xs">{source}</code>
          .
        </p>
      </section>
    )
  }

  return (
    <section id={name} className="scroll-mt-20">
      <header className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-sm font-semibold tracking-wider uppercase">
            {name}
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
          <code className="mt-1.5 block font-mono text-xs text-muted-foreground">
            {source}
          </code>
        </div>
        {/* Outside the Tabs root on purpose: `.ds-tabs` tells its two grammars
            apart with `:has(> .ds-tabs-list)`, so anything wrapped around
            TabsList silently flips the root to the web-component layout. */}
        <Segmented items={VIEWPORTS} value={viewport} onChange={setViewport} />
      </header>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">React</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div className="flex justify-center border border-border bg-muted/40">
            <iframe
              ref={frame}
              title={`${name} preview`}
              src={`${import.meta.env.BASE_URL}blocks/${category}/${name}/preview`}
              className="w-full border-0 bg-background"
              style={{ height, maxWidth: WIDTHS[viewport] }}
            />
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="border border-border">
            <CodeBlock html={demo.html} code={demo.code} />
          </div>
        </TabsContent>
        <TabsContent value="html">
          <div className="border border-border">
            {demo.markup && demo.markupHtml ? (
              <>
                <p className="border-b border-border bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
                  Markup reference, not a live preview — scraped from this
                  block's own rendered DOM and codemodded onto{" "}
                  <code className="font-mono">.ds-*</code>, so it is what a
                  consumer renders against{" "}
                  <code className="font-mono">css/diametral.css</code> alone. It
                  shows one state; any interactivity is the consumer's own JS to
                  wire.
                </p>
                <CodeBlock html={demo.markupHtml} code={demo.markup} />
              </>
            ) : (
              <p className="p-4 text-sm text-muted-foreground">
                Not generated in this environment — run{" "}
                <code className="font-mono text-xs">npm run build</code> at the
                repo root, which produces{" "}
                <code className="font-mono text-xs">
                  site/src/registry/demo-markup.json
                </code>{" "}
                before this app builds.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
