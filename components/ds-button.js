/* <ds-button variant="primary|danger" type="button|submit" disabled>Label</ds-button>
   Renders a real <button class="ds-button …"> in light DOM; styled by the
   global stylesheet. The host collapses (display:contents) so it sits in flex/
   grid layouts as if it were the button itself. */
export class DsButton extends HTMLElement {
  static observedAttributes = ["variant", "type", "disabled"];

  connectedCallback() {
    if (!this._btn) this._render();
  }
  attributeChangedCallback() {
    if (this._btn) this._sync();
  }
  _render() {
    this.style.display = "contents";
    const btn = document.createElement("button");
    this._btn = btn;
    while (this.firstChild) btn.appendChild(this.firstChild);
    this.appendChild(btn);
    this._sync();
  }
  _sync() {
    const v = this.getAttribute("variant");
    this._btn.className = "ds-button" + (v ? ` ds-button--${v}` : "");
    this._btn.type = this.getAttribute("type") || "button";
    this._btn.disabled = this.hasAttribute("disabled");
  }
}
customElements.define("ds-button", DsButton);
