import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
  Tag,
} from "@diametral/design-system/react"

/* Tag is the incumbent standing in for Status's dot-and-label pill until batch
   7 lands it; `status` is the tone axis it spells. */
export default function DescriptionListRichDetails() {
  return (
    <DescriptionList className="w-full max-w-sm">
      <DescriptionTerm>État</DescriptionTerm>
      <DescriptionDetail>
        <Tag status="success">En production</Tag>
      </DescriptionDetail>
      <DescriptionTerm>Priorité</DescriptionTerm>
      <DescriptionDetail>
        <Tag status="warning">Haute</Tag>
      </DescriptionDetail>
      <DescriptionTerm>Version</DescriptionTerm>
      <DescriptionDetail>0.1.0</DescriptionDetail>
    </DescriptionList>
  )
}
