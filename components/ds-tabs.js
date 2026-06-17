/* <ds-tabs>
     <div class="ds-tabs">
       <button class="ds-tabs__tab" data-pane="a">One</button>
       <button class="ds-tabs__tab" data-pane="b">Two</button>
     </div>
     <div class="ds-tabpane" data-pane="a">…</div>
     <div class="ds-tabpane" data-pane="b">…</div>
   </ds-tabs>

   Wires tab activation + ARIA. The active tab is the one with [aria-selected]
   or .is-active, else the first. Switching shows the matching .ds-tabpane. */
export class DsTabs extends HTMLElement {
  connectedCallback() {
    this._tabs = Array.from(this.querySelectorAll(".ds-tabs__tab"));
    this._panes = Array.from(this.querySelectorAll(".ds-tabpane"));
    if (!this._tabs.length) return;
    const row = this._tabs[0].parentElement;
    if (row) row.setAttribute("role", "tablist");
    this._tabs.forEach((tab) => {
      tab.setAttribute("role", "tab");
      tab.addEventListener("click", () => this.select(tab.dataset.pane));
      tab.addEventListener("keydown", (e) => this._onKey(e, tab));
    });
    this._panes.forEach((p) => p.setAttribute("role", "tabpanel"));
    const initial = this._tabs.find(
      (t) => t.getAttribute("aria-selected") === "true" || t.classList.contains("is-active")
    ) || this._tabs[0];
    this.select(initial.dataset.pane);
  }

  select(pane) {
    this._tabs.forEach((t) => {
      const on = t.dataset.pane === pane;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.classList.toggle("is-active", on);
      t.tabIndex = on ? 0 : -1;
    });
    this._panes.forEach((p) => {
      const on = p.dataset.pane === pane;
      p.classList.toggle("is-active", on);
      p.setAttribute("aria-hidden", on ? "false" : "true");
    });
    this.dispatchEvent(new CustomEvent("change", { detail: { pane }, bubbles: true }));
  }

  _onKey(e, tab) {
    const i = this._tabs.indexOf(tab);
    let next;
    if (e.key === "ArrowRight") next = this._tabs[(i + 1) % this._tabs.length];
    else if (e.key === "ArrowLeft") next = this._tabs[(i - 1 + this._tabs.length) % this._tabs.length];
    if (next) { e.preventDefault(); next.focus(); this.select(next.dataset.pane); }
  }
}
customElements.define("ds-tabs", DsTabs);
