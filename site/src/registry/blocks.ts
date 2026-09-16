export type BlockVariant = readonly [name: string, description: string]
export type BlockCategory = readonly [
  category: string,
  name: string,
  description: string,
  variants: readonly BlockVariant[],
]

export const BLOCKS = [
  [
    "sidebar",
    "Sidebar",
    "The left edge of an application screen: a navigation column beside an inset content area.",
    [
      [
        "sidebar-04",
        "Pick this over the static 01–03 when the column has to earn its width back — a rail toggle collapses it to a 3rem icon-only strip with the labels as tooltips, and below 48rem it becomes an off-canvas sheet opened from the inset header.",
      ],
    ],
  ],
] as const satisfies readonly BlockCategory[]
