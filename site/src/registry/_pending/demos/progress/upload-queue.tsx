import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@diametral/ui/components/progress"

const UPLOADS = [
  { name: "charte-graphique.pdf", value: 100 },
  { name: "audit-technique.pdf", value: 64 },
  { name: "maquettes.zip", value: 12 },
]

export default function ProgressUploadQueue() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      {UPLOADS.map((upload) => (
        <Progress
          key={upload.name}
          value={upload.value}
          className="data-complete:[&_[data-slot=progress-indicator]]:bg-[var(--ds-success)]"
        >
          <ProgressLabel>{upload.name}</ProgressLabel>
          <ProgressValue>
            {(formatted, value) => (value === 100 ? "Done" : formatted)}
          </ProgressValue>
        </Progress>
      ))}
    </div>
  )
}
