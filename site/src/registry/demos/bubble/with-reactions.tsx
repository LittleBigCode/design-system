import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@diametral/design-system/react"

export default function BubbleWithReactions() {
  return (
    <BubbleGroup className="ds-bubble-group--loose bg-card max-w-md">
      <Bubble variant="muted">
        <BubbleContent>Shipping the charter update tonight.</BubbleContent>
        <BubbleReactions>🎉 2</BubbleReactions>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Reviewed — go ahead.</BubbleContent>
        <BubbleReactions side="top" align="start">
          👍
        </BubbleReactions>
      </Bubble>
    </BubbleGroup>
  )
}
