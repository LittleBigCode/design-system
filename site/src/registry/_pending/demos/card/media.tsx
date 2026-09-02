import { Button } from "@diametral/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@diametral/ui/components/card"

const COVER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 144">' +
      '<rect width="384" height="144" fill="#1488a6"/>' +
      '<path d="M0 112 96 60l72 30 104-66 112 60v60H0z" fill="#0f6a83"/>' +
      '<circle cx="312" cy="36" r="18" fill="#e0a32e"/>' +
      "</svg>"
  )

export default function CardMedia() {
  return (
    <Card className="w-full max-w-sm">
      <img src={COVER} alt="" className="h-36 w-full object-cover" />
      <CardHeader>
        <CardTitle>Massif central</CardTitle>
        <CardDescription>Field study, September 2025</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Fourteen plates shot on 6×7, scanned flat and colour-matched to the
        charter palette.
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Open series
        </Button>
      </CardFooter>
    </Card>
  )
}
