# Fonts & licensing

Two typefaces, two different licenses — independent of the MIT license on the system's code.
The authoritative font notice is [`assets/fonts/LICENSE-FONTS.md`](../assets/fonts/LICENSE-FONTS.md).

## Titles — Ufficio ⚠️ commercial

`assets/fonts/Ufficio-300.woff2` is a **commercial font**, bundled for **internal use only**
pending license verification. **Verify your rights before any external distribution.**

`--ds-font-title` lists Ufficio first, but the face is declared only in the opt-in
`assets/fonts/ufficio.css`:

```html
<link rel="stylesheet" href="assets/fonts/ufficio.css">   <!-- only if licensed -->
```

If you don't import it, the unknown family name is skipped and titles render in the free
fallback. No token change needed.

## Titles — Fraunces (free fallback)

`--ds-font-title` falls back to:

```
"Ufficio", "Fraunces", "PP Editorial New", Georgia, "Times New Roman", serif
```

**Fraunces** (SIL OFL 1.1) is a refined, light editorial serif that carries the same
"minimal, enduring, elegant" character. Load it with the other free fonts:

```css
@import url("assets/fonts/fallback.css");   /* Fraunces + Geist via Google Fonts */
```

## Body — Geist (free)

`--ds-font-sans` uses **Geist** (SIL OFL 1.1):

```html
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
```

To use a different body font (e.g. an app already on Outfit/Inter), override the token:

```css
:root { --ds-font-sans: "Outfit", system-ui, sans-serif; }
```

## Summary

| Font | Role | License | Action |
|---|---|---|---|
| Ufficio | Title (opt-in) | **Commercial** | Verify before external distribution |
| Fraunces | Title (default fallback) | OFL 1.1 (free) | Use freely |
| Geist | Body | OFL 1.1 (free) | Use freely |
