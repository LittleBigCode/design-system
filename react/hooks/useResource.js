/* ============================================================================
   Diametral Design System — useResource hook
   ----------------------------------------------------------------------------
   A tiny async-data hook for wiring fetchers to the DS loading / empty / error
   / data convention (see docs/data.md). Plain-JS ESM, no JSX, no build step,
   no external deps.

       const { data, error, loading, reload } = useResource(
         () => fetch("/api/items").then((r) => r.json()),
         []
       );

   Runs `await fetcher()` on mount and whenever `deps` change, tracks
   loading/error/data, exposes `reload()` to re-run, and guards against
   setState-after-unmount and out-of-order responses.
   ============================================================================ */
import React from "react";
const { useState, useEffect, useCallback, useRef } = React;

export function useResource(fetcher, deps = []) {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Keep the latest fetcher without forcing it into the deps array, so callers
  // can pass an inline arrow without re-running on every render.
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const mountedRef = useRef(true);
  // Monotonic token so a slow earlier request can't clobber a newer one.
  const runRef = useRef(0);

  const run = useCallback(() => {
    const runId = ++runRef.current;
    setLoading(true);
    setError(null);
    return Promise.resolve()
      .then(() => fetcherRef.current())
      .then((result) => {
        if (!mountedRef.current || runId !== runRef.current) return;
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        if (!mountedRef.current || runId !== runRef.current) return;
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    run();
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const reload = useCallback(() => run(), [run]);

  return { data, error, loading, reload };
}
