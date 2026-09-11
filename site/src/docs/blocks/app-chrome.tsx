import { Example, P, Section } from "@/docs/foundation-example"

export function AppChrome() {
  return (
    <div className="flex max-w-3xl flex-col gap-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Blocks
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight">
          App chrome
        </h1>
        <p className={`mt-3 ${P}`}>
          The framing furniture of an application screen — composed sections
          built only from existing <code className="font-mono text-xs">.ds-*</code>{" "}
          components. Stack a page header, a toolbar, a filter bar and a stat
          band to assemble the top of a working view.
        </p>
      </header>

      <Section title="Page header">
        <p className={P}>
          A <code className="font-mono text-xs">.ds-page-header</code> stacks
          a <code className="font-mono text-xs">.ds-breadcrumb-list</code>, a{" "}
          <code className="font-mono text-xs">.ds-page-header-heading</code>{" "}
          (title + actions) and a{" "}
          <code className="font-mono text-xs">
            data-slot="page-header-tabs"
          </code>{" "}
          row of <code className="font-mono text-xs">.ds-tabs</code>.
        </p>
        <Example
          label=".ds-page-header"
          center={false}
          code={
            '<header class="ds-page-header">\n  <nav aria-label="breadcrumb">\n    <ol class="ds-breadcrumb-list">\n      <li class="ds-breadcrumb-item"><a class="ds-breadcrumb-link" href="#">Home</a></li>\n      <li class="ds-breadcrumb-item"><a class="ds-breadcrumb-link" href="#">Pricing</a></li>\n      <li class="ds-breadcrumb-item"><span class="ds-breadcrumb-page" aria-current="page">Matrix</span></li>\n    </ol>\n  </nav>\n  <div class="ds-page-header-heading">\n    <h1 class="ds-page-header-title">Pricing matrix</h1>\n    <div class="ds-page-header-actions">\n      <button class="ds-button">Export</button>\n      <button class="ds-button ds-button--primary">New rate</button>\n    </div>\n  </div>\n  <div data-slot="page-header-tabs">\n    <div class="ds-tabs">\n      <button class="ds-tabs__tab is-active">Rates</button>\n      <button class="ds-tabs__tab">Profiles</button>\n      <button class="ds-tabs__tab">History</button>\n    </div>\n  </div>\n</header>'
          }
        >
          <header className="ds-page-header w-full">
            <nav aria-label="breadcrumb">
              <ol className="ds-breadcrumb-list">
                <li className="ds-breadcrumb-item">
                  <a className="ds-breadcrumb-link" href="#">
                    Home
                  </a>
                </li>
                <li
                  className="ds-breadcrumb-separator"
                  role="presentation"
                  aria-hidden="true"
                >
                  ›
                </li>
                <li className="ds-breadcrumb-item">
                  <a className="ds-breadcrumb-link" href="#">
                    Pricing
                  </a>
                </li>
                <li
                  className="ds-breadcrumb-separator"
                  role="presentation"
                  aria-hidden="true"
                >
                  ›
                </li>
                <li className="ds-breadcrumb-item">
                  <span
                    className="ds-breadcrumb-page"
                    role="link"
                    aria-disabled="true"
                    aria-current="page"
                  >
                    Matrix
                  </span>
                </li>
              </ol>
            </nav>
            <div className="ds-page-header-heading">
              <h1 className="ds-page-header-title">Pricing matrix</h1>
              <div className="ds-page-header-actions">
                <button className="ds-button">Export</button>
                <button className="ds-button ds-button--primary">
                  New rate
                </button>
              </div>
            </div>
            <div data-slot="page-header-tabs">
              <div className="ds-tabs">
                <button className="ds-tabs__tab is-active">Rates</button>
                <button className="ds-tabs__tab">Profiles</button>
                <button className="ds-tabs__tab">History</button>
              </div>
            </div>
          </header>
        </Example>
      </Section>

      <Section title="Toolbar">
        <p className={P}>
          A <code className="font-mono text-xs">.ds-toolbar</code> with a
          search <code className="font-mono text-xs">.ds-input</code> on the
          left, a <code className="font-mono text-xs">.ds-toolbar-spacer</code>{" "}
          (the bar is <code className="font-mono text-xs">fit-content</code>{" "}
          by default, so it is widened inline here), and a right{" "}
          <code className="font-mono text-xs">.ds-toolbar-group</code> of
          actions ending in a{" "}
          <code className="font-mono text-xs">.ds-button--primary</code>.
        </p>
        <Example
          label=".ds-toolbar"
          center={false}
          code={
            '<div class="ds-toolbar" role="toolbar" style="width:100%">\n  <input class="ds-input" type="search" placeholder="Search rates…" aria-label="Search">\n  <div class="ds-toolbar-spacer" aria-hidden="true"></div>\n  <div class="ds-toolbar-group">\n    <button class="ds-button">Columns</button>\n    <button class="ds-button">Export</button>\n    <button class="ds-button ds-button--primary">New rate</button>\n  </div>\n</div>'
          }
        >
          <div className="ds-toolbar w-full" role="toolbar">
            <input
              className="ds-input"
              type="search"
              placeholder="Search rates…"
              aria-label="Search"
            />
            <div className="ds-toolbar-spacer" aria-hidden="true" />
            <div className="ds-toolbar-group">
              <button className="ds-button">Columns</button>
              <button className="ds-button">Export</button>
              <button className="ds-button ds-button--primary">
                New rate
              </button>
            </div>
          </div>
        </Example>
      </Section>

      <Section title="Filter bar">
        <p className={P}>
          A row of active filters as removable{" "}
          <code className="font-mono text-xs">.ds-tag</code>s and a{" "}
          <code className="font-mono text-xs">.ds-chip</code>, followed by{" "}
          <code className="font-mono text-xs">.ds-select</code> refinements
          and a ghost <code className="font-mono text-xs">.ds-button</code>{" "}
          to clear them.
        </p>
        <Example
          label="Filter bar"
          center={false}
          code={
            '<div class="bk-filterbar">\n  <span class="ds-tag ds-tag--removable">Region: EU<button class="ds-tag__remove" type="button" aria-label="Remove">×</button></span>\n  <span class="ds-tag ds-tag--removable">Active<button class="ds-tag__remove" type="button" aria-label="Remove">×</button></span>\n  <span class="ds-chip"><b>24</b> results</span>\n  <div class="bk-filterbar__spacer" aria-hidden="true"></div>\n  <span class="ds-select">\n    <select aria-label="Profile">\n      <option>All profiles</option>\n      <option>Junior</option>\n      <option>Senior</option>\n    </select>\n  </span>\n  <span class="ds-select">\n    <select aria-label="Sort">\n      <option>Sort: rate ↑</option>\n      <option>Sort: rate ↓</option>\n    </select>\n  </span>\n  <button class="ds-button ds-button--sm" type="button">Clear</button>\n</div>'
          }
        >
          <div className="flex w-full flex-wrap items-center gap-3 border border-border p-3.5">
            <span className="ds-tag ds-tag--removable">
              Region: EU
              <button className="ds-tag__remove" type="button" aria-label="Remove">
                ×
              </button>
            </span>
            <span className="ds-tag ds-tag--removable">
              Active
              <button className="ds-tag__remove" type="button" aria-label="Remove">
                ×
              </button>
            </span>
            <span className="ds-chip">
              <b>24</b> results
            </span>
            <div className="flex-1" aria-hidden="true" />
            <span className="ds-select">
              <select aria-label="Profile">
                <option>All profiles</option>
                <option>Junior</option>
                <option>Senior</option>
              </select>
            </span>
            <span className="ds-select">
              <select aria-label="Sort">
                <option>Sort: rate ↑</option>
                <option>Sort: rate ↓</option>
              </select>
            </span>
            <button className="ds-button ds-button--sm" type="button">
              Clear
            </button>
          </div>
        </Example>
      </Section>

      <Section title="Stat band">
        <p className={P}>
          A <code className="font-mono text-xs">.ds-statgrid</code> of four{" "}
          <code className="font-mono text-xs">.ds-statgrid__cell</code>s, each
          pairing an accent-ticked{" "}
          <code className="font-mono text-xs">.ds-statgrid__label</code> with
          a large display{" "}
          <code className="font-mono text-xs">.ds-statgrid__value</code>.
        </p>
        <Example
          label=".ds-statgrid"
          center={false}
          code={
            '<div class="ds-statgrid">\n  <div class="ds-statgrid__cell">\n    <div class="ds-statgrid__label">Active rates</div>\n    <div class="ds-statgrid__value">128</div>\n  </div>\n  <!-- …more cells… -->\n</div>'
          }
        >
          <div className="ds-statgrid w-full">
            <div className="ds-statgrid__cell">
              <div className="ds-statgrid__label">Active rates</div>
              <div className="ds-statgrid__value">128</div>
            </div>
            <div className="ds-statgrid__cell">
              <div className="ds-statgrid__label">Avg. margin</div>
              <div className="ds-statgrid__value">
                31<small>%</small>
              </div>
            </div>
            <div className="ds-statgrid__cell">
              <div className="ds-statgrid__label">Profiles</div>
              <div className="ds-statgrid__value">42</div>
            </div>
            <div className="ds-statgrid__cell">
              <div className="ds-statgrid__label">Updated</div>
              <div className="ds-statgrid__value">
                2<small> days ago</small>
              </div>
            </div>
          </div>
        </Example>
      </Section>
    </div>
  )
}
