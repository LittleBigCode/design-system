import { useState } from "react"

import { Button, Modal, ScrollArea } from "@diametral/design-system/react"

const CLAUSES = [
  {
    title: "1. Scope",
    body: "These terms cover the hosted design system, its token exports and the documentation site.",
  },
  {
    title: "2. Data processing",
    body: "Component telemetry is aggregated per workspace and retained for thirteen months.",
  },
  {
    title: "3. Sub-processors",
    body: "The current list is published in the trust centre; changes are announced thirty days ahead.",
  },
  {
    title: "4. Availability",
    body: "The docs site targets 99.9% monthly uptime, measured against the status page probes.",
  },
  {
    title: "5. Termination",
    body: "Either party may end the agreement at renewal; exported tokens stay yours indefinitely.",
  },
]

export default function ScrollAreaInADialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Read the terms</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        heading="Processing terms"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Decline</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Accept
            </Button>
          </>
        }
      >
        <p className="text-muted-foreground mb-4 text-sm">
          Version 4.2, effective 1 March 2026.
        </p>
        {/* Where the height comes from the surface around it: capping the body
            keeps the modal's heading and footer on screen while the terms
            scroll between them. */}
        <ScrollArea className="border-border h-56 border">
          <div className="flex flex-col gap-4 p-4">
            {CLAUSES.map((clause) => (
              <section key={clause.title} className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">{clause.title}</h3>
                <p className="text-muted-foreground text-sm">{clause.body}</p>
              </section>
            ))}
          </div>
        </ScrollArea>
      </Modal>
    </>
  )
}
