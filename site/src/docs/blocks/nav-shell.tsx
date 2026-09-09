import type { CSSProperties } from "react"
import {
  CaretRightIcon,
  CaretUpDownIcon,
  ChartLineIcon,
  DotsThreeIcon,
  FilesIcon,
  GearIcon,
  HouseIcon,
  LifebuoyIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UsersIcon,
} from "@phosphor-icons/react"

import { Example, P, Section } from "@/docs/foundation-example"

/* `.ds-sidebar` — the collapsible one — is `position: fixed`, `100svh` and
   `display: none` below 48rem, so it cannot render inside an example box. Every
   preview here uses `.ds-sidebar-static`, which is what the React component
   emits for `collapsible="none"` and what the registry's own sidebar demos
   render. Width is inline because `--sidebar-width` is set by
   `SidebarProvider`, not by the stylesheet. */
const COLUMN: CSSProperties = { width: "15rem" }

const SHELL: CSSProperties = {
  ["--sidebar-width" as string]: "15rem",
  border: "1px solid var(--ds-rule)",
}

export function NavShell() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Blocks
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          Nav shell
        </h1>
        <p className={`mt-3 ${P}`}>
          The left edge of an application screen, built from{" "}
          <code className="font-mono text-xs">.ds-sidebar-*</code> only. Read
          the four sections in order: the last one is the shell to copy, the
          first three explain what you copied.
        </p>
      </header>

      <Section title="Flat menu">
        <p className={P}>
          A <code className="font-mono text-xs">.ds-sidebar-static</code> column
          wrapping a{" "}
          <code className="font-mono text-xs">.ds-sidebar-content</code>{" "}
          scroller, one{" "}
          <code className="font-mono text-xs">.ds-sidebar-group</code> and a{" "}
          <code className="font-mono text-xs">.ds-sidebar-menu</code> list. The
          active row carries{" "}
          <code className="font-mono text-xs">data-active</code> — one per menu,
          and it is the only filled surface in the column. Set the width
          yourself: <code className="font-mono text-xs">--sidebar-width</code>{" "}
          comes from the React provider, not from the stylesheet. Below about
          six rows this is the whole component; past that, group.
        </p>
        <Example
          label=".ds-sidebar-static"
          center={false}
          code={
            '<nav class="ds-sidebar-static" style="width:15rem" aria-label="Overview navigation">\n  <div class="ds-sidebar-content">\n    <div class="ds-sidebar-group">\n      <ul class="ds-sidebar-menu">\n        <li class="ds-sidebar-menu-item">\n          <a class="ds-sidebar-menu-button" data-size="default" data-active="" href="#"><svg class="ds-icon">…</svg>Overview</a>\n        </li>\n        <li class="ds-sidebar-menu-item">\n          <a class="ds-sidebar-menu-button" data-size="default" href="#"><svg class="ds-icon">…</svg>Documents</a>\n        </li>\n        <li class="ds-sidebar-menu-item">\n          <a class="ds-sidebar-menu-button" data-size="default" href="#"><svg class="ds-icon">…</svg>Members</a>\n        </li>\n        <li class="ds-sidebar-menu-item">\n          <a class="ds-sidebar-menu-button" data-size="default" href="#"><svg class="ds-icon">…</svg>Settings</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</nav>'
          }
        >
          <nav
            className="ds-sidebar-static"
            style={COLUMN}
            aria-label="Overview navigation"
          >
            <div className="ds-sidebar-content">
              <div className="ds-sidebar-group">
                <ul className="ds-sidebar-menu">
                  <li className="ds-sidebar-menu-item">
                    <a
                      className="ds-sidebar-menu-button"
                      data-size="default"
                      data-active=""
                      href="#"
                    >
                      <HouseIcon />
                      Overview
                    </a>
                  </li>
                  <li className="ds-sidebar-menu-item">
                    <a
                      className="ds-sidebar-menu-button"
                      data-size="default"
                      href="#"
                    >
                      <FilesIcon />
                      Documents
                    </a>
                  </li>
                  <li className="ds-sidebar-menu-item">
                    <a
                      className="ds-sidebar-menu-button"
                      data-size="default"
                      href="#"
                    >
                      <UsersIcon />
                      Members
                    </a>
                  </li>
                  <li className="ds-sidebar-menu-item">
                    <a
                      className="ds-sidebar-menu-button"
                      data-size="default"
                      href="#"
                    >
                      <GearIcon />
                      Settings
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </Example>
      </Section>

      <Section title="Grouped, labelled, iconed">
        <p className={P}>
          Each <code className="font-mono text-xs">.ds-sidebar-group</code>{" "}
          pairs a{" "}
          <code className="font-mono text-xs">.ds-sidebar-group-label</code> —
          uppercase, letter-spaced, faint, the same label treatment as{" "}
          <code className="font-mono text-xs">.ds-gridlabel</code> — with a{" "}
          <code className="font-mono text-xs">.ds-sidebar-group-content</code>{" "}
          holding the menu. Every row gets an icon, so the column stays readable
          when it collapses to icon width. A{" "}
          <code className="font-mono text-xs">.ds-sidebar-group-action</code>{" "}
          absolutely positions itself over the label row for the group's one
          verb; a{" "}
          <code className="font-mono text-xs">.ds-sidebar-separator</code> (with{" "}
          <code className="font-mono text-xs">.ds-separator--auto</code>, which
          exists for exactly this inset) rules between groups.
        </p>
        <Example
          label=".ds-sidebar-group"
          center={false}
          code={
            '<nav class="ds-sidebar-static" style="width:15rem" aria-label="Workspace navigation">\n  <div class="ds-sidebar-content">\n    <div class="ds-sidebar-group">\n      <div class="ds-sidebar-group-label">Workspace</div>\n      <button class="ds-sidebar-group-action" type="button" aria-label="New document"><svg class="ds-icon">…</svg></button>\n      <div class="ds-sidebar-group-content">\n        <ul class="ds-sidebar-menu">\n          <li class="ds-sidebar-menu-item">\n            <a class="ds-sidebar-menu-button" data-size="default" data-active="" href="#"><svg class="ds-icon">…</svg>Dashboard</a>\n          </li>\n          <li class="ds-sidebar-menu-item">\n            <a class="ds-sidebar-menu-button" data-size="default" href="#"><svg class="ds-icon">…</svg>Documents</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    <div class="ds-separator ds-separator--auto ds-sidebar-separator" role="separator" data-orientation="horizontal"></div>\n\n    <div class="ds-sidebar-group">\n      <div class="ds-sidebar-group-label">Support</div>\n      <div class="ds-sidebar-group-content">\n        <ul class="ds-sidebar-menu">\n          <li class="ds-sidebar-menu-item">\n            <a class="ds-sidebar-menu-button" data-size="default" href="#"><svg class="ds-icon">…</svg>Help centre</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</nav>'
          }
        >
          <nav
            className="ds-sidebar-static"
            style={COLUMN}
            aria-label="Workspace navigation"
          >
            <div className="ds-sidebar-content">
              <div className="ds-sidebar-group">
                <div className="ds-sidebar-group-label">Workspace</div>
                <button
                  className="ds-sidebar-group-action"
                  type="button"
                  aria-label="New document"
                >
                  <PlusIcon />
                </button>
                <div className="ds-sidebar-group-content">
                  <ul className="ds-sidebar-menu">
                    <li className="ds-sidebar-menu-item">
                      <a
                        className="ds-sidebar-menu-button"
                        data-size="default"
                        data-active=""
                        href="#"
                      >
                        <ChartLineIcon />
                        Dashboard
                      </a>
                    </li>
                    <li className="ds-sidebar-menu-item">
                      <a
                        className="ds-sidebar-menu-button"
                        data-size="default"
                        href="#"
                      >
                        <FilesIcon />
                        Documents
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className="ds-separator ds-separator--auto ds-sidebar-separator"
                role="separator"
                data-orientation="horizontal"
              />

              <div className="ds-sidebar-group">
                <div className="ds-sidebar-group-label">Support</div>
                <div className="ds-sidebar-group-content">
                  <ul className="ds-sidebar-menu">
                    <li className="ds-sidebar-menu-item">
                      <a
                        className="ds-sidebar-menu-button"
                        data-size="default"
                        href="#"
                      >
                        <LifebuoyIcon />
                        Help centre
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </Example>
      </Section>

      <Section title="Nested, collapsible, counted">
        <p className={P}>
          A parent row is a <code className="font-mono text-xs">button</code>{" "}
          carrying <code className="font-mono text-xs">aria-expanded</code> and
          a caret pushed right with{" "}
          <code className="font-mono text-xs">margin-inline-start:auto</code>;
          its children are a{" "}
          <code className="font-mono text-xs">.ds-sidebar-menu-sub</code>, which
          draws the vertical rule the nesting reads from. Counts go in a{" "}
          <code className="font-mono text-xs">.ds-sidebar-menu-badge</code>,
          never in the label text — the badge is positioned by the sibling
          selector{" "}
          <code className="font-mono text-xs">
            .ds-sidebar-menu-button[data-size] ~ .ds-sidebar-menu-badge
          </code>
          , so the button it follows must carry{" "}
          <code className="font-mono text-xs">data-size</code> or the badge
          floats.
        </p>
        <p className={P}>
          <strong>Wiring.</strong> The stylesheet has no disclosure behaviour. A
          click on the parent button flips its{" "}
          <code className="font-mono text-xs">aria-expanded</code> and the{" "}
          <code className="font-mono text-xs">hidden</code> attribute on the{" "}
          <code className="font-mono text-xs">.ds-sidebar-menu-sub</code> it{" "}
          <code className="font-mono text-xs">aria-controls</code>. Seed a
          section open when the reader is inside it, never all-collapsed. In
          React this is <code className="font-mono text-xs">Collapsible</code> +{" "}
          <code className="font-mono text-xs">SidebarMenuSub</code> and none of
          it is yours to write — see{" "}
          <code className="font-mono text-xs">docs/react.md</code>.
        </p>
        <Example
          label=".ds-sidebar-menu-sub"
          center={false}
          code={
            '<ul class="ds-sidebar-menu">\n  <li class="ds-sidebar-menu-item">\n    <button class="ds-sidebar-menu-button" data-size="default" type="button" aria-expanded="true" aria-controls="nav-reports">\n      <svg class="ds-icon">…</svg>Reports\n      <svg class="ds-icon" style="margin-inline-start:auto">…</svg>\n    </button>\n    <ul class="ds-sidebar-menu-sub" id="nav-reports">\n      <li class="ds-sidebar-menu-sub-item">\n        <a class="ds-sidebar-menu-sub-button" data-size="md" data-active="" href="#">Traffic</a>\n      </li>\n      <li class="ds-sidebar-menu-sub-item">\n        <a class="ds-sidebar-menu-sub-button" data-size="md" href="#">Conversion</a>\n      </li>\n    </ul>\n  </li>\n  <li class="ds-sidebar-menu-item">\n    <button class="ds-sidebar-menu-button" data-size="default" type="button" aria-expanded="false" aria-controls="nav-settings">\n      <svg class="ds-icon">…</svg>Settings\n      <svg class="ds-icon" style="margin-inline-start:auto">…</svg>\n    </button>\n    <ul class="ds-sidebar-menu-sub" id="nav-settings" hidden>\n      <li class="ds-sidebar-menu-sub-item">\n        <a class="ds-sidebar-menu-sub-button" data-size="md" href="#">Members</a>\n      </li>\n    </ul>\n  </li>\n  <li class="ds-sidebar-menu-item">\n    <a class="ds-sidebar-menu-button" data-size="default" href="#"><svg class="ds-icon">…</svg>Inbox</a>\n    <div class="ds-sidebar-menu-badge">12</div>\n  </li>\n</ul>'
          }
        >
          <nav
            className="ds-sidebar-static"
            style={COLUMN}
            aria-label="Reports navigation"
          >
            <div className="ds-sidebar-content">
              <div className="ds-sidebar-group">
                <ul className="ds-sidebar-menu">
                  <li className="ds-sidebar-menu-item">
                    <button
                      className="ds-sidebar-menu-button"
                      data-size="default"
                      type="button"
                      aria-expanded="true"
                      aria-controls="nav-reports"
                    >
                      <ChartLineIcon />
                      Reports
                      <CaretRightIcon
                        style={{ marginInlineStart: "auto", rotate: "90deg" }}
                      />
                    </button>
                    <ul className="ds-sidebar-menu-sub" id="nav-reports">
                      <li className="ds-sidebar-menu-sub-item">
                        <a
                          className="ds-sidebar-menu-sub-button"
                          data-size="md"
                          data-active=""
                          href="#"
                        >
                          Traffic
                        </a>
                      </li>
                      <li className="ds-sidebar-menu-sub-item">
                        <a
                          className="ds-sidebar-menu-sub-button"
                          data-size="md"
                          href="#"
                        >
                          Conversion
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="ds-sidebar-menu-item">
                    <button
                      className="ds-sidebar-menu-button"
                      data-size="default"
                      type="button"
                      aria-expanded="false"
                      aria-controls="nav-settings"
                    >
                      <GearIcon />
                      Settings
                      <CaretRightIcon style={{ marginInlineStart: "auto" }} />
                    </button>
                    <ul
                      className="ds-sidebar-menu-sub"
                      id="nav-settings"
                      hidden
                    >
                      <li className="ds-sidebar-menu-sub-item">
                        <a
                          className="ds-sidebar-menu-sub-button"
                          data-size="md"
                          href="#"
                        >
                          Members
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="ds-sidebar-menu-item">
                    <a
                      className="ds-sidebar-menu-button"
                      data-size="default"
                      href="#"
                    >
                      <FilesIcon />
                      Inbox
                    </a>
                    <div className="ds-sidebar-menu-badge">12</div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </Example>
      </Section>

      <Section title="The shell">
        <p className={P}>
          This is the section to copy. A{" "}
          <code className="font-mono text-xs">.ds-sidebar-wrapper</code> flex
          row holds the column and a{" "}
          <code className="font-mono text-xs">.ds-sidebar-inset</code>{" "}
          <code className="font-mono text-xs">main</code> that takes the rest of
          the width. The column stacks a fixed{" "}
          <code className="font-mono text-xs">.ds-sidebar-header</code> (brand
          row and search), the scrolling{" "}
          <code className="font-mono text-xs">.ds-sidebar-content</code>, and a{" "}
          <code className="font-mono text-xs">.ds-sidebar-footer</code> pinned
          to the bottom for the account row — a{" "}
          <code className="font-mono text-xs">data-size="lg"</code> menu button,
          the one row allowed two lines of text. Row verbs live in a{" "}
          <code className="font-mono text-xs">.ds-sidebar-menu-action</code>,
          which{" "}
          <code className="font-mono text-xs">
            .ds-sidebar-menu-action--show-on-hover
          </code>{" "}
          reveals on hover and focus-within.
        </p>
        <p className={P}>
          <strong>Wiring.</strong> Declare{" "}
          <code className="font-mono text-xs">--sidebar-width</code> on the
          wrapper; the stylesheet never sets it, so a column without it has no
          width. Collapsing is yours too: the collapsible variant is{" "}
          <code className="font-mono text-xs">.ds-sidebar</code> rather than{" "}
          <code className="font-mono text-xs">.ds-sidebar-static</code>, and
          reads one shared state off two attributes —{" "}
          <code className="font-mono text-xs">data-state</code> (
          <code className="font-mono text-xs">expanded</code> or{" "}
          <code className="font-mono text-xs">collapsed</code>) and{" "}
          <code className="font-mono text-xs">data-collapsible</code>, which is
          empty while expanded and{" "}
          <code className="font-mono text-xs">icon</code> or{" "}
          <code className="font-mono text-xs">offcanvas</code> once collapsed. A
          trigger button, the{" "}
          <code className="font-mono text-xs">.ds-sidebar-rail</code> edge and a
          global Cmd/Ctrl+B listener all toggle the same flag, which you persist
          yourself; below 48rem{" "}
          <code className="font-mono text-xs">.ds-sidebar</code> hides entirely
          and the column has to become a sheet. All of that ships in React —{" "}
          <code className="font-mono text-xs">SidebarProvider</code>,{" "}
          <code className="font-mono text-xs">SidebarTrigger</code>,{" "}
          <code className="font-mono text-xs">SidebarRail</code>. In the class
          layer, prefer this static shell unless you are prepared to write that.
        </p>
        <Example
          label=".ds-sidebar-wrapper"
          center={false}
          code={
            '<div class="ds-sidebar-wrapper" style="--sidebar-width:15rem">\n  <nav class="ds-sidebar-static" style="width:var(--sidebar-width)" aria-label="Application navigation">\n    <div class="ds-sidebar-header">\n      <div class="ds-input-group ds-sidebar-input" role="group">\n        <div class="ds-input-group-addon" data-align="inline-start"><svg class="ds-icon">…</svg></div>\n        <input class="ds-input ds-input-group-input" data-slot="input-group-control" type="search" placeholder="Search…" aria-label="Search the workspace">\n      </div>\n    </div>\n\n    <div class="ds-sidebar-content">\n      <div class="ds-sidebar-group">\n        <div class="ds-sidebar-group-label">Workspace</div>\n        <div class="ds-sidebar-group-content">\n          <ul class="ds-sidebar-menu">\n            <li class="ds-sidebar-menu-item">\n              <a class="ds-sidebar-menu-button" data-size="default" data-active="" href="#"><svg class="ds-icon">…</svg>Dashboard</a>\n              <button class="ds-sidebar-menu-action ds-sidebar-menu-action--show-on-hover" type="button" aria-label="Options for Dashboard"><svg class="ds-icon">…</svg></button>\n            </li>\n            <li class="ds-sidebar-menu-item">\n              <a class="ds-sidebar-menu-button" data-size="default" href="#"><svg class="ds-icon">…</svg>Documents</a>\n              <div class="ds-sidebar-menu-badge">24</div>\n            </li>\n            <li class="ds-sidebar-menu-item">\n              <a class="ds-sidebar-menu-button" data-size="default" href="#"><svg class="ds-icon">…</svg>Members</a>\n              <div class="ds-sidebar-menu-badge">7</div>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n    <div class="ds-sidebar-footer">\n      <ul class="ds-sidebar-menu">\n        <li class="ds-sidebar-menu-item">\n          <button class="ds-sidebar-menu-button" data-size="lg" type="button">\n            <span class="ds-avatar"><span class="ds-avatar-fallback">CR</span></span>\n            <span style="min-width:0;text-align:start">\n              <span style="display:block">Camille Roux</span>\n              <span class="ds-text-xs ds-text-muted" style="display:block">camille@diametral.fr</span>\n            </span>\n            <svg class="ds-icon" style="margin-inline-start:auto">…</svg>\n          </button>\n        </li>\n      </ul>\n    </div>\n  </nav>\n\n  <main class="ds-sidebar-inset" style="padding:1rem">\n    <p class="ds-text-sm ds-text-muted">Nine documents updated since Monday.</p>\n  </main>\n</div>'
          }
        >
          <div className="ds-sidebar-wrapper" style={SHELL}>
            <nav
              className="ds-sidebar-static"
              style={{ width: "var(--sidebar-width)" }}
              aria-label="Application navigation"
            >
              <div className="ds-sidebar-header">
                <div className="ds-input-group ds-sidebar-input" role="group">
                  <div
                    className="ds-input-group-addon"
                    data-align="inline-start"
                  >
                    <MagnifyingGlassIcon />
                  </div>
                  <input
                    className="ds-input ds-input-group-input"
                    data-slot="input-group-control"
                    type="search"
                    placeholder="Search…"
                    aria-label="Search the workspace"
                  />
                </div>
              </div>

              <div className="ds-sidebar-content">
                <div className="ds-sidebar-group">
                  <div className="ds-sidebar-group-label">Workspace</div>
                  <div className="ds-sidebar-group-content">
                    <ul className="ds-sidebar-menu">
                      <li className="ds-sidebar-menu-item">
                        <a
                          className="ds-sidebar-menu-button"
                          data-size="default"
                          data-active=""
                          href="#"
                        >
                          <ChartLineIcon />
                          Dashboard
                        </a>
                        <button
                          className="ds-sidebar-menu-action ds-sidebar-menu-action--show-on-hover"
                          type="button"
                          aria-label="Options for Dashboard"
                        >
                          <DotsThreeIcon />
                        </button>
                      </li>
                      <li className="ds-sidebar-menu-item">
                        <a
                          className="ds-sidebar-menu-button"
                          data-size="default"
                          href="#"
                        >
                          <FilesIcon />
                          Documents
                        </a>
                        <div className="ds-sidebar-menu-badge">24</div>
                      </li>
                      <li className="ds-sidebar-menu-item">
                        <a
                          className="ds-sidebar-menu-button"
                          data-size="default"
                          href="#"
                        >
                          <UsersIcon />
                          Members
                        </a>
                        <div className="ds-sidebar-menu-badge">7</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="ds-sidebar-footer">
                <ul className="ds-sidebar-menu">
                  <li className="ds-sidebar-menu-item">
                    <button
                      className="ds-sidebar-menu-button"
                      data-size="lg"
                      type="button"
                    >
                      <span className="ds-avatar">
                        <span className="ds-avatar-fallback">CR</span>
                      </span>
                      <span style={{ minWidth: 0, textAlign: "start" }}>
                        <span style={{ display: "block" }}>Camille Roux</span>
                        <span
                          className="ds-text-xs ds-text-muted"
                          style={{ display: "block" }}
                        >
                          camille@diametral.fr
                        </span>
                      </span>
                      <CaretUpDownIcon style={{ marginInlineStart: "auto" }} />
                    </button>
                  </li>
                </ul>
              </div>
            </nav>

            {/* `main` in the snippet, `div` in the preview: this page is
                already inside the docs layout's own `main`, and nesting a
                second one is what axe's landmark rules flag. Copy the
                snippet — at page level the inset is the `main`. */}
            <div className="ds-sidebar-inset" style={{ padding: "1rem" }}>
              <p className="ds-text-sm ds-text-muted">
                Nine documents updated since Monday.
              </p>
            </div>
          </div>
        </Example>
      </Section>
    </div>
  )
}
