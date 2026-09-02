import { cx } from "@diametral/design-system/react"

import { useTheme, type Theme } from "@/components/theme-provider"

const OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "Auto" },
]

/**
 * Local chrome, deliberately not the system's `Segmented`. The toggle sits in
 * the header of every page, so a defect in the component it was built from
 * would report on all 30 routes at once and bury whatever the gate was pointed
 * at — see the `Segmented` dark-theme contrast defect. The harness has to stay
 * independent of the components under test.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div role="group" aria-label="Colour theme" className="flex gap-1.5">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={theme === option.value}
          onClick={() => setTheme(option.value)}
          className={cx(
            "border px-3 py-1.5 text-xs",
            theme === option.value
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
