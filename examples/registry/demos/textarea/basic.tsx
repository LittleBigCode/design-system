import { Textarea } from "@diametral/design-system/react"
export default function TextareaBasic() {
  return (
    <div className="w-full max-w-sm">
      <Textarea
        rows={2}
        placeholder="What changed in this release?"
        aria-label="Release note"
      />
    </div>
  )
}
