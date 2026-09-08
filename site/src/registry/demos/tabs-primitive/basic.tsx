import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@diametral/design-system/react/tabs"

export default function TabsPrimitiveBasic() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-4 text-sm">
        Traffic, conversion and revenue for the current period.
      </TabsContent>
      <TabsContent value="activity" className="pt-4 text-sm">
        Every deploy, comment and status change, newest first.
      </TabsContent>
      <TabsContent value="settings" className="pt-4 text-sm">
        Workspace name, members and billing.
      </TabsContent>
    </Tabs>
  )
}
