import fs from "node:fs/promises"
import path from "node:path"

import { codeToHtml } from "shiki"
import type { Plugin } from "vite"

import {
  extractAnatomy,
  type Anatomy,
  type AnatomySource,
} from "./extract-anatomy"
import {
  extractPlaygroundBindings,
  extractTemplate,
  extractVariants,
  type VariantMeta,
} from "./extract-variants"
import { diametralDark, diametralLight, palette } from "./shiki-theme"

const VIRTUAL_ID = "virtual:demo-source"
const RESOLVED_ID = "\0" + VIRTUAL_ID
// registry.ts, demos/ and playgrounds/{,.ts} moved to examples/registry/
// (issue #30, the docs-generator tracer bullet) — this plugin reads them from
// there now instead of from under site/src.
const REGISTRY = path.resolve(import.meta.dirname, "../../examples/registry")
const DEMOS_DIR = path.join(REGISTRY, "demos")
const PLAYGROUNDS_DIR = path.join(REGISTRY, "playgrounds")
const DECLARATIONS = path.join(REGISTRY, "playgrounds.ts")
/**
 * Two levels up, not three: `site/plugins` sits one directory below the repo
 * root, where `apps/web/plugins` sat two below it. The components are the TSX
 * *source*, never the tsc emit under `dist/` — the demos print what a reader
 * would open.
 */
const UI_COMPONENTS = path.resolve(
  import.meta.dirname,
  "../../react/components"
)

/** `demos/button/button-variants.tsx` -> `button/button-variants` */
function toKey(absolute: string, root: string) {
  return path
    .relative(root, absolute)
    .replace(/\\/g, "/")
    .replace(/\.tsx$/, "")
}

/** `data-table` -> `DataTable` */
function toPascal(slug: string) {
  return slug.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase())
}

/**
 * The `.tsx` behind a slug, or undefined when nothing is absorbed under it yet.
 *
 * Two spellings, in order: kebab, which every absorption batch authors, and the
 * PascalCase the incumbent components already carry. A slug that resolves to
 * neither has no source to read — its demos are parked under
 * `registry/_pending` and its registry entry is filtered out.
 */
async function resolveComponent(slug: string): Promise<string | undefined> {
  for (const name of [slug, toPascal(slug)]) {
    const file = path.join(UI_COMPONENTS, `${name}.tsx`)
    if (
      await fs.stat(file).then(
        () => true,
        () => false
      )
    )
      return file
  }
  return undefined
}

/** The slugs with demos here — which is what "absorbed" means to this plugin. */
async function landedSlugs(): Promise<string[]> {
  const entries = await fs
    .readdir(DEMOS_DIR, { withFileTypes: true })
    .catch(() => [])
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
}

async function listFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => [])
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return listFiles(full)
      return entry.name.endsWith(".tsx") ? [full] : []
    })
  )
  return nested.flat()
}

/**
 * Highlighting runs here, in the Vite process, rather than in the browser:
 * shiki's grammars and themes are megabytes, and the snippets are fully known
 * at build time. The client receives only the rendered HTML string.
 *
 * Both themes are emitted into one payload as CSS variables (--shiki-light /
 * --shiki-dark) so a theme switch is a repaint, not a re-highlight.
 */
async function highlight(code: string) {
  return codeToHtml(code, {
    lang: "tsx",
    themes: { light: diametralLight, dark: diametralDark },
    defaultColor: false,
    cssVariablePrefix: "--shiki-",
  })
}

async function buildDemos() {
  const files = (await listFiles(DEMOS_DIR)).sort()
  const entries = await Promise.all(
    files.map(async (file) => {
      const code = (await fs.readFile(file, "utf8")).trimEnd()
      return [
        toKey(file, DEMOS_DIR),
        { code, html: await highlight(code) },
      ] as const
    })
  )
  return Object.fromEntries(entries)
}

