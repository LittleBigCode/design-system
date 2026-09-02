import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@diametral/ui/components/table"

const MEMBERS = [
  { name: "Augustin Morval", role: "Design engineering", team: "Platform" },
  { name: "Camille Roy", role: "Product design", team: "Brand" },
  { name: "Nadia Lefevre", role: "Frontend", team: "Platform" },
]

export default function TableBasic() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Team</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {MEMBERS.map((member) => (
          <TableRow key={member.name}>
            <TableCell>{member.name}</TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell>{member.team}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
