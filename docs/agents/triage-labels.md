# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the
actual label strings used in this repo's GitHub issues.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding
label string from this table.

`ready-for-agent` maps to itself here, unlike the source repo, where it maps to `Sandcastle`
because that repo's orchestrator (`.sandcastle/`) picks issues up by that label. This repo has
no orchestrator. **If one is ever installed here, give it its own label** — do not point it at
`ready-for-agent`, or triaging an issue as AFK-ready silently queues it for implementation.
