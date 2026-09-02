import ts from "typescript"

export type AnatomyRow = {
  part: string
  depth: number
  kind: "open" | "close" | "self" | "recurse"
  /** The nesting was only ever observed in the component's own JSX. */
  internal?: boolean
  /** Other parents this part was seen under, when it has more than one. */
  alsoUnder?: string[]
}

export type Anatomy = {
  /** The tree, pre-flattened: ordering and recursion are decided here, once. */
  rows: AnatomyRow[]
  /** Exported part names, in `export { … }` order. */
  parts: string[]
  /** Type-only exports (`export type { TimeValue }`) — importable, never JSX.
   *  `decl` is the declaration's own source text, shown when the row is
   *  selected in the part index. */
  types: { name: string; decl?: string }[]
  /** Part -> the `data-slot` values it renders, for the preview highlight. */
  slots: Record<string, string[]>
  /** Exported but placed nowhere — no demo and no internal usage. */
  orphans: string[]
  /** Demo key -> the parts it renders, which is what makes a part clickable. */
  coverage: Record<string, string[]>
}

export type AnatomySource = { label: string; fileName: string; text: string }

/** Edges observed only here are "rendered for you" rather than composed. */
const INTERNAL = "(internal)"

function parse(fileName: string, text: string) {
  return ts.createSourceFile(
    fileName,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  )
}

/**
 * Part names come from the module's own `export { … }` clause rather than from
 * its function declarations: that is the surface a consumer can actually write,
 * and it excludes the cva consts and internal helpers that sit beside them.
 * Type-only exports (`export type { MultiSelectOption }`) are split into their
 * own list — a type is never written as a JSX tag, so it could never be placed
 * by `collect` below and would sit forever as a dead "no example" orphan.
 */
