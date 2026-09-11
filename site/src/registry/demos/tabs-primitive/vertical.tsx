import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@diametral/design-system/react/tabs"

export default function TabsPrimitiveVertical() {
  return (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      className="flex w-full gap-6"
    >
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="general" className="text-sm">
          Workspace name and default locale.
        </TabsContent>
        <TabsContent value="members" className="text-sm">
          Four members, two pending invitations.
        </TabsContent>
        <TabsContent value="tokens" className="text-sm">
          Tier-1 primitives and Tier-2 semantics.
        </TabsContent>
      </div>
    </Tabs>
  )
}
