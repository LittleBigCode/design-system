import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@diametral/design-system/react/tabs"

export default function TabsPrimitiveLine() {
  return (
    <Tabs defaultValue="summary" className="w-full">
      <div className="border-b border-border">
        <TabsList variant="line">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="items">Line items</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="summary" className="pt-4 text-sm">
        Invoice DIA-2026-0114 — issued 12 March, due 11 April.
      </TabsContent>
      <TabsContent value="items" className="pt-4 text-sm">
        Six lines, 4 820 € before tax.
      </TabsContent>
      <TabsContent value="history" className="pt-4 text-sm">
        Sent 12 March, opened 13 March, reminder queued for 4 April.
      </TabsContent>
    </Tabs>
  )
}
