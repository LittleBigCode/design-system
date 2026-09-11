import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@diametral/design-system/react"
import { EyeIcon, FileTextIcon, SealCheckIcon } from "@phosphor-icons/react"

const STEPS = [
  { title: "Brief", icon: FileTextIcon, state: "completed" as const },
  { title: "Review", icon: EyeIcon, state: "active" as const },
  { title: "Sign-off", icon: SealCheckIcon, state: "inactive" as const },
]

export default function StepperIconIndicators() {
  return (
    <Stepper className="max-w-xl">
      {STEPS.map(({ icon: Icon, ...step }) => (
        <StepperItem key={step.title} state={step.state}>
          <StepperIndicator>
            <Icon aria-hidden />
          </StepperIndicator>
          <StepperContent>
            <StepperTitle>{step.title}</StepperTitle>
          </StepperContent>
        </StepperItem>
      ))}
    </Stepper>
  )
}
