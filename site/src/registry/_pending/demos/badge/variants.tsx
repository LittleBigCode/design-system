import { Badge } from "@diametral/ui/components/badge"

export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="link" render={<a href="#badge" />}>
        Link
      </Badge>
    </div>
  )
}
