/* <ds-panel title="Section" rows>…</ds-panel>
   Self-classing sunken panel. `title` renders an uppercase heading; `rows`
   tightens the bottom padding for .ds-input-row content. */
export class DsPanel extends HTMLElement {
  static observedAttributes = ["title", "rows"];
  connectedCallback() { if (!this._init) this._render(); }
  attributeChangedCallback() { if (this._init) this._render(); }
  _render() {
    this._init = true;
    this.className = "ds-panel" + (this.hasAttribute("rows") ? " ds-panel--rows" : "");
    const title = this.getAttribute("title");
    let h = this.querySelector(":scope > .ds-panel__title");
    if (title) {
      if (!h) {
        h = document.createElement("div");
        h.className = "ds-panel__title";
        this.prepend(h);
      }
      h.textContent = title;
    } else if (h) {
      h.remove();
    }
  }
}
customElements.define("ds-panel", DsPanel);
