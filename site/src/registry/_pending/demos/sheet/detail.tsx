import { Button } from "@diametral/ui/components/button"
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@diametral/ui/components/description-list"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@diametral/ui/components/sheet"
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@diametral/ui/components/status"

const HISTORY = [
  { at: "12 May, 09:14", event: "Invoice issued to Régie Ouest" },
  { at: "12 May, 09:15", event: "Sent to compta@regie-ouest.fr" },
  { at: "14 May, 16:02", event: "Opened by Camille Perrot" },
  { at: "21 May, 11:30", event: "Reminder scheduled for 2 June" },
  { at: "2 June, 08:00", event: "Reminder sent automatically" },
]

export default function SheetDetail() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        INV-2048
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>INV-2048</SheetTitle>
          <SheetDescription>
            Refonte du design system, phase 2.
          </SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-8">
          <DescriptionList>
            <DescriptionTerm>Status</DescriptionTerm>
            <DescriptionDetail>
              <Status tone="warning">
                <StatusIndicator />
                <StatusLabel>Awaiting payment</StatusLabel>
              </Status>
            </DescriptionDetail>
            <DescriptionTerm>Amount</DescriptionTerm>
            <DescriptionDetail>12 400 €</DescriptionDetail>
            <DescriptionTerm>Issued</DescriptionTerm>
            <DescriptionDetail>12 May 2026</DescriptionDetail>
            <DescriptionTerm>Due</DescriptionTerm>
            <DescriptionDetail>11 June 2026</DescriptionDetail>
            <DescriptionTerm>Terms</DescriptionTerm>
            <DescriptionDetail>30 days, net</DescriptionDetail>
          </DescriptionList>
          <h3 className="mt-8 mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            History
          </h3>
          <ol className="flex flex-col gap-2 text-sm">
            {HISTORY.map((entry) => (
              <li key={entry.at} className="flex flex-col">
                <span className="text-foreground">{entry.event}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {entry.at}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <SheetFooter>
          <Button>Record payment</Button>
          <SheetClose render={<Button variant="ghost" />}>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
