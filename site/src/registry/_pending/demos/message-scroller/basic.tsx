import { Bubble, BubbleContent } from "@diametral/ui/components/bubble"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@diametral/ui/components/message-scroller"

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
      <MessageScrollerProvider>
        <MessageScroller>
          <MessageScrollerViewport className="p-4">
            <MessageScrollerContent className="gap-2">
              {HISTORY.map((message) => (
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
  )
}
