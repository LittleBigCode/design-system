import * as React from "react"
import { FileTextIcon } from "@phosphor-icons/react"

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteSeparator,
  AutocompleteStatus,
} from "@diametral/ui/components/autocomplete"

const INDEX = [
  "Colour tokens",
  "Typography scale",
  "Motion and easing",
  "Grid and spacing",
  "Iconography",
  "Voice and tone",
]

export default function AutocompleteAsync() {
  const [query, setQuery] = React.useState("")
  const [pages, setPages] = React.useState<string[]>([])
  const [searching, setSearching] = React.useState(false)
  const pending = React.useRef<number | undefined>(undefined)

  function search(next: string) {
    setQuery(next)
    window.clearTimeout(pending.current)

    const term = next.trim().toLowerCase()
    if (!term) {
      setPages([])
      setSearching(false)
      return
    }

    setSearching(true)
    pending.current = window.setTimeout(() => {
      setPages(INDEX.filter((page) => page.toLowerCase().includes(term)))
      setSearching(false)
    }, 500)
  }

  return (
    <div className="w-full max-w-sm">
      <Autocomplete
        items={pages}
        filter={null}
        value={query}
        onValueChange={search}
      >
        <AutocompleteInput
          aria-label="Search the charter"
          placeholder="Search the charter…"
          showClear
        />
        <AutocompleteContent>
          <AutocompleteEmpty>
            {searching ? "Searching…" : `No page mentions ${query}.`}
          </AutocompleteEmpty>
          <AutocompleteList>
            {(page: string) => (
              <AutocompleteItem key={page} value={page}>
                <FileTextIcon />
                {page}
              </AutocompleteItem>
            )}
          </AutocompleteList>
          <AutocompleteSeparator />
          <AutocompleteStatus>
            {searching ? "Searching…" : `${pages.length} pages`}
          </AutocompleteStatus>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  )
}
