import { P, Section } from "@/docs/foundation-example"

function Swatch({
  name,
  meta,
  background,
  token,
  border,
}: {
  name: string
  meta: string
  background: string
  token: string
  border?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="size-14"
        style={{
          background,
          border: border ? "1px solid var(--ds-rule)" : undefined,
        }}
      />
      <div className="text-xs">
        <div className="font-medium">{name}</div>
        <div className="text-muted-foreground">{meta}</div>
        <div className="font-mono text-[11px] text-muted-foreground">
          {token}
        </div>
      </div>
    </div>
  )
}

export function Color() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Foundations
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Color
        </h1>
        <p className={`mt-3 ${P}`}>
          Three tiers: brand primitives (the charter palette), the neutral UI
          ramp, and semantic tokens that components actually read. The brand
          palette is charter-canonical; the muted status hues come from the
          original app.
        </p>
      </header>

      <Section title="Brand · primary">
        <div className="flex flex-wrap gap-4">
          <Swatch name="Noir" meta="#161616" token="--ds-noir" background="#161616" />
          <Swatch name="Gris" meta="#767884" token="--ds-gris" background="#767884" />
          <Swatch name="Marron" meta="#9F8667" token="--ds-marron" background="#9f8667" />
          <Swatch name="Kaki" meta="#AAB0A6" token="--ds-kaki" background="#aab0a6" />
          <Swatch name="Beige" meta="#D5D3C4" token="--ds-beige" background="#d5d3c4" />
          <Swatch name="Jaune" meta="#F4FBDA" token="--ds-jaune" background="#f4fbda" />
        </div>
      </Section>

      <Section title="Brand · secondary">
        <p className={P}>
          Accent / illustration colors.{" "}
          <code className="font-mono text-xs">--ds-vert</code> is sampled
          from the charter (its swatch label was a typo) and should be
          confirmed with the brand owner before 1.0.
        </p>
        <div className="flex flex-wrap gap-4">
          <Swatch name="Rouge (signal)" meta="#FF2A00" token="--ds-rouge" background="#ff2a00" />
          <Swatch name="Vert" meta="#89FC79" token="--ds-vert" background="#89fc79" />
          <Swatch name="Bleu" meta="#23E2FF" token="--ds-bleu" background="#23e2ff" />
          <Swatch name="Jaune vif" meta="#FFF73B" token="--ds-jaune-vif" background="#fff73b" />
        </div>
      </Section>

      <Section title="Semantic">
        <p className={P}>
          The only tier components read. Override these to theme the system
          (see <code className="font-mono text-xs">docs/theming.md</code>).
        </p>
        <div className="flex flex-wrap gap-4">
          <Swatch name="Ink" meta="text primary" token="--ds-ink" background="var(--ds-ink)" />
          <Swatch name="Ink soft" meta="text secondary" token="--ds-ink-soft" background="var(--ds-ink-soft)" />
          <Swatch name="Ink faint" meta="labels" token="--ds-ink-faint" background="var(--ds-ink-faint)" />
          <Swatch name="Bg alt" meta="#f5f5f5" token="--ds-bg-alt" background="var(--ds-bg-alt)" border />
          <Swatch name="Rule" meta="#cdced0" token="--ds-rule" background="var(--ds-rule)" />
          <Swatch name="Accent" meta="#FF2A00" token="--ds-accent" background="var(--ds-accent)" />
        </div>
      </Section>

      <Section title="Status">
        <div className="flex flex-wrap gap-4">
          <Swatch name="Success" meta="#2E7D4F" token="--ds-success" background="var(--ds-success)" />
          <Swatch name="Warning" meta="#FF5500" token="--ds-warning" background="var(--ds-warning)" />
          <Swatch name="Danger" meta="#C0392B" token="--ds-danger" background="var(--ds-danger)" />
          <Swatch name="Critical" meta="#161616" token="--ds-critical" background="var(--ds-critical)" />
          <Swatch name="Neutral" meta="#767884" token="--ds-neutral" background="var(--ds-neutral)" />
          <Swatch name="Info" meta="#1488A6" token="--ds-info" background="var(--ds-info)" />
        </div>
      </Section>
    </div>
  )
}
