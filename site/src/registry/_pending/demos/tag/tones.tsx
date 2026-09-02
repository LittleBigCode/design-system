import { Tag } from "@diametral/ui/components/tag"

export default function TagTones() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag>Neutral</Tag>
      <Tag tone="success">Success</Tag>
      <Tag tone="warning">Warning</Tag>
      <Tag tone="danger">Danger</Tag>
      <Tag tone="critical">Critical</Tag>
      <Tag tone="info">Info</Tag>
    </div>
  )
}
