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

## Free fallback (no license required)

`--ds-font-title` falls back to Geist, not to a serif:

```
"Ufficio", "Geist Variable", "Geist", sans-serif
```

The charter has exactly two faces, Ufficio and Geist. Borrowing a third — the
Fraunces / PP Editorial New / Georgia chain this token used to carry — meant every
unlicensed project silently rendered Georgia headings above a Geist body, which is
not the design. Geist Light 300 carries titles instead.

Importing `fallback.css` loads Geist and Geist Mono from Google Fonts.

## Geist — body, title fallback and mono

`--ds-font-sans` and `--ds-font-mono` use **Geist** and **Geist Mono**, both released
under the SIL Open Font License 1.1 (free). Load them via Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Summary

| Font | Role | License | Action |
|---|---|---|---|
| Ufficio | Title (opt-in) | **Commercial** | Verify license before any external distribution |
| Geist | Body + title fallback | OFL 1.1 (free) | Use freely |
| Geist Mono | Tokens, code | OFL 1.1 (free) | Use freely |
