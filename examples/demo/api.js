/* A tiny mock "backend": fetches the static JSON files in ./api/ that ship with
   the demo. A small artificial latency makes the loading states (skeletons, the
   top load bar) visible — real endpoints have it for free. Swap these for your
   own fetch() calls / `restLoadPage()` against a real API. */

const BASE = new URL("./api/", import.meta.url);
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(file) {
  const res = await fetch(new URL(file, BASE));
  if (!res.ok) throw new Error(`Request failed: ${file} (${res.status})`);
  return res.json();
}

/** Fetch the dashboard metrics for a chart: { labels, series }. */
export async function fetchMetrics() {
  await delay(650);
  return getJson("metrics.json");
}

/** Build a <DataGrid loadPage> backed by a static JSON array — fetch once, then
   filter / sort / paginate client-side. (For a real paginated REST API, use
   `restLoadPage(url)` from @diametral/design-system/react/hooks instead.) */
export function jsonLoadPage(file) {
  let cache = null;
  return async ({ page, pageSize, sort, filters }) => {
    await delay(500);
    if (!cache) cache = await getJson(file);
    let rows = cache.slice();
    for (const [k, v] of Object.entries(filters || {})) {
      if (v) rows = rows.filter((r) => String(r[k]).toLowerCase().includes(String(v).toLowerCase()));
    }
    if (sort && sort.key) {
      rows.sort((a, b) => {
        const x = a[sort.key], y = b[sort.key];
        const c = x > y ? 1 : x < y ? -1 : 0;
        return sort.dir === "desc" ? -c : c;
      });
    }
    const start = (page - 1) * pageSize;
    return { rows: rows.slice(start, start + pageSize), total: rows.length };
  };
}
