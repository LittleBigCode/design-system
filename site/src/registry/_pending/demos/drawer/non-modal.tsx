import { Button } from "@diametral/ui/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@diametral/ui/components/drawer"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@diametral/ui/components/progress"

const UPLOADS = [
  { name: "Charte graphique", value: 100 },
  { name: "Photos atelier Nord", value: 62 },
  { name: "Rapport annuel 2026", value: 18 },
]

export default function DrawerNonModal() {
  return (
    <Drawer modal={false} showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        Show upload queue
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Uploading 3 files</DrawerTitle>
          <DrawerDescription>
            Keep working — the page stays interactive while this is open.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 p-4">
          {UPLOADS.map((upload) => (
            <Progress key={upload.name} value={upload.value}>
              <ProgressLabel>{upload.name}</ProgressLabel>
              <ProgressValue />
            </Progress>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="ghost" />}>Hide</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
