import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@diametral/design-system/react"

const RELEASES = [
  {
    version: "2.4.0",
    date: "12 July 2026",
    changes: [
      "Panel replaces the rows boolean with a PanelRow part.",
      "Tone tokens land on Banner and Alert.",
    ],
  },
  {
    version: "2.3.0",
    date: "28 June 2026",
    changes: [
      "Toast moves to the singleton manager.",
      "Accordion panels animate on their measured height.",
    ],
  },
  {
    version: "2.2.0",
    date: "3 June 2026",
    changes: ["Data Table gains column pinning."],
  },
]

export default function AccordionMultiple() {
  return (
    <Accordion
      className="w-full max-w-xl"
      multiple
      defaultValue={["2.4.0", "2.3.0"]}
    >
      {RELEASES.map((release) => (
        <AccordionItem key={release.version} value={release.version}>
          <AccordionTrigger>
            Release {release.version}
            <span className="font-normal text-muted-foreground">
              {release.date}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex list-disc flex-col gap-1 ps-4 text-muted-foreground">
              {release.changes.map((change) => (
                <li key={change}>{change}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
