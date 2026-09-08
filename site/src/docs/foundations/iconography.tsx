import { Example, P, Section } from "@/docs/foundation-example"

const ICON_PATHS = [
  <line x1="12" y1="5" x2="12" y2="19" key="1" />,
  <line x1="5" y1="12" x2="19" y2="12" key="2" />,
]

export function Iconography() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Foundations
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Iconography
        </h1>
        <p className={`mt-3 ${P}`}>
          Line icons, drawn to match the mark: a 1.5 stroke in{" "}
          <code className="font-mono text-xs">currentColor</code>, on a
          square 24 viewBox, with sharp ends and no fills.
        </p>
      </header>

      <Section title="Sample set">
        <Example
          label="viewBox 0 0 24 24 · stroke 1.5"
          code={
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">\n  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>\n</svg>'
          }
        >
          {[
            ICON_PATHS,
            [<polyline points="4 12 10 18 20 6" key="1" />],
            [
              <line x1="4" y1="12" x2="20" y2="12" key="1" />,
              <polyline points="13 5 20 12 13 19" key="2" />,
            ],
            [
              <line x1="6" y1="6" x2="18" y2="18" key="1" />,
              <line x1="18" y1="6" x2="6" y2="18" key="2" />,
            ],
            [<circle cx="12" cy="12" r="8" key="1" />],
            [<rect x="4" y="4" width="16" height="16" key="1" />],
          ].map((children, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              width={28}
              height={28}
              className="text-foreground"
            >
              {children}
            </svg>
          ))}
        </Example>
      </Section>

      <Section title="Guidelines">
        <p className={P}>
          Draw on the 24-unit grid with a single 1.5 stroke, square caps and
          joins, and no fills. Inherit colour via{" "}
          <code className="font-mono text-xs">currentColor</code> so icons
          follow surrounding ink, and keep optical weight even with the
          wordmark. Avoid solid glyphs, two-tone treatments and rounded
          corners — the line language must echo the mark.
        </p>
      </Section>
    </div>
  )
}
