import { Bubble, BubbleContent } from "@diametral/design-system/react"

/* Stylesheet-only component: `message-scroller`'s React binding wraps
   @shadcn/react, which this package does not depend on, so there are no
   MessageScroller* exports to import. The classes below are the whole
   contract — this is the markup a binding has to produce. The viewport really
   scrolls and the bottom fade is real; the pin-to-newest behaviour and the
   jump-back button's `data-active` are the binding's job. */
const HISTORY = Array.from({ length: 18 }, (_, index) => ({
  id: `m${index}`,
  mine: index % 3 === 0,
  text:
    index % 3 === 0
      ? "Understood."
      : `Message ${index + 1} — the charter defines the palette, the components only read it.`,
}))

export default function MessageScrollerBasic() {
  return (
    <div className="h-72 w-full max-w-md border border-border">
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
            {HISTORY.map((message) => (
              <div
                key={message.id}
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
  )
}
