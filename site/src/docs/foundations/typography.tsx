import { Example, P, Section } from "@/docs/foundation-example"

const SCALE: Array<[string, React.ReactNode]> = [
  ["ds-title--xl · 32px", <span key="1" className="ds-title ds-title--xl">Aa Diametral</span>],
  ["ds-title--lg · 24px", <span key="1" className="ds-title ds-title--lg">Aa Diametral</span>],
  ["ds-title--md · 22px", <span key="1" className="ds-title ds-title--md">Aa Diametral</span>],
  ["ds-title--sm · 19px", <span key="1" className="ds-title ds-title--sm">Aa Diametral</span>],
  ["body · 14px", <span key="1">The quick brown fox jumps over the lazy dog 1234567890</span>],
  ["ds-label · 12px", <span key="1" className="ds-label">Section label</span>],
  ["ds-kicker · 11px", <span key="1" className="ds-kicker">Kicker</span>],
]

export function Typography() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Foundations
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Typography
        </h1>
        <p className={`mt-3 ${P}`}>
          Ufficio Light 300 carries every title; Geist carries the body.
          Labels are uppercase with wide tracking, and numerals are tabular
          so columns of figures align.
        </p>
      </header>

      <Section title="Type scale">
        <div className="flex flex-col divide-y divide-border border border-border">
          {SCALE.map(([meta, sample]) => (
            <div key={meta} className="flex items-center gap-4 px-3 py-3">
              <span className="w-40 shrink-0 font-mono text-xs text-muted-foreground">
                {meta}
              </span>
              {sample}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Families">
        <p className={P}>
          <strong>Title</strong> —{" "}
          <code className="font-mono text-xs">var(--ds-font-title)</code>:
          Ufficio Light 300, with Fraunces as the free fallback when the
          licensed face is absent.
        </p>
        <p className={P}>
          <strong>Body</strong> —{" "}
          <code className="font-mono text-xs">var(--ds-font-sans)</code>:
          Geist at weights 300 / 400 / 500 / 600, falling back to the system
          sans stack.
        </p>
      </Section>

      <Section title="Tabular numerals">
        <Example
          label="font-variant-numeric: tabular-nums"
          center={false}
          code={
            '<span class="ds-numeric">1 234,00</span>\n<span class="ds-numeric">999 999,99</span>'
          }
        >
          <div className="flex flex-col items-end gap-1">
            <span className="ds-numeric w-40 text-right">1 234,00</span>
            <span className="ds-numeric w-40 text-right">999 999,99</span>
          </div>
        </Example>
      </Section>
    </div>
  )
}
