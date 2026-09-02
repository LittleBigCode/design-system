import type { ComponentProps } from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@diametral/ui/components/resizable"

export default function ResizablePlayground(
  props: ComponentProps<typeof ResizablePanelGroup>
) {
  return (
    <ResizablePanelGroup
      className="h-48 w-full max-w-md border border-border"
      {...props}
    >
      <ResizablePanel defaultSize="35%" minSize="20%">
        <div
          tabIndex={0}
          className="flex size-full items-center justify-center p-4 text-xs font-semibold tracking-widest uppercase"
        >
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize="30%">
        <div
          tabIndex={0}
          className="flex size-full items-center justify-center p-4 text-xs font-semibold tracking-widest uppercase"
        >
          Editor
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
