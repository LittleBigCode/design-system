import { RelativeTime } from "@diametral/ui/components/relative-time"

const NOW = Date.now()

export default function RelativeTimeBasic() {
  return (
    <ul className="flex flex-col gap-2 text-sm">
      <li>
        <RelativeTime date={new Date(NOW - 30_000)} /> — commit pushed
      </li>
      <li>
        <RelativeTime date={new Date(NOW - 45 * 60_000)} /> — review requested
      </li>
      <li>
        <RelativeTime date={new Date(NOW - 3 * 3_600_000)} /> — build finished
      </li>
      <li>
        <RelativeTime date={new Date(NOW - 2 * 86_400_000)} /> — deploy shipped
      </li>
      <li>
        <RelativeTime date={new Date(NOW - 60 * 86_400_000)} /> — repo created
      </li>
    </ul>
  )
}
