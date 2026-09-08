import * as React from "react"

import { Bubble, BubbleContent, Button } from "@diametral/design-system/react"

const TRANSCRIPT = Array.from({ length: 24 }, (_, index) => ({
  id: `m${index + 1}`,
  mine: index % 4 === 0,
  text: `Message ${index + 1} of the archived thread.`,
}))

const PAGE = 8

/* No MessageScroller* React binding exists (see message-scroller/basic.tsx —
   stylesheet-only, no @shadcn/react dependency), so there is no
   `preserveScrollOnPrepend`. Scroll position is preserved by hand: capture
   the viewport's scrollHeight before prepending, then restore the same
   distance from the top once the new messages have laid out. */
export default function MessageScrollerOlderMessages() {
  const [shown, setShown] = React.useState(PAGE)
  const visible = TRANSCRIPT.slice(-shown)
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const previousHeight = React.useRef<number | undefined>(undefined)

  React.useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || previousHeight.current === undefined) return
    viewport.scrollTop += viewport.scrollHeight - previousHeight.current
    previousHeight.current = undefined
  }, [shown])

  function loadEarlier() {
    previousHeight.current = viewportRef.current?.scrollHeight
    setShown((current) => Math.min(TRANSCRIPT.length, current + PAGE))
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        disabled={shown >= TRANSCRIPT.length}
        onClick={loadEarlier}
      >
        Load earlier messages
      </Button>

      <div className="h-64 border border-border">
        <div className="ds-message-scroller">
          <div
            ref={viewportRef}
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
              {visible.map((message) => (
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
    </div>
  )
}
