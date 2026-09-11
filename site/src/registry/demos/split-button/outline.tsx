import {
  DropdownMenuItem,
  SplitButton,
} from "@diametral/design-system/react"

const FORMATS = ["CSV", "XLSX", "JSON", "PDF"]

export default function SplitButtonOutline() {
  return (
    <div className="flex items-center gap-3">
      <SplitButton
        variant="outline"
        size="sm"
        menuLabel="Other export formats"
        menu={FORMATS.slice(1).map((format) => (
          <DropdownMenuItem key={format}>Export as {format}</DropdownMenuItem>
        ))}
      >
        Export as CSV
      </SplitButton>
      <SplitButton
        variant="outline"
        size="sm"
        disabled
        menu={<DropdownMenuItem>Export as XLSX</DropdownMenuItem>}
      >
        Export as CSV
      </SplitButton>
    </div>
  )
}
