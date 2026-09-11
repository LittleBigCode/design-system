import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@diametral/design-system/react"

const CLAUSES = [
  {
    value: "scope",
    title: "1. Scope of work",
    body: "The perimeter is the four screens listed in appendix A. Anything outside it is quoted separately.",
  },
  {
    value: "fees",
    title: "2. Fees and invoicing",
    body: "Invoiced monthly on the last working day, payable within thirty days.",
  },
  {
    value: "ip",
    title: "3. Intellectual property",
    body: "Rights transfer on final payment. The design system itself stays licensed, not sold.",
  },
]

export default function AccordionControlled() {
  const [open, setOpen] = React.useState(["scope"])
  const allOpen = open.length === CLAUSES.length

  return (
    <div className="w-full max-w-xl">
      <div className="mb-1 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setOpen(allOpen ? [] : CLAUSES.map((clause) => clause.value))
          }
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </Button>
      </div>
      <Accordion multiple value={open} onValueChange={setOpen}>
        {CLAUSES.map((clause) => (
          <AccordionItem key={clause.value} value={clause.value}>
            <AccordionTrigger>{clause.title}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {clause.body}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
