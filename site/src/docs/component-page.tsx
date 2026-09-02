import * as React from "react"
import { useParams } from "react-router"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { anatomy } from "virtual:demo-source"

import { Badge, Button, EmptyState } from "@diametral/design-system/react"

import { Toc, TocItem, TocLabel, TocLink, TocList } from "@/chrome/toc"

import { ExampleBlock } from "@/docs/example"
import { Prose } from "@/docs/prose"
import { Workbench } from "@/docs/workbench"
import { demoKeysFor } from "@/registry/demos"
import { hasPlayground } from "@/registry/playground-registry"
import {
  exampleAnchor,
  exampleTitle,
  findComponent,
  IMPORT_PATH,
} from "@/registry/registry"

/** Enough names to recognise the module, before a 23-export line stops reading. */
const SHOWN_EXPORTS = 4

function ImportLine({
  slug,
  exports: declared,
}: {
  slug: string
  exports?: string[]
}) {
  const [copied, setCopied] = React.useState(false)
  // The registry's own list wins where it exists: the anatomy extractor only
  // finds parts in components that compose from children, so a prop-driven
  // component has one part and no types to derive.
  //
  // Type exports ride along with their inline `type` keyword either way, so the
  // copied statement is the real import a consumer would write.
  const names = declared ?? [
    ...(anatomy[slug]?.parts ?? []),
    ...(anatomy[slug]?.types ?? []).map(({ name }) => `type ${name}`),
  ]
  const statement = `import { ${names.join(", ")} } from "${IMPORT_PATH}"`
  const shown = [
    ...names.slice(0, SHOWN_EXPORTS),
    ...(names.length > SHOWN_EXPORTS
      ? [`+${names.length - SHOWN_EXPORTS}`]
      : []),
  ].join(", ")

  React.useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  // A stylesheet-only component declares `exports: []` — its classes are the
  // contract and there is nothing to import from the barrel, so no line at all
  // beats an empty one. The intro paragraph says so in words. After the hooks,
  // so the hook count does not depend on it.
  if (!names.length) return null

  return (
    <div className="flex items-center gap-2 border border-border bg-muted/40 px-3 py-2">
      <code className="flex-1 truncate font-mono text-xs">
        {`import { ${shown} } from "${IMPORT_PATH}"`}
      </code>
      <Button
        size="sm"
        aria-label={copied ? "Copied" : "Copy import statement"}
        // The line is truncated for reading; what gets copied is the whole
        // statement, which is what the display has always implied.
        onClick={async () => {
          await navigator.clipboard.writeText(statement)
          setCopied(true)
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  )
}

export function ComponentPage() {
  const { slug = "" } = useParams()
  const component = findComponent(slug)

  // Scrolling is per-page here: react-router keeps the layout mounted across
  // navigations, so without this you land mid-page on the next component.
  React.useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [slug])

  if (!component) {
    return (
      <EmptyState
        className="mt-12"
        title="Unknown component"
        description={`No component is registered under “${slug}”.`}
      />
    )
  }

  const examples = component.examples ?? []
  const documented = new Set(examples.map((example) => example.demo))
  const orphans = demoKeysFor(slug).filter((key) => !documented.has(key))
  const playground = hasPlayground(slug)

  return (
    <div className="flex gap-12">
      <article className="min-w-0 flex-1">
        <header className="mb-8">
          <Badge className="mb-3">{component.category}</Badge>
          <h1 className="font-heading text-3xl font-light tracking-tight">
            {component.name}
          </h1>
          <Prose className="mt-2 max-w-2xl">{component.description}</Prose>
          {component.intro?.map((paragraph) => (
            <Prose key={paragraph} className="mt-3 max-w-2xl">
              {paragraph}
            </Prose>
          ))}
          <div className="mt-5 max-w-2xl">
            <ImportLine slug={component.slug} exports={component.exports} />
          </div>
        </header>

        {playground ? (
          <div className="mb-6">
            <Workbench component={component} />
          </div>
        ) : null}

        {examples.length > 0 ? (
          <section id="examples" className="scroll-mt-20">
            <h2 className="mb-6 font-heading text-base font-semibold tracking-wider uppercase">
              Examples
            </h2>
            <div className="flex flex-col gap-12">
              {examples.map((example) => (
                <ExampleBlock key={example.demo} example={example} />
              ))}
              {orphans.map((key) => (
                <ExampleBlock
                  key={key}
                  example={{ demo: key, title: exampleTitle(key) }}
                />
              ))}
            </div>
          </section>
        ) : playground ? (
          // A playground already gives this page working content, so the missing
          // examples are a footnote rather than an empty state.
          <p className="text-sm text-muted-foreground">
            Curated usages for {component.name} are still to be written.
          </p>
        ) : (
          <EmptyState
            className="border border-dashed border-border"
            title="Usages not written yet"
            description={`${component.name} ships and is exported — only its documented examples are pending.`}
          />
        )}
      </article>

      {(playground ? 1 : 0) + examples.length > 1 ? (
        <Toc
          // The layout header is sticky at top-0 and 3.75rem tall (py-3 + h-9),
          // so the rail parks below it keeping the 2.5rem of main padding it
          // starts with rather than sliding under the header.
          className="hidden xl:top-25 xl:block"
        >
          <TocLabel>On this page</TocLabel>
          <TocList>
            {playground ? (
              <TocItem>
                <TocLink href="#workbench">Workbench</TocLink>
              </TocItem>
            ) : null}
            {examples.length > 0 ? (
              <TocItem>
                <TocLink href="#examples">Examples</TocLink>
              </TocItem>
            ) : null}
            {examples.map((example) => (
              <TocItem key={example.demo} level={2}>
                <TocLink href={`#${exampleAnchor(example)}`}>
                  {example.title}
                </TocLink>
              </TocItem>
            ))}
          </TocList>
        </Toc>
      ) : null}
    </div>
  )
}
