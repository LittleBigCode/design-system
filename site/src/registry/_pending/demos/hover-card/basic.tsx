import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@diametral/ui/components/hover-card"

export default function HoverCardBasic() {
  return (
    <p className="max-w-md text-sm leading-relaxed">
      The palette is defined in the{" "}
      <HoverCard>
        <HoverCardTrigger
          render={
            <a href="#hover-card" className="underline underline-offset-4" />
          }
        >
          2026 charter
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="text-xs font-semibold tracking-wider uppercase">
            Charte graphique 2026
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Eight tones, two typefaces, no rounded corners. Published 4 March
            2026.
          </p>
        </HoverCardContent>
      </HoverCard>{" "}
      and every token resolves from it.
    </p>
  )
}
