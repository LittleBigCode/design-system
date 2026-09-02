import * as React from "react"

import { Bubble, BubbleContent } from "@diametral/ui/components/bubble"
import { Button } from "@diametral/ui/components/button"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@diametral/ui/components/message-scroller"

const TRANSCRIPT = Array.from({ length: 24 }, (_, index) => ({
  id: `m${index + 1}`,
  mine: index % 4 === 0,
  text: `Message ${index + 1} of the archived thread.`,
}))

const PAGE = 8

export default function MessageScrollerOlderMessages() {
  const [shown, setShown] = React.useState(PAGE)
  const visible = TRANSCRIPT.slice(-shown)

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        disabled={shown >= TRANSCRIPT.length}
        onClick={() =>
          setShown((current) => Math.min(TRANSCRIPT.length, current + PAGE))
        }
      >
        Load earlier messages
      </Button>

      <div className="h-64 border border-border">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport className="p-4" preserveScrollOnPrepend>
              <MessageScrollerContent className="gap-2">
                {visible.map((message) => (
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
        </MessageScrollerProvider>
      </div>
    </div>
  )
}
