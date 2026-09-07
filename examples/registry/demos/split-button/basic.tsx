import { DropdownMenuItem, SplitButton } from "@diametral/design-system/react"

export default function SplitButtonBasic() {
  return (
    <SplitButton
      variant="primary"
      menu={
        <>
          <DropdownMenuItem>Deploy to staging</DropdownMenuItem>
          <DropdownMenuItem>Deploy and watch</DropdownMenuItem>
          <DropdownMenuItem>Dry run</DropdownMenuItem>
        </>
      }
    >
      Deploy
    </SplitButton>
  )
}
