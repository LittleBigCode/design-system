import { Card, Masonry } from "@diametral/design-system/react"

const NOTES = [
  {
    title: "Charter tokens",
    body: "Tier-1 primitives ported from tokens.json.",
  },
  {
    title: "Contrast pass",
    body: "Every tone family re-checked against AA on both light and dark before the base phase shipped, since a few functional colours only cleared 3-something to one.",
  },
  { title: "Flat rule", body: "No radius anywhere, no exceptions." },
  {
    title: "Icon registry",
    body: "A typed name → component map over @phosphor-icons/react, tree-shakeable unlike v1's hand-drawn SVG set.",
  },
  { title: "Two typefaces", body: "Ufficio for titles, Geist for the rest." },
]

export default function MasonryWithCards() {
  return (
    <Masonry columns={2} className="w-full max-w-2xl">
      {NOTES.map((note) => (
        <Card key={note.title} title={note.title}>
          <p className="text-muted-foreground text-sm">{note.body}</p>
        </Card>
      ))}
    </Masonry>
  )
}
