import { UserPlusIcon, UsersIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@diametral/ui/components/empty"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@diametral/ui/components/panel"

export default function EmptyInCard() {
  return (
    <Panel className="w-full max-w-md">
      <PanelHeader className="border-b">
        <PanelTitle>Team</PanelTitle>
      </PanelHeader>
      <PanelContent className="px-0">
        <Empty className="p-8">
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
      </PanelContent>
    </Panel>
  )
}
