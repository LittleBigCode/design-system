import {
  CheckCircleIcon,
  ClockIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"

import { Badge } from "@diametral/ui/components/badge"

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <Badge>
        <CheckCircleIcon /> Signed
      </Badge>
      <Badge variant="secondary">
        <ClockIcon /> Awaiting review
      </Badge>
      <Badge variant="destructive">
        <WarningCircleIcon /> Overdue
      </Badge>
    </div>
  )
}
