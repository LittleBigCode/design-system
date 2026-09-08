import { P, Section } from "@/docs/foundation-example"

const SCALE = [
  ["space-1", 4],
  ["space-2", 8],
  ["space-3", 12],
  ["space-4", 16],
  ["space-5", 24],
  ["space-6", 32],
  ["space-7", 40],
  ["space-8", 80],
] as const

export function Spacing() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Foundations
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Spacing
        </h1>
        <p className={`mt-3 ${P}`}>
          An eight-step px scale lifted directly from the source app, so
          layouts built on it match the original pixel for pixel.
        </p>
      </header>

      <Section title="Scale">
        <div className="flex flex-col divide-y divide-border border border-border">
          {SCALE.map(([name, px]) => (
            <div key={name} className="flex items-center gap-4 px-3 py-2">
              <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">
                {name} · {px}px
              </span>
              <div
                className="h-4 bg-accent"
                style={{ width: `${px}px` }}
              />
            </div>
          ))}
        </div>
        <p className={P}>
          Components use literal px matching the source for exact parity;
          the scale tokens are for new work.
        </p>
      </Section>
    </div>
  )
}
