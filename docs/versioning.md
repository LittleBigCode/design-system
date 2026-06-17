# Versioning

The Diametral Design System follows [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`),
applied to a CSS + token system rather than a code API. All notable changes are recorded in
[../CHANGELOG.md](../CHANGELOG.md), in [Keep a Changelog](https://keepachangelog.com/) format.

## The public API

For this system, the public, version-governed surface is:

- **`--ds-*` token names** — every custom property in `css/tokens.css` / `tokens/tokens.json`
  (primitives, semantic aliases, and scale).
- **`.ds-*` class names** — every component class and modifier (`.ds-button`,
  `.ds-button--primary`, `.ds-status__head`, `.is-on`, …).

Token *values* and internal implementation details (selector specifics, private spacing inside
a component) are not part of the contract in the same way — but a change visible enough to
break consumers is treated as breaking regardless of which line it lives on.

## MAJOR — breaking changes

Bump the **major** version when you change the public API in a way that can break existing
markup or stylesheets:

- **Renaming or removing a `--ds-*` token** (e.g. `--ds-accent` → `--ds-brand`).
- **Removing or renaming a `.ds-*` class or modifier** (e.g. dropping `.ds-button--danger`).
- Changing the **meaning** of an existing token or class such that current usage renders
  differently in an unacceptable way.

## MINOR — additive changes

Bump the **minor** version when you add capability without breaking what exists:

- New **tokens** (a new semantic alias, a new scale step).
- New **components** or new Web Components.
- New **variants / modifiers** on an existing component (e.g. adding `.ds-status--info`).

## PATCH — fixes

Bump the **patch** version for fixes that do **not** change the API:

- Bug fixes, rendering corrections, and accessibility fixes that keep the same token and class
  names.
- Documentation, showcase, and build-script fixes.
- Re-pointing a token to a corrected value where the name and role are unchanged (for example,
  confirming a sampled hue) — flag prominently in the changelog.

## Pre-1.0 note

While the system is `0.x`, the surface is still being reconciled with the brand charter (see
the palette note in [../tokens/README.md](../tokens/README.md)). Some token values — notably
`--ds-vert` — are flagged for brand-owner confirmation before `1.0`. Until `1.0`, minor
versions may carry larger adjustments than they would afterward; the changelog is the
authoritative record.

See **[../CHANGELOG.md](../CHANGELOG.md)** for the full history.
