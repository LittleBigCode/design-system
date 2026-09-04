import type { ComponentProps } from "react"
import { FileTextIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@diametral/ui/components/empty"

export default function EmptyPlayground({
  children,
  ...props
}: ComponentProps<typeof EmptyMedia>) {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia {...props}>
          <FileTextIcon />
        </EmptyMedia>
        <EmptyTitle>{children}</EmptyTitle>
        <EmptyDescription>Upload a file to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Upload</Button>
      </EmptyContent>
    </Empty>
  )
}
