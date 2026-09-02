import { Spinner } from "@diametral/ui/components/spinner"

const JOBS = [
  { name: "Importing invoices", label: "Importing invoices" },
  { name: "Rebuilding search index", label: "Rebuilding search index" },
  { name: "Syncing calendars", label: "Syncing calendars" },
]

export default function SpinnerLabelled() {
  return (
    <ul className="flex w-full max-w-sm flex-col gap-3">
      {JOBS.map((job) => (
        <li key={job.name} className="flex items-center gap-3 text-sm">
          <Spinner label={job.label} />
          {job.name}
        </li>
      ))}
    </ul>
  )
}
