import React from "react";
const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(" ");

const range = (start, end) => {
  const out = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
};

/* Build the page window: first + last always shown, `siblingCount` pages each
   side of the current page, and "…" markers where there is a gap. */
function buildPages(page, pageCount, siblingCount) {
  // Few enough pages to show them all (first/last + window + 2 ellipses).
  const total = siblingCount * 2 + 5;
  if (pageCount <= total) return range(1, pageCount);

  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, pageCount);
  const showLeftDots = left > 2;
  const showRightDots = right < pageCount - 1;

  if (!showLeftDots && showRightDots) {
    return [...range(1, siblingCount * 2 + 3), "…", pageCount];
  }
  if (showLeftDots && !showRightDots) {
    return [1, "…", ...range(pageCount - (siblingCount * 2 + 2), pageCount)];
  }
  return [1, "…", ...range(left, right), "…", pageCount];
}

/* ---- Pagination (controlled) --------------------------------------------
   page: current 1-based page · pageCount: total pages
   onChange(nextPage) · siblingCount: pages shown each side of current. */
export function Pagination({
  page = 1,
  pageCount = 1,
  onChange,
  siblingCount = 1,
  className,
  ...rest
}) {
  const go = (p) => {
    const next = Math.min(Math.max(p, 1), pageCount);
    if (next !== page) onChange && onChange(next);
  };
  const pages = buildPages(page, pageCount, siblingCount);

  return h("nav", {
    className: cx("ds-pagination", className),
    "aria-label": "Pagination",
    ...rest,
  },
    h("button", {
      type: "button",
      className: "ds-pagination__nav",
      "aria-label": "Previous page",
      disabled: page <= 1,
      onClick: () => go(page - 1),
    }, "Prev"),

    pages.map((p, i) =>
      p === "…"
        ? h("span", { key: `dots-${i}`, className: "ds-pagination__ellipsis", "aria-hidden": "true" }, "…")
        : h("button", {
            key: p,
            type: "button",
            className: cx("ds-pagination__item", p === page && "is-active"),
            "aria-current": p === page ? "page" : undefined,
            "aria-label": `Page ${p}`,
            onClick: () => go(p),
          }, p)
    ),

    h("button", {
      type: "button",
      className: "ds-pagination__nav",
      "aria-label": "Next page",
      disabled: page >= pageCount,
      onClick: () => go(page + 1),
    }, "Next")
  );
}
