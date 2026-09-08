import * as React from "react"

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldLabel,
  Input,
  Metric,
  StatusPanel,
  cx,
} from "@diametral/design-system/react"

// Dark ships inside `diametral.css` already (the site's real ThemeProvider
// uses it); Sepia is opt-in and has no other consumer in `site/`, so it needs
// its own import here.
import "@diametral/design-system/css/themes/sepia.css"

const THEMES = [
  { value: "", label: "Default (light)" },
  { value: "dark", label: "Dark" },
  { value: "sepia", label: "Sepia" },
] as const

/**
 * Ported from `site/legacy/theming.html`. The original toggled `data-theme` on
 * `<html>` directly — fine for a standalone static page, wrong here: it would
 * fight the site's own `ThemeProvider` (light/dark/system) for the same
 * attribute. Scoped to this card instead — `css/themes/*.css` both target a
 * bare `[data-theme=...]` selector, not `:root`, by their own header comments
 * ("set the attribute on a root element"), so a local root works the same way.
 *
 * Not `Segmented` for the switch itself, same reasoning `ThemeToggle`'s own
 * comment gives for avoiding it: a defect in the component under test would
 * report on this page too.
 */
export function Theming() {
  const [theme, setTheme] = React.useState<(typeof THEMES)[number]["value"]>("")

  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Theming
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Themes override only the semantic (Tier 2) tokens — primitives and
          component rules are untouched, so a full re-skin is ~20 lines.
          Switch the theme below and watch the sample surface re-skin live.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-lg font-semibold tracking-wider uppercase">
          Switch theme
        </h2>
        <div role="group" aria-label="Theme" className="flex gap-1.5">
          {THEMES.map((option) => (
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
        <p className="text-sm text-muted-foreground">
          This sets <code className="font-mono text-xs">data-theme</code> on
          the card below. Dark ships in{" "}
          <code className="font-mono text-xs">css/themes/dark.css</code>;
          Sepia is a worked brand example in{" "}
          <code className="font-mono text-xs">css/themes/sepia.css</code>{" "}
          (built only from the brand palette).
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-lg font-semibold tracking-wider uppercase">
          Sample surface
        </h2>
        <div
          data-theme={theme || undefined}
          className="grid gap-4 border border-border bg-background p-4 sm:grid-cols-3"
        >
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Field>
                <FieldLabel>Workspace</FieldLabel>
                <Input defaultValue="Diametral" />
              </Field>
              <div className="flex gap-2">
                <Button variant="primary">Save</Button>
                <Button>Cancel</Button>
              </div>
            </CardContent>
          </Card>

          <StatusPanel
            status="success"
            kicker="Result"
            heading="Approved"
            subtitle="No further action"
          >
            <Metric variant="hero" label="Margin" value="38 %" sign={1} />
            <Metric label="Day rate" value="€900" />
          </StatusPanel>

          <div className="flex flex-col gap-3">
            <div className="ds-callout ds-callout--info">
              <div className="ds-callout__title">Heads up</div>
              Themes only re-point semantic tokens.
            </div>
            <div className="ds-chips">
              <span className="ds-chip">
                Overhead <b>18 %</b>
              </span>
              <span className="ds-chip ds-chip--warn">Incomplete</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
