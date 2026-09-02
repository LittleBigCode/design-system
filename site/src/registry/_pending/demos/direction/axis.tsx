import { DirectionProvider } from "@diametral/ui/components/direction"
import { Field, FieldLabel } from "@diametral/ui/components/field"
import { Slider } from "@diametral/ui/components/slider"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@diametral/ui/components/toggle-group"

export default function DirectionAxis() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex w-full max-w-sm flex-col gap-8">
        <Field>
          <FieldLabel id="direction-axis-volume">مستوى الصوت</FieldLabel>
          <Slider defaultValue={30} aria-labelledby="direction-axis-volume" />
        </Field>
        <Field>
          <FieldLabel id="direction-axis-range">المدى</FieldLabel>
          <ToggleGroup
            variant="outline"
            spacing={0}
            defaultValue={["week"]}
            aria-labelledby="direction-axis-range"
          >
            <ToggleGroupItem value="day">يوم</ToggleGroupItem>
            <ToggleGroupItem value="week">أسبوع</ToggleGroupItem>
            <ToggleGroupItem value="month">شهر</ToggleGroupItem>
          </ToggleGroup>
        </Field>
      </div>
    </DirectionProvider>
  )
}
