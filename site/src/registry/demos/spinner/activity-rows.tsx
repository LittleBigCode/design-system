import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
  Spinner,
  Tag,
} from "@diametral/design-system/react"
const UPLOADS = [
  { name: "brief.pdf", state: "done" },
  { name: "wireframes.fig", state: "uploading" },
  { name: "tokens.json", state: "uploading" },
  { name: "logo-v2.svg", state: "failed" },
]

export default function SpinnerActivityRows() {
  return (
    <ItemGroup className="w-full max-w-sm">
      {UPLOADS.map((upload) => (
        <Item key={upload.name} variant="outline" size="sm">
          <ItemContent>
            <ItemTitle>{upload.name}</ItemTitle>
          </ItemContent>
          <ItemActions>
            {upload.state === "uploading" ? (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Spinner aria-label={`Uploading ${upload.name}`} />
                Uploading
              </span>
            ) : (
              <Tag status={upload.state === "done" ? "success" : "danger"}>
                {upload.state === "done" ? "Uploaded" : "Failed"}
              </Tag>
            )}
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  )
}
