import { Example, P, Section } from "@/docs/foundation-example"

export function Layout() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Foundations
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Layout
        </h1>
        <p className={`mt-3 ${P}`}>
          Fixed max-width containers, a two-column working grid, and sticky
          chrome — collapsing to a single column at one deliberate
          breakpoint.
        </p>
      </header>

      <Section title="Max-widths">
        <p className={P}>
          Three container ceilings keep line lengths and surfaces composed:{" "}
          <code className="font-mono text-xs">--ds-maxw-page</code> (1440px)
          for the outer shell,{" "}
          <code className="font-mono text-xs">--ds-maxw-content</code>{" "}
          (1180px) for reading and dense content, and{" "}
          <code className="font-mono text-xs">--ds-maxw-modal</code> (860px)
          for dialogs.
        </p>
      </Section>

      <Section title="Two-column grid">
        <Example
          label="Main 1fr · aside 380px"
          center={false}
          code={
            '<div style="display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:40px">\n  <div>Main (1fr)</div>\n  <div>Aside (380px)</div>\n</div>'
          }
        >
          <div className="grid w-full grid-cols-[minmax(0,1fr)_140px] gap-6 sm:grid-cols-[minmax(0,1fr)_200px]">
            <div className="bg-muted p-6">Main (1fr)</div>
            <div className="bg-muted p-6">Aside (380px)</div>
          </div>
        </Example>
      </Section>

      <Section title="Sticky & responsive">
        <p className={P}>
          The application header is sticky at{" "}
          <code className="font-mono text-xs">top:0</code> with{" "}
          <code className="font-mono text-xs">z-index:var(--ds-z-header)</code>{" "}
          (40); the aside column sticks alongside the scrolling main. A
          single breakpoint at{" "}
          <code className="font-mono text-xs">--ds-bp-md</code> (940px)
          collapses the two-column grid down to one column.
        </p>
      </Section>
    </div>
  )
}
