import {
  Button,
  Field,
  FieldLabel,
  Input,
  Panel,
  PanelContent,
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@diametral/design-system/react"
import * as React from "react"

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
          </StepperItem>
        ))}
      </Stepper>

      {/* Panel and Field are the absorbed parts since 1.0.0-beta.7: the label
          is a FieldLabel element rather than a prop, and the rows region is a
          PanelContent. */}
      <Panel rows>
        <PanelContent className="flex flex-col gap-4">
          {STEPS[current].fields.map((field) => (
            <Field key={field.id}>
              <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>
              <Input id={field.id} defaultValue={field.value} />
            </Field>
          ))}
        </PanelContent>
        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button
            size="sm"
            disabled={current === 0}
            onClick={() => setCurrent((value) => value - 1)}
          >
            Back
          </Button>
          <Button
            size="sm"
            variant="primary"
            disabled={current === STEPS.length - 1}
            onClick={() => setCurrent((value) => value + 1)}
          >
            Continue
          </Button>
        </div>
      </Panel>
    </div>
  )
}
