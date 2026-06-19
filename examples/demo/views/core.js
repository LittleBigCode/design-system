/* Core views: Overview, Inbox, Settings. */
import React from "react";
import {
  StatCard, Sparkline, LineChart, DonutChart, Card,
  Avatar, Tooltip, IconButton, Button, Field, Textarea, EmptyState,
  Tabs, Input, FieldHint, Select, Switch, useToast,
  useForm, FormField, ColorPicker, DatePicker, MultiSelect,
  useResource, Skeleton, Alert,
} from "../../../react/index.js";
import { h, F } from "../ui.js";
import { MESSAGES } from "../data.js";
import { fetchMetrics } from "../api.js";
const { useState } = React;

export function Overview() {
  // The line chart's data is fetched from the demo API (a static JSON) — it
  // shows a Skeleton while loading and an Alert on error. See docs/data.md.
  const { data: metrics, loading, error } = useResource(fetchMetrics, []);
  return h(F, null,
    h("div", { className: "ph" }, "Overview"),
    h("div", { className: "psub" }, "Pricing performance across all entities · Q2 2026"),
    h("div", { className: "grid4" },
      h(StatCard, { label: "Active projects", value: "86", delta: "8 this week", deltaDir: "up", animate: true }),
      h(StatCard, { label: "Avg. margin", value: "24.6 %", delta: "2.1 pts", deltaDir: "up", animate: true }),
      h(StatCard, { label: "At-risk rate", value: "5.2 %", delta: "0.4 pts", deltaDir: "down", animate: true }),
      h(StatCard, { label: "Revenue · 30d", value: "€4.51M", animate: true }, h(Sparkline, { data: [40, 44, 42, 50, 48, 57, 54, 62, 60, 71, 68, 80], fill: true, animate: true, width: 200, height: 36 }))),
    h("div", { className: "grid2", style: { marginTop: "16px" } },
      h(Card, { title: "Revenue vs cost" }, h("div", { className: "card-pad" },
        error ? h(Alert, { type: "danger" }, "Couldn't load metrics. Please retry.")
          : loading ? h(Skeleton, { variant: "block", height: 240 })
            : h(LineChart, { series: metrics.series, labels: metrics.labels, width: 700, height: 240 }))),
      h(Card, { title: "Revenue by entity" }, h("div", { className: "card-pad", style: { display: "grid", placeItems: "center" } },
        h(DonutChart, { data: [{ label: "LBC_FR", value: 46 }, { label: "LBC_BE", value: 28 }, { label: "LBC_US", value: 19 }, { label: "LBC_CH", value: 11 }], centerLabel: "104", size: 200 })))));
}

