import React from "react";
const { useState } = React;
import { h, F } from "../ui.js";
import { PageHeader, Button, Tabs, Calendar, Agenda } from "../../../react/index.js";
import { EVENTS, AGENDA } from "../data.js";

// Calendar event statuses are limited to success | warning | danger | info; the
// EVENTS `type` is otherwise compatible, so only "accent" needs remapping.
const calStatus = (t) => (t === "accent" ? "info" : t);

// EVENTS: { date, title, type } -> Calendar event: { date, label, status }.
const calEvents = EVENTS.map((e) => ({ date: e.date, label: e.title, status: calStatus(e.type) }));

// AGENDA rows carry no date; Agenda groups by day, so anchor them to the
// month we're showing (June 18, 2026). { time, title, meta } pass through.
const agendaEvents = AGENDA.map((a) => ({ date: "2026-06-18", time: a.time, title: a.title, meta: a.meta }));

export function CalendarView() {
  const [tab, setTab] = useState("month");

  const tabs = [
    {
      id: "month",
      label: "Month",
      content: h("div", { className: "card-pad" },
        h(Calendar, { month: "2026-06-01", weekStartsOn: 1, events: calEvents })),
    },
    {
      id: "agenda",
      label: "Agenda",
      content: h("div", { className: "card-pad" },
        h(Agenda, { events: agendaEvents, emptyMessage: "No events scheduled." })),
    },
  ];

  return h(F, null,
    h(PageHeader, {
      title: "Calendar",
      subtitle: "Scheduling & staffing · June 2026",
      actions: h(Button, { variant: "primary" }, "New event"),
    }),
    h(Tabs, { items: tabs, value: tab, onChange: setTab })
  );
}
