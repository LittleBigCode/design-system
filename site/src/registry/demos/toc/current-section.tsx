import {
  Toc,
  TocItem,
  TocLabel,
  TocLink,
  TocList,
} from "@diametral/design-system/react"

const SECTIONS = [
  { id: "overview", title: "Overview" },
  { id: "installation", title: "Installation" },
  { id: "usage", title: "Usage" },
]

export default function TocCurrentSection() {
  const current = "installation"

  return (
    <Toc className="ds-toc--static">
      <TocLabel>On this page</TocLabel>
      <TocList>
        {SECTIONS.map((section) => (
          <TocItem key={section.id}>
            {/* `current` carries both aria-current and the lit style — the
                source passed a border/text className override and relied on
                tailwind-merge to dedupe it against the link's own defaults. */}
            <TocLink href="#toc" current={section.id === current}>
              {section.title}
            </TocLink>
          </TocItem>
        ))}
      </TocList>
    </Toc>
  )
}
