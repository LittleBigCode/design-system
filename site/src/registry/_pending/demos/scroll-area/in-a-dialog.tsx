import { Button } from "@diametral/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@diametral/ui/components/dialog"
import { ScrollArea } from "@diametral/ui/components/scroll-area"

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
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Read the terms
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Processing terms</DialogTitle>
          <DialogDescription>
            Version 4.2, effective 1 March 2026.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-56 border border-border">
          <div className="flex flex-col gap-4 p-4">
            {CLAUSES.map((clause) => (
              <section key={clause.title} className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">{clause.title}</h3>
                <p className="text-sm text-muted-foreground">{clause.body}</p>
              </section>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Decline
          </DialogClose>
          <DialogClose render={<Button />}>Accept</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
