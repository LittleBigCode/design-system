import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@diametral/ui/components/bubble"

export default function BubbleWithReactions() {
  return (
    <BubbleGroup className="max-w-md gap-6 bg-card">
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
