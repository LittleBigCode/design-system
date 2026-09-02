import ts from "typescript"

export type VariantMeta = {
  /** Axis name -> its allowed values, in declaration order. */
  variants: Record<string, string[]>
  defaults: Record<string, string>
}

function parse(fileName: string, text: string) {
  return ts.createSourceFile(
    fileName,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  )
}

/** Property keys may be identifiers (`outline`) or quoted (`"icon-sm"`). */
function propertyName(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name)) return name.text
  if (ts.isStringLiteral(name)) return name.text
  return undefined
}

function objectProperty(
  object: ts.ObjectLiteralExpression,
  key: string
): ts.Expression | undefined {
  for (const property of object.properties) {
    if (!ts.isPropertyAssignment(property)) continue
    if (propertyName(property.name) === key) return property.initializer
  }
  return undefined
}

/**
 * Pulls the variant axes out of every `cva()`/`variants()` call in a component
 * file, keyed by
 * the const it is assigned to — `buttonVariants`, `tabsListVariants`, … A file
 * can hold several (item, bubble, attachment, input-group each do), and some
 * belong to sub-parts rather than the root, which is why the caller has to name
 * the one it wants instead of us guessing.
 */
export function extractVariants(
  fileName: string,
  text: string
): Record<string, VariantMeta> {
  const source = parse(fileName, text)
  const found: Record<string, VariantMeta> = {}

  const visit = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      ts.isCallExpression(node.initializer) &&
      ts.isIdentifier(node.initializer.expression) &&
      // `cva` on @diametral/ui's own sources; `variants` on the ones absorbed
      // into @diametral/design-system, which declines cva (ADR 0001) and
      // declares the same shape through react/lib/variants.ts instead.
      (node.initializer.expression.text === "cva" ||
        node.initializer.expression.text === "variants")
    ) {
      const config = node.initializer.arguments[1]
      // `cva("base classes")` with no config has no axes at all — skip it
      // rather than registering an empty control set.
      if (config && ts.isObjectLiteralExpression(config)) {
        const variantsNode = objectProperty(config, "variants")
        if (variantsNode && ts.isObjectLiteralExpression(variantsNode)) {
          const variants: Record<string, string[]> = {}
          for (const axis of variantsNode.properties) {
            if (!ts.isPropertyAssignment(axis)) continue
            const axisName = propertyName(axis.name)
            if (!axisName || !ts.isObjectLiteralExpression(axis.initializer)) {
              continue
            }
            const values = axis.initializer.properties
              .filter(ts.isPropertyAssignment)
              .map((value) => propertyName(value.name))
              .filter((value): value is string => Boolean(value))
            if (values.length > 0) variants[axisName] = values
          }

          const defaults: Record<string, string> = {}
          const defaultsNode = objectProperty(config, "defaultVariants")
          if (defaultsNode && ts.isObjectLiteralExpression(defaultsNode)) {
            for (const entry of defaultsNode.properties) {
              if (!ts.isPropertyAssignment(entry)) continue
              const axisName = propertyName(entry.name)
              if (axisName && ts.isStringLiteral(entry.initializer)) {
                defaults[axisName] = entry.initializer.text
              }
            }
          }

          if (Object.keys(variants).length > 0) {
            found[node.name.text] = { variants, defaults }
          }
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(source)
  return found
}

/**
 * Reads `slug -> variantsFrom` out of the playground declarations module. The
 * plugin needs this mapping at build time to validate each binding against the
 * component's real cva consts, which is what turns a stale rename into a failed
 * build instead of a silently empty control panel.
 */
export function extractPlaygroundBindings(
  fileName: string,
  text: string
): Record<string, string | undefined> {
  const source = parse(fileName, text)
  const bindings: Record<string, string | undefined> = {}

  const visit = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "PLAYGROUNDS" &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      for (const entry of node.initializer.properties) {
        if (!ts.isPropertyAssignment(entry)) continue
        const slug = propertyName(entry.name)
        if (!slug || !ts.isObjectLiteralExpression(entry.initializer)) continue
        const from = objectProperty(entry.initializer, "variantsFrom")
        bindings[slug] =
          from && ts.isStringLiteral(from) ? from.text : undefined
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(source)
  return bindings
}

function dedent(text: string) {
  const lines = text.split("\n")
  const indents = lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => line.match(/^ */)?.[0].length ?? 0)
  const shift = indents.length ? Math.min(...indents) : 0
  return [lines[0], ...lines.slice(1).map((line) => line.slice(shift))].join(
    "\n"
  )
}

/**
 * Returns the JSX a playground file's default export renders, as a template
 * still containing its `{...props}` marker. The function shell is dropped so the
 * runtime can substitute live props and produce something pasteable.
 */
export function extractTemplate(
  fileName: string,
  text: string
): string | undefined {
  const source = parse(fileName, text)
  let template: string | undefined

  const fromBody = (body: ts.Node) => {
    let result: string | undefined
    const walk = (node: ts.Node) => {
      if (result) return
      if (ts.isReturnStatement(node) && node.expression) {
        let expression: ts.Expression = node.expression
        while (ts.isParenthesizedExpression(expression)) {
          expression = expression.expression
        }
        result = dedent(expression.getText(source))
        return
      }
      ts.forEachChild(node, walk)
    }
    walk(body)
    return result
  }

  const visit = (node: ts.Node) => {
    if (template) return
    const modifiers = ts.canHaveModifiers(node)
      ? ts.getModifiers(node)
      : undefined
    const isDefaultExport = modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword
    )
    if (ts.isFunctionDeclaration(node) && isDefaultExport && node.body) {
      template = fromBody(node.body)
      return
    }
    ts.forEachChild(node, visit)
  }

  visit(source)
  return template
}
