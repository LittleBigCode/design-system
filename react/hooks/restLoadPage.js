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

export function restLoadPage(baseUrl, options = {}) {
  const {
    totalHeader = "X-Total-Count",
    fetchOptions = {},
    pageParam = "_page",
    limitParam = "_limit",
    sortParam = "_sort",
    orderParam = "_order",
  } = options;

  return function loadPage({ page, pageSize, sort, filters } = {}) {
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
