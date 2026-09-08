import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@diametral/design-system/react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@diametral/design-system/react/tabs"

export default function TabsPrimitiveInCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Deployment</CardTitle>
        <CardDescription>Last push to main, 4 minutes ago.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="build" className="w-full">
          <TabsList>
            <TabsTrigger value="build">Build</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
          </TabsList>
          <TabsContent value="build" className="pt-4 font-mono text-xs">
            ✓ built in 540ms
          </TabsContent>
          <TabsContent value="tests" className="pt-4 font-mono text-xs">
            ✓ 2 suites passed
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
