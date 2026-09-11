import {
  DirectionProvider,
  Field,
  FieldLabel,
  Slider,
  Segmented,
} from "@diametral/design-system/react"

/* Two controls whose *axis* has to flip, not just their text alignment: a
   slider fills from the right in RTL, and a segmented row's first cell is the
   rightmost one. The provider is what tells Base UI's own primitives which way
   arrow keys walk; `dir` on the element is what flips the CSS. Both are needed,
   which is why every demo here sets the two together.

   Re-wired onto the incumbents: the source's `Slider` is `Range`, and its
   `ToggleGroup` is `Segmented`, which takes its cells as an `items` array
   rather than as children.

   The volume row uses `Field` + `aria-labelledby`: Slider's `id` lands on its
   root wrapper, not the range input Base UI actually renders, so a `<label
   for>` pointed at it never resolves. The range row's `htmlFor` has the same
   gap against `Segmented`'s own root — pre-existing, not this batch's fix. */
export default function DirectionAxis() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex w-full max-w-sm flex-col gap-8">
        <Field>
          <FieldLabel id="direction-axis-volume-label">مستوى الصوت</FieldLabel>
          <Slider
            defaultValue={30}
            aria-labelledby="direction-axis-volume-label"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="direction-axis-range">المدى</FieldLabel>
          <Segmented
            defaultValue="week"
            items={[
              { value: "day", label: "يوم" },
              { value: "week", label: "أسبوع" },
              { value: "month", label: "شهر" },
            ]}
          />
        </Field>
      </div>
    </DirectionProvider>
  )
}
