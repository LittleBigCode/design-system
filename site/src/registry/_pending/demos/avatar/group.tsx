import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@diametral/ui/components/avatar"

const TEAM = ["CR", "AM", "DT", "LB"]

export default function AvatarGroupDemo() {
  return (
    <div className="flex flex-col gap-6">
      <AvatarGroup>
        {TEAM.map((initials) => (
          <Avatar key={initials}>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+7</AvatarGroupCount>
      </AvatarGroup>

      <AvatarGroup>
        {TEAM.slice(0, 3).map((initials) => (
          <Avatar key={initials} size="sm">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+2</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
