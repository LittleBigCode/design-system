import {
  ChartLineIcon,
  GearIcon,
  ListChecksIcon,
  TableIcon,
} from "@phosphor-icons/react"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  Sparkline,
  StatCard,
  StatCardDelta,
  StatCardLabel,
  StatCardValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Wordmark,
} from "@diametral/design-system/react"

const NAV = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", icon: ChartLineIcon, active: true },
      { title: "Activity", icon: ListChecksIcon, active: false },
    ],
  },
  {
    label: "Pricing",
    items: [
      { title: "Pricing matrix", icon: TableIcon, active: false },
      { title: "Settings", icon: GearIcon, active: false },
    ],
  },
]

const KPIS = [
  { label: "Active missions", value: "137", delta: "+8 this week", direction: "up" as const },
  { label: "Avg. margin", value: "24.6 %", delta: "+2.1 pts", direction: "up" as const },
  { label: "At-risk rate", value: "5.2 %", delta: "-0.4 pts", direction: "down" as const },
]

const ENTITIES = [
  { name: "LBC_FR", margin: "22%", series: [14, 12, 15, 9, 11, 6] },
  { name: "LBC_BE", margin: "29%", series: [16, 13, 11, 8, 5, 2] },
  { name: "LBC_US", margin: "17%", series: [8, 10, 9, 12, 11, 13] },
  { name: "LBC_CH", margin: "12%", series: [4, 7, 9, 10, 14, 16] },
  { name: "LBC_DE", margin: "25%", series: [11, 9, 10, 7, 8, 5] },
]

export default function Dashboard01() {
  return (
    <SidebarProvider className="min-h-svh">
      <Sidebar collapsible="none" className="w-56">
        <SidebarHeader>
          <Wordmark variant="square" name="Diametral" sub="Console" />
        </SidebarHeader>
        <SidebarContent>
          {NAV.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton isActive={item.active}>
                        <item.icon /> {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <PageHeader>
          <PageHeaderHeading>
            <div className="flex flex-col gap-1">
              <PageHeaderTitle>Dashboard</PageHeaderTitle>
              <PageHeaderDescription>
                Pricing performance across all entities · Q2 2026
              </PageHeaderDescription>
            </div>
            <PageHeaderActions>
              <Badge variant="accent">Production</Badge>
              <Button>Export</Button>
              <Button variant="primary">New mission</Button>
            </PageHeaderActions>
          </PageHeaderHeading>
        </PageHeader>

        <div className="flex flex-col gap-5 p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {KPIS.map((kpi) => (
              <StatCard key={kpi.label}>
                <StatCardLabel>{kpi.label}</StatCardLabel>
                <StatCardValue>{kpi.value}</StatCardValue>
                <StatCardDelta direction={kpi.direction}>
                  {kpi.delta}
                </StatCardDelta>
              </StatCard>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Margin by entity</CardTitle>
              <span className="ds-label">Q2 2026</span>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entity</TableHead>
                    <TableHead>Margin</TableHead>
                    <TableHead>6 months</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ENTITIES.map((entity) => (
                    <TableRow key={entity.name}>
                      <TableCell>{entity.name}</TableCell>
                      <TableCell className="tabular-nums">
                        {entity.margin}
                      </TableCell>
                      <TableCell>
                        <Sparkline
                          data={entity.series}
                          width={90}
                          aria-label={`${entity.name} margin over 6 months`}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
