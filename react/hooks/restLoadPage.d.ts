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
export declare function restLoadPage(
  baseUrl: string,
  options?: RestLoadPageOptions
): (args: LoadPageArgs) => Promise<LoadPageResult>;
