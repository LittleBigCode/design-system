import { DownloadSimpleIcon, FilePdfIcon } from "@phosphor-icons/react"

import { IconButton } from "@diametral/design-system/react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@diametral/design-system/react"

const FILES = [
  { name: "Charte graphique.pdf", size: "2,4 Mo" },
  { name: "Audit technique.pdf", size: "812 Ko" },
]

export default function ItemWithMedia() {
  return (
    <ItemGroup className="max-w-md">
      {FILES.map((file) => (
        <Item key={file.name} variant="outline">
          <ItemMedia variant="icon">
            <FilePdfIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{file.name}</ItemTitle>
            <ItemDescription>{file.size}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <IconButton size="sm" label={`Download ${file.name}`}>
              <DownloadSimpleIcon />
            </IconButton>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  )
}
