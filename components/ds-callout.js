/* <ds-callout type="info|success|warning|danger" heading="Optional title">…</ds-callout>
   Self-classing alert box. Default tone is warning. */
export class DsCallout extends HTMLElement {
  static observedAttributes = ["type", "heading"];
  connectedCallback() { if (!this._init) this._render(); }
  attributeChangedCallback() { if (this._init) this._render(); }
  _render() {
    this._init = true;
    const type = this.getAttribute("type");
    this.className = "ds-callout" + (type ? ` ds-callout--${type}` : "");
    const heading = this.getAttribute("heading");
    let title = this.querySelector(":scope > .ds-callout__title");
    if (heading) {
      if (!title) {
        title = document.createElement("div");
        title.className = "ds-callout__title";
        this.prepend(title);
      }
      title.textContent = heading;
    } else if (title) {
      title.remove();
    }
  }
}
customElements.define("ds-callout", DsCallout);
