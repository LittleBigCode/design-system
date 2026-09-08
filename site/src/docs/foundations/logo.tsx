import { Example, P, Section } from "@/docs/foundation-example"

function Mark({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      width={120}
      height={120}
    >
      <circle cx={28} cy={28} r={24} />
      <rect x={12} y={12} width={32} height={32} />
      <line x1={12} y1={44} x2={44} y2={12} />
    </svg>
  )
}

export function Logo() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Foundations
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Logo
        </h1>
        <p className={`mt-3 ${P}`}>
          The mark composes three geometric elements: a circle for
          intelligence and complexity, a square for stability, and a
          diagonal line for positioning.
        </p>
      </header>

      <Section title="The mark">
        <Example
          label="Symbol · ink on light"
          code={
            '<svg viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.5">\n  <circle cx="28" cy="28" r="24"/>\n  <rect x="12" y="12" width="32" height="32"/>\n  <line x1="12" y1="44" x2="44" y2="12"/>\n</svg>'
          }
        >
          <Mark color="var(--ds-ink)" />
        </Example>
      </Section>

      <Section title="On dark">
        <Example
          label="Symbol · white on noir"
          code='<svg ... style="color:#fff">…</svg>  <!-- on a dark surface -->'
        >
          <div className="w-full bg-[#161616] p-8">
            <Mark color="#fff" />
          </div>
        </Example>
      </Section>

      <Section title="Construction">
        <p className={P}>
          Three elements, one weight. The <strong>circle</strong> (r 24)
          signals intelligence and complexity; the <strong>square</strong>{" "}
          (32×32) grounds it in stability; the <strong>diagonal line</strong>{" "}
          running corner to corner expresses positioning. All three share the
          1.5 stroke and meet on a 56-unit grid.
        </p>
      </Section>

      <Section title="Wordmark">
        <Example
          label=".ds-wordmark lockup"
          code={
            '<span class="ds-wordmark">\n  <svg class="ds-wordmark__mark" viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="1.5">…</svg>\n  <span class="ds-wordmark__name ds-title">Diametral</span>\n</span>'
          }
        >
          <span className="ds-wordmark">
            <svg
              className="ds-wordmark__mark"
              viewBox="0 0 56 56"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <circle cx={28} cy={28} r={24} />
              <rect x={12} y={12} width={32} height={32} />
              <line x1={12} y1={44} x2={44} y2={12} />
            </svg>
            <span className="ds-wordmark__name ds-title">Diametral</span>
          </span>
        </Example>
        <p className={P}>
          The lockup classes — <code className="font-mono text-xs">.ds-wordmark</code>,{" "}
          <code className="font-mono text-xs">.ds-wordmark__mark</code>,{" "}
          <code className="font-mono text-xs">.ds-wordmark__name</code> —
          ship in <code className="font-mono text-xs">css/components/app-bar.css</code>.
        </p>
      </Section>

      <Section title="Clear space & misuse">
        <p className={P}>
          Keep clear space around the mark equal to the circle's radius.
          Never round it, add shadow or gradient, or rotate it. Use ink on
          light surfaces and white on dark — no other colourways.
        </p>
      </Section>
    </div>
  )
}
