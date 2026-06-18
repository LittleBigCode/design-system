/* Mock data for the Diametral Console demo (pure data — no React). */

export const ENTITIES = ["LBC_FR", "LBC_BE", "LBC_US", "LBC_CH"];
export const STAGES = ["Discovery", "Design", "Build", "Scale", "Run"];
export const PEOPLE = ["CR", "IF", "VD", "ML", "TS", "AB"];
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PNAMES = ["Atlas", "Nova", "Orbit", "Pulse", "Vertex", "Quanta", "Helix", "Forge"];
const CLIENTS = ["Acme", "Globex", "Initech", "Umbrella", "Stark", "Wayne"];
export const PROJECTS = Array.from({ length: 86 }, (_, i) => ({
  id: i + 1,
  name: "Project " + PNAMES[i % PNAMES.length] + " " + (i + 1),
  client: CLIENTS[i % CLIENTS.length],
  owner: PEOPLE[i % PEOPLE.length],
  stage: STAGES[i % STAGES.length],
  progress: (i * 13) % 100,
  margin: Math.round((((i * 29) % 55) - 6) * 10) / 10,
}));

function pageFrom(all, { page, pageSize, sort, filters }) {
  let d = all.slice();
  for (const [k, v] of Object.entries(filters || {})) if (v) d = d.filter((r) => String(r[k]).toLowerCase().includes(String(v).toLowerCase()));
  if (sort && sort.key) d.sort((a, b) => { const x = a[sort.key], y = b[sort.key]; const c = x > y ? 1 : x < y ? -1 : 0; return sort.dir === "desc" ? -c : c; });
  const s = (page - 1) * pageSize;
  return { rows: d.slice(s, s + pageSize), total: d.length };
}
export const loadProjects = (q) => new Promise((res) => setTimeout(() => res(pageFrom(PROJECTS, q)), 380));

export const SERIES = [
  { name: "Revenue", data: [42, 38, 51, 49, 62, 58, 67, 71, 69, 78, 74, 86] },
  { name: "Cost", data: [30, 33, 29, 36, 34, 41, 39, 44, 46, 43, 48, 52] },
];

/* Board */
export const TASK_COLS = [
  { id: "todo", title: "To do" }, { id: "doing", title: "In progress" },
  { id: "review", title: "Review" }, { id: "done", title: "Done" },
];
export const TASKS = [
  { id: "t1", column: "todo", title: "Define delegation thresholds", who: "CR", tag: "pricing" },
  { id: "t2", column: "todo", title: "Acme staffing plan", who: "IF", tag: "staffing" },
  { id: "t3", column: "doing", title: "Margin calculator v2", who: "VD", tag: "build" },
  { id: "t4", column: "doing", title: "Entity i18n review", who: "ML", tag: "i18n" },
  { id: "t5", column: "review", title: "VP arbitrage flow", who: "TS", tag: "review" },
  { id: "t6", column: "done", title: "Q1 reporting", who: "AB", tag: "reporting" },
  { id: "t7", column: "done", title: "Onboard 2 managers", who: "CR", tag: "people" },
];

/* Candidates */
export const CAND_COLS = [
  { id: "applied", title: "Applied" }, { id: "screen", title: "Screening" },
  { id: "interview", title: "Interview" }, { id: "offer", title: "Offer" }, { id: "hired", title: "Hired" },
];
export const CANDIDATES = [
  { id: "c1", column: "applied", name: "Camille Roy", role: "Data Scientist", init: "CR", loc: "Paris" },
  { id: "c2", column: "applied", name: "Inès Fournier", role: "ML Engineer", init: "IF", loc: "Lyon" },
  { id: "c3", column: "screen", name: "Marc Lefèvre", role: "Data Engineer", init: "ML", loc: "Brussels" },
  { id: "c4", column: "interview", name: "Tomás Silva", role: "Solutions Architect", init: "TS", loc: "Bogotá" },
  { id: "c5", column: "interview", name: "Aïcha Benali", role: "Product Manager", init: "AB", loc: "Geneva" },
  { id: "c6", column: "offer", name: "Sophie Durand", role: "Engineering Manager", init: "SD", loc: "Paris" },
  { id: "c7", column: "hired", name: "Liam O'Connor", role: "Staff Engineer", init: "LO", loc: "New York" },
];

