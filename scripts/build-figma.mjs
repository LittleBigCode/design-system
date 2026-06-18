/* ============================================================================
   build-figma.mjs — generate a Tokens Studio for Figma export from tokens.json.
   Zero dependencies (Node built-ins only). Emits to dist/:
     - figma-tokens.json   (Tokens Studio "single file" format)

   Tokens Studio shape: a nested object where every LEAF is
     { "value": <resolved CSS value>, "type": <studio type> }
   Groups mirror the token tiers (color / spacing / fontSize / fontFamily /
   fontWeight / lineHeight / radius / borderWidth / boxShadow / layout / zIndex /
   motion / shadow). A `$description` from tokens.json rides along as
   `"description"` so designers see the same intent notes in Figma.

   References: a token whose tokens.json $value is "{ds-foo}" is RESOLVED to the
   concrete value of ds-foo (chasing alias chains) so Figma gets real values.
   If a reference can't be resolved (dangling), the Tokens Studio reference
   syntax "{group.path}" is emitted instead so the plugin can still link it.
   ============================================================================ */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const json = JSON.parse(readFileSync(join(root, "tokens", "tokens.json"), "utf8"));

/* ---- 1. collect every leaf token --------------------------------------------
   A leaf is an object carrying a "name" (the --ds-* slug) and a "$value".     */
const tokens = [];
(function walk(node) {
  if (node && typeof node === "object") {
    if (typeof node.name === "string" && "$value" in node) {
      tokens.push({
        name: node.name,                       // e.g. "ds-rouge"
        value: String(node["$value"]),         // e.g. "#ff2a00" or "{ds-rouge}"
        srcType: node["$type"] || "other",     // tokens.json $type
        description: node["$description"] || "",
      });
    } else {
      for (const k of Object.keys(node)) if (k[0] !== "$") walk(node[k]);
    }
  }
})(json);

/* ---- 2. resolve {ref} chains to concrete values -----------------------------
   Build name -> raw value map, then chase {refs} until a concrete value or a
   dangling reference. tokens.json only ever references by --ds-* name.        */
const byName = new Map(tokens.map((t) => [t.name, t.value]));
const REF = /^\{([^}]+)\}$/; // tokens.json refs are always a whole-value "{name}"

function resolveConcrete(value, seen = new Set()) {
  const m = value.match(REF);
  if (!m) return { value, resolved: true };       // already concrete (hex, rgba(), 4px, .2s ease…)
  const ref = m[1];
  if (seen.has(ref) || !byName.has(ref)) {
    return { value, resolved: false, ref };        // cycle or dangling -> keep raw
  }
  seen.add(ref);
  return resolveConcrete(byName.get(ref), seen);
}

/* ---- 3. classify each token into a Tokens Studio type + a group -------------
   The studio "type" drives how Figma applies the token; the group is where it
   lands in the nested JSON tree. Both are derived from the --ds-* name first
   (names are the contract), falling back to the tokens.json $type.            */
function classify(t) {
  const n = t.name;
  // colors — primitives, semantic, and compat aliases all share one tree.
  if (t.srcType === "color") return { type: "color", group: "color" };

  // spacing scale
  if (/^ds-space-/.test(n)) return { type: "spacing", group: "spacing" };

  // type scale: sizes vs. line-heights
  if (/^ds-text-/.test(n)) return { type: "fontSizes", group: "fontSize" };
  if (/^ds-leading-/.test(n)) return { type: "lineHeights", group: "lineHeight" };

  // fonts: families vs. weights
  if (/^ds-font-weight/.test(n)) return { type: "fontWeights", group: "fontWeight" };
  if (t.srcType === "fontFamily" || /^ds-font-/.test(n)) return { type: "fontFamilies", group: "fontFamily" };

  // radii / borders / shadows (radius exists today; the others are wired so a
  // future ds-border-width-* / ds-shadow-* token classifies correctly).
  if (/^ds-radius/.test(n)) return { type: "borderRadius", group: "radius" };
  if (/^ds-border-?width/.test(n)) return { type: "borderWidth", group: "borderWidth" };
  if (/^ds-shadow/.test(n) || t.srcType === "shadow" || t.srcType === "boxShadow")
    return { type: "boxShadow", group: "boxShadow" };

  // remaining scale knobs keep useful homes; their studio type is "other".
  if (/^ds-maxw-/.test(n) || /^ds-bp-/.test(n)) return { type: "other", group: "layout" };
  if (/^ds-z-/.test(n)) return { type: "other", group: "zIndex" };
  if (/^ds-transition/.test(n) || t.srcType === "transition") return { type: "other", group: "motion" };

  return { type: "other", group: "other" };
}

