import {
  Card,
  CardBlock,
  Checkbox,
  Item,
  ItemContent,
  ItemGroup,
  ItemTitle,
  Label,
  Tag,
} from "@diametral/design-system/react"

const STATUSES = [
  { id: "confirmed", label: "Confirmed", checked: true },
  { id: "draft", label: "Draft", checked: false },
  { id: "archived", label: "Archived", checked: false },
]

const RESULTS = [
  { name: "Acme — Senior data engineer", rate: "€900 / day" },
  { name: "Globex — Staff designer", rate: "€820 / day" },
  { name: "Initech — Platform lead", rate: "€1,050 / day" },
]

export default function FacetedFilter01() {
  return (
    <div className="grid w-full gap-5 p-6 sm:grid-cols-[240px_1fr]">
      <Card>
        <CardBlock>
          <p className="mb-3 text-[11px] tracking-wider text-muted-foreground uppercase">
            Status
          </p>
          <div className="flex flex-col gap-2.5">
            {STATUSES.map((status) => (
              <div key={status.id} className="flex items-center gap-2.5">
                <Checkbox
                  id={`faceted-filter-01-${status.id}`}
                  defaultChecked={status.checked}
                />
                <Label htmlFor={`faceted-filter-01-${status.id}`}>
                  {status.label}
                </Label>
              </div>
            ))}
          </div>
        </CardBlock>
        <CardBlock>
          <p className="mb-3 text-[11px] tracking-wider text-muted-foreground uppercase">
            Discipline
          </p>
          <div className="flex flex-wrap gap-2">
            <Tag tone="info">Data</Tag>
            <Tag>Design</Tag>
            <Tag>Ops</Tag>
            <Tag>Sales</Tag>
          </div>
        </CardBlock>
      </Card>
      <ItemGroup>
        {RESULTS.map((result) => (
          <Item key={result.name} variant="outline">
            <ItemContent>
              <ItemTitle>{result.name}</ItemTitle>
            </ItemContent>
            <span className="text-sm text-muted-foreground tabular-nums">
              {result.rate}
            </span>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}
