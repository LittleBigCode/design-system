import { Button } from "@diametral/design-system/react"

export default function Hero01() {
  return (
    <section
      className="ds-gridlines w-full px-8 py-14"
      style={{ ["--ds-grid-cols" as string]: 6 }}
    >
      <p className="ds-kicker">Pricing intelligence</p>
      <h1 className="ds-title mt-4 max-w-[16ch] text-5xl/none">
        Price every mission with confidence.
      </h1>
      <p className="mt-4 max-w-[52ch] leading-relaxed text-muted-foreground">
        A flat, structured pricing matrix that turns delegation thresholds,
        staffing and margin into one defensible number — visible structure, no
        black boxes.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button variant="primary" size="lg" render={<a href="#hero-01" />}>
          Open the demo
        </Button>
        <Button size="lg" render={<a href="#hero-01" />}>
          Read the docs
        </Button>
      </div>
    </section>
  )
}
