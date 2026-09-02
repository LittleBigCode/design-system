import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@diametral/ui/components/card"
import { Masonry } from "@diametral/ui/components/masonry"

const NOTES = [
  {
    title: "Charter tokens",
    body: "Tier-1 primitives ported from tokens.json.",
  },
  {
    title: "Contrast pass",
    body: "Every tone family re-checked against AA on both light and dark before the base phase shipped, since a few functional colours only cleared 3-something to one.",
  },
  { title: "Flat rule", body: "rounded-none everywhere, no exceptions." },
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
        <Card key={note.title}>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {note.body}
          </CardContent>
        </Card>
      ))}
    </Masonry>
  )
}
