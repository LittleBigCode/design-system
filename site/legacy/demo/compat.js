/* Demo-local adapters for the batch-6 parts APIs.
   ----------------------------------------------------------------------------
   This console is ~35 hand-written React.createElement call sites, and beta.6
   turned seven class-appliers into parts kits: PageHeader, Avatar, EmptyState →
   Empty, DescriptionList, Timeline, Breadcrumb and Stepper. Rewriting every call
   site would have been a larger and riskier diff than the absorption itself, and
   this file is not the place a consumer learns the API — the component pages
   under examples/components/ and the docs site are.

   So the old prop shapes live on here, as the adapter a consumer would write,
   composed out of the new parts. Nothing in this file ships: examples/ is not in
   package.json's `files` allowlist.

   Recorded in docs/absorption/corrections.md. Rewriting the demo onto the parts
   directly is a 1.0 cutover item, not a batch one.
   ============================================================================ */
import React from "react";
import {
  Avatar as DsAvatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb as DsBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DescriptionDetail,
  DescriptionList as DsDescriptionList,
  DescriptionTerm,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  PageHeader as DsPageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
  Kanban as DsKanban,
  Stepper as DsStepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  Timeline as DsTimeline,
  TimelineContent,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
  TimelineDescription,
  AvatarGroup as DsAvatarGroup,
  Progress as DsProgress,
} from "../../dist/react/index.js";

const h = React.createElement;

export function Avatar({ initials, src, alt, size, ...rest }) {
  return h(DsAvatar, { size, ...rest },
    src ? h(AvatarImage, { src, alt }) : null,
    initials != null ? h(AvatarFallback, null, initials) : null);
}

/* 0.11's Progress drew its own bar off `value`; the parts kit renders the track
   and indicator itself, so only the tone spelling moves. `max` is Base UI's. */
export function Progress({ status, tone, ...rest }) {
  return h(DsProgress, { tone: tone ?? status, ...rest });
}

/* The overflow count is written rather than computed now, so `max` collapses
   the tail here instead of inside the component. */
export function AvatarGroup({ max, children, ...rest }) {
  const items = React.Children.toArray(children);
  if (!max || items.length <= max) return h(DsAvatarGroup, rest, items);
  return h(DsAvatarGroup, rest, items.slice(0, max),
    h("div", { className: "ds-avatar-group-count", "aria-label": `${items.length - max} more` },
      `+${items.length - max}`));
}

export function EmptyState({ title, description, icon, actions }) {
  return h(Empty, null,
    h(EmptyHeader, null,
      icon || null,
      title != null ? h(EmptyTitle, null, title) : null,
      description != null ? h(EmptyDescription, null, description) : null),
    actions || null);
}

export function DescriptionList({ items = [], ...rest }) {
  return h(DsDescriptionList, rest,
    items.map((row, i) => h(React.Fragment, { key: i },
      h(DescriptionTerm, null, row.term),
      h(DescriptionDetail, null, row.desc))));
}

/* 0.11's Timeline took `{ time, title, body, status }`; tone rides on the item
   now, and `data-state` is what fills the indicator with it. */
export function Timeline({ items = [], ...rest }) {
  return h(DsTimeline, rest,
    items.map((item, i) => h(TimelineItem, {
      key: i,
      tone: item.status,
      "data-state": item.status ? "completed" : undefined,
    },
      h(TimelineIndicator),
      h(TimelineContent, null,
        item.title != null ? h(TimelineTitle, null, item.title) : null,
        item.time != null ? h(TimelineTime, null, item.time) : null,
        item.body != null ? h(TimelineDescription, null, item.body) : null))));
}

export function Breadcrumb({ items = [], ...rest }) {
  const last = items.length - 1;
  return h(DsBreadcrumb, rest, h(BreadcrumbList, null,
    items.flatMap((item, i) => {
      const cell = h(BreadcrumbItem, { key: i },
        i === last || !item.href
          ? h(BreadcrumbPage, null, item.label)
          : h(BreadcrumbLink, { href: item.href }, item.label));
      return i === last ? [cell] : [cell, h(BreadcrumbSeparator, { key: `sep-${i}` })];
    })));
}

export function Stepper({ steps = [], active = 0, ...rest }) {
  return h(DsStepper, rest, steps.map((step, i) => h(StepperItem, {
    key: i,
    state: i < active ? "completed" : i === active ? "active" : "inactive",
  },
    h(StepperIndicator, null, i + 1),
    h(StepperContent, null, h(StepperTitle, null, step.label)))));
}

export function PageHeader({ title, subtitle, breadcrumb, actions, children, ...rest }) {
  return h(DsPageHeader, rest,
    breadcrumb || null,
    h(PageHeaderHeading, null,
      h("div", null,
        title != null ? h(PageHeaderTitle, null, title) : null,
        subtitle != null ? h(PageHeaderDescription, null, subtitle) : null),
      actions ? h(PageHeaderActions, null, actions) : null),
    children);
}

/* Kanban's swap is beta.8's, not beta.6's, but it lands here for the same
   reason. 0.11's board seeded itself from `items` and owned the order after
   that; the absorbed one is a proper controlled/uncontrolled pair, so the same
   seeding behaviour is spelled `defaultItems`. Passing `items` to the new board
   would pin it — every card would snap back on drop. */
export function Kanban({ items, ...rest }) {
  return h(DsKanban, { defaultItems: items, ...rest });
}
