import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@diametral/ui/components/bubble"

const REPLIES = ["Send me the invoice", "Talk to a human", "Not now"]

export default function BubbleQuickReplies() {
  return (
    <BubbleGroup className="max-w-md">
      <Bubble variant="muted">
        <BubbleContent>
          Your plan renews on 12 September for 240 €. Anything else?
        </BubbleContent>
      </Bubble>
      {REPLIES.map((reply) => (
        <Bubble key={reply} align="end" variant="outline">
          <BubbleContent render={<button type="button" />}>
            {reply}
          </BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  )
}
