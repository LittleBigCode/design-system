import { Button } from "@diametral/design-system/react"
export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>No variant</Button>
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}
