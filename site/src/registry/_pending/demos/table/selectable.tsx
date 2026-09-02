import * as React from "react"

import { Checkbox } from "@diametral/ui/components/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@diametral/ui/components/table"

const ASSETS = [
  { id: "wordmark-primary", name: "Wordmark, primary", format: "SVG" },
  { id: "wordmark-mono", name: "Wordmark, monochrome", format: "SVG" },
  { id: "grid-poster", name: "Grid poster", format: "PDF" },
]

export default function TableSelectable() {
  const [selected, setSelected] = React.useState<string[]>(["wordmark-mono"])

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((entry) => entry !== id)
        : [...current, id]
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <Checkbox
              aria-label="Select all assets"
              checked={selected.length === ASSETS.length}
              indeterminate={
                selected.length > 0 && selected.length < ASSETS.length
              }
              onCheckedChange={(checked) =>
                setSelected(checked ? ASSETS.map((asset) => asset.id) : [])
              }
            />
          </TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Format</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ASSETS.map((asset) => (
          <TableRow
            key={asset.id}
            data-state={selected.includes(asset.id) ? "selected" : undefined}
          >
            <TableCell>
              <Checkbox
                aria-label={`Select ${asset.name}`}
                checked={selected.includes(asset.id)}
                onCheckedChange={() => toggle(asset.id)}
              />
            </TableCell>
            <TableCell>{asset.name}</TableCell>
            <TableCell className="text-muted-foreground">
              {asset.format}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
