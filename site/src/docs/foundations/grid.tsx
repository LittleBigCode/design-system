import { Example, Section } from "@/docs/foundation-example"

export function Grid() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Foundations
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Grid system
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Beyond color and type, the brand is marked by{" "}
          <b>visible structural lines</b>: thin rules that frame the content
          column, divide it into ruled columns, and carry small registration
          ticks — with the accent marking key edges. Make the structure
          legible, never hidden.
        </p>
      </header>

      <Section title="Ruled columns">
        <p className="text-sm text-muted-foreground">
          Columns separated by visible 1px vertical rules over a top rule (
          <code className="font-mono text-xs">.ds-ruled</code> /{" "}
          <code className="font-mono text-xs">.ds-ruled__col</code>).
        </p>
        <Example
          label=".ds-ruled"
          center={false}
          code={
            '<div class="ds-ruled">\n  <div class="ds-ruled__col"><span class="ds-gridlabel">Design</span>…</div>\n  <div class="ds-ruled__col"><span class="ds-gridlabel">Build</span>…</div>\n  <div class="ds-ruled__col">…</div>\n</div>'
          }
        >
          <div className="ds-ruled w-full">
            {[
              ["Design", "Map the problem."],
              ["Build", "Engineer it."],
              ["Scale", "Deploy at scale."],
              ["Run", "Operate over time."],
            ].map(([label, body]) => (
              <div key={label} className="ds-ruled__col">
                <div className="ds-gridlabel">{label}</div>
                <p className="mt-2 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </Example>
      </Section>

      <Section title="Stat grid">
        <p className="text-sm text-muted-foreground">
          The "impact in numbers" pattern: ruled columns, an uppercase label
          with a leading accent tick, and a large display figure (
          <code className="font-mono text-xs">.ds-statgrid</code>).
        </p>
        <Example
          label=".ds-statgrid"
          center={false}
          code={
            '<div class="ds-statgrid">\n  <div class="ds-statgrid__cell">\n    <div class="ds-statgrid__label">Experience</div>\n    <div class="ds-statgrid__value">7<small> ans</small></div>\n  </div>\n  <!-- …more cells… -->\n</div>'
          }
        >
          <div className="ds-statgrid w-full">
            <div className="ds-statgrid__cell">
              <div className="ds-statgrid__label">Experience</div>
              <div className="ds-statgrid__value">
                7<small> ans</small>
              </div>
            </div>
            <div className="ds-statgrid__cell">
              <div className="ds-statgrid__label">Experts</div>
              <div className="ds-statgrid__value">
                120<small> +</small>
              </div>
            </div>
            <div className="ds-statgrid__cell">
              <div className="ds-statgrid__label">Projects</div>
              <div className="ds-statgrid__value">
                300<small> +</small>
              </div>
            </div>
            <div className="ds-statgrid__cell">
              <div className="ds-statgrid__label">Offices</div>
              <div className="ds-statgrid__value">7</div>
            </div>
          </div>
        </Example>
      </Section>

      <Section title="Framed column & accent edge">
        <p className="text-sm text-muted-foreground">
          Thin vertical rules at the content gutters (
          <code className="font-mono text-xs">.ds-frame</code>); accent the
          edges with{" "}
          <code className="font-mono text-xs">.ds-frame--accent</code>.
        </p>
        <Example
          label=".ds-frame"
          code='<div class="ds-frame ds-frame--accent">…</div>'
        >
          <div className="ds-frame ds-frame--accent max-w-[480px] px-7 py-6">
            <div className="ds-gridlabel mb-2.5">Section</div>
            <p className="text-muted-foreground">
              Content framed by visible gutter rules. The accent marks the
              structure.
            </p>
          </div>
        </Example>
      </Section>

      <Section title="Measured grid overlay">
        <p className="text-sm text-muted-foreground">
          Faint vertical column lines behind content (
          <code className="font-mono text-xs">.ds-gridlines</code>; set{" "}
          <code className="font-mono text-xs">--ds-grid-cols</code> for the
          count).
        </p>
        <Example
          label=".ds-gridlines"
          center={false}
          code='<div class="ds-gridlines" style="--ds-grid-cols:8">…</div>'
        >
          <div
            className="ds-gridlines w-full border border-border px-[22px] py-[34px]"
            style={{ ["--ds-grid-cols" as string]: 8 }}
          >
            <div className="ds-title ds-title--md">
              Structure, made visible
            </div>
            <p className="mt-1.5 text-muted-foreground">
              An 8-column measured grid sits behind the content.
            </p>
          </div>
        </Example>
      </Section>

      <Section title="Registration marks & ticked labels">
        <Example
          label=".ds-marks · .ds-gridlabel"
          code='<div class="ds-marks"><span class="ds-gridlabel">Expertise data &amp; AI</span></div>'
        >
          <div className="ds-marks px-7 py-6" style={{ border: "1px solid var(--ds-rule-soft)" }}>
            <span className="ds-gridlabel">Expertise data &amp; AI</span>
          </div>
        </Example>
      </Section>
    </div>
  )
}
