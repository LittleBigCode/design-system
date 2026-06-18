/* ============================================================================
   make-theme.mjs — white-label theme generator.
   ----------------------------------------------------------------------------
   Derives a coherent set of Tier-2 SEMANTIC token overrides from a couple of
   brand inputs and writes css/themes/<name>.css — a drop-in opt-in theme that
   re-skins the whole system under [data-theme="<name>"]. Primitives and
   component rules are never touched, exactly like the hand-written sepia.css.

   Zero dependencies (Node built-ins only).

   Usage:
     node scripts/make-theme.mjs --name ocean --accent "#1488a6"
     node scripts/make-theme.mjs --name ocean --accent "#1488a6" \
       --ink "#0e1a1e" --bg "#f4f8f9"
     node scripts/make-theme.mjs --name midnight --accent "#1488a6" --dark

   Flags:
     --name <slug>    (required) theme name; becomes [data-theme="<slug>"] and
                      the output filename css/themes/<slug>.css.
     --accent <hex>   (required) brand accent. Drives --ds-accent and a derived
                      tint (--ds-accent-bg) and shade (--ds-accent-strong).
     --ink   <hex>    (optional) base text colour. Derives ink soft/faint and,
                      in --dark mode, the surface ramp's contrast.
     --bg    <hex>    (optional) base page colour. Derives bg-alt / surface and
                      rule lines tinted toward the accent.
     --dark           (optional) produce a dark surface ramp (dark bg, light ink)
                      seeded from --bg/--ink if given, sensible defaults if not.
     --force          (optional) overwrite an existing theme file.
   ============================================================================ */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const themesDir = join(root, "css", "themes");

/* ---- tiny arg parser (built-ins only) ---------------------------------- */
function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      out[key] = true; // boolean flag (e.g. --dark, --force)
    } else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

function die(msg) {
  console.error(`make-theme: ${msg}`);
  console.error(
    'Usage: node scripts/make-theme.mjs --name <slug> --accent "#rrggbb" [--ink "#rrggbb"] [--bg "#rrggbb"] [--dark] [--force]'
  );
  process.exit(1);
}

/* ---- colour helpers: hex <-> rgb, lighten/darken/mix --------------------- */
const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));

