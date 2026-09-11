import {
  AspectRatio,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardTitle,
} from "@diametral/design-system/react"

const COVER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">' +
      '<rect width="320" height="180" fill="#2f3324"/>' +
      '<circle cx="108" cy="90" r="44" fill="#8f9b6b"/>' +
      '<rect x="180" y="46" width="88" height="88" fill="#f4f1e8"/>' +
      "</svg>"
  )

export default function AspectRatioCardCover() {
  return (
    <Card className="w-full max-w-sm">
      <CardMedia>
        <AspectRatio ratio={16 / 9}>
          <img
            src={COVER}
            alt="Charter cover artwork"
            className="size-full object-cover"
          />
        </AspectRatio>
      </CardMedia>
      <CardHeader>
        <CardTitle>Charter 2026</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Tone scales, motion and typography. Published in March, alongside the
          token export.
        </p>
      </CardContent>
    </Card>
  )
}
