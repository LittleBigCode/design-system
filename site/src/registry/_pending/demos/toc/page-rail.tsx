import {
  Toc,
  TocItem,
  TocLabel,
  TocLink,
  TocList,
} from "@diametral/ui/components/toc"

const SECTIONS = [
  { id: "overview", title: "Overview", level: 1 },
  { id: "tokens", title: "Tokens", level: 1 },
  { id: "tiers", title: "The three tiers", level: 2 },
] as const

export default function TocPageRail() {
  return (
    <div className="flex w-full gap-10">
      <article className="flex min-w-0 flex-1 flex-col gap-3 text-sm">
        <h2 className="font-heading text-xl font-light">Colour</h2>
        <p className="text-muted-foreground">
          Every surface in the system resolves to a token, never to a literal
          value — that is what lets a theme swap without touching a component.
        </p>
        <p className="text-muted-foreground">
          Tier-1 holds the raw palette, Tier-2 the semantic slots that read from
          it, and Tier-3 the per-component variables.
        </p>
      </article>
      <Toc className="w-44">
        <TocLabel>On this page</TocLabel>
        <TocList>
          {SECTIONS.map((section) => (
            <TocItem key={section.id} level={section.level}>
              <TocLink href="#toc">{section.title}</TocLink>
            </TocItem>
          ))}
        </TocList>
      </Toc>
    </div>
  )
}
