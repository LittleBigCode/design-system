import { Example, P, Section } from "@/docs/foundation-example"

export function Borders() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Foundations
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Borders &amp; rules
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Structure comes from a single 1px rule system in two weights — never
          from shadows. Depth is drawn, not faked.
        </p>
      </header>

      <Section title="Rules">
        <Example
          label="--ds-rule · --ds-rule-soft"
          code={
            '<div style="border:1px solid var(--ds-rule)">Rule</div>\n<div style="border:1px solid var(--ds-rule-soft)">Rule soft</div>'
          }
        >
          <div className="border p-6" style={{ borderColor: "var(--ds-rule)" }}>
            Rule (1px)
          </div>
          <div
            className="border p-6"
            style={{ borderColor: "var(--ds-rule-soft)" }}
          >
            Rule soft (1px)
          </div>
        </Example>
      </Section>

      <Section title="No shadows">
        <p className={P}>
          The system ships no <code className="font-mono text-xs">box-shadow</code>.
          Elevation, separation and grouping are expressed entirely through
          1px rules and flat <code className="font-mono text-xs">--ds-bg-alt</code>{" "}
          fills. The result reads as drafted and architectural rather than
          soft and floating — a deliberate, load-bearing constraint, not an
          omission.
        </p>
      </Section>

      <Section title="Selection">
        <p className={P}>
          Text selection paints accent orange (
          <code className="font-mono text-xs">--ds-accent</code> on{" "}
          <code className="font-mono text-xs">--ds-on-accent</code>) via{" "}
          <code className="font-mono text-xs">::selection</code>. Select this
          sentence to see it.
        </p>
      </Section>
    </div>
  )
}