/**
 * For every declared playground: the JSX template its file renders, and the
 * variant axes of the cva const it binds to. A binding that no longer resolves
 * throws — a rename must not quietly hollow out a control panel.
 *
 * The throw is scoped to slugs that *declare* a `variantsFrom`. Components that
 * declare none are absorbed with no cva block at all, so there is nothing to
 * parse and nothing to lose; only a broken declaration is an error.
 */
async function buildPlaygrounds() {
  const declarationsText = await fs
    .readFile(DECLARATIONS, "utf8")
    .catch(() => "")
  const bindings = declarationsText
    ? extractPlaygroundBindings(DECLARATIONS, declarationsText)
    : {}

  const files = (await listFiles(PLAYGROUNDS_DIR)).sort()
  const present = new Set(files.map((file) => toKey(file, PLAYGROUNDS_DIR)))

  const variants: Record<string, VariantMeta> = {}
  for (const [slug, from] of Object.entries(bindings)) {
    if (!from) continue
    // Declared but not landed: the slug's playground is parked under
    // registry/_pending, so there is no panel to hollow out. The throw below
    // still guards every slug that has one.
    if (!present.has(slug)) continue
    const componentFile = await resolveComponent(slug)
    if (!componentFile) {
      throw new Error(
        `[diametral:demo-source] ${slug}: declares variantsFrom "${from}" but ` +
          `neither ${slug}.tsx nor ${toPascal(slug)}.tsx exists under ` +
          `${path.relative(process.cwd(), UI_COMPONENTS)}.`
      )
    }
    const text = await fs.readFile(componentFile, "utf8")
    const found = extractVariants(componentFile, text)
    const meta = found[from]
    if (!meta) {
      throw new Error(
        `[diametral:demo-source] ${slug}: variantsFrom "${from}" not found in ` +
          `${slug}.tsx. Found: ${Object.keys(found).join(", ") || "none"}.`
      )
    }
    variants[slug] = meta
  }

  const templates: Record<string, string> = {}
  for (const file of files) {
    const slug = toKey(file, PLAYGROUNDS_DIR)
    const text = await fs.readFile(file, "utf8")
    const template = extractTemplate(file, text)
    if (!template) {
      throw new Error(
        `[diametral:demo-source] ${slug}: could not find the JSX returned by ` +
          `the default export of playgrounds/${slug}.tsx.`
      )
    }
    templates[slug] = template
  }

  return { variants, templates }
}

/**
 * Parts no demo and no playground can honestly show, with the reason. Keyed
 * `<slug>/<Part>`. Every entry is an export whose composition does not exist:
 * the three menu portals because their own Content portals itself, the
 * navigation menu's indicator because the trigger draws its own caret, and the
 * toaster because it mounts once in the app root rather than in a page.
 *
 * Adding a line here is a claim that a reader has nothing to look at. Prefer
 * writing the part into a playground or a demo.
 *
 * The reasons ship to the client: the index badges these parts `internal` and
 * the note strip under the preview shows the reason, so the page says why
 * instead of leaving a row that looks unfinished.
 */
const ANATOMY_EXCEPTIONS: Record<string, string> = {
  "context-menu/ContextMenuPortal": "ContextMenuContent portals itself",
  "dropdown-menu/DropdownMenuPortal": "DropdownMenuContent portals itself",
  "menubar/MenubarPortal": "MenubarContent portals itself",
  "navigation-menu/NavigationMenuIndicator":
    "NavigationMenuTrigger renders its own caret",
  "toast/Toaster": "mounted once in the app root, not inside a page",
}

/**
 * Every part is written somewhere a reader can reach: its own playground, one of
 * its demos, or the component's own source. A part in none of those has no
 * example at all, which the anatomy index can only report as a dead row — so it
 * fails the build instead, here, where the fix is a few lines of JSX away.
 */