/* ---- 4. derive the leaf key inside its group --------------------------------
   Strip the group's --ds- prefix so the Figma tree reads cleanly, e.g.
   ds-space-4 -> spacing.4, ds-text-base -> fontSize.base, ds-rouge -> color.rouge.
   Color keeps its full slug (minus ds-) to avoid collisions across tiers.     */
function leafKey(t, group) {
  const n = t.name;
  const strip = {
    spacing: "ds-space-",
    fontSize: "ds-text-",
    lineHeight: "ds-leading-",
    radius: "ds-radius-",
    fontFamily: "ds-font-",
    fontWeight: "ds-font-weight-",
    layout: "ds-maxw-",
    zIndex: "ds-z-",
    motion: "ds-transition",
  }[group];
  if (group === "color") return n.replace(/^ds-/, "");
  if (group === "motion") {
    // ds-transition -> "base"; ds-transition-slow -> "slow"
    const rest = n.replace(/^ds-transition-?/, "");
    return rest || "base";
  }
  if (group === "layout" && /^ds-bp-/.test(n)) return n.replace(/^ds-/, ""); // bp-md
  if (group === "fontFamily" && /^ds-font-weight/.test(n)) return n.replace(/^ds-font-/, "");
  return strip && n.startsWith(strip) ? n.slice(strip.length) : n.replace(/^ds-/, "");
}

/* ---- 5. build the nested Tokens Studio tree --------------------------------- */
const out = {};
const counts = {};
const danglingRefs = [];

// Stable group order so the file diffs cleanly and reads tier-by-tier.
const GROUP_ORDER = [
  "color", "spacing", "fontSize", "lineHeight", "fontFamily", "fontWeight",
  "radius", "borderWidth", "boxShadow", "layout", "zIndex", "motion", "other",
];

for (const t of tokens) {
  const { type, group } = classify(t);
  const key = leafKey(t, group);
  const { value, resolved, ref } = resolveConcrete(t.value);

  // Concrete where the source allows; else Tokens Studio reference syntax.
  let finalValue = value;
  if (!resolved && ref) {
    // Map the dangling --ds- ref to "{group.key}" pointing at where it WOULD live.
    const target = tokens.find((x) => x.name === ref);
    if (target) {
      const tg = classify(target).group;
      finalValue = `{${tg}.${leafKey(target, tg)}}`;
    }
    danglingRefs.push(t.name);
  }

  const leaf = { value: finalValue, type };
  if (t.description) leaf.description = t.description;

  (out[group] ||= {})[key] = leaf;
  counts[group] = (counts[group] || 0) + 1;
}

// Re-key `out` into the stable group order (insertion order = output order).
const ordered = {};
for (const g of GROUP_ORDER) if (out[g]) ordered[g] = out[g];
for (const g of Object.keys(out)) if (!(g in ordered)) ordered[g] = out[g]; // any new groups last

/* ---- 6. write + summarise ---------------------------------------------------- */
mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(join(root, "dist", "figma-tokens.json"), JSON.stringify(ordered, null, 2) + "\n");

const summary = GROUP_ORDER.filter((g) => counts[g]).map((g) => `${g} ${counts[g]}`).join(", ");
console.log(`build-figma: ${tokens.length} tokens -> dist/figma-tokens.json`);
console.log(`  groups: ${summary}`);
if (danglingRefs.length) console.log(`  note: ${danglingRefs.length} reference(s) emitted as Tokens Studio refs: ${danglingRefs.join(", ")}`);
