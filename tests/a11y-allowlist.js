// Known pre-existing accessibility failures on generated component pages,
// each tied to an open issue. axe still runs and still reports these — they
// are excluded from the blocking check only, so a fix becomes visible (and
// the entry can be deleted) the moment it lands.
//
// `theme: "both"` applies the entry to light and dark alike.
export const ALLOWLIST = [
  // #15 — 9 held components fail the axe gate (aria-allowed-attr, label,
  // color-contrast). Listed per #15's own findings table rather than only
  // what one local run reproduced: axe's color-contrast/aria checks are
  // timing-sensitive on these async-mounting components (site/tests/README.md's
  // "Known limitation: run-to-run variance" — the same route passed here on
  // one run and failed on the next), so the issue's table is the source of
  // truth, not a single sample.
  { route: "date-picker", theme: "both", rule: "aria-allowed-attr", issue: 15 },
  { route: "date-range-picker", theme: "both", rule: "aria-allowed-attr", issue: 15 },
  { route: "date-time-picker", theme: "both", rule: "aria-allowed-attr", issue: 15 },
  { route: "time-picker", theme: "both", rule: "aria-allowed-attr", issue: 15 },
  { route: "tags-input", theme: "both", rule: "label", issue: 15 },
  { route: "alert-dialog", theme: "both", rule: "color-contrast", issue: 15 },
  { route: "split-button", theme: "both", rule: "color-contrast", issue: 15 },
  { route: "toggle-group", theme: "both", rule: "color-contrast", issue: 15 },
  { route: "wizard", theme: "both", rule: "color-contrast", issue: 15 },

  // #41 — collapsible/marker/direction/heatmap fail axe, plus the dark-mode
  // `.ds-button--danger` / `.ds-button--link` / `.ds-segmented` findings its
  // own body names as "worth folding in" alongside #15's.
  { route: "collapsible", theme: "both", rule: "aria-toggle-field-name", issue: 41 },
  { route: "marker", theme: "both", rule: "aria-toggle-field-name", issue: 41 },
  { route: "direction", theme: "both", rule: "label", issue: 41 },
  { route: "direction", theme: "dark", rule: "color-contrast", issue: 41 },
  { route: "heatmap", theme: "both", rule: "scrollable-region-focusable", issue: 41 },
  { route: "button", theme: "dark", rule: "color-contrast", issue: 41 }, // .ds-button--link
  { route: "theme-switcher", theme: "dark", rule: "color-contrast", issue: 41 }, // .ds-segmented

  // #50's 9 findings (plus one unlisted .ds-badge--accent row folded in with
  // them) are fixed — see docs/absorption/corrections.md — and none of them
  // reproduce, so nothing is carried here.
];

export function isAllowlisted(route, theme, ruleId) {
  return ALLOWLIST.some(
    (entry) =>
      entry.route === route &&
      (entry.theme === "both" || entry.theme === theme) &&
      entry.rule === ruleId,
  );
}
