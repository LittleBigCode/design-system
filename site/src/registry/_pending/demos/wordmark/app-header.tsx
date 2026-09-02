import { Wordmark } from "@diametral/ui/components/wordmark"

export default function WordmarkAppHeader() {
  return (
    <header className="flex w-full max-w-sm items-center gap-2 border border-border bg-card px-3 py-2">
      <Wordmark variant="square" label="" className="[&_svg]:size-6" />
      <span className="text-sm font-medium">Diametral</span>
      <span className="ms-auto text-sm text-muted-foreground">Docs</span>
    </header>
  )
}
