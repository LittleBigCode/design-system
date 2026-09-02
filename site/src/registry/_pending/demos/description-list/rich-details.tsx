import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "@diametral/ui/components/description-list"
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@diametral/ui/components/status"
import { Tag } from "@diametral/ui/components/tag"

export default function DescriptionListRichDetails() {
  return (
    <DescriptionList className="w-full max-w-sm">
      <DescriptionTerm>État</DescriptionTerm>
      <DescriptionDetail>
        <Status tone="success">
          <StatusIndicator />
          <StatusLabel>En production</StatusLabel>
        </Status>
      </DescriptionDetail>
      <DescriptionTerm>Priorité</DescriptionTerm>
      <DescriptionDetail>
        <Tag tone="warning">Haute</Tag>
      </DescriptionDetail>
      <DescriptionTerm>Version</DescriptionTerm>
      <DescriptionDetail>0.1.0</DescriptionDetail>
    </DescriptionList>
  )
}
