import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@diametral/ui/components/stepper"

const STEPS = [
  { title: "Scope", state: "completed" as const },
  { title: "Build", state: "active" as const },
  { title: "Hand over", state: "inactive" as const },
]

export default function StepperBasic() {
  return (
    <Stepper className="max-w-xl">
      {STEPS.map((step, index) => (
        <StepperItem key={step.title} state={step.state}>
          <StepperIndicator>{index + 1}</StepperIndicator>
          <StepperContent>
            <StepperTitle>{step.title}</StepperTitle>
          </StepperContent>
          {index < STEPS.length - 1 && <StepperSeparator />}
        </StepperItem>
      ))}
    </Stepper>
  )
}
