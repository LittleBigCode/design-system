import { Button, Wordmark } from "@diametral/design-system/react"

const COLUMNS = [
  { heading: "Product", links: ["Matrix", "Margin engine", "Reporting"] },
  { heading: "Company", links: ["About", "Careers", "Contact"] },
  { heading: "Resources", links: ["Docs", "Changelog", "Status"] },
]

export default function Footer01() {
  return (
    <div className="w-full px-8 py-6">
      <div className="ds-marks px-8 py-14 text-center">
        <p className="ds-kicker">Get started</p>
        <h2 className="ds-title mt-3.5 text-4xl">
          Bring structure to your pricing.
        </h2>
        <p className="mx-auto mt-3.5 mb-6 max-w-[46ch] leading-relaxed text-muted-foreground">
          Stand up your first pricing matrix in minutes — no build step, no
          black box.
        </p>
        <Button variant="primary" size="lg" render={<a href="#footer-01" />}>
          Open the demo app
        </Button>
      </div>

      <hr className="ds-rule-x ds-rule-x--accent" />

      <footer className="grid gap-8 pt-7 sm:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-2 max-w-[34ch] leading-relaxed text-muted-foreground">
            Minimal · Enduring · Elegant. Pricing intelligence on a visible
            grid.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h3 className="mb-3 text-[11px] tracking-wider text-muted-foreground uppercase">
              {column.heading}
            </h3>
            <ul className="flex flex-col gap-1.5">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#footer-01"
                    className="text-sm text-muted-foreground no-underline hover:text-accent"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </footer>
    </div>
  )
}
