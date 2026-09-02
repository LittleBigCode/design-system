import { ScrollArea } from "@diametral/ui/components/scroll-area"
import { Separator } from "@diametral/ui/components/separator"

const COMMITS = Array.from({ length: 24 }, (_, index) => ({
  sha: (0x4f2c91 + index * 7919).toString(16).slice(0, 7),
  message: [
    "Align badge tracking with the charter",
    "Drop the legacy grey tokens",
    "Fix toolbar separator orientation",
    "Self-host Ufficio subset",
  ][index % 4],
}))

export default function ScrollAreaBasic() {
  return (
    <ScrollArea className="h-64 w-full max-w-sm border border-border">
      <div className="p-4">
        {COMMITS.map((commit, index) => (
          <div key={commit.sha}>
            {index > 0 && <Separator className="my-2.5" />}
            <div className="flex items-baseline gap-3">
              <code className="font-mono text-xs text-muted-foreground">
                {commit.sha}
              </code>
              <span className="text-sm">{commit.message}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