function hexToRgb(hex) {
  let h = String(hex).trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

const toHex2 = (n) => clamp(n).toString(16).padStart(2, "0");
const rgbToHex = ({ r, g, b }) => `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;

// Linear mix of two rgb colours. t=0 -> a, t=1 -> b.
function mix(a, b, t) {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

const WHITE = { r: 255, g: 255, b: 255 };
const BLACK = { r: 0, g: 0, b: 0 };

// Lighten toward white by amount (0..1).
const lighten = (rgb, amt) => mix(rgb, WHITE, amt);
// Darken toward black by amount (0..1).
const darken = (rgb, amt) => mix(rgb, BLACK, amt);

// rgba() string, useful for tints/scrims on dark bases.
const rgba = ({ r, g, b }, a) =>
  `rgba(${clamp(r)}, ${clamp(g)}, ${clamp(b)}, ${a})`;

// Perceived luminance (0..255) — used only to pick on-accent text contrast.
const luminance = ({ r, g, b }) => 0.299 * r + 0.587 * g + 0.114 * b;

/* ---- derive the override set -------------------------------------------- */
function deriveTokens({ accent, ink, bg, dark }) {
  const A = hexToRgb(accent);

  // Accent ramp — same roles sepia/dark touch: --ds-accent + its tint.
  // We also emit --ds-accent-strong (a shade) for hover/pressed accents.
  const accentStrong = rgbToHex(darken(A, 0.18));
  const onAccent = luminance(A) > 150 ? "#161616" : "#ffffff";

  if (dark) {
    // Dark surface ramp. Seed from --ink (acts as the light text) and a dark
    // base; if --bg given we treat it as the darkest surface seed.
    const inkRgb = hexToRgb(ink) || { r: 243, g: 243, b: 241 }; // light text
    const baseRgb = hexToRgb(bg) || { r: 14, g: 14, b: 16 }; // dark base

    const surfaces = {
      bg: rgbToHex(baseRgb),
      bgAlt: rgbToHex(lighten(baseRgb, 0.06)),
      surface: rgbToHex(lighten(baseRgb, 0.04)),
    };
    return {
      // Surfaces & text
      "--ds-bg": surfaces.bg,
      "--ds-bg-alt": surfaces.bgAlt,
      "--ds-surface": surfaces.surface,
      "--ds-overlay-scrim": "rgba(0, 0, 0, .62)",
      "--ds-ink": rgbToHex(inkRgb),
      "--ds-ink-soft": rgbToHex(darken(inkRgb, 0.18)),
      "--ds-ink-faint": rgbToHex(darken(inkRgb, 0.42)),
      // Lines
      "--ds-rule": rgbToHex(lighten(baseRgb, 0.16)),
      "--ds-rule-soft": rgbToHex(lighten(baseRgb, 0.1)),
      // Accent — keep the hue, pop it with a translucent tint on dark.
      "--ds-accent": accent,
      "--ds-accent-bg": rgba(A, 0.16),
      "--ds-accent-strong": rgbToHex(lighten(A, 0.12)),
      "--ds-on-accent": onAccent,
      // Status tints as translucent washes that read on the dark base.
      "--ds-success-bg": "rgba(46, 125, 79, .20)",
      "--ds-warning-bg": "rgba(255, 85, 0, .16)",
      "--ds-danger-bg": "rgba(192, 57, 43, .20)",
      "--ds-info-bg": "rgba(20, 136, 166, .20)",
      "--ds-neutral-bg": "rgba(255, 255, 255, .08)",
      "--ds-critical-bg": "rgba(255, 255, 255, .08)",
    };
  }

  // Light theme. Base surface from --bg (default near-white), ink from --ink.
  const bgRgb = hexToRgb(bg) || { r: 255, g: 255, b: 255 };
  const inkRgb = hexToRgb(ink) || { r: 22, g: 22, b: 22 };

  // Tint lines and alt surfaces a hair toward the accent so the skin feels
  // cohesive rather than a grey base with a coloured button.
  const bgAlt = mix(darken(bgRgb, 0.04), A, 0.04);
  const ruleColor = mix(darken(bgRgb, 0.14), A, 0.06);
  const ruleSoft = mix(darken(bgRgb, 0.07), A, 0.04);

  return {
    // Surfaces & text
    "--ds-bg": rgbToHex(bgRgb),
    "--ds-bg-alt": rgbToHex(bgAlt),
    "--ds-surface": rgbToHex(lighten(bgRgb, 0.4)),
    "--ds-overlay-scrim": rgba(inkRgb, 0.5),
    "--ds-ink": rgbToHex(inkRgb),
    "--ds-ink-soft": rgbToHex(lighten(inkRgb, 0.28)),
    "--ds-ink-faint": rgbToHex(lighten(inkRgb, 0.52)),
    // Lines
    "--ds-rule": rgbToHex(ruleColor),
    "--ds-rule-soft": rgbToHex(ruleSoft),
    // Accent + derived tint/shade
    "--ds-accent": accent,
    "--ds-accent-bg": rgbToHex(mix(WHITE, A, 0.12)),
    "--ds-accent-strong": accentStrong,
    "--ds-on-accent": onAccent,
    // Status tints lifted toward the base so they sit on the surface.
    "--ds-success-bg": rgbToHex(mix(WHITE, hexToRgb("#2e7d4f"), 0.1)),
    "--ds-warning-bg": rgbToHex(mix(WHITE, hexToRgb("#ff5500"), 0.1)),
    "--ds-danger-bg": rgbToHex(mix(WHITE, hexToRgb("#c0392b"), 0.1)),
    "--ds-info-bg": rgbToHex(mix(WHITE, hexToRgb("#1488a6"), 0.1)),
    "--ds-neutral-bg": rgbToHex(mix(WHITE, hexToRgb("#767884"), 0.12)),
    "--ds-critical-bg": rgbToHex(mix(WHITE, hexToRgb("#767884"), 0.12)),
  };
}

/* ---- emit the CSS file --------------------------------------------------- */
function renderCss({ name, accent, ink, bg, dark, tokens }) {
  const seeds = [
    `accent ${accent}`,
    ink ? `ink ${ink}` : null,
    bg ? `bg ${bg}` : null,
    dark ? "dark ramp" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const groups = [
    {
      label: dark ? "Surfaces & text — dark ramp" : "Surfaces & text",
      keys: ["--ds-bg", "--ds-bg-alt", "--ds-surface", "--ds-overlay-scrim", "--ds-ink", "--ds-ink-soft", "--ds-ink-faint"],
    },
    { label: "Lines", keys: ["--ds-rule", "--ds-rule-soft"] },
    { label: "Accent — brand signal, with derived tint & shade", keys: ["--ds-accent", "--ds-accent-bg", "--ds-accent-strong", "--ds-on-accent"] },
    { label: "Status tints (heads/hues kept; only the soft backgrounds re-based)", keys: ["--ds-success-bg", "--ds-warning-bg", "--ds-danger-bg", "--ds-info-bg", "--ds-neutral-bg", "--ds-critical-bg"] },
  ];

  // Longest key in any group, for value alignment that matches sepia.css.
  const pad = groups.reduce(
    (m, g) => g.keys.reduce((mm, k) => Math.max(mm, k.length), m),
    0
  );

  const body = groups
    .map((g) => {
      const lines = g.keys
        .filter((k) => tokens[k] !== undefined)
        .map((k) => `  ${(k + ":").padEnd(pad + 1)} ${tokens[k]};`)
        .join("\n");
      return `  /* ${g.label} */\n${lines}`;
    })
    .join("\n\n");

  return `/* ============================================================================
   "${name}" — generated white-label theme.
   A full re-skin expressed as Tier-2 SEMANTIC token overrides only — primitives
   and component rules are untouched, exactly like the hand-written themes.

   Generated by scripts/make-theme.mjs from: ${seeds}.
   Re-run that script to regenerate; tweak the seeds rather than this file.

   Opt-in: import this file, then set data-theme="${name}" on a root element.
   ============================================================================ */
[data-theme="${name}"] {
${body}
}
`;
}

/* ---- main ---------------------------------------------------------------- */
function main() {
  const args = parseArgs(process.argv.slice(2));

  const name = typeof args.name === "string" ? args.name.trim() : "";
  if (!name) die("--name <slug> is required");
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(name))
    die(`--name "${name}" must be a slug (letters, digits, hyphens)`);

  if (typeof args.accent !== "string") die("--accent <hex> is required");
  if (!hexToRgb(args.accent)) die(`--accent "${args.accent}" is not a valid hex colour`);
  if (args.ink && !hexToRgb(args.ink)) die(`--ink "${args.ink}" is not a valid hex colour`);
  if (args.bg && !hexToRgb(args.bg)) die(`--bg "${args.bg}" is not a valid hex colour`);

  const accent = rgbToHex(hexToRgb(args.accent)); // normalize (#abc -> #aabbcc)
  const ink = args.ink ? rgbToHex(hexToRgb(args.ink)) : undefined;
  const bg = args.bg ? rgbToHex(hexToRgb(args.bg)) : undefined;
  const dark = args.dark === true;

  const tokens = deriveTokens({ accent, ink, bg, dark });
  const css = renderCss({ name, accent, ink, bg, dark, tokens });

  mkdirSync(themesDir, { recursive: true });
  const outPath = join(themesDir, `${name}.css`);
  if (existsSync(outPath) && args.force !== true)
    die(`css/themes/${name}.css already exists — pass --force to overwrite`);

  writeFileSync(outPath, css);
  console.log(
    `make-theme: wrote css/themes/${name}.css — [data-theme="${name}"], accent ${accent}${dark ? " (dark)" : ""}.`
  );
}

main();
