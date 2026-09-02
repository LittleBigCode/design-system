import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import { Field, FieldLabel } from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"
import {
  Panel,
  PanelContent,
  PanelFooter,
} from "@diametral/ui/components/panel"
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@diametral/ui/components/stepper"

function stepState(index: number, current: number) {
  if (index < current) return "completed"
  if (index === current) return "active"
  return "inactive"
}

const STEPS = [
  {
    title: "Client",
    fields: [
      { id: "wizard-company", label: "Company", value: "Atelier Bosco" },
      { id: "wizard-contact", label: "Contact", value: "Amélie Roux" },
    ],
  },
  {
    title: "Delivery",
    fields: [
      { id: "wizard-street", label: "Street", value: "14 rue des Panoyaux" },
      { id: "wizard-city", label: "City", value: "Paris" },
    ],
  },
  {
    title: "Review",
    fields: [
      { id: "wizard-reference", label: "Order reference", value: "CMD-2044" },
    ],
  },
]

export default function StepperWizard() {
  const [current, setCurrent] = React.useState(1)

  return (
    <div className="flex w-full max-w-xl flex-col gap-5">
      <Stepper>
        {STEPS.map((step, index) => (
          <StepperItem key={step.title} state={stepState(index, current)}>
            <StepperIndicator>{index + 1}</StepperIndicator>
            <StepperContent>
              <StepperTitle>{step.title}</StepperTitle>
            </StepperContent>
            {index < STEPS.length - 1 && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>

      <Panel>
        <PanelContent className="flex flex-col gap-4 py-4">
          {STEPS[current].fields.map((field) => (
            <Field key={field.id}>
              <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>
              <Input id={field.id} defaultValue={field.value} />
            </Field>
          ))}
        </PanelContent>
        <PanelFooter className="justify-end gap-2 border-t">
          <Button
            size="sm"
            variant="ghost"
            disabled={current === 0}
            onClick={() => setCurrent((value) => value - 1)}
          >
            Back
          </Button>
          <Button
            size="sm"
            disabled={current === STEPS.length - 1}
            onClick={() => setCurrent((value) => value + 1)}
          >
            Continue
          </Button>
        </PanelFooter>
      </Panel>
    </div>
  )
}
