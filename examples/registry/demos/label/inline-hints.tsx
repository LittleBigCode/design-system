import { Badge, Input, Label, Textarea } from "@diametral/design-system/react"

/* A Label is a flex row, so anything can sit beside the words — a required
   badge, a character count, an "optional" aside. That is also where the voice
   has to be overridable: the label is uppercase and tracked, and an aside
   inside it must not be, which is what the second one's classes undo.

   Upstream that override was the reason the label's three type properties sat
   in their own `@layer components` block, below Tailwind's utilities. With no
   layers here it is plain specificity — same result, one less mechanism. */
export default function LabelInlineHints() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="label-hint-key">
          Deploy key
          <Badge variant="accent">Required</Badge>
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
