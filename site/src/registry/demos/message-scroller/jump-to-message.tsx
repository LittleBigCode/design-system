import * as React from "react"

import { Bubble, BubbleContent, Button } from "@diametral/design-system/react"

/* No MessageScroller* React binding exists (see message-scroller/basic.tsx —
   stylesheet-only, no @shadcn/react dependency), so there is no
   useMessageScroller().scrollToMessage. Refs keyed by message id stand in for
   it. */
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

export default function MessageScrollerJumpToMessage() {
  const itemRefs = React.useRef(new Map<string, HTMLDivElement>())

  function scrollToMessage(id: string) {
    itemRefs.current
      .get(id)
      ?.scrollIntoView({ block: "start", behavior: "smooth" })
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {PINS.map((pin) => (
          <Button
            key={pin.id}
            variant="outline"
            size="xs"
            onClick={() => scrollToMessage(pin.id)}
          >
            {pin.label}
          </Button>
        ))}
      </div>
      <div className="h-56 border border-border">
        <div className="ds-message-scroller">
          <div
            className="ds-message-scroller-viewport p-4"
            role="region"
            aria-label="Messages"
            tabIndex={0}
          >
            <div
              className="ds-message-scroller-content ds-message-scroller-content--tight"
              role="log"
              aria-relevant="additions"
            >
              {THREAD.map((message) => (
                <div
                  key={message.id}
                  ref={(node) => {
                    if (node) itemRefs.current.set(message.id, node)
                    else itemRefs.current.delete(message.id)
                  }}
                  className="ds-message-scroller-item flex flex-col"
                >
                  <Bubble
                    align={message.mine ? "end" : "start"}
                    variant={message.mine ? "default" : "muted"}
                  >
                    <BubbleContent>{message.text}</BubbleContent>
                  </Bubble>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
