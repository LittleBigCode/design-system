/* <ds-segmented mode="single|multi">
     <button class="ds-segmented__item">A</button>
     <button class="ds-segmented__item">B</button>
   </ds-segmented>

   The host is the .ds-segmented row. Single mode (default) keeps one item
   active (aria-pressed); multi mode toggles each independently. Emits `change`
   with detail.active = array of selected indices. */
export class DsSegmented extends HTMLElement {
  connectedCallback() {
    this.classList.add("ds-segmented");
    this._mode = this.getAttribute("mode") || "single";
    this._items = Array.from(this.querySelectorAll(".ds-segmented__item"));
    this._items.forEach((item, i) => {
      if (!item.hasAttribute("aria-pressed")) item.setAttribute("aria-pressed", item.classList.contains("is-active") ? "true" : "false");
      item.classList.toggle("is-active", item.getAttribute("aria-pressed") === "true");
      item.addEventListener("click", () => this._onClick(i));
    });
  }
  _onClick(i) {
    if (this._mode === "single") {
      this._items.forEach((it, j) => {
        const on = i === j;
        it.setAttribute("aria-pressed", on ? "true" : "false");
        it.classList.toggle("is-active", on);
      });
    } else {
      const it = this._items[i];
      const on = it.getAttribute("aria-pressed") !== "true";
      it.setAttribute("aria-pressed", on ? "true" : "false");
      it.classList.toggle("is-active", on);
    }
    const active = this._items.reduce((acc, it, j) => {
      if (it.getAttribute("aria-pressed") === "true") acc.push(j);
      return acc;
    }, []);
    this.dispatchEvent(new CustomEvent("change", { detail: { active }, bubbles: true }));
  }
}
customElements.define("ds-segmented", DsSegmented);
