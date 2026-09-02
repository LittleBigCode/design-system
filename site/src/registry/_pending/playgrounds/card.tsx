import type { ComponentProps } from "react"

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

// Card and its parts are plain divs with no variant axis — composition is the
// API, so the only thing worth editing here is the title.
export default function CardPlayground({
  children,
  ...props
}: ComponentProps<typeof Card>) {
  return (
    <Card className="w-full max-w-3xs" {...props}>
      <CardHeader>
        <CardTitle>{children}</CardTitle>
        <CardDescription>Updated two days ago.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="xs">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Twelve pages, eight brand tones, two typefaces.
      </CardContent>
      <CardFooter>
        <Button size="sm">Open</Button>
      </CardFooter>
    </Card>
  )
}
