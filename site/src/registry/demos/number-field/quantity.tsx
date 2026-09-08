import * as React from "react"

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@diametral/design-system/react"

const LINES = [
  { id: "chair", name: "Bureau chair", unitPrice: 320 },
  { id: "desk", name: "Standing desk", unitPrice: 690 },
  { id: "lamp", name: "Task lamp", unitPrice: 85 },
]

const EUR = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
})

export default function NumberFieldQuantity() {
  const [quantities, setQuantities] = React.useState<Record<string, number>>({
    chair: 2,
    desk: 1,
    lamp: 4,
  })

  const total = LINES.reduce(
    (sum, line) => sum + line.unitPrice * quantities[line.id],
    0
  )

  return (
    <div className="w-full max-w-sm">
      {LINES.map((line) => (
        <div
          key={line.id}
          className="flex items-center justify-between gap-4 border-b py-2"
        >
          <span className="text-sm">{line.name}</span>
          <NumberField
            className="w-28"
            min={0}
            max={99}
            value={quantities[line.id]}
            onValueChange={(value) =>
              setQuantities((current) => ({
                ...current,
                [line.id]: value ?? 0,
              }))
            }
          >
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput aria-label={`Quantity for ${line.name}`} />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
        </div>
      ))}
      <div className="flex items-center justify-between py-3 text-sm font-medium">
        <span>Total</span>
        <span className="tabular-nums">{EUR.format(total)}</span>
      </div>
    </div>
  )
}
