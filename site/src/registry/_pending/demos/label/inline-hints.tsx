import { Badge } from "@diametral/ui/components/badge"
import { Input } from "@diametral/ui/components/input"
import { Label } from "@diametral/ui/components/label"
import { Textarea } from "@diametral/ui/components/textarea"

export default function LabelInlineHints() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-hint-key">
          Deploy key
          <Badge variant="destructive">Required</Badge>
        </Label>
        <Input id="label-hint-key" placeholder="ssh-ed25519 AAAAC3Nza…" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-hint-notes">
          Internal notes
          <span className="font-normal tracking-normal text-muted-foreground normal-case">
            optional
          </span>
        </Label>
        <Textarea id="label-hint-notes" rows={2} />
      </div>
    </div>
  )
}
