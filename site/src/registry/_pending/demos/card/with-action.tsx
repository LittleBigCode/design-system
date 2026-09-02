import { DotsThreeIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@diametral/ui/components/card"

export default function CardWithAction() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Monthly report</CardTitle>
        <CardDescription>Traffic across both platforms.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon" aria-label="More options">
            <DotsThreeIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Desktop is up 12% week over week; mobile is flat.
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Export CSV
        </Button>
      </CardFooter>
    </Card>
  )
}
