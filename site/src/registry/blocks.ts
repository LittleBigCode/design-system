export type BlockVariant = readonly [name: string, description: string]
export type BlockCategory = readonly [
  category: string,
  name: string,
  description: string,
  variants: readonly BlockVariant[],
]

export const BLOCKS = [
  ["login", "Login", "Sign-in screens — from a single centred card to a full-page split.", [
    ["login-03", "Pick when sign-in is the whole screen and the product still has to say its name: a full-height brand panel beside the form, stacking to a header band below 48rem. login-01 and login-02 are the card-only options that drop into an existing page."],
  ]],
] as const satisfies readonly BlockCategory[]
