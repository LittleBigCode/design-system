import type { DependencyList } from "react";

export interface UseResourceResult<T> {
  /** Latest resolved value, or `undefined` until the first success. */
  data: T | undefined;
  /** The thrown/rejected value from the last failed run, else `null`. */
  error: unknown;
  /** True while a run is in flight (including the initial mount run). */
  loading: boolean;
  /** Re-run the fetcher; returns the run's promise. */
  reload: () => Promise<void>;
}

/**
 * Run an async `fetcher` on mount and whenever `deps` change, tracking
 * loading / error / data state. Guards against setState-after-unmount and
 * out-of-order responses. `reload()` re-runs the fetcher on demand.
 */
export declare function useResource<T = unknown>(
  fetcher: () => T | Promise<T>,
  deps?: DependencyList
): UseResourceResult<T>;
