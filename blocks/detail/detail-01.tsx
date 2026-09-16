import {
  Card,
  CardBlock,
  CardContent,
  CardHeader,
  CardTitle,
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
  Tag,
} from "@diametral/design-system/react"

export default function Detail01() {
  return (
    <div className="grid w-full gap-5 p-6 sm:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader>
          <CardTitle>Acme Consulting — Senior data engineer</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            A 6-month mission to migrate the reporting warehouse. The day rate
            is computed from the target salary, the agreed margin, and rebilled
            travel capped at €200 per day.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardBlock>
          <DescriptionList>
            <DescriptionTerm>Status</DescriptionTerm>
            <DescriptionDetail>
              <Tag tone="success">Confirmed</Tag>
            </DescriptionDetail>
            <DescriptionTerm>Owner</DescriptionTerm>
            <DescriptionDetail>Vincent Devillers</DescriptionDetail>
            <DescriptionTerm>Created</DescriptionTerm>
            <DescriptionDetail>2026-05-02</DescriptionDetail>
            <DescriptionTerm>Updated</DescriptionTerm>
            <DescriptionDetail>2026-06-17</DescriptionDetail>
          </DescriptionList>
        </CardBlock>
      </Card>
    </div>
  )
}
