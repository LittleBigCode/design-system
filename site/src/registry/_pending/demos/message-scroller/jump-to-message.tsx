import { Bubble, BubbleContent } from "@diametral/ui/components/bubble"
import { Button } from "@diametral/ui/components/button"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "@diametral/ui/components/message-scroller"

const PINS = [
  { id: "kickoff", label: "Kick-off", text: "Kick-off notes are in the wiki." },
  {
    id: "tokens",
    label: "Tokens",
    text: "The palette is frozen at eight tones.",
  },
  { id: "radius", label: "Radius", text: "Square corners, no exceptions." },
  { id: "audit", label: "Audit", text: "The audit lands Thursday morning." },
]

const THREAD = PINS.flatMap((pin) => [
  { id: pin.id, mine: false, text: pin.text },
  { id: `${pin.id}-ack`, mine: true, text: "Noted — thanks." },
  {
    id: `${pin.id}-follow`,
    mine: false,
    text: "I will fold it into the recap.",
  },
])

function JumpBar() {
  const { scrollToMessage } = useMessageScroller()

  return (
    <div className="flex flex-wrap gap-2">
      {PINS.map((pin) => (
        <Button
          key={pin.id}
          variant="outline"
          size="xs"
          onClick={() => scrollToMessage(pin.id, { align: "start" })}
        >
          {pin.label}
        </Button>
      ))}
    </div>
  )
}

export default function MessageScrollerJumpToMessage() {
  return (
    <MessageScrollerProvider defaultScrollPosition="start">
      <div className="flex w-full max-w-md flex-col gap-3">
        <JumpBar />
        <div className="h-56 border border-border">
          <MessageScroller>
            <MessageScrollerViewport className="p-4">
              <MessageScrollerContent className="gap-2">
                {THREAD.map((message) => (
                  <MessageScrollerItem
                    key={message.id}
                    messageId={message.id}
                    className="flex flex-col"
                  >
                    <Bubble
                      align={message.mine ? "end" : "start"}
                      variant={message.mine ? "default" : "muted"}
                    >
                      <BubbleContent>{message.text}</BubbleContent>
                    </Bubble>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </div>
      </div>
    </MessageScrollerProvider>
  )
}
