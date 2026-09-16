import {
  Badge,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tag,
} from "@diametral/design-system/react"

const PROFILES = { all: "All profiles", junior: "Junior", senior: "Senior" }
const SORTS = { "rate-asc": "Rate ↑", "rate-desc": "Rate ↓" }

export default function FilterBar01() {
  return (
    <div className="flex w-full flex-wrap items-center gap-3 border border-border p-3.5">
      <Tag onRemove={() => {}}>Region: EU</Tag>
      <Tag onRemove={() => {}}>Active</Tag>
      <Badge variant="secondary">24 results</Badge>

      <div className="flex-1" />

      <Select items={PROFILES} defaultValue="all">
        <SelectTrigger aria-label="Profile">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(PROFILES).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select items={SORTS} defaultValue="rate-asc">
        <SelectTrigger aria-label="Sort">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(SORTS).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button size="sm">Clear</Button>
    </div>
  )
}
