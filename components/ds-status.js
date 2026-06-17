/* <ds-status status="success|warning|danger|critical|neutral|info"
              kicker="…" heading="…" subtitle="…">
     …body (e.g. <div class="ds-status__key">…</div>,
            <div class="ds-status__body">…</div>,
            <div class="ds-status__note">…</div>)…
   </ds-status>

   The host IS the .ds-status container. The colored head is built from the
   attributes and prepended; the rest of the light DOM is kept as the body. */
export class DsStatus extends HTMLElement {
  static observedAttributes = ["status", "kicker", "heading", "subtitle"];
  connectedCallback() { if (!this._head) this._render(); else this._sync(); }
  attributeChangedCallback() { if (this._head) this._sync(); }

  _render() {
    const head = document.createElement("div");
    head.className = "ds-status__head";
    head.innerHTML =
      '<div class="ds-status__kicker"></div>' +
      '<div class="ds-status__title"></div>' +
      '<div class="ds-status__subtitle"></div>';
    this._head = head;
    this.prepend(head);
    this._sync();
  }
  _sync() {
    const status = this.getAttribute("status") || "neutral";
    this.className = "ds-status ds-status--" + status;
    const k = this.getAttribute("kicker") || "";
    const t = this.getAttribute("heading") || "";
    const s = this.getAttribute("subtitle") || "";
    const $ = (sel) => this._head.querySelector(sel);
    $(".ds-status__kicker").textContent = k;
    $(".ds-status__kicker").hidden = !k;
    $(".ds-status__title").textContent = t;
    $(".ds-status__subtitle").textContent = s;
    $(".ds-status__subtitle").hidden = !s;
  }
}
customElements.define("ds-status", DsStatus);