function exportedParts(source: ts.SourceFile) {
  const parts: string[] = []
  const typeNames: string[] = []
  const visit = (node: ts.Node) => {
    if (
      ts.isExportDeclaration(node) &&
      node.exportClause &&
      ts.isNamedExports(node.exportClause)
    ) {
      for (const element of node.exportClause.elements) {
        const name = element.name.text
        if (!/^[A-Z][A-Za-z]*$/.test(name)) continue
        if (node.isTypeOnly || element.isTypeOnly) typeNames.push(name)
        else parts.push(name)
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return {
    parts,
    types: typeNames.map((name) => ({ name, decl: declOf(source, name) })),
  }
}

/** The declaration's own source text (`type TimeValue = { … }`), verbatim. */
function declOf(source: ts.SourceFile, name: string) {
  let decl: string | undefined
  const visit = (node: ts.Node) => {
    if (
      (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) &&
      node.name.text === name
    ) {
      decl = node.getText(source)
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return decl
}

/**
 * `PanelHeader` -> `panel-header`, read off each part's own `data-slot` literal.
 * A part can render several (Field does) and two components render none at all,
 * which is why this is a list and may be absent.
 */
function slotMap(source: ts.SourceFile, parts: string[]) {
  const slots: Record<string, string[]> = {}
  const visit = (node: ts.Node) => {
    if (
      ts.isFunctionDeclaration(node) &&
      node.name &&
      node.body &&
      parts.includes(node.name.text)
    ) {
      const found: string[] = []
      const dig = (inner: ts.Node) => {
        if (
          ts.isJsxAttribute(inner) &&
          inner.name.getText(source) === "data-slot" &&
          inner.initializer &&
          ts.isStringLiteral(inner.initializer)
        ) {
          found.push(inner.initializer.text)
        }
        ts.forEachChild(inner, dig)
      }
      dig(node.body)
      if (found.length) slots[node.name.text] = [...new Set(found)]
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return slots
}

function tagName(node: ts.JsxElement | ts.JsxSelfClosingElement) {
  const tag = ts.isJsxElement(node) ? node.openingElement.tagName : node.tagName
  return ts.isIdentifier(tag) ? tag.text : undefined
}

/**
 * The composition grammar of a component, merged from every place its parts are
 * written: each demo, its playground, and the component's own source. No single
 * demo shows every part — panel's `basic` omits PanelRow and `rows` omits
 * PanelFooter — so the union is what makes the tree complete without asking any
 * one demo to be contrived. Parts of *other* modules are ignored: this describes
 * one module's grammar, not the usages around it.
 */
export function extractAnatomy(
  component: { fileName: string; text: string },
  demos: AnatomySource[]
): Anatomy {
  const componentSource = parse(component.fileName, component.text)
  const { parts, types } = exportedParts(componentSource)
  const slots = slotMap(componentSource, parts)

  type Edge = {
    parent: string
    child: string
    order: number
    labels: Set<string>
  }
  const edges = new Map<string, Edge>()
  const rootOrder = new Map<string, number>()
  const coverage: Record<string, string[]> = {}
  let order = 0

  const collect = (label: string, source: ts.SourceFile) => {
    const present = new Set<string>()
    const walk = (node: ts.Node, ancestor: string | undefined) => {
      let next = ancestor
      if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
        const name = tagName(node)
        if (name && parts.includes(name)) {
          present.add(name)
          if (ancestor) {
            const key = `${ancestor}>${name}`
            const edge = edges.get(key) ?? {
              parent: ancestor,
              child: name,
              order: order++,
              labels: new Set<string>(),
            }
            edge.labels.add(label)
            edges.set(key, edge)
          } else if (!rootOrder.has(name)) {
            rootOrder.set(name, order++)
          }
          next = name
        }
      }
      ts.forEachChild(node, (child) => walk(child, next))
    }
    walk(source, undefined)
    if (label !== INTERNAL) coverage[label] = [...present]
  }

  for (const demo of demos) collect(demo.label, parse(demo.fileName, demo.text))
  // Last, so a nesting the demos already show keeps its earlier order and is
  // not mislabelled as internal.
  collect(INTERNAL, componentSource)

  const childrenOf = (parent: string) =>
    [...edges.values()]
      .filter((edge) => edge.parent === parent)
      .sort((a, b) => a.order - b.order)

  const parentsOf = (child: string) =>
    [...edges.values()].filter((edge) => edge.child === child)

  /** Every part some demo or playground writes, as opposed to the component. */
  const documented = new Set(Object.values(coverage).flat())

  const rows: AnatomyRow[] = []
  const placed = new Set<string>()

  const render = (part: string, depth: number, trail: string[]) => {
    // Recursive grammars are real — SidebarMenuSub nests inside the item that
    // contains it — so the cycle is reported rather than followed.
    if (trail.includes(part)) {
      rows.push({ part, depth, kind: "recurse" })
      return
    }

    const parents = parentsOf(part).map((edge) => edge.parent)
    const alsoUnder = [...new Set(parents)].filter(
      (parent) => parent !== trail.at(-1)
    )
    // A part only ever written by the component itself is internal: nobody
    // composes it. Nesting shows that as parent edges the demos never walked,
    // but the outermost element of a part's own render has no parent at all —
    // DialogContent opens with a DialogPortal — so at root the question is
    // simply whether any demo or playground mentions it.
    const internal = parents.length
      ? parentsOf(part).every(
          (edge) => edge.labels.size === 1 && edge.labels.has(INTERNAL)
        )
      : !documented.has(part)
    const shared = {
      part,
      depth,
      ...(alsoUnder.length ? { alsoUnder } : {}),
      ...(internal ? { internal: true } : {}),
    }

    placed.add(part)
    const children = childrenOf(part)
    if (!children.length) {
      rows.push({ ...shared, kind: "self" })
      return
    }
    rows.push({ ...shared, kind: "open" })
    for (const edge of children) render(edge.child, depth + 1, [...trail, part])
    rows.push({ part, depth, kind: "close" })
  }

  const ordered = [...rootOrder.entries()]
    .sort((a, b) => a[1] - b[1])
    .map(([name]) => name)
  const unparented = ordered.filter((name) => !parentsOf(name).length)
  // A grammar that nests inside itself leaves every part with a parent —
  // resizable's `nested` demo puts a PanelGroup inside a Panel — and filtering
  // on that alone would leave no root and collapse the whole tree. Where that
  // happens the top-level parts are the roots; the trail check above reports
  // the cycle instead of following it.
  const roots = unparented.length ? unparented : ordered

  for (const root of roots) render(root, 0, [])

  return {
    rows,
    parts,
    types,
    slots,
    orphans: parts.filter((part) => !placed.has(part)),
    coverage,
  }
}
