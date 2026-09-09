import walnut from "@/photography/texture-walnut.png"
import ice from "@/photography/texture-ice.png"

import { P, Section } from "@/docs/foundation-example"

export function Photography() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Foundations
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Photography
        </h1>
        <p className={`mt-3 ${P}`}>
          Natural macro textures — warm wood, cool ice and water. Organic and
          material, never tech cliché, echoing the warm (marron / beige) and
          cool (bleu) palette.
        </p>
      </header>

      <Section title="Direction">
        <div className="grid grid-cols-2 gap-3.5">
          <img
            src={walnut}
            alt="Walnut wood grain"
            className="w-full border border-border"
          />
          <img
            src={ice}
            alt="Ice and water texture"
            className="w-full border border-border"
          />
        </div>
      </Section>

      <Section title="Do & don't">
        <p className={P}>
          <strong>Do</strong> — natural materials, macro detail that reveals
          grain and structure, restrained and true-to-life colour drawn from
          the warm and cool palette.
        </p>
        <p className={P}>
          <strong>Don't</strong> — stock-photo people, tech gadgets and
          devices, or saturated filters and heavy grading.
        </p>
      </Section>
    </div>
  )
}
