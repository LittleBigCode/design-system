import * as React from "react"

import { Bubble, BubbleContent, Button } from "@diametral/design-system/react"

/* No MessageScroller* React binding exists (see message-scroller/basic.tsx —
   stylesheet-only, no @shadcn/react dependency). Autoscroll-when-pinned and
   the jump-to-latest button are hand-rolled here against the same
   data-active / data-direction contract message-scroller.css keys off. */
export default function MessageScrollerAutoscroll() {
  const [messages, setMessages] = React.useState(() =>
    Array.from({ length: 6 }, (_, index) => `Message ${index + 1}`)
  )
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = React.useState(true)

  React.useEffect(() => {
    if (pinned) {
      viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight })
    }
  }, [messages, pinned])

  function jumpToLatest() {
    const viewport = viewportRef.current
    if (!viewport) return
    viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" })
    setPinned(true)
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="h-56 border border-border">
        <div className="ds-message-scroller">
          <div
            ref={viewportRef}
            className="ds-message-scroller-viewport p-4"
            role="region"
            aria-label="Messages"
            tabIndex={0}
            onScroll={(event) => {
              const el = event.currentTarget
              setPinned(el.scrollHeight - el.scrollTop - el.clientHeight < 24)
            }}
          >
            <div
              className="ds-message-scroller-content ds-message-scroller-content--tight"
              role="log"
              aria-relevant="additions"
            >
              {messages.map((text) => (
                <div key={text} className="ds-message-scroller-item">
                  <Bubble variant="muted">
                    <BubbleContent>{text}</BubbleContent>
                  </Bubble>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ds-message-scroller-button"
            data-direction="end"
            data-active={pinned ? "false" : "true"}
            onClick={jumpToLatest}
          >
            Jump to latest
          </Button>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() =>
          setMessages((current) => [
            ...current,
            `Message ${current.length + 1}`,
          ])
        }
      >
        Append message
      </Button>
    </div>
  )
}