export function Inbox() {
  const [sel, setSel] = useState(MESSAGES[0].id);
  const [read, setRead] = useState(() => new Set());
  const cur = MESSAGES.find((m) => m.id === sel);
  const open = (id) => { setSel(id); setRead((s) => new Set(s).add(id)); };
  return h(F, null,
    h("div", { className: "ph", style: { marginBottom: "16px" } }, "Inbox"),
    h("div", { className: "ib" },
      h("div", { className: "ib__list" }, MESSAGES.map((m) => {
        const unread = m.unread && !read.has(m.id);
        return h("div", { key: m.id, className: "ib__row" + (m.id === sel ? " on" : ""), onClick: () => open(m.id) },
          h(Avatar, { initials: m.init, size: "sm" }),
          h("div", { style: { minWidth: 0, flex: 1 } },
            h("div", { className: "row", style: { justifyContent: "space-between" } }, h("b", { style: { fontWeight: unread ? 600 : 400, fontSize: "13.5px" } }, m.from), h("span", { style: { color: "var(--ds-ink-faint)", fontSize: "12px" } }, m.time)),
            h("div", { style: { fontSize: "13px", fontWeight: unread ? 500 : 400 } }, m.subj),
            h("div", { style: { fontSize: "12.5px", color: "var(--ds-ink-faint)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, m.snip)),
          unread ? h("span", { className: "ib__dot" }) : null);
      })),
      h("div", { className: "ib__read" }, cur ? h("div", null,
        h("div", { className: "row", style: { gap: "12px", marginBottom: "16px" } },
          h(Avatar, { initials: cur.init }),
          h("div", { style: { flex: 1 } }, h("div", { className: "ph", style: { fontSize: "19px" } }, cur.subj), h("div", { style: { color: "var(--ds-ink-faint)", fontSize: "13px" } }, cur.from)),
          h(Tooltip, { label: "Archive" }, h(IconButton, { label: "Archive" }, "▾")), h(Button, { variant: "primary" }, "Reply")),
        h("p", { style: { lineHeight: 1.6, color: "var(--ds-ink-soft)", maxWidth: "62ch" } }, cur.body),
        h("div", { style: { marginTop: "18px" } }, h(Field, { label: "Reply" }, h(Textarea, { rows: 3, placeholder: "Write a reply…" })), h("div", { style: { marginTop: "10px" } }, h(Button, { variant: "primary" }, "Send")))) : h(EmptyState, { title: "No message selected" }))));
}

const SKILL_OPTS = [
  { value: "python", label: "Python" }, { value: "react", label: "React" },
  { value: "sql", label: "SQL" }, { value: "llms", label: "LLMs" },
  { value: "mlops", label: "MLOps" }, { value: "airflow", label: "Airflow" },
  { value: "go", label: "Go" }, { value: "rust", label: "Rust" },
];
const RE_EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const RE_USER = /^[a-z0-9_]{3,20}$/;
const RE_PW = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Validation lives in one place: regex checks + a cross-field password match.
function validateSettings(v) {
  const e = {};
  if (!v.name || v.name.trim().length < 2) e.name = "Enter at least 2 characters.";
  if (!RE_EMAIL.test(v.email)) e.email = "Enter a valid email address.";
  if (!RE_USER.test(v.username)) e.username = "3–20 chars: lowercase letters, digits or underscore.";
  if (!v.skills || v.skills.length === 0) e.skills = "Pick at least one skill.";
  if (v.password || v.confirm) {
    if (!RE_PW.test(v.password)) e.password = "Min 8 chars, with an upper, a lower and a digit.";
    if (v.confirm !== v.password) e.confirm = "Passwords don't match.";
  }
  return e;
}

export function Settings() {
  const toast = useToast();
  const form = useForm({
    initialValues: {
      name: "Vincent Devillers", email: "vincent@diametral.io", username: "vincent",
      role: "Director", bio: "", color: "#ff2a00", birthday: "", skills: ["react", "llms"],
      password: "", confirm: "",
    },
    validate: validateSettings,
  });
  const { values, errors, setValue, register } = form;
  const grid = { paddingTop: "18px", display: "grid", gap: "16px", maxWidth: "560px" };

  const runSave = form.handleSubmit(() => toast.show({ type: "success", title: "Saved", message: "Your profile was updated." }));
  const onSubmit = (ev) => {
    ev.preventDefault();
    const ok = Object.keys(validateSettings(values)).length === 0;
    runSave(ev);
    if (!ok) toast.show({ type: "danger", title: "Check the form", message: "Some fields need attention." });
  };

  const profile = h("div", { style: grid },
    h(FormField, { label: "Full name", htmlFor: "st-name", error: errors.name },
      h(Input, { id: "st-name", ...register("name") })),
    h(FormField, { label: "Email", htmlFor: "st-email", error: errors.email },
      h(Input, { id: "st-email", type: "email", ...register("email") })),
    h(FormField, { label: "Username", htmlFor: "st-user", error: errors.username, hint: "Lowercase letters, digits or underscore — validated by regex." },
      h(Input, { id: "st-user", ...register("username") })),
    h(FormField, { label: "Role", htmlFor: "st-role" },
      h(Select, { id: "st-role", ...register("role"), options: ["Director", "Manager", "Consultant"] })),
    h(FormField, { label: "Bio", htmlFor: "st-bio", hint: "A short description for your profile." },
      h(Textarea, { id: "st-bio", rows: 3, placeholder: "Tell the team about yourself…", ...register("bio") })),
    h(FormField, { label: "Skills", error: errors.skills, hint: "Multi-select with a dropdown — pick one or more." },
      h(MultiSelect, { options: SKILL_OPTS, value: values.skills, onChange: (a) => setValue("skills", a), placeholder: "Add skills…" })),
    h("div", { className: "grid-2" },
      h(FormField, { label: "Accent color", hint: "Color picker with brand swatches." },
        h(ColorPicker, { value: values.color, onChange: (v) => setValue("color", v) })),
      h(FormField, { label: "Birthday", hint: "Date picker (no future dates)." },
        h(DatePicker, { value: values.birthday, onChange: (d, iso) => setValue("birthday", iso), max: new Date(), placeholder: "yyyy-mm-dd" }))));

  const security = h("div", { style: grid },
    h(FormField, { label: "New password", htmlFor: "st-pw", error: errors.password, hint: "Min 8 chars, with an upper, a lower and a digit." },
      h(Input, { id: "st-pw", type: "password", ...register("password") })),
    h(FormField, { label: "Confirm password", htmlFor: "st-pw2", error: errors.confirm, hint: "Cross-field validation: must match the password above." },
      h(Input, { id: "st-pw2", type: "password", ...register("confirm") })));

  const notif = h("div", { style: { paddingTop: "18px", display: "grid", gap: "14px", maxWidth: "560px" } },
    h("label", { className: "ds-input-row" }, h("span", null, "Email digests"), h(Switch, { defaultChecked: true })),
    h("label", { className: "ds-input-row" }, h("span", null, "Push alerts"), h(Switch, {})),
    h("label", { className: "ds-input-row" }, h("span", null, "Weekly summary"), h(Switch, { defaultChecked: true })));

  const items = [
    { id: "profile", label: "Profile", content: profile },
    { id: "security", label: "Security", content: security },
    { id: "notif", label: "Notifications", content: notif },
  ];

  return h(F, null,
    h("div", { className: "ph" }, "Settings"),
    h("div", { className: "psub" }, "Account preferences — a tour of the form controls & validation."),
    h("form", { onSubmit, noValidate: true },
      h(Tabs, { items }),
      h("div", { style: { marginTop: "22px", display: "flex", gap: "10px" } },
        h(Button, { type: "button", onClick: () => form.reset() }, "Reset"),
        h(Button, { variant: "primary", type: "submit" }, "Save changes"))));
}