/* Inbox */
export const MESSAGES = [
  { id: 1, from: "Camille Roy", init: "CR", subj: "Q2 pricing review", snip: "Updated delegation thresholds before Friday…", time: "09:24", unread: true, body: "Hi — the Q2 pricing matrix is ready for review. Full delegation now starts at 35% margin. Can you confirm the BE figures before Friday?" },
  { id: 2, from: "Data Platform", init: "DP", subj: "Pipeline succeeded", snip: "pricing-matrix-prod deployed at 08:12", time: "08:12", unread: true, body: "Production deploy completed at 08:12 UTC. All health checks green." },
  { id: 3, from: "Inès Fournier", init: "IF", subj: "New mission — Acme", snip: "Drafted the staffing for Acme…", time: "Yest", unread: false, body: "Drafted the Acme staffing: 3 consultants + 1 manager, margin ~32%. Walk through it?" },
  { id: 4, from: "Recruiting", init: "Rc", subj: "2 candidates at manager level", snip: "Both available from June…", time: "Mon", unread: false, body: "Two strong manager-level candidates available from June. Book intro calls?" },
];

/* Training */
export const COURSES = [
  { id: 1, title: "AI-native delivery", level: "Core", hours: 6, progress: 100 },
  { id: 2, title: "Pricing & delegation", level: "Core", hours: 3, progress: 60 },
  { id: 3, title: "Data engineering foundations", level: "Track", hours: 12, progress: 35 },
  { id: 4, title: "LLM systems in production", level: "Advanced", hours: 9, progress: 0 },
  { id: 5, title: "Account management", level: "Track", hours: 5, progress: 80 },
  { id: 6, title: "Leading AI teams", level: "Advanced", hours: 7, progress: 0 },
];

/* Team directory + profiles */
export const TEAM = [
  { id: "u1", name: "Camille Roy", init: "CR", role: "Lead Data Scientist", dept: "Data", util: 92, loc: "Paris", projects: 3, skills: ["Python", "PyTorch", "LLMs", "MLOps"] },
  { id: "u2", name: "Inès Fournier", init: "IF", role: "ML Engineer", dept: "Data", util: 78, loc: "Lyon", projects: 2, skills: ["Python", "Airflow", "SQL"] },
  { id: "u3", name: "Vincent Devillers", init: "VD", role: "Engineering Director", dept: "Engineering", util: 40, loc: "Paris", projects: 6, skills: ["Architecture", "React", "Leadership"] },
  { id: "u4", name: "Marc Lefèvre", init: "ML", role: "Data Engineer", dept: "Data", util: 85, loc: "Brussels", projects: 2, skills: ["Spark", "dbt", "SQL"] },
  { id: "u5", name: "Tomás Silva", init: "TS", role: "Solutions Architect", dept: "Engineering", util: 88, loc: "Bogotá", projects: 4, skills: ["AWS", "Kubernetes", "LLMs"] },
  { id: "u6", name: "Aïcha Benali", init: "AB", role: "Product Manager", dept: "Product", util: 70, loc: "Geneva", projects: 3, skills: ["Discovery", "Roadmap", "Analytics"] },
  { id: "u7", name: "Sophie Durand", init: "SD", role: "Engineering Manager", dept: "Engineering", util: 55, loc: "Paris", projects: 5, skills: ["Leadership", "Go", "Delivery"] },
  { id: "u8", name: "Liam O'Connor", init: "LO", role: "Staff Engineer", dept: "Engineering", util: 95, loc: "New York", projects: 2, skills: ["Distributed systems", "Rust", "LLMs"] },
  { id: "u9", name: "Nadia Haddad", init: "NH", role: "Data Analyst", dept: "Data", util: 64, loc: "Lyon", projects: 3, skills: ["SQL", "Tableau", "Stats"] },
];
export const DEPTS = ["All", "Data", "Engineering", "Product"];

/* Invoices */
const ISTATUS = ["Paid", "Pending", "Overdue", "Draft"];
export const INVOICES = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  number: "INV-2026-" + String(1000 + i),
  client: CLIENTS[i % CLIENTS.length],
  amount: 8000 + ((i * 1737) % 92000),
  status: ISTATUS[i % ISTATUS.length],
  due: "2026-" + String(1 + (i % 9)).padStart(2, "0") + "-" + String(1 + (i % 27)).padStart(2, "0"),
}));
export const loadInvoices = (q) => new Promise((res) => setTimeout(() => res(pageFrom(INVOICES, q)), 360));
export const REVENUE_BARS = [
  { label: "Jan", value: 312 }, { label: "Feb", value: 298 }, { label: "Mar", value: 356 },
  { label: "Apr", value: 341 }, { label: "May", value: 402 }, { label: "Jun", value: 451 },
];

/* Reports / analytics */
export const FUNNEL = [
  { stage: "Leads", value: 240 }, { stage: "Qualified", value: 142 },
  { stage: "Proposal", value: 88 }, { stage: "Won", value: 51 },
];
export const UTIL_BY_DEPT = [
  { label: "Data", value: 84 }, { label: "Engineering", value: 79 }, { label: "Product", value: 66 },
];
export const ENTITY_SPLIT = [
  { label: "LBC_FR", value: 46 }, { label: "LBC_BE", value: 28 }, { label: "LBC_US", value: 19 }, { label: "LBC_CH", value: 11 },
];
export const MARGIN_TREND = [{ name: "Margin %", data: [19, 21, 20, 23, 22, 24, 25, 24, 26, 25, 27, 28] }];

