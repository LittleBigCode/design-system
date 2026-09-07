/* The class-name joiner every component uses. It was copy-pasted into all 65
   modules; one definition removes 64 duplicates and gives it a type. */
export type ClassValue = string | false | null | undefined;

export function cx(...parts: ClassValue[]): string {
  return parts.filter(Boolean).join(" ");
}

/* Some Base UI parts (Dialog/AlertDialog/Menu backdrops and popups) type
   `className` as `string | ((state) => string | undefined)`, so a consumer can
   compute it from the part's own open/closed state. `cx` only ever joins
   strings, so every absorbed wrapper that re-derives its own `className` this
   way narrows the prop back to `string` — the function form isn't supported
   here (batch 12, #45). */
export type WithClassName<T> = Omit<T, "className"> & { className?: string };
