/* <ds-modal heading="Settings" open>
     <p>Body content…</p>
     <div data-foot>
       <ds-button>Cancel</ds-button>
       <span class="ds-modal__spacer"></span>
       <ds-button variant="primary">Save</ds-button>
     </div>
   </ds-modal>

   Builds the overlay + dialog around the light DOM (children of a [data-foot]
   element become the footer). Open via the `open` attribute or .open(); closes
   on backdrop click, the close button, or Escape. Emits `ds-open` / `ds-close`. */
export class DsModal extends HTMLElement {
  static observedAttributes = ["open", "heading"];

  connectedCallback() { if (!this._overlay) this._render(); }
  attributeChangedCallback(name) {
    if (!this._overlay) return;
    if (name === "open") this._reflect();
    if (name === "heading") this._title.textContent = this.getAttribute("heading") || "";
  }

  open() { this.setAttribute("open", ""); }
  close() { this.removeAttribute("open"); }

  _render() {
    this.style.display = "contents";
    const footEl = this.querySelector(":scope > [data-foot]");
    const bodyNodes = [];
    Array.from(this.childNodes).forEach((n) => { if (n !== footEl) bodyNodes.push(n); });

    const overlay = document.createElement("div");
    overlay.className = "ds-overlay";
    overlay.innerHTML =
      '<div class="ds-modal" role="dialog" aria-modal="true">' +
      '  <div class="ds-modal__head">' +
      '    <h2 class="ds-modal__title"></h2>' +
      '    <button class="ds-button ds-modal__close" type="button" aria-label="Close">Close</button>' +
      '  </div>' +
      '  <div class="ds-modal__body"></div>' +
      '</div>';
    this._overlay = overlay;
    this._title = overlay.querySelector(".ds-modal__title");
    this._title.textContent = this.getAttribute("heading") || "";
    const body = overlay.querySelector(".ds-modal__body");
    bodyNodes.forEach((n) => body.appendChild(n));
    if (footEl) {
      const foot = document.createElement("div");
      foot.className = "ds-modal__foot";
      while (footEl.firstChild) foot.appendChild(footEl.firstChild);
      footEl.remove();
      overlay.querySelector(".ds-modal").appendChild(foot);
    }
    this.appendChild(overlay);

    overlay.addEventListener("click", (e) => { if (e.target === overlay) this.close(); });
    overlay.querySelector(".ds-modal__close").addEventListener("click", () => this.close());
    this._onKey = (e) => { if (e.key === "Escape" && this.hasAttribute("open")) this.close(); };
    this._reflect();
  }

  _reflect() {
    const isOpen = this.hasAttribute("open");
    this._overlay.classList.toggle("is-open", isOpen);
    if (isOpen) {
      document.addEventListener("keydown", this._onKey);
      this.dispatchEvent(new CustomEvent("ds-open", { bubbles: true }));
    } else {
      document.removeEventListener("keydown", this._onKey);
      this.dispatchEvent(new CustomEvent("ds-close", { bubbles: true }));
    }
  }
}
customElements.define("ds-modal", DsModal);
