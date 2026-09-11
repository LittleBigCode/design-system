import { Editable, FieldDescription } from "@diametral/design-system/react"
import * as React from "react"

export default function EditableControlled() {
  const [saved, setSaved] = React.useState("Untitled project")

  return (
    <div className="flex flex-col gap-1">
      <Editable value={saved} onSubmit={setSaved} />
      <FieldDescription>Last saved: {saved}</FieldDescription>
    </div>
  )
}
