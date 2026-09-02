import { RelativeTime } from "@diametral/ui/components/relative-time"

const PUBLISHED = new Date(Date.now() - 3 * 3_600_000)

const LOCALES = [
  { tag: undefined, label: "Browser default" },
  { tag: "en-GB", label: "English (UK)" },
  { tag: "fr", label: "French" },
  { tag: "de", label: "German" },
  { tag: "ja", label: "Japanese" },
]

export default function RelativeTimeLocales() {
  return (
    <ul className="flex w-full max-w-sm flex-col gap-2 text-sm">
      {LOCALES.map((locale) => (
        <li key={locale.tag ?? "default"} className="flex gap-4">
          <span className="w-32 shrink-0 text-muted-foreground">
            {locale.label}
          </span>
          <RelativeTime date={PUBLISHED} locale={locale.tag} />
        </li>
      ))}
    </ul>
  )
}
