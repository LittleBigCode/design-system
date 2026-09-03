import {
  Button,
  Stepper,
  StepperContent,
  StepperDescription,
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
  { title: "Devis", description: "Envoyé le 12 juin." },
  { title: "Acompte", description: "30 % à la commande." },
  { title: "Production", description: "Trois semaines d'atelier." },
  { title: "Livraison", description: "Sur site, avec recette." },
]

export default function StepperVertical() {
  const [current, setCurrent] = React.useState(1)

  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <Stepper orientation="vertical">
        {STEPS.map((step, index) => (
          <StepperItem key={step.title} state={stepState(index, current)}>
            <StepperIndicator>{index + 1}</StepperIndicator>
            <StepperContent>
              <StepperTitle>{step.title}</StepperTitle>
              <StepperDescription>{step.description}</StepperDescription>
            </StepperContent>
          </StepperItem>
        ))}
      </Stepper>

      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => setCurrent((value) => Math.max(0, value - 1))}
        >
          Back
        </Button>
        <Button
          size="sm"
          onClick={() =>
            setCurrent((value) => Math.min(STEPS.length - 1, value + 1))
          }
        >
          Next
        </Button>
      </div>
    </div>
  )
}
