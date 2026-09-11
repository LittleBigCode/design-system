import { demoKeysFor, getDemo } from "@/registry/demos"
import { componentsByCategory } from "@registry/registry"

// Generated from the registry rather than hand-written: the legacy
// `site/legacy/kitchen-sink.html` listed a curated subset in literal `.ds-*`
// markup and drifted every time a component landed. Deriving it means a batch
// that adds a component adds it here too, and one that renames a demo file
// fails visibly below instead of quietly dropping a row.
const GROUPS = componentsByCategory()

export function KitchenSink() {
  return (
    <div className="flex flex-col gap-16">
      <header>
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Components
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Kitchen sink
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Every component on one page — one canonical usage each, in the order
          the sidebar lists them. The whole-system view: scan it after a token
          change to see what moved.
        </p>
      </header>

      {GROUPS.map((group) => (
        <section key={group.category} className="flex flex-col gap-8">
          <h2 className="border-b border-border pb-2 font-heading text-sm font-semibold tracking-wider uppercase">
            {group.category}
          </h2>

          {group.items.map((component) => {
            // The registry's own first example is the canonical one — its
            // order is editorial. `demoKeysFor` is the fallback for a
            // component whose page has no examples listed yet.
            const key =
              component.examples?.[0]?.demo ?? demoKeysFor(component.slug)[0]
            const demo = key ? getDemo(key) : undefined

            return (
              <section
                key={component.slug}
                id={component.slug}
                className="scroll-mt-20"
              >
                <h3 className="mb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">
                  {component.name}
                </h3>
                {demo ? (
                  <div className="flex min-h-32 w-full items-center justify-center border border-border p-8">
                    <demo.Component />
                  </div>
                ) : (
                  <p className="border border-dashed border-border p-4 text-sm text-muted-foreground">
                    No demo yet.
                  </p>
                )}
              </section>
            )
          })}
        </section>
      ))}
    </div>
  )
}
