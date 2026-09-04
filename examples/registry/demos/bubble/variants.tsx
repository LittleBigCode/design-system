import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@diametral/design-system/react"

const VARIANTS = [
  "default",
  "secondary",
  "muted",
  "tinted",
  "outline",
  "ghost",
  "destructive",
] as const

export default function BubbleVariants() {
  return (
    <BubbleGroup className="max-w-md">
      {VARIANTS.map((variant) => (
        <Bubble key={variant} variant={variant}>
          <BubbleContent>{variant}</BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  )
}
