import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@diametral/ui/components/bubble"

const TURNS = [
  { from: "them", text: "Can I retheme this without touching components?" },
  {
    from: "me",
    text: "Yes — override the --ds-* tokens. Components only ever read them.",
  },
  { from: "them", text: "And the radius?" },
  { from: "me", text: "Square by charter. That one is not a token." },
]

export default function BubbleConversation() {
  return (
    <BubbleGroup className="max-w-md">
      {TURNS.map((turn, index) => (
        <Bubble
          key={index}
          align={turn.from === "me" ? "end" : "start"}
          variant={turn.from === "me" ? "default" : "muted"}
        >
          <BubbleContent>{turn.text}</BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  )
}
