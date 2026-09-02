import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@diametral/ui/components/avatar"

const PORTRAIT =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<rect width="64" height="64" fill="#8f9b6b"/>' +
      '<circle cx="32" cy="25" r="11" fill="#f4f1e8"/>' +
      '<path d="M7 64c0-14 11-23 25-23s25 9 25 23z" fill="#f4f1e8"/>' +
      "</svg>"
  )

export default function AvatarBasic() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={PORTRAIT} alt="Camille Roux" />
        <AvatarFallback>CR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>DT</AvatarFallback>
      </Avatar>
    </div>
  )
}
