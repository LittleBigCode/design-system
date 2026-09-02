import {
  ArrowClockwiseIcon,
  CheckIcon,
  WarningIcon,
} from "@phosphor-icons/react"

import { Tag } from "@diametral/ui/components/tag"

export default function TagWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag tone="success">
        <CheckIcon aria-hidden className="size-3" />
        Validé
      </Tag>
      <Tag tone="info">
        <ArrowClockwiseIcon aria-hidden className="size-3" />
        Synchronisation
      </Tag>
      <Tag tone="warning">
        <WarningIcon aria-hidden className="size-3" />
        Action requise
      </Tag>
    </div>
  )
}
