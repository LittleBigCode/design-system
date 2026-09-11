import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/design-system/react"

type Project = { value: string; label: string }

const PROJECTS: Project[] = [
  { value: "prj_4f21", label: "Charte graphique" },
  { value: "prj_7c08", label: "Design system" },
  { value: "prj_9a5d", label: "Site vitrine" },
  { value: "prj_b3e6", label: "Portail client" },
]

export default function ComboboxObjects() {
  const [project, setProject] = React.useState<Project | null>(PROJECTS[1])

  return (
    <Field className="max-w-sm">
      <FieldLabel>Project</FieldLabel>
      <Combobox
        items={PROJECTS}
        value={project}
        onValueChange={setProject}
        name="project"
      >
        <ComboboxInput placeholder="Search projects…" showClear />
        <ComboboxContent>
          <ComboboxEmpty>No project found.</ComboboxEmpty>
          <ComboboxList>
            {(item: Project) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>
        Submits {project ? project.value : "nothing"}, not the label above.
      </FieldDescription>
    </Field>
  )
}
