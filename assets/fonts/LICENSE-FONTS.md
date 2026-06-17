# Font licensing

The Diametral Design System uses two typefaces. **Their licenses are not the same**
and are independent of the MIT license that covers the design system's own code.

## Ufficio — title typeface ⚠️ COMMERCIAL

`Ufficio-300.woff2` is a **commercial font**. It ships in this repository for
**internal use only**, pending license verification. Before distributing it in a
public product, embedding it in a downloadable artifact, or shipping it to a third
party, you **must verify that you hold the appropriate license**.

If you do not hold an Ufficio license, **do not import `ufficio.css`**. The design
system already renders headings in a free fallback (see below) — no action needed.

## Free fallbacks (no license required)

`--ds-font-title` defaults to:

```
"Fraunces", "PP Editorial New", Georgia, "Times New Roman", serif
```

- **Fraunces** — SIL Open Font License 1.1. A refined, light, editorial serif that
  carries the same "minimal, enduring, elegant" character as Ufficio.
- **PP Editorial New** — a commercial alternative (listed only as a stylistic match;
  same caveat as Ufficio applies if you choose it).
- **Georgia / serif** — system fallback, always available.

Importing `fallback.css` loads Fraunces (and Geist) from Google Fonts.

## Geist — body typeface

`--ds-font-sans` uses **Geist**, released under the SIL Open Font License 1.1 (free).
Load it via Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
```

## Summary

| Font | Role | License | Action |
|---|---|---|---|
| Ufficio | Title (opt-in) | **Commercial** | Verify license before any external distribution |
| Fraunces | Title (default fallback) | OFL 1.1 (free) | Use freely |
| Geist | Body | OFL 1.1 (free) | Use freely |
