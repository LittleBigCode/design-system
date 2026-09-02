import { Card, Separator } from "@diametral/design-system/react"

export default function SeparatorInACard() {
  return (
    <Card className="w-full max-w-sm" title="Billing">
      <p className="text-muted-foreground text-sm">Team plan, billed yearly.</p>
      {/* Edge-to-edge needs the row padding to be the row's, not the card's:
          .ds-card__body already pads, so the rule spans the body's full width. */}
      <Separator className="my-4" />
      <div className="flex items-baseline justify-between">
        <span className="text-muted-foreground">Next invoice</span>
        <span className="tabular-nums">€1,248.00</span>
      </div>
      <Separator className="my-4" />
      <div className="flex items-baseline justify-between">
        <span className="text-muted-foreground">Payment method</span>
        <span>Visa ···· 4242</span>
      </div>
    </Card>
  )
}