function checkCoverage(anatomy: Record<string, Anatomy>) {
  const missing: string[] = []

  for (const [slug, data] of Object.entries(anatomy)) {
    // Mirrors the index: a lone export with no types never renders a row.
    if (data.parts.length < 2 && !data.types.length) continue
    // Nothing documents this component yet — the page says so itself, and
    // per-part rows would be noise on top of that.
    if (!Object.keys(data.coverage).length) continue

    const written = new Set(Object.values(data.coverage).flat())
    const internal = new Set(
      data.rows.filter((row) => row.internal).map((row) => row.part)
    )

    for (const part of data.parts) {
      if (written.has(part) || internal.has(part)) continue
      if (ANATOMY_EXCEPTIONS[`${slug}/${part}`]) continue
      missing.push(`${slug}/${part}`)
    }
  }

  if (missing.length) {
    throw new Error(
      `[diametral:demo-source] ${missing.length} exported part(s) appear in no ` +
        `playground and no demo, so the anatomy index can only mark them as ` +
        `having no example:\n  ${missing.join("\n  ")}\n` +
        `Write each one into playgrounds/<slug>.tsx or demos/<slug>/, or add it ` +
        `to ANATOMY_EXCEPTIONS in plugins/demo-source.ts with the reason.`
    )
  }
}

/**
 * The composition grammar of every component, merged from its demos, its
 * playground and its own source. Derived rather than declared: 432 parts across
 * 80 components is more than anyone will keep true by hand, and the demos
 * already are the truth.
 */
async function buildAnatomy(slugs: string[]) {
  const anatomy: Record<string, Anatomy> = {}

  for (const slug of slugs) {
    const file = await resolveComponent(slug)
    // Not yet absorbed: its demos are parked under registry/_pending and its
    // registry entry is filtered out, so there is no page to index.
    if (!file) continue
    const demoFiles = (await listFiles(path.join(DEMOS_DIR, slug))).sort()
    const sources: AnatomySource[] = await Promise.all(
      demoFiles.map(async (demo) => ({
        label: toKey(demo, DEMOS_DIR),
        fileName: demo,
        text: await fs.readFile(demo, "utf8"),
      }))
    )

    const playground = path.join(PLAYGROUNDS_DIR, `${slug}.tsx`)
    const playgroundText = await fs
      .readFile(playground, "utf8")
      .catch(() => undefined)
    if (playgroundText !== undefined) {
      sources.push({
        label: "playground",
        fileName: playground,
        text: playgroundText,
      })
    }

    anatomy[slug] = extractAnatomy(
      { fileName: file, text: await fs.readFile(file, "utf8") },
      sources
    )
  }

  checkCoverage(anatomy)
  return anatomy
}

export function demoSource(): Plugin {
  return {
    name: "diametral:demo-source",

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },

    async load(id) {
      if (id !== RESOLVED_ID) return
      const [sources, playgrounds, anatomy] = await Promise.all([
        buildDemos(),
        buildPlaygrounds(),
        landedSlugs().then(buildAnatomy),
      ])
      return [
        `export const sources = ${JSON.stringify(sources)}`,
        `export const palette = ${JSON.stringify(palette)}`,
        `export const variants = ${JSON.stringify(playgrounds.variants)}`,
        `export const templates = ${JSON.stringify(playgrounds.templates)}`,
        `export const anatomy = ${JSON.stringify(anatomy)}`,
        `export const anatomyExceptions = ${JSON.stringify(ANATOMY_EXCEPTIONS)}`,
      ].join("\n")
    },

    configureServer(server) {
      // A demo edit changes both the module graph (the component) and this
      // virtual module (its highlighted source); only the latter needs a nudge.
      // Component files count too: their cva blocks feed the control panels.
      const invalidate = (file: string) => {
        const watched =
          file.startsWith(DEMOS_DIR) ||
          file.startsWith(PLAYGROUNDS_DIR) ||
          file === DECLARATIONS ||
          file.startsWith(UI_COMPONENTS)
        if (!watched) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (!mod) return
        server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: "full-reload" })
      }
      server.watcher.on("add", invalidate)
      server.watcher.on("unlink", invalidate)
      server.watcher.on("change", invalidate)
    },
  }
}
