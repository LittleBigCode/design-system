import { Accordion } from "@diametral/design-system/react"

const SECTIONS = [
  {
    id: "tokens",
    title: "Where do the colours come from?",
    content:
      "Every surface reads a --ds-* token from the Diametral charter. Components never hard-code a hex value, so a palette change lands everywhere at once.",
  },
  {
    id: "fonts",
    title: "Which typefaces ship with the system?",
    content:
      "Two, and only two: Ufficio for headings and Geist for body and mono. Geist ships with the system; Ufficio is licensed per project and never bundled.",
  },
  {
    id: "radius",
    title: "Why is nothing rounded?",
    content:
      "The charter is square. --ds-radius-none is the only radius token, so a rounded corner has to be written by hand to appear at all.",
  },
]

export default function AccordionBasic() {
  return <Accordion items={SECTIONS} defaultOpen="tokens" />
}
