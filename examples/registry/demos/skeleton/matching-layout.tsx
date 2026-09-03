import * as React from "react"
import {
  Button,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Skeleton,
} from "@diametral/design-system/react"

const ROWS = [
  { name: "Atlas rebrand", note: "4 open tasks" },
  { name: "Northern studio", note: "1 open task" },
]

export default function SkeletonMatchingLayout() {
  const [loading, setLoading] = React.useState(true)

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ItemGroup>
        {ROWS.map((row) => (
          <Item key={row.name} variant="outline">
            <ItemMedia variant="icon">
              {loading ? <Skeleton className="ds-skeleton--circle" style={{ width: "1rem", height: "1rem" }} /> : <span>◆</span>}
            </ItemMedia>
            <ItemContent>
              {loading ? (
                <>
                  <Skeleton className="ds-skeleton--text" style={{ width: "8rem" }} />
                  <Skeleton className="ds-skeleton--text" style={{ width: "5rem" }} />
                </>
              ) : (
                <>
                  <ItemTitle>{row.name}</ItemTitle>
                  <ItemDescription>{row.note}</ItemDescription>
                </>
              )}
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => setLoading((value) => !value)}
      >
        {loading ? "Show loaded" : "Show loading"}
      </Button>
    </div>
  )
}
