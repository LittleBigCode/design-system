import { Icon } from "@diametral/design-system/react"

const NAMES = [
  "search",
  "bell",
  "calendar",
  "folder",
  "settings",
  "trash",
] as const

export default function IconBasic() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {NAMES.map((name) => (
        <span key={name} className="flex flex-col items-center gap-2">
          <Icon name={name} size={24} />
          <span className="text-2xs text-muted-foreground">{name}</span>
        </span>
      ))}
    </div>
  )
}
