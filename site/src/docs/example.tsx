import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@diametral/design-system/react/tabs"

import { CodeBlock } from "@/docs/code-block"
import { Prose } from "@/docs/prose"
import { getDemo } from "@/registry/demos"
import { exampleAnchor, type Example } from "@registry/registry"

export function ExampleBlock({ example }: { example: Example }) {
  const demo = getDemo(example.demo)

  if (!demo) {
    return (
      <section className="border border-dashed border-border p-4">
        <p className="text-sm text-destructive">
          Missing demo file for{" "}
          <code className="font-mono text-xs">{example.demo}</code>.
        </p>
      </section>
    )
  }

  const { Component } = demo

  return (
    <section id={exampleAnchor(example)} className="scroll-mt-20">
      <header className="mb-3">
        <h3 className="font-heading text-sm font-semibold tracking-wider uppercase">
          {example.title}
        </h3>
        {example.description ? (
          <Prose className="mt-1.5 max-w-2xl">{example.description}</Prose>
        ) : null}
      </header>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">React</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div
            // The hook `scripts/build-demo-markup.mjs` scrapes: a real browser
            // drives this exact page, finds every node carrying this attribute,
            // and reads its rendered innerHTML back out. Keep it on this
            // wrapper — the wrapper's own Tailwind classes are what the HTML
            // tab is demonstrating a consumer does *not* need to reproduce.
            data-demo-key={example.demo}
            className="flex min-h-44 w-full items-center justify-center border border-border p-8"
          >
            <Component />
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
                  Markup reference, not a live preview — the classes and ARIA
                  a consumer renders against{" "}
                  <code className="font-mono">css/diametral.css</code> alone.
                  Any interactivity is the consumer's own JS to wire.
                </p>
                <CodeBlock html={demo.markupHtml} code={demo.markup} />
              </>
            ) : (
              <p className="p-4 text-sm text-muted-foreground">
                Not generated in this environment — run{" "}
                <code className="font-mono text-xs">npm run build</code> at
                the repo root, which produces{" "}
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
