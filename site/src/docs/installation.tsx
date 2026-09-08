import { Link } from "react-router"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { Button, cx } from "@diametral/design-system/react"

import { useCopy } from "@/docs/use-copy"

/**
 * Ported from `site/legacy/installation.html` (the pre-absorption buildless
 * showcase's guide) — real reference content with no counterpart in
 * `migration-source-v1`, onto the restored chrome. Unhighlighted: these
 * snippets are hand-typed reference text, not files `CodeBlock`'s shiki pass
 * runs over, so this is a plain, copyable `<pre>` instead.
 */
function Snippet({ label, code }: { label: string; code: string }) {
  const { copied, copy } = useCopy(code)
  return (
    <div className="border border-border">
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-1.5">
        <span className="font-mono text-xs text-muted-foreground">
          {label}
        </span>
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label={copied ? "Copied" : "Copy"}
          onClick={copy}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </div>
      <pre
        tabIndex={0}
        role="region"
        aria-label={label}
        className={cx(
          "overflow-x-auto bg-muted/40 p-4 font-mono text-[13px] leading-relaxed"
        )}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-heading text-lg font-semibold tracking-wider uppercase">
        {title}
      </h2>
      {children}
    </section>
  )
}

const P = "text-sm text-muted-foreground"
const C = "font-mono text-xs text-foreground"

