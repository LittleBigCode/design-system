import { Example, P, Section } from "@/docs/foundation-example"

const FEATURES = [
  ["Map", "Delegation matrix", "Encode thresholds and approval rules so every quote follows the same defensible path."],
  ["Build", "Margin engine", "Compose cost, staffing and risk into a live margin you can inspect line by line."],
  ["Run", "Audit trail", "Every change is recorded and reportable — pricing decisions stay traceable over time."],
] as const

const STATS = [
  ["Quotes priced", "12", " k"],
  ["Avg. margin lift", "8", " pts"],
  ["Teams", "240", " +"],
  ["Uptime", "99.9", " %"],
] as const

const FOOTER_COLS = [
  ["Product", ["Matrix", "Margin engine", "Reporting"]],
  ["Company", ["About", "Careers", "Contact"]],
  ["Resources", ["Docs", "Changelog", "Status"]],
] as const

export function Marketing() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Blocks
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Marketing
        </h1>
        <p className={`mt-3 ${P}`}>
          On-brand marketing sections assembled from existing{" "}
          <code className="font-mono text-xs">.ds-*</code> primitives, built
          on the <b>visible grid system</b> — thin 1px rules, ruled columns,
          registration ticks and the accent edge. Flat, no radius, no shadow.
        </p>
      </header>

      <Section title="Hero">
        <p className={P}>
          A measured-grid band (<code className="font-mono text-xs">.ds-gridlines</code>{" "}
          with <code className="font-mono text-xs">--ds-grid-cols:6</code>)
          carrying a kicker, an Ufficio headline, a lede and two buttons.
        </p>
        <Example
          label="Hero band"
          center={false}
          code={
            '<div class="ds-gridlines" style="--ds-grid-cols:6; padding:56px 32px">\n  <p class="ds-kicker">Pricing intelligence</p>\n  <h2 class="ds-title" style="font-size:52px;line-height:1.02;max-width:16ch">Price every mission with confidence.</h2>\n  <p style="max-width:52ch;color:var(--ds-ink-soft)">A flat, structured pricing matrix…</p>\n  <div style="margin-top:28px;display:flex;gap:12px">\n    <a class="ds-button ds-button--primary ds-button--lg" href="#">Open the demo</a>\n    <a class="ds-button ds-button--lg" href="#">Read the docs</a>\n  </div>\n</div>'
          }
        >
          <div
            className="ds-gridlines w-full px-8 py-14"
            style={{ ["--ds-grid-cols" as string]: 6 }}
          >
            <p className="ds-kicker">Pricing intelligence</p>
            <h2
              className="ds-title mt-4 max-w-[16ch]"
              style={{ fontSize: 52, lineHeight: 1.02 }}
            >
              Price every mission with confidence.
            </h2>
            <p
              className="mt-4 max-w-[52ch] leading-relaxed"
              style={{ color: "var(--ds-ink-soft)" }}
            >
              A flat, structured pricing matrix that turns delegation
              thresholds, staffing and margin into one defensible number —
              visible structure, no black boxes.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="ds-button ds-button--primary ds-button--lg" href="#">
                Open the demo
              </a>
              <a className="ds-button ds-button--lg" href="#">
                Read the docs
              </a>
            </div>
          </div>
        </Example>
      </Section>

      <Section title="Feature grid">
        <p className={P}>
          Three ruled columns (<code className="font-mono text-xs">.ds-ruled</code>{" "}
          / <code className="font-mono text-xs">.ds-ruled__col</code>), each
          led by a ticked label (
          <code className="font-mono text-xs">.ds-gridlabel</code>) over an
          Ufficio sub-title and copy.
        </p>
        <Example
          label=".ds-ruled · .ds-gridlabel"
          center={false}
          code={
            '<div class="ds-ruled">\n  <div class="ds-ruled__col">\n    <span class="ds-gridlabel">Map</span>\n    <h3 style="font-family:var(--ds-font-title)">Delegation matrix</h3>\n    <p style="color:var(--ds-ink-soft)">Encode thresholds and approval rules…</p>\n  </div>\n  <!-- …more columns… -->\n</div>'
          }
        >
          <div className="ds-ruled w-full">
            {FEATURES.map(([label, title, copy]) => (
              <div key={label} className="ds-ruled__col">
                <span className="ds-gridlabel">{label}</span>
                <h3 className="font-heading mt-3 mb-1.5 text-lg font-light">
                  {title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </Example>
      </Section>

      <Section title="Pricing">
        <p className={P}>
          Three <code className="font-mono text-xs">.ds-card</code> columns;
          the middle one is featured with{" "}
          <code className="font-mono text-xs">.ds-frame--accent</code> and a{" "}
          <code className="font-mono text-xs">.ds-badge--accent</code>. Each
          carries an Ufficio price, a feature list and a primary button.
        </p>
        <Example
          label=".ds-card · .ds-frame--accent"
          center={false}
          code={
            '<div style="display:grid;grid-template-columns:repeat(3,1fr)">\n  <div class="ds-card">…Starter…</div>\n  <div class="ds-card ds-frame--accent">\n    <div class="ds-card__header">\n      <span class="ds-badge ds-badge--accent">Most popular</span>\n      <p style="font-family:var(--ds-font-title);font-size:40px">€49<small> / mo</small></p>\n    </div>\n    <div class="ds-card__body"><ul><li>Unlimited matrices</li>…</ul></div>\n    <div style="padding:16px 20px"><a class="ds-button ds-button--primary" href="#">Choose Growth</a></div>\n  </div>\n  <div class="ds-card">…Scale…</div>\n</div>'
          }
        >
          <div className="grid w-full sm:grid-cols-3">
            {[
              {
                tag: <span className="ds-gridlabel">Starter</span>,
                price: "€0",
                accent: false,
                feats: ["1 pricing matrix", "3 seats", "Manual export"],
                cta: "Start free",
              },
              {
                tag: <span className="ds-badge ds-badge--accent">Most popular</span>,
                price: "€49",
                accent: true,
                feats: [
                  "Unlimited matrices",
                  "20 seats",
                  "Live margin engine",
                  "API access",
                ],
                cta: "Choose Growth",
              },
              {
                tag: <span className="ds-gridlabel">Scale</span>,
                price: "€199",
                accent: false,
                feats: [
                  "Everything in Growth",
                  "Unlimited seats",
                  "SSO & audit log",
                  "Dedicated support",
                ],
                cta: "Contact sales",
              },
            ].map((plan) => (
              <div
                key={plan.cta}
                className={
                  plan.accent
                    ? "ds-card ds-frame--accent"
                    : "ds-card border-s-0 first:border-s"
                }
              >
                <div className="ds-card__header">
                  {plan.tag}
                  <p
                    className="mt-1 font-heading text-4xl tracking-tight"
                    style={{ fontWeight: "var(--ds-font-weight-title)" }}
                  >
                    {plan.price}
                    <small className="ml-1 text-sm text-muted-foreground">
                      {" "}
                      / mo
                    </small>
                  </p>
                </div>
                <div className="ds-card__body">
                  <ul className="mt-2 list-none divide-y divide-[var(--ds-rule-soft)] p-0 text-sm text-muted-foreground">
                    {plan.feats.map((feat) => (
                      <li key={feat} className="py-2.5 first:border-t-0">
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-5 py-4">
                  <a
                    className="ds-button ds-button--primary w-full no-underline"
                    href="#"
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Example>
      </Section>

      <Section title="Stat band">
        <p className={P}>
          The "impact in numbers" band (
          <code className="font-mono text-xs">.ds-statgrid</code>) — four
          ruled cells with a ticked label and a large display figure.
        </p>
        <Example
          label=".ds-statgrid"
          center={false}
          code={
            '<div class="ds-statgrid">\n  <div class="ds-statgrid__cell">\n    <div class="ds-statgrid__label">Quotes priced</div>\n    <div class="ds-statgrid__value">12<small> k</small></div>\n  </div>\n  <!-- …three more cells… -->\n</div>'
          }
        >
          <div className="ds-statgrid w-full">
            {STATS.map(([label, value, suffix]) => (
              <div key={label} className="ds-statgrid__cell">
                <div className="ds-statgrid__label">{label}</div>
                <div className="ds-statgrid__value">
                  {value}
                  <small>{suffix}</small>
                </div>
              </div>
            ))}
          </div>
        </Example>
      </Section>

      <Section title="CTA + footer">
        <p className={P}>
          A centered call-to-action over a multi-column link footer, framed
          with a horizontal accent rule (
          <code className="font-mono text-xs">.ds-rule-x</code>) and corner
          registration marks (
          <code className="font-mono text-xs">.ds-marks</code>).
        </p>
        <Example
          label=".ds-rule-x · .ds-marks"
          center={false}
          code={
            '<div class="ds-marks" style="text-align:center;padding:56px 32px">\n  <p class="ds-kicker">Get started</p>\n  <h2 class="ds-title" style="font-size:40px">Bring structure to your pricing.</h2>\n  <a class="ds-button ds-button--primary ds-button--lg" href="#">Open the demo app</a>\n</div>\n\n<hr class="ds-rule-x ds-rule-x--accent">\n\n<div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px">\n  <div><div style="font-family:var(--ds-font-title)">Diametral</div>…</div>\n  <div><h4>Product</h4><ul><li><a href="#">Matrix</a></li>…</ul></div>\n  <!-- …more columns… -->\n</div>'
          }
        >
          <div className="w-full">
            <div className="ds-marks px-8 py-14 text-center">
              <p className="ds-kicker">Get started</p>
              <h2 className="ds-title mt-3.5" style={{ fontSize: 40 }}>
                Bring structure to your pricing.
              </h2>
              <p className="mx-auto mt-3.5 mb-6 max-w-[46ch] leading-relaxed text-muted-foreground">
                Stand up your first pricing matrix in minutes — no build
                step, no black box.
              </p>
              <a className="ds-button ds-button--primary ds-button--lg" href="#">
                Open the demo app
              </a>
            </div>
            <hr className="ds-rule-x ds-rule-x--accent" />
            <div className="grid gap-8 px-1 pt-7 sm:grid-cols-[2fr_1fr_1fr_1fr]">
              <div>
                <div className="font-heading text-lg tracking-tight">
                  Diametral
                </div>
                <p className="mt-2 max-w-[34ch] leading-relaxed text-muted-foreground">
                  Minimal · Enduring · Elegant. Pricing intelligence on a
                  visible grid.
                </p>
              </div>
              {FOOTER_COLS.map(([heading, links]) => (
                <div key={heading}>
                  <h4 className="mb-3 text-[11px] tracking-wider text-muted-foreground uppercase">
                    {heading}
                  </h4>
                  <ul className="list-none space-y-1.5 p-0">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground no-underline hover:text-accent"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Example>
      </Section>
    </div>
  )
}
