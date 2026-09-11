# ADR 0001 — Base UI is a substrate of the design system

- **Status:** Accepted
- **Date:** 2026-09-01
- **Decided by:** [Dependency and build policy for the absorbing package](https://github.com/diamorval/design-system-diametral/issues/155) (decisions 1, 7, 12)
- **Applies from:** `1.0.0-beta.1`

## Context

`@diametral/design-system` shipped 0.x with **zero runtime dependencies**. That was not an
incidental property: the README, the package keywords and `docs/principles.md` all say the
same thing — CSS *is* the design system, and React is one binding among peers. Four live
surfaces consume it without a bundler at all (Keycloak, transactional emails, Streamlit, and
plain `<link>` HTML).

Absorbing `@diametral/ui` brings 89 components whose behaviour is not hand-written. Measured
across the source's 119 components:

| tier | count |
| --- | --- |
| React-only behaviour (Base UI, recharts, dnd-kit, tanstack, cmdk, day-picker, embla, input-otp, resizable) | 69 |
| stateful via plain React hooks, no library | 8 |
| pure class-name appliers — reachable by every binding | 42 |

`@base-ui/react` alone reaches **48** of them. It is not one dependency among twenty: it is
where the behaviour of half the library lives.

This is the collision the decision had to resolve. It is not "how many dependencies is too
many" — a count is the wrong unit. It is whether the system stays framework-agnostic once
behaviour moves into a place only React can reach.

## Decision

**`@base-ui/react` is adopted as a substrate of the React binding, and the zero-dependency
promise is restated rather than abandoned: zero-dependency CSS, tokens and web components.**

Those three layers import nothing, so the claim stays literally true for the surfaces that
cannot afford tooling. The React layer declares Base UI and its siblings as real
`dependencies`.

## Consequences

### What this buys

The behaviour layer — focus management, dismissal, positioning, ARIA wiring, keyboard
interaction — for 48 components, maintained by the MUI team, at 1.7.0, MIT, with a peer range
of `^17 || ^18 || ^19`. Hand-writing it is what the 0.x web components do, and it is why that
layer stopped at 11 elements.

### What this costs

- A CSS-only npm consumer installs roughly 113 MB unpacked. The surfaces that genuinely
  cannot afford that consume a CSS file, not an npm graph.
- 77 of 119 components become React-only. Streamlit, Keycloak, emails and the `ds-*` elements
  would otherwise inherit a design system with holes in it.

### The mitigation — the binding pact

**CSS parity is guaranteed for every absorbed component. Behaviour parity is React-only, and
documented per component as such.**

Every component that enters the system ships its `ds-*` CSS, so any binding can render the
**look**; only React gets the **behaviour** for the 77. Each component's tier is recorded as a
one-line field in its docs entry, so a Streamlit or Keycloak consumer reads exactly what they
get and what they do not. The promise becomes precise instead of vague.

### What keeps it true

Two CI checks, both release-blocking, in `scripts/check-contracts.mjs`:

1. **class-resolution** — every `ds-*` class a binding renders resolves to a selector defined
   in the shipped stylesheet. Without it, an absorbed component renders `ds-foo__bar`, nothing
   defines it, and every non-React binding silently gets an unstyled element. Invisible in a
   diff.
2. **layer-purity** — `css/`, `tokens/`, `components/` and `emails/` import nothing external.
   This is what makes the restated promise a fact rather than an aspiration; it catches the
   first convenience import someone adds to a web component before a Keycloak build breaks.

**A new runtime dependency in the React layer requires an ADR.** Cheap governance on the
decision most likely to be regretted. This ADR is the founding case.

### The web-component layer

It grows on demand: an element is written when a real consumer needs one, not to chase a
component count. There is no parity obligation. That is why the layer works at 11 elements —
hand-written and zero-dep — and it is the escape hatch for any React-only component a
non-React surface later needs.

## Alternatives rejected

- **Universal-first, admitting Base UI case by case.** Blocks 69 of 119 components and
  discards the behaviour layer that motivates the migration at all.
- **React as the reference binding, others best-effort subsets.** Contradicts the README, the
  package keywords and `docs/principles.md`, and demotes four live consuming surfaces.
- **Optional `peerDependencies`.** Preserves a literal zero-hard-dep install by pushing ~12
  install lines and permanent version-skew support onto every React consumer.
- **A `createElement` rewrite of all 119.** Trades away the behaviour layer, which is the
  reason to migrate.
