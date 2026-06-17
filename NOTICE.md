# NOTICE — third-party assets & licensing

The Diametral Design System's own source code (CSS, JavaScript, React components,
documentation, build scripts, and the SVG marks) is licensed under the [MIT License](LICENSE).

This repository **also bundles third-party fonts**, which are **not** covered by that MIT
license and carry their own terms. The clauses below govern those assets.

## Fonts

### Ufficio — title typeface (commercial)

`assets/fonts/Ufficio-300.woff2` is a **commercial typeface**. It is included and served as
part of the **Diametral brand identity, under Diametral's own font license**, in the same way
the font is served on Diametral's production web properties.

**Clauses:**

1. **No license is granted by this repository.** The MIT license covering the code does **not**
   grant any right to use, copy, embed, or redistribute the Ufficio font. Cloning, forking,
   downloading, or otherwise obtaining this repository does **not** transfer or sublicense any
   Ufficio license.
2. **Third parties must obtain their own license.** Anyone other than Diametral (and its
   authorized users) who wishes to use or distribute Ufficio must acquire a valid license
   directly from the foundry.
3. **No independent redistribution.** The font file must not be extracted from this repository
   and redistributed on its own, repackaged, or used outside the Diametral brand context.
4. **Free fallback is built in.** If you do not hold an Ufficio license, do **not** import
   `assets/fonts/ufficio.css`. The design system then renders titles in the free **Fraunces**
   stack automatically — no other change is required. The `--ds-font-title` token makes the
   swap a one-line override.

### Geist — body typeface (free)

`--ds-font-sans` uses **Geist**, licensed under the **SIL Open Font License 1.1**. Free to use
and redistribute under the OFL terms. Loaded from Google Fonts (or self-host).

### Fraunces — free title fallback

The default title fallback is **Fraunces**, licensed under the **SIL Open Font License 1.1**.
Free to use under the OFL terms.

### PP Editorial New — listed alternative (commercial)

Referenced in the title fallback stack only as a stylistic match. It is a commercial font; the
same caveat as Ufficio applies if you choose to use it.

## Summary

| Asset | License | May third parties redistribute from this repo? |
|---|---|---|
| Design system code | MIT | Yes |
| Ufficio (`Ufficio-300.woff2`) | Commercial (Diametral license) | **No** — obtain your own |
| Geist | SIL OFL 1.1 | Yes (under OFL) |
| Fraunces | SIL OFL 1.1 | Yes (under OFL) |
| PP Editorial New | Commercial | **No** — obtain your own |

See also [`docs/fonts-and-licensing.md`](docs/fonts-and-licensing.md) and
[`assets/fonts/LICENSE-FONTS.md`](assets/fonts/LICENSE-FONTS.md).