/* Project detail */
export const RISKS = [
  { type: "warning", heading: "Staffing gap in July", body: "One senior data engineer rolls off on the 12th; backfill not yet confirmed." },
  { type: "danger", heading: "Scope creep on reporting", body: "Three change requests pending sign-off — margin at risk if absorbed." },
  { type: "info", heading: "Cloud cost trending up", body: "Inference spend +18% MoM; review model routing next sprint." },
];
export const ACTIVITY = [
  { time: "Today 09:12", title: "Margin recomputed", body: "New delegation threshold applied (35%).", status: "success" },
  { time: "Yesterday", title: "Milestone reached", body: "Build phase exited; entering Scale.", status: "info" },
  { time: "Mon", title: "Risk logged", body: "Staffing gap flagged for July.", status: "warning" },
  { time: "Last week", title: "Kickoff", body: "Discovery completed with the client." },
];
export const BURNDOWN = [
  { name: "Planned", data: [100, 86, 72, 58, 44, 30, 16, 0] },
  { name: "Actual", data: [100, 90, 80, 67, 52, 41, 28, 14] },
];
export const SPRINTS = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];

/* Files */
export const FILES = [
  { id: "f1", name: "Acme — SOW v3.pdf", type: "PDF", size: "412 KB", owner: "VD", modified: "2026-06-15" },
  { id: "f2", name: "Pricing matrix Q2.xlsx", type: "Sheet", size: "88 KB", owner: "CR", modified: "2026-06-14" },
  { id: "f3", name: "Architecture diagram.svg", type: "Image", size: "24 KB", owner: "TS", modified: "2026-06-12" },
  { id: "f4", name: "Staffing plan.docx", type: "Doc", size: "56 KB", owner: "IF", modified: "2026-06-11" },
  { id: "f5", name: "Model card — ranking.md", type: "Markdown", size: "12 KB", owner: "ML", modified: "2026-06-09" },
  { id: "f6", name: "Board deck — June.pdf", type: "PDF", size: "2.1 MB", owner: "VD", modified: "2026-06-05" },
];

/* Knowledge base */
export const KB_TREE = [
  { id: "g-start", label: "Getting started", children: [
    { id: "kb-onboard", label: "Onboarding" }, { id: "kb-tools", label: "Tools & access" } ] },
  { id: "g-delivery", label: "Delivery", children: [
    { id: "kb-pricing", label: "Pricing & delegation" }, { id: "kb-staffing", label: "Staffing" }, { id: "kb-reporting", label: "Reporting" } ] },
  { id: "g-eng", label: "Engineering", children: [
    { id: "kb-stack", label: "The stack" }, { id: "kb-deploy", label: "Deployment" } ] },
];
export const KB_ARTICLES = {
  "kb-pricing": {
    title: "Pricing & delegation",
    lede: "How margins drive the delegation level on every mission.",
    body: "Each mission is priced from the day rate, salary load, and overheads. The resulting margin determines who can approve it: below 20% needs Director sign-off, 20–35% a VP, and above 35% the manager has full delegation.",
    code: "margin = (revenue - cost) / revenue\ndelegation = margin >= 0.35 ? \"manager\"\n           : margin >= 0.20 ? \"vp\"\n           : \"director\"",
    faq: [
      { q: "What counts as cost?", a: "Loaded salary + overhead allocation + direct expenses." },
      { q: "Can thresholds differ per entity?", a: "Yes — each entity sets its own bands; i18n is driven by the entity selector." },
    ],
  },
};

/* Calendar / planning */
export const EVENTS = [
  { date: "2026-06-03", title: "Acme kickoff", type: "info" },
  { date: "2026-06-09", title: "Interview — T. Silva", type: "accent" },
  { date: "2026-06-12", title: "Build review", type: "info" },
  { date: "2026-06-18", title: "Board deck due", type: "danger" },
  { date: "2026-06-23", title: "Scale gate", type: "success" },
  { date: "2026-06-27", title: "Q3 staffing", type: "info" },
];
export const AGENDA = [
  { time: "09:00", title: "Standup — Atlas", meta: "Build" },
  { time: "11:00", title: "Interview — Tomás Silva", meta: "Solutions Architect" },
  { time: "14:00", title: "Pricing review — Acme", meta: "with Camille" },
  { time: "16:30", title: "Board deck prep", meta: "Due tomorrow" },
];
