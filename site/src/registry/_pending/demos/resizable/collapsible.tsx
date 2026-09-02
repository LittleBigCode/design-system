import * as React from "react"
import { FileTextIcon } from "@phosphor-icons/react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@diametral/ui/components/resizable"

const RAIL = 10
const MIN = 24

const FILES = ["charter.md", "tokens.json", "panel.tsx"]

export default function ResizableCollapsible() {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-56 max-w-xl border border-border"
    >
      <ResizablePanel
        collapsible
        collapsedSize={`${RAIL}%`}
        defaultSize="32%"
        minSize={`${MIN}%`}
        onResize={(size) => setCollapsed(size.asPercentage < MIN)}
      >
        <div tabIndex={0} className="flex size-full flex-col gap-2 p-3">
          {FILES.map((file) => (
            <span
              key={file}
              className="flex items-center gap-2 truncate font-mono text-xs text-muted-foreground"
            >
              <FileTextIcon className="size-4 shrink-0" />
              {collapsed ? null : file}
            </span>
          ))}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize="40%">
        <div
          tabIndex={0}
          className="flex size-full flex-col items-center justify-center gap-2 p-4 text-center"
        >
          <span className="text-xs font-semibold tracking-widest uppercase">
            Editor
          </span>
          <span className="text-xs text-muted-foreground">
            {collapsed
              ? "Drag the handle right to bring the tree back."
              : "Drag the handle left to collapse the tree to its rail."}
          </span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
