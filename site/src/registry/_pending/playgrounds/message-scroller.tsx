import type { ComponentProps } from "react"

import { Bubble, BubbleContent } from "@diametral/ui/components/bubble"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@diametral/ui/components/message-scroller"

const HISTORY = Array.from({ length: 14 }, (_, index) => `Message ${index + 1}`)

// The controls drive the provider, because that is where the scroll behaviour
// lives — Root, Viewport and Button all read its context.
export default function MessageScrollerPlayground(
  props: ComponentProps<typeof MessageScrollerProvider>
) {
  return (
    <div className="h-56 w-full max-w-3xs border border-border">
      <MessageScrollerProvider {...props}>
        <MessageScroller>
          <MessageScrollerViewport className="p-4">
            <MessageScrollerContent className="gap-2">
              {HISTORY.map((text, index) => (
                <MessageScrollerItem
                  key={text}
                  messageId={text}
                  scrollAnchor={index === HISTORY.length - 1}
                >
                  <Bubble variant="muted">
                    <BubbleContent>{text}</BubbleContent>
                  </Bubble>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}
