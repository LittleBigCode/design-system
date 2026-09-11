import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@diametral/design-system/react"

const CLAUSES = [
  {
    title: "1. Licence",
    body: "Diametral grants your organisation a non-exclusive licence to use the design system inside products you own, for as long as the subscription is active.",
  },
  {
    title: "2. Typefaces",
    body: "Ufficio is licensed separately by its foundry and is never redistributed with the packages. Builds fall back to Geist wherever the licence has not been installed.",
  },
  {
    title: "3. Contributions",
    body: "Components you contribute back are published under the same licence as the rest of the system, and stay attributed to your team in the changelog.",
  },
  {
    title: "4. Support",
    body: "Bug reports are answered within two business days. Requests that change a published token or a component API are scheduled into the next minor release.",
  },
  {
    title: "5. Termination",
    body: "On cancellation you keep every version already shipped to production, but stop receiving updates from the release channel.",
  },
]

export default function DialogPrimitiveLongContent() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Review terms
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-6rem)] grid-rows-[auto_minmax(0,1fr)_auto]">
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>
            Updated 12 May 2026. Accepting applies to every seat in the
            workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 overflow-y-auto pe-4 text-muted-foreground">
          {CLAUSES.map((clause) => (
            <section key={clause.title}>
              <h3 className="mb-1 font-medium text-foreground">
                {clause.title}
              </h3>
              <p className="leading-relaxed">{clause.body}</p>
            </section>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Decline
          </DialogClose>
          <DialogClose render={<Button />}>Accept</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
