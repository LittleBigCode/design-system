/* Talent views: Candidates pipeline, CV. (Team + person profile live in team.js.) */
import { Kanban, Avatar, Button, Card, Tag, Timeline, Progress, SectionHeading, StatCard } from "../../../react/index.js";
import { h, F } from "../ui.js";
import { CAND_COLS, CANDIDATES, COURSES } from "../data.js";

export function Candidates({ go, select }) {
  return h(F, null,
    h("div", { className: "ph" }, "Candidates"),
    h("div", { className: "psub" }, "Recruiting pipeline — drag to advance a stage, or open a CV."),
    h(Kanban, {
      columns: CAND_COLS, items: CANDIDATES,
      renderCard: (c) => h("div", null,
        h("div", { className: "row" }, h(Avatar, { initials: c.init, size: "sm" }),
          h("div", { style: { minWidth: 0 } }, h("div", { className: "ds-kanban__card-title" }, c.name),
            h("div", { style: { fontSize: "12px", color: "var(--ds-ink-faint)" } }, c.role))),
        h("div", { className: "ds-kanban__card-meta" }, h("span", null, c.loc),
          h(Button, { variant: "primary", size: "sm", onClick: () => { select({ candidate: c }); go("cv"); } }, "CV →"))),
    }));
}

export function CV({ go, sel }) {
  const c = (sel && sel.candidate) || CANDIDATES[3];
  return h(F, null,
    h("div", { className: "row", style: { justifyContent: "space-between", marginBottom: "18px" } },
      h(Button, { onClick: () => go("candidates") }, "← Pipeline"),
      h("div", { className: "row" }, h(Button, {}, "Reject"), h(Button, { variant: "primary" }, "Move to offer"))),
    h("div", { className: "grid2" },
      h("div", null,
        h("div", { className: "row", style: { gap: "16px", marginBottom: "8px" } },
          h(Avatar, { initials: c.init, size: "lg" }),
          h("div", null, h("div", { className: "ph" }, c.name),
            h("div", { className: "psub", style: { margin: "2px 0 0" } }, c.role + " · " + c.loc))),
        h("p", { style: { color: "var(--ds-ink-soft)", lineHeight: 1.6, maxWidth: "62ch", margin: "14px 0 24px" } },
          "AI-native engineer with a track record of turning critical processes into production systems. Strong on data platforms, LLM systems and pragmatic delivery."),
        h(SectionHeading, null, "Experience"),
        h(Timeline, { items: [
          { time: "2023 — now", title: "Lead Data Scientist · Globex", body: "Owns the pricing & forecasting models in production.", status: "success" },
          { time: "2020 — 2023", title: "ML Engineer · Initech", body: "Built the recommendation and ranking stack.", status: "info" },
          { time: "2018 — 2020", title: "Data Analyst · Acme", body: "Analytics and reporting for the commercial team." },
        ] }),
        h(SectionHeading, { style: { marginTop: "26px" } }, "Education"),
        h(Timeline, { items: [
          { time: "2018", title: "MSc Data Science · École Polytechnique" },
          { time: "2016", title: "BSc Computer Science · Sorbonne" },
        ] })),
      h("div", null,
        h(Card, { title: "Skills" }, h("div", { className: "card-pad" },
          h("div", { className: "ds-chips" }, ["Python", "PyTorch", "SQL", "LLMs", "MLOps", "Airflow", "React"].map((s) => h(Tag, { key: s }, s))))),
        h("div", { style: { height: "16px" } }),
        h(Card, { title: "Pipeline" }, h("div", { className: "card-pad", style: { display: "grid", gap: "10px" } },
          h("div", { className: "row", style: { justifyContent: "space-between" } }, h("span", { style: { color: "var(--ds-ink-faint)" } }, "Stage"), h(Tag, { status: "info" }, "Interview")),
          h("div", { className: "row", style: { justifyContent: "space-between" } }, h("span", { style: { color: "var(--ds-ink-faint)" } }, "Fit score"), h("b", null, "82 / 100")),
          h(Progress, { value: 82, status: "success" }))))));
}

export function Training() {
  return h(F, null,
    h("div", { className: "ph" }, "Training"),
    h("div", { className: "psub" }, "Become AI-native — your learning track."),
    h("div", { className: "grid4", style: { marginBottom: "22px" } },
      h(StatCard, { label: "Enrolled", value: "5" }),
      h(StatCard, { label: "Completed", value: "1" }),
      h(StatCard, { label: "Hours", value: "42" }),
      h(StatCard, { label: "Streak", value: "9", delta: "days", deltaDir: "up" })),
    h("div", { className: "grid3" },
      COURSES.map((c) => h(Card, { key: c.id }, h("div", { className: "card-pad" },
        h("div", { className: "row", style: { justifyContent: "space-between", marginBottom: "10px" } },
          h(Tag, { status: c.level === "Advanced" ? "warning" : c.level === "Core" ? "success" : null }, c.level),
          h("span", { style: { fontSize: "12px", color: "var(--ds-ink-faint)" } }, c.hours + "h")),
        h("div", { style: { fontFamily: "var(--ds-font-title)", fontSize: "18px", marginBottom: "12px" } }, c.title),
        h(Progress, { value: c.progress, status: c.progress === 100 ? "success" : undefined }),
        h("div", { style: { marginTop: "14px" } },
          h(Button, { variant: c.progress === 0 ? "primary" : undefined, block: true },
            c.progress === 0 ? "Enroll" : c.progress === 100 ? "Review" : "Continue")))))));
}
