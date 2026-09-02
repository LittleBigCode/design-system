import { Tabs } from "@diametral/design-system/react"

import { CodeBlock } from "@/docs/code-block"
import { Prose } from "@/docs/prose"
import { getDemo } from "@/registry/demos"
import { exampleAnchor, type Example } from "@/registry/registry"

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

      <Tabs
        defaultValue="preview"
        items={[
          {
            id: "preview",
            label: "Preview",
            content: (
              <div className="flex min-h-44 w-full items-center justify-center border border-border p-8">
                <Component />
              </div>
            ),
          },
          {
            id: "code",
            label: "Code",
            content: (
              <div className="border border-border">
                <CodeBlock html={demo.html} code={demo.code} />
              </div>
            ),
          },
        ]}
      />
    </section>
  )
}
