/* Stylesheet-only component: `resizable`'s React binding wraps
   react-resizable-panels, which this package does not depend on, so there are
   no Resizable* exports to import. The classes below are the whole contract —
   this is the markup a binding has to produce, and `.ds-resizable-*` styles it
   either way. The split is fixed here; the drag is the binding's job. */
export default function ResizableBasic() {
  return (
    // No aria-orientation on the group: aria allows it on separator, listbox,
    // menu, toolbar and friends, not on a generic container. The stylesheet
    // reads it only to flip to a column, so a side-by-side split — the default
    // — needs it absent, which is also the accessible answer.
    <div
      className="ds-resizable-panel-group border-border h-48 max-w-xl border"
      role="group"
      aria-label="Sidebar and editor split"
    >
      <div className="basis-[35%]">
        <div
          tabIndex={0}
          className="flex size-full items-center justify-center p-4 text-xs font-semibold tracking-widest uppercase"
        >
          Sidebar
        </div>
      </div>
      {/* aria-orientation names the rule's own axis, so a side-by-side split
          takes a vertical handle — which is also .ds-resizable-handle's
          default 1px-wide shape. */}
      {/* A focusable separator is a resize control, so it owes
          aria-valuenow/min/max — the numbers a binding keeps in step with the
          drag. Fixed here, since this split does not move. */}
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
        aria-valuenow={35}
        aria-valuemin={20}
        aria-valuemax={80}
        tabIndex={0}
        className="ds-resizable-handle"
      >
        <div className="ds-resizable-handle-grip" />
      </div>
      <div className="basis-[65%]">
        <div
          tabIndex={0}
          className="flex size-full items-center justify-center p-4 text-xs font-semibold tracking-widest uppercase"
        >
          Editor
        </div>
      </div>
    </div>
  )
}
