import type { ComponentProps } from "react"

import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@diametral/ui/components/stepper"

export default function StepperPlayground(
  props: ComponentProps<typeof Stepper>
) {
  return (
    <Stepper {...props}>
      <StepperItem state="completed">
        <StepperIndicator>1</StepperIndicator>
        <StepperContent>
          <StepperTitle>Scope</StepperTitle>
        </StepperContent>
        <StepperSeparator />
      </StepperItem>
      <StepperItem state="active">
        <StepperIndicator>2</StepperIndicator>
        <StepperContent>
          <StepperTitle>Build</StepperTitle>
          <StepperDescription>Two sprints, review at each</StepperDescription>
        </StepperContent>
        <StepperSeparator />
      </StepperItem>
      <StepperItem>
        <StepperIndicator>3</StepperIndicator>
        <StepperContent>
          <StepperTitle>Hand over</StepperTitle>
        </StepperContent>
      </StepperItem>
    </Stepper>
  )
}
