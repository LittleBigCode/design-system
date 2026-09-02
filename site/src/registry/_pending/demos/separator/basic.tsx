import { Separator } from "@diametral/ui/components/separator"

export default function SeparatorBasic() {
  return (
    <div className="w-full max-w-md">
      <div>
        <h4 className="font-heading text-sm font-semibold tracking-wider uppercase">
          Diametral
        </h4>
        <p className="text-sm text-muted-foreground">
          Design system, 2026 charter.
        </p>
      </div>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground">
        Every component reads its colour from a charter token.
      </p>
    </div>
  )
}
