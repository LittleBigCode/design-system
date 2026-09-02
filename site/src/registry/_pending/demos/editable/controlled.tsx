import * as React from "react"

import { Editable } from "@diametral/ui/components/editable"
import { FieldDescription } from "@diametral/ui/components/field"

export default function EditableControlled() {
  const [saved, setSaved] = React.useState("Untitled project")

  return (
    <div className="flex flex-col gap-1">
      <Editable value={saved} onSubmit={setSaved} />
      <FieldDescription>Last saved: {saved}</FieldDescription>
    </div>
  )
}
