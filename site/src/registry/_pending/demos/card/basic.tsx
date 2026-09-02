import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@diametral/ui/components/card"

export default function CardBasic() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Charter tokens</CardTitle>
        <CardDescription>
          Tier-1 primitives ported from tokens.json.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Every shadcn slot references a --ds-* semantic, so retheming means
        editing one tier.
      </CardContent>
    </Card>
  )
}
