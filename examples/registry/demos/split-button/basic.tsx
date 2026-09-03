import { MenuItem, SplitButton } from "@diametral/design-system/react"

export default function SplitButtonBasic() {
  return (
    <SplitButton
      variant="primary"
      menu={
        <>
          <MenuItem>Deploy to staging</MenuItem>
          <MenuItem>Deploy and watch</MenuItem>
          <MenuItem>Dry run</MenuItem>
        </>
      }
    >
      Deploy
    </SplitButton>
  )
}
