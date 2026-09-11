import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
  Skeleton,
} from "@diametral/design-system/react"

export default function SkeletonAnnounced() {
  return (
    <Panel className="w-full max-w-sm" aria-busy="true">
      <PanelHeader className="border-b">
        <PanelTitle>Invoices</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <p role="status" className="sr-only">
          Loading invoices
        </p>
        <div className="flex flex-col gap-3" aria-hidden="true">
          <Skeleton className="ds-skeleton--text" style={{ width: "10rem" }} />
          <Skeleton className="ds-skeleton--text" style={{ width: "7rem" }} />
          <Skeleton className="ds-skeleton--text" style={{ width: "8rem" }} />
        </div>
      </PanelContent>
    </Panel>
  )
}
