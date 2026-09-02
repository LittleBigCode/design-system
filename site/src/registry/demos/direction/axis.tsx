import {
  DirectionProvider,
  FormField,
  Range,
  Segmented,
} from "@diametral/design-system/react"

/* Two controls whose *axis* has to flip, not just their text alignment: a
   slider fills from the right in RTL, and a segmented row's first cell is the
   rightmost one. The provider is what tells Base UI's own primitives which way
   arrow keys walk; `dir` on the element is what flips the CSS. Both are needed,
   which is why every demo here sets the two together.

   Re-wired onto the incumbents: the source's `Slider` is `Range`, and its
   `ToggleGroup` is `Segmented`, which takes its cells as an `items` array
   rather than as children. */
export default function DirectionAxis() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex w-full max-w-sm flex-col gap-8">
        <FormField label="مستوى الصوت" htmlFor="direction-axis-volume">
          <Range id="direction-axis-volume" defaultValue={30} />
        </FormField>
        <FormField label="المدى" htmlFor="direction-axis-range">
          <Segmented
            defaultValue="week"
            items={[
              { value: "day", label: "يوم" },
              { value: "week", label: "أسبوع" },
              { value: "month", label: "شهر" },
            ]}
          />
        </FormField>
      </div>
    </DirectionProvider>
  )
}
