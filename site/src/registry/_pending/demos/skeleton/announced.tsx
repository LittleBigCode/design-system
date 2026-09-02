import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@diametral/ui/components/panel"
import { Skeleton } from "@diametral/ui/components/skeleton"

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
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-32" />
        </div>
      </PanelContent>
    </Panel>
  )
}
