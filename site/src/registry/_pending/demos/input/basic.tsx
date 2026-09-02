import { Input } from "@diametral/ui/components/input"

export default function InputBasic() {
  return (
    <div className="w-full max-w-sm">
      <Input type="email" placeholder="you@diametral.com" aria-label="Email" />
    </div>
  )
}
