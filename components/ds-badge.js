/* <ds-badge variant="solid|accent">Label</ds-badge>
   Self-classing inline pill — the host element is the badge. */
export class DsBadge extends HTMLElement {
  static observedAttributes = ["variant"];
  connectedCallback() { this._sync(); }
  attributeChangedCallback() { this._sync(); }
  _sync() {
    const v = this.getAttribute("variant");
    this.className = "ds-badge" + (v ? ` ds-badge--${v}` : "");
  }
}
customElements.define("ds-badge", DsBadge);
