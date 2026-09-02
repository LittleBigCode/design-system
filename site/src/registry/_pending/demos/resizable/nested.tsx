import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@diametral/ui/components/resizable"

function Pane({ label }: { label: string }) {
  return (
    <div
      tabIndex={0}
      className="flex size-full items-center justify-center p-4 text-xs font-semibold tracking-widest uppercase"
    >
      {label}
    </div>
  )
}

export default function ResizableNested() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-64 max-w-xl border border-border"
    >
      <ResizablePanel defaultSize="30%" minSize="20%">
        <Pane label="Files" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="65%">
            <Pane label="Preview" />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize="15%">
            <Pane label="Console" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
