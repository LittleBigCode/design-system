import {
  CheckCircleIcon,
  WarningCircleIcon,
  WrenchIcon,
} from "@phosphor-icons/react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@diametral/ui/components/select"

const STATUSES = {
  operational: { label: "Operational", Icon: CheckCircleIcon },
  degraded: { label: "Degraded", Icon: WarningCircleIcon },
  maintenance: { label: "Maintenance", Icon: WrenchIcon },
}

export default function SelectStatus() {
  return (
    <Select defaultValue="operational">
      <SelectTrigger aria-label="Service status">
        <SelectValue>
          {(value: keyof typeof STATUSES) => {
            const { label, Icon } = STATUSES[value]
            return (
              <>
                <Icon />
                {label}
              </>
            )
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(STATUSES).map(([value, { label, Icon }]) => (
          <SelectItem key={value} value={value}>
            <Icon />
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