export function Installation() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Installation
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          How to install the Diametral Design System in a real project — plain
          HTML, or any of the popular frameworks. The system is buildless: at
          its core it is one stylesheet plus design tokens, so most stacks
          need nothing more than a <code className={C}>&lt;link&gt;</code> (or
          one <code className={C}>import</code>) and the fonts.
        </p>
      </header>

      <Section title="What you get">
        <p className={P}>
          The package <code className={C}>@diametral/design-system</code>{" "}
          ships several independent layers. Take only what you need — each
          works on its own, and none requires a build step to consume.
        </p>
        <div className="flex flex-col divide-y divide-border border border-border">
          {[
            ["CSS + tokens", <>The whole visual language as one stylesheet of <code className={C}>.ds-*</code> classes backed by <code className={C}>--ds-*</code> custom properties. → <code className={C}>@diametral/design-system/css/diametral.css</code></>],
            ["Design tokens", <>The single source of truth as JSON. → <code className={C}>@diametral/design-system/tokens.json</code></>],
            ["Web Components", <>An optional vanilla custom-element layer (<code className={C}>&lt;ds-button&gt;</code>, <code className={C}>&lt;ds-status&gt;</code>, …). → <code className={C}>@diametral/design-system/components</code></>],
            ["React components", <>Optional real, typed React components (<code className={C}>Button</code>, <code className={C}>DataGrid</code>, …). → <code className={C}>@diametral/design-system/react</code></>],
            ["Tailwind preset", <>Binds Tailwind <code className={C}>colors</code>/<code className={C}>spacing</code>/<code className={C}>fontFamily</code>/… to the <code className={C}>--ds-*</code> variables. → <code className={C}>@diametral/design-system/tailwind-preset</code></>],
            ["SCSS variables", <><code className={C}>$ds-*</code> variables, each resolving to the matching CSS var. → <code className={C}>@diametral/design-system/dist/tokens.scss</code></>],
            ["Assets", <>Free font CSS (Fraunces fallback) + logo SVGs + license notes — the commercial Ufficio font is <b>not</b> bundled. → <code className={C}>@diametral/design-system/assets/*</code></>],
          ].map(([meta, body], i) => (
            <div key={i} className="flex gap-4 px-3 py-2 text-sm">
              <span className="w-36 shrink-0 font-mono text-xs text-muted-foreground">
                {meta}
              </span>
              <span className="text-muted-foreground">{body}</span>
            </div>
          ))}
        </div>
        <p className={P}>
          The CSS and the tokens are the foundation; the Web Components and
          React layers render the same <code className={C}>.ds-*</code>{" "}
          markup, so styling and theming always come from the one stylesheet.
          Change a token, every layer follows.
        </p>
      </Section>

      <Section title="Install">
        <p className={P}>With npm (or pnpm / yarn / bun):</p>
        <Snippet label="npm install" code="npm i @diametral/design-system" />
        <p className={P}>
          <code className={C}>react</code> and{" "}
          <code className={C}>react-dom</code> are optional peer dependencies
          — add them only if you use the React layer. CSS-only and Web
          Component consumers don't pull them in.
        </p>
        <Snippet
          label="Optional React peers"
          code={"# only if you use @diametral/design-system/react\nnpm i react react-dom"}
        />
        <p className={P}>
          Without npm. The system is plain CSS + fonts + SVG + a sprinkle of
          vanilla JS — no bundler required. Either copy the{" "}
          <code className={C}>css/</code> and <code className={C}>assets/</code>{" "}
          folders into your project and link{" "}
          <code className={C}>css/diametral.css</code>, or link it straight
          from a CDN that serves npm packages (unpkg, jsDelivr, esm.sh):
        </p>
        <Snippet
          label="CDN stylesheet"
          code={
            '<link rel="stylesheet" href="https://unpkg.com/@diametral/design-system/css/diametral.css">'
          }
        />
      </Section>

      <Section title="Load the CSS + fonts">
        <p className={P}>Three things to wire up once, at your app root.</p>
        <p className={P}>
          1 · The one stylesheet. Everything is bundled behind a single entry
          that <code className={C}>@import</code>s the tokens, reset,
          typography, and every component:
        </p>
        <Snippet
          label="Stylesheet · bundler / npm"
          code={'// bundler / npm\nimport "@diametral/design-system/css/diametral.css";'}
        />
        <Snippet
          label="Stylesheet · no build"
          code={'<!-- no build -->\n<link rel="stylesheet" href="css/diametral.css">'}
        />
        <p className={P}>2 · The body font — Geist (free, OFL):</p>
        <Snippet
          label="Geist · Google Fonts"
          code={
            '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">'
          }
        />
        <p className={P}>
          3 · The title font — Ufficio (opt-in, commercial). The{" "}
          <code className={C}>--ds-font-title</code> token lists Ufficio
          first, but the face is declared only in{" "}
          <code className={C}>assets/fonts/ufficio.css</code>. Import it only
          if you hold an Ufficio license:
        </p>
        <Snippet
          label="Ufficio · no build"
          code={
            '<!-- only if you hold an Ufficio license -->\n<link rel="stylesheet" href="assets/fonts/ufficio.css">'
          }
        />
        <Snippet
          label="Ufficio · via npm"
          code={'// via npm\nimport "@diametral/design-system/assets/fonts/ufficio.css";'}
        />
        <p className={P}>
          If you don't import it, the unknown family name is skipped and
          titles fall back to the free Fraunces stack automatically — no
          token change needed. To load the free fonts (Fraunces + Geist)
          explicitly in one shot, import{" "}
          <code className={C}>assets/fonts/fallback.css</code> instead.
        </p>
        <p className={P}>
          Global reset. <code className={C}>css/diametral.css</code> includes
          a light global reset (<code className={C}>box-sizing</code>, zeroed
          margins, base body type). Every class is namespaced{" "}
          <code className={C}>.ds-*</code>, so it won't collide with your
          app's CSS or Tailwind utilities. If your app already has a reset and
          you want to avoid overlap, import{" "}
          <code className={C}>css/tokens.css</code> plus the individual{" "}
          <code className={C}>css/components/*.css</code> partials instead of
          the full bundle.
        </p>
      </Section>

      <Section title="Quick start · Plain HTML / no build">
        <p className={P}>
          Link the CSS, load the fonts, write <code className={C}>.ds-*</code>{" "}
          markup. Add the Web Components module if you want the custom
          elements.
        </p>
        <Snippet
          label="index.html"
          code={
            '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">\n  <link rel="stylesheet" href="css/diametral.css">\n  <!-- optional Web Components -->\n  <script type="module" src="components/index.js"></script>\n</head>\n<body>\n  <!-- plain classes -->\n  <button class="ds-button ds-button--primary">Save</button>\n\n  <!-- or the optional custom elements -->\n  <ds-button variant="primary">Save</ds-button>\n  <ds-status status="success" heading="Approved"></ds-status>\n</body>\n</html>'
          }
        />
      </Section>

      <Section title="Quick start · Vite (React)">
        <p className={P}>
          Import the CSS once in <code className={C}>main.jsx</code>, then
          import components from the React entry.
        </p>
        <Snippet
          label="main.jsx"
          code={
            '// main.jsx\nimport React from "react";\nimport { createRoot } from "react-dom/client";\nimport "@diametral/design-system/css/diametral.css";\nimport App from "./App.jsx";\n\ncreateRoot(document.getElementById("root")).render(<App />);'
          }
        />
        <Snippet
          label="App.jsx"
          code={
            '// App.jsx\nimport { Button, DataGrid } from "@diametral/design-system/react";\n\nexport default function App() {\n  return <Button variant="primary">Save</Button>;\n}'
          }
        />
        <p className={P}>
          Load the Geist <code className={C}>&lt;link&gt;</code> in{" "}
          <code className={C}>index.html</code>'s <code className={C}>&lt;head&gt;</code>{" "}
          (and <code className={C}>assets/fonts/ufficio.css</code> if
          licensed).
        </p>
      </Section>

      <Section title="Quick start · Next.js (App Router)">
        <p className={P}>
          Import the global CSS once in{" "}
          <code className={C}>app/layout.tsx</code>. The React components use
          hooks and event handlers, so they are client components — render
          them inside a <code className={C}>"use client"</code> boundary.
        </p>
        <Snippet
          label="app/layout.tsx"
          code={
            '// app/layout.tsx\nimport "@diametral/design-system/css/diametral.css";\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  );\n}'
          }
        />
        <Snippet
          label="app/page.tsx"
          code={
            '// app/page.tsx (or any client component)\n"use client";\nimport { Button, Status } from "@diametral/design-system/react";\n\nexport default function Page() {\n  return <Button variant="primary">Save</Button>;\n}'
          }
        />
        <p className={P}>
          Fonts: either load Geist via the Google{" "}
          <code className={C}>&lt;link&gt;</code> in{" "}
          <code className={C}>layout.tsx</code>'s{" "}
          <code className={C}>&lt;head&gt;</code>, or use{" "}
          <code className={C}>next/font/google</code> and map the token:
        </p>
        <Snippet
          label="next/font/google"
          code={
            'import { Geist } from "next/font/google";\nconst geist = Geist({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });\n// then apply geist.className to <body>, or set :root { --ds-font-sans: ... }'
          }
        />
      </Section>

      <Section title="Quick start · Create React App">
        <p className={P}>
          Import the CSS once in <code className={C}>index.js</code>.
        </p>
        <Snippet
          label="src/index.js"
          code={
            '// src/index.js\nimport React from "react";\nimport { createRoot } from "react-dom/client";\nimport "@diametral/design-system/css/diametral.css";\nimport App from "./App";\n\ncreateRoot(document.getElementById("root")).render(<App />);'
          }
        />
        <Snippet
          label="src/App.js"
          code={
            '// src/App.js\nimport { Button } from "@diametral/design-system/react";\n\nexport default function App() {\n  return <Button variant="primary">Save</Button>;\n}'
          }
        />
      </Section>

      <Section title="Quick start · Angular">
        <p className={P}>
          Add the stylesheet to the <code className={C}>styles</code> array in{" "}
          <code className={C}>angular.json</code>:
        </p>
        <Snippet
          label="angular.json"
          code={
            '// angular.json → projects.<app>.architect.build.options\n"styles": [\n  "node_modules/@diametral/design-system/css/diametral.css",\n  "src/styles.scss"\n]'
          }
        />
        <p className={P}>
          …or <code className={C}>@import</code> it from{" "}
          <code className={C}>src/styles.scss</code>:
        </p>
        <Snippet
          label="src/styles.scss"
          code='@import "@diametral/design-system/css/diametral.css";'
        />
        <p className={P}>
          Then use the <code className={C}>.ds-*</code> classes directly in
          templates. To use the Web Components, import the module once (e.g.
          in <code className={C}>main.ts</code>) and allow custom elements in
          the modules/components that use them:
        </p>
        <Snippet
          label="main.ts"
          code={'// main.ts\nimport "@diametral/design-system/components";'}
        />
        <Snippet
          label="app.component.ts"
          code={
            '// the standalone component (or NgModule) that uses <ds-*> elements\nimport { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";\n\n@Component({\n  selector: "app-root",\n  template: `<ds-button variant="primary">Save</ds-button>`,\n  schemas: [CUSTOM_ELEMENTS_SCHEMA],\n})\nexport class AppComponent {}'
          }
        />
      </Section>

      <Section title="Quick start · Vue">
        <p className={P}>
          Import the CSS once in <code className={C}>main.js</code>:
        </p>
        <Snippet
          label="main.js"
          code={
            '// main.js\nimport { createApp } from "vue";\nimport "@diametral/design-system/css/diametral.css";\nimport App from "./App.vue";\n\ncreateApp(App).mount("#app");'
          }
        />
        <p className={P}>
          Use the <code className={C}>.ds-*</code> classes in templates, or
          the Web Components — register the module once and Vue will render
          the custom elements as-is:
        </p>
        <Snippet
          label="main.js · Web Components"
          code={'// main.js\nimport "@diametral/design-system/components";'}
        />
        <Snippet
          label="App.vue"
          code={
            '<!-- App.vue -->\n<template>\n  <button class="ds-button ds-button--primary">Save</button>\n  <ds-status status="success" heading="Approved"></ds-status>\n</template>'
          }
        />
        <p className={P}>
          Vue treats any unknown hyphenated tag as a custom element by
          default. With Vite, if you ever need to be explicit, set{" "}
          <code className={C}>
            isCustomElement: (tag) =&gt; tag.startsWith("ds-")
          </code>{" "}
          in <code className={C}>@vitejs/plugin-vue</code>'s{" "}
          <code className={C}>compilerOptions</code>.
        </p>
      </Section>

      <Section title="Quick start · CDN / import map (buildless React)">
        <p className={P}>
          Because the React components have no build dependency, you can run
          them straight from a CDN with an import map — exactly what the live
          demo does. Great for a throwaway prototype or a CodePen; for a real
          app, prefer npm + a bundler.
        </p>
        <Snippet
          label="Buildless React · import map"
          code={
            '<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">\n<link rel="stylesheet" href="https://unpkg.com/@diametral/design-system/css/diametral.css">\n\n<div id="app"></div>\n\n<script type="importmap">\n{ "imports": {\n  "react": "https://esm.sh/react@18.3.1",\n  "react-dom": "https://esm.sh/react-dom@18.3.1?external=react",\n  "react-dom/client": "https://esm.sh/react-dom@18.3.1/client?external=react",\n  "@diametral/design-system/react": "https://esm.sh/@diametral/design-system/react"\n} }\n</script>\n<script type="module">\n  import React from "react";\n  import { createRoot } from "react-dom/client";\n  import { Button } from "@diametral/design-system/react";\n  createRoot(document.getElementById("app"))\n    .render(React.createElement(Button, { variant: "primary" }, "Save"));\n</script>'
          }
        />
        <p className={P}>
          The <code className={C}>?external=react</code> query keeps a single
          React instance across the imports.
        </p>
      </Section>

      <Section title="Quick start · Streamlit (Python)">
        <p className={P}>
          Streamlit renders its own widgets, so you don't install the package
          into it. Align colors in{" "}
          <code className={C}>.streamlit/config.toml</code>, inject the
          stylesheet, then render <code className={C}>.ds-*</code> blocks
          with <code className={C}>st.markdown</code>. Full guide:{" "}
          <a
            href="https://github.com/LittleBigCode/design-system/blob/main/docs/streamlit.md"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            <code className={C}>docs/streamlit.md</code>
          </a>{" "}
          · runnable example (Docker):{" "}
          <a
            href="https://github.com/LittleBigCode/design-system/tree/main/examples/streamlit"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            <code className={C}>examples/streamlit/</code>
          </a>
          .
        </p>
        <Snippet
          label=".streamlit/config.toml"
          code={
            '[theme]\nprimaryColor = "#ff2a00"\nbackgroundColor = "#ffffff"\nsecondaryBackgroundColor = "#f5f5f5"\ntextColor = "#161616"\nfont = "sans serif"'
          }
        />
        <Snippet
          label="inject the stylesheet + flatten widgets"
          code={
            'import urllib.request, streamlit as st\n\n# Fetch the FLATTENED bundle (dist/, not css/ which is @import-based) and inline\n# it — Streamlit can strip a bare <link> but keeps an inline <style>.\nCDN = "https://unpkg.com/@diametral/design-system/dist/diametral.css"\ncss = urllib.request.urlopen(CDN, timeout=15).read().decode()\n\nst.markdown(f"""<style>\n@import url(\'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap\');\n{css}\nhtml, body, button, input, textarea {{ font-family: "Geist", sans-serif; }}\n.stButton > button {{ border-radius:0; border:1px solid #161616; background:#161616; color:#fff; box-shadow:none; }}\n.stTextInput input, [data-baseweb="select"] > div {{ border-radius:0 !important; box-shadow:none !important; }}\n</style>""", unsafe_allow_html=True)'
          }
        />
        <Snippet
          label="render a .ds-* block"
          code={
            'st.markdown("""\n<div class="ds-statgrid">\n  <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Revenue</div><div class="ds-statgrid__value">€4.5M</div></div>\n  <div class="ds-statgrid__cell"><div class="ds-statgrid__label">Margin</div><div class="ds-statgrid__value">24.6%</div></div>\n</div>\n""", unsafe_allow_html=True)'
          }
        />
      </Section>

      <Section title="Tailwind">
        <p className={P}>
          Add the preset to <code className={C}>presets</code> in your
          Tailwind config — it binds <code className={C}>colors</code>,{" "}
          <code className={C}>spacing</code>, <code className={C}>fontFamily</code>,
          and the rest to the <code className={C}>--ds-*</code> custom
          properties:
        </p>
        <Snippet
          label="tailwind.config.js"
          code={
            '// tailwind.config.js\nmodule.exports = {\n  presets: [require("@diametral/design-system/tailwind-preset")],\n  content: ["./src/**/*.{html,js,ts,jsx,tsx,vue}"],\n};'
          }
        />
        <p className={P}>
          Now Tailwind utilities resolve to the design tokens — e.g.{" "}
          <code className={C}>bg-accent</code>,{" "}
          <code className={C}>text-ink</code>, <code className={C}>p-4</code>,
          and <code className={C}>font-title</code> emit{" "}
          <code className={C}>var(--ds-accent)</code>,{" "}
          <code className={C}>var(--ds-ink)</code>,{" "}
          <code className={C}>var(--ds-space-4)</code>,{" "}
          <code className={C}>var(--ds-font-title)</code>. Because they are
          backed by the variables, runtime theming still works: flip{" "}
          <code className={C}>data-theme="dark"</code> and the
          Tailwind-styled elements re-theme too.
        </p>
        <p className={P}>
          SCSS option. Prefer SCSS variables?{" "}
          <code className={C}>dist/tokens.scss</code> exposes{" "}
          <code className={C}>$ds-*</code> variables (each resolving to the
          CSS var, so theming still applies):
        </p>
        <Snippet
          label="SCSS variables"
          code={
            '@use "@diametral/design-system/dist/tokens.scss" as ds;\n.thing { color: ds.$ds-ink; padding: ds.$ds-space-4; }\n\n// or the legacy syntax\n@import "@diametral/design-system/dist/tokens.scss";\n.thing { color: $ds-ink; }'
          }
        />
        <p className={P}>
          The Tailwind preset (<code className={C}>dist/tailwind-preset.cjs</code>)
          and <code className={C}>dist/tokens.scss</code> are generated by the
          design-system repo's build. If you are working from a clone (not
          the npm package), run <code className={C}>npm run build</code> (or{" "}
          <code className={C}>npm run build:tokens</code>) once to produce{" "}
          <code className={C}>dist/</code>. The published package ships{" "}
          <code className={C}>dist/</code> already, so installed consumers
          need nothing.
        </p>
      </Section>

      <Section title="Theming">
        <p className={P}>
          Dark mode (and any theme) is a one-liner — import the theme
          stylesheet and set the selector on a root element:
        </p>
        <Snippet
          label="Theme import"
          code={
            'import "@diametral/design-system/css/diametral.css";\nimport "@diametral/design-system/css/themes/dark.css";'
          }
        />
        <Snippet
          label="Theme selector"
          code='<html data-theme="dark">   <!-- or class="dark", or class="dark-theme" -->'
        />
        <p className={P}>
          <code className={C}>css/themes/dark.css</code> targets{" "}
          <code className={C}>[data-theme="dark"]</code>,{" "}
          <code className={C}>.dark</code>, and{" "}
          <code className={C}>:root.dark-theme</code>, so it drops in
          regardless of which convention your app uses. For OS-driven dark
          mode, add <code className={C}>class="ds-auto-dark"</code> to{" "}
          <code className={C}>&lt;html&gt;</code>. Themes override only the
          semantic tokens — see{" "}
          <Link to="/theming" className="underline">
            Theming
          </Link>{" "}
          for per-brand theming and the Tailwind/SCSS/shadcn notes.
        </p>
      </Section>

      <Section title="TypeScript">
        <p className={P}>
          No extra setup. Types ship with the React entry and are wired
          through the package <code className={C}>exports</code> map (
          <code className={C}>react/index.d.ts</code>), so the import below is
          fully typed out of the box — typed props,{" "}
          <code className={C}>children</code>, event handlers, and{" "}
          <code className={C}>forwardRef</code> on{" "}
          <code className={C}>Button</code> / <code className={C}>Input</code>.
        </p>
        <Snippet
          label="Typed import"
          code='import { Button } from "@diametral/design-system/react";'
        />
      </Section>

      <Section title="Troubleshooting">
        <p className={P}>
          <strong>"node_modules JSX isn't transpiled."</strong> It doesn't
          need to be. The React components are authored as plain ES modules
          with <code className={C}>React.createElement</code> (no JSX) and
          ship as valid JS — Vite, Next, CRA, Remix, etc. import them
          directly. You don't have to add{" "}
          <code className={C}>@diametral/design-system</code> to a{" "}
          <code className={C}>transpilePackages</code> /{" "}
          <code className={C}>transpileDependencies</code> allowlist.
        </p>
        <p className={P}>
          <strong>Fonts don't load offline.</strong> Geist and Ufficio load
          fine over <code className={C}>file://</code>; only the Google Fonts{" "}
          <code className={C}>&lt;link&gt;</code> needs a network. The system
          still renders with system fallbacks offline. Self-host the fonts
          (the bundled <code className={C}>assets/fonts/ufficio.css</code> is
          already local) or import{" "}
          <code className={C}>assets/fonts/fallback.css</code> if you want
          the free Fraunces/Geist files under your control.
        </p>
        <p className={P}>
          <strong>Titles render in a serif, not Ufficio.</strong> Expected
          unless you imported <code className={C}>assets/fonts/ufficio.css</code>{" "}
          (and hold a license). The token lists Ufficio first; without the{" "}
          <code className={C}>@font-face</code> it falls back to Fraunces /
          Georgia.
        </p>
        <p className={P}>
          <strong>My app's reset and Diametral's overlap.</strong> Skip the
          bundle's reset: import <code className={C}>css/tokens.css</code>{" "}
          plus the <code className={C}>css/components/*.css</code> partials
          you need instead of <code className={C}>css/diametral.css</code>.
        </p>
        <p className={P}>
          <strong>CSP blocks the esm.sh demo.</strong> The buildless CDN
          pattern pulls React from <code className={C}>https://esm.sh</code>{" "}
          and the CSS from a CDN. If your Content-Security-Policy is strict,
          allow those origins in <code className={C}>script-src</code> /{" "}
          <code className={C}>style-src</code> /{" "}
          <code className={C}>connect-src</code> — or just install from npm
          and bundle, which needs no external origins at runtime.
        </p>
      </Section>
    </div>
  )
}
