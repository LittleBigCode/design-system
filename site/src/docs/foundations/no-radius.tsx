import { Example, P, Section } from "@/docs/foundation-example"

export function NoRadius() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Foundations
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          No radius
        </h1>
        <p className={`mt-3 ${P}`}>
          The single most distinctive rule of the system:{" "}
          <code className="font-mono text-xs">border-radius: 0</code>{" "}
          everywhere. Corners are sharp by parti pris, exposed through one
          token — <code className="font-mono text-xs">--ds-radius-none</code>.
        </p>
      </header>

      <Section title="Right vs wrong">
        <Example
          label="--ds-radius-none"
          code="border-radius: var(--ds-radius-none); /* 0 */"
        >
          <div
            className="bg-muted p-6"
            style={{ border: "1px solid var(--ds-ink)" }}
          >
            Sharp — correct
          </div>
          <div
            className="bg-muted p-6"
            style={{ border: "1px solid var(--ds-ink)", borderRadius: 10 }}
          >
            <s>Rounded — never</s>
          </div>
        </Example>
      </Section>

      <Section title="One knob">
        <p className={P}>
          Every corner reads from{" "}
          <code className="font-mono text-xs">--ds-radius-none</code>.
          Override that single token if a downstream brand truly requires
          rounding, and the whole system softens at once — no component
          edits needed.
        </p>
      </Section>
    </div>
  )
}
