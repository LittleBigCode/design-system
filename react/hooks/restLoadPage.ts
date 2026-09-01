

import type { LoadPageArgs, LoadPageResult } from "../components/DataGrid";

export interface RestLoadPageOptions {
  /** Response header carrying the unfiltered total. Defaults to "X-Total-Count". */
  totalHeader?: string;
  /** Extra options forwarded to `fetch` (headers, credentials, signal, …). */
  fetchOptions?: RequestInit;
  /** Page query param name. Defaults to "_page" (json-server). */
  pageParam?: string;
  /** Page-size query param name. Defaults to "_limit" (json-server). */
  limitParam?: string;
  /** Sort-key query param name. Defaults to "_sort" (json-server). */
  sortParam?: string;
  /** Sort-direction query param name. Defaults to "_order" (json-server). */
  orderParam?: string;
}

/**
 * Build a `loadPage` function for `<DataGrid loadPage>` from a json-server-style
 * REST endpoint. Translates page/pageSize/sort/filters into query params,
 * fetches `baseUrl`, and resolves `{ rows, total }` — `total` read from the
 * `X-Total-Count` header (or `options.totalHeader`), falling back to the row count.
 */
/* ============================================================================
   Diametral Design System — restLoadPage
   ----------------------------------------------------------------------------
   Adapt a json-server-style REST endpoint to the DS <DataGrid loadPage> prop.

       <DataGrid columns={cols} pageSize={20}
                 loadPage={restLoadPage("/api/items")} />

   `restLoadPage(baseUrl, options)` returns a `loadPage({ page, pageSize, sort,
   filters })` function (matching DataGrid's LoadPageArgs) that fetches:

       `${baseUrl}?_page=${page}&_limit=${pageSize}`
         + `&_sort=<key>&_order=<dir>`        (when `sort` is set)
         + one `<name>=<value>` param per non-empty filter

   and resolves `{ rows, total }` — `total` from the `X-Total-Count` response
   header (configurable via `options.totalHeader`), falling back to the
   returned array length. Plain-JS ESM, no JSX, no build step, uses `fetch`.
   ============================================================================ */

export function restLoadPage(baseUrl: string, options: RestLoadPageOptions = {}) {
  const {
    totalHeader = "X-Total-Count",
    fetchOptions = {},
    pageParam = "_page",
    limitParam = "_limit",
    sortParam = "_sort",
    orderParam = "_order",
  } = options;

  return function loadPage({ page, pageSize, sort, filters }: Partial<LoadPageArgs> = {}) {
    const params = new URLSearchParams();
    if (page != null) params.set(pageParam, String(page));
    if (pageSize != null) params.set(limitParam, String(pageSize));

    if (sort && sort.key) {
      params.set(sortParam, sort.key);
      params.set(orderParam, sort.dir || "asc");
    }

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null && value !== "") {
          params.set(key, String(value));
        }
      }
    }

    const query = params.toString();
    const url = query ? `${baseUrl}?${query}` : baseUrl;

    return fetch(url, fetchOptions).then((res) => {
      if (!res.ok) {
        throw new Error(`restLoadPage: ${res.status} ${res.statusText} for ${url}`);
      }
      return res.json().then((body) => {
        const rows = Array.isArray(body) ? body : (body && body.rows) || [];
        const headerValue = res.headers && res.headers.get(totalHeader);
        const parsed = headerValue == null ? NaN : Number(headerValue);
        const total = Number.isFinite(parsed) ? parsed : rows.length;
        return { rows, total };
      });
    });
  };
}
