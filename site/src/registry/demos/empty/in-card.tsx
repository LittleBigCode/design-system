import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Panel,
  PanelHeader,
  PanelTitle,
} from "@diametral/design-system/react"
import { UserPlusIcon, UsersIcon } from "@phosphor-icons/react"

/* Panel is the incumbent until batch 7 lands the source's parts, so the heading
   arrives as `title` rather than as a PanelHeader/PanelTitle pair. */
export default function EmptyInCard() {
  return (
    <Panel className="w-full max-w-md">
      <PanelHeader>
        <PanelTitle>Team</PanelTitle>
      </PanelHeader>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UsersIcon />
          </EmptyMedia>
          <EmptyTitle>No members yet</EmptyTitle>
          <EmptyDescription>
            Invite a teammate to share this workspace.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">
            <UserPlusIcon /> Invite
          </Button>
        </EmptyContent>
      </Empty>
    </Panel>
  )
}
