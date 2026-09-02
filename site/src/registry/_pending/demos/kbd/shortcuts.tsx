import { Kbd, KbdGroup } from "@diametral/ui/components/kbd"

const SHORTCUTS = [
  { keys: ["⌘", "K"], label: "Open the command palette" },
  { keys: ["⌘", "⇧", "P"], label: "Switch project" },
  { keys: ["G", "D"], label: "Go to dashboard" },
]

export default function KbdShortcuts() {
  return (
    <dl className="w-full max-w-sm divide-y divide-border border border-border">
      {SHORTCUTS.map((shortcut) => (
        <div
          key={shortcut.label}
          className="flex items-center justify-between gap-4 px-3 py-2.5"
        >
          <dt className="text-sm text-muted-foreground">{shortcut.label}</dt>
          <dd>
            <KbdGroup>
              {shortcut.keys.map((key) => (
                <Kbd key={key}>{key}</Kbd>
              ))}
            </KbdGroup>
          </dd>
        </div>
      ))}
    </dl>
  )
}
