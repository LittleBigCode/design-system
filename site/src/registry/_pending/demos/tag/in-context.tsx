import { Tag } from "@diametral/ui/components/tag"

const MISSIONS = [
  { name: "Charte graphique", tone: "success" as const, label: "Livré" },
  { name: "Design system v2", tone: "info" as const, label: "En cours" },
  { name: "Audit sécurité", tone: "warning" as const, label: "En retard" },
]

export default function TagInContext() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      {MISSIONS.map((m) => (
        <div
          key={m.name}
          className="flex items-center justify-between border border-border px-3 py-2 text-sm"
        >
          <span>{m.name}</span>
          <Tag tone={m.tone}>{m.label}</Tag>
        </div>
      ))}
    </div>
  )
}
