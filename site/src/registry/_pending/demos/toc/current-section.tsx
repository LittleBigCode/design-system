import {
  Toc,
  TocItem,
  TocLabel,
  TocLink,
  TocList,
} from "@diametral/ui/components/toc"

const SECTIONS = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
]

export default function TocCurrentSection() {
  const current = "installation"

  return (
    <Toc className="static">
      <TocLabel>On this page</TocLabel>
      <TocList>
        {SECTIONS.map((section) => (
          <TocItem key={section.id}>
            <TocLink
              href="#toc"
              aria-current={section.id === current ? "location" : undefined}
              className="aria-[current]:border-foreground aria-[current]:text-foreground"
            >
              {section.title}
            </TocLink>
          </TocItem>
        ))}
      </TocList>
    </Toc>
  )
}
