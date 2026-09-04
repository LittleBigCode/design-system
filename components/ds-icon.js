import { icons } from "../react/components/icons.js";

/* <ds-icon name="search" size="24" title="Search"></ds-icon>
   Light-DOM web component mirroring the React <Icon>. The host element gets the
   .ds-icon class and contains a single <svg> with the shared Phosphor
   conventions (256×256 viewBox, fill currentColor, no stroke). `size` sets the
   host font-size (number → px, or any CSS length) so the 1em-square svg scales
   with it; omit it to inherit. Provide `title` for an accessible name
   (role="img" + <title>); without it the icon is decorative and aria-hidden.
   Relies on the global stylesheet for .ds-icon.

   The set moved from Lucide to Phosphor in 1.0.0-beta.7 (batch-plan §1.4). The
   names are unchanged, so no markup has to be rewritten. `stroke-width` is
   still observed and still accepted — filled geometry has nothing to widen, but
   the attribute is published and ignoring it costs a caller nothing. */
export class DsIcon extends HTMLElement {
  static observedAttributes = ["name", "size", "title", "stroke-width"];

  connectedCallback() { if (!this._svg) this._render(); else this._sync(); }
  attributeChangedCallback() { if (this._svg) this._sync(); }

  _render() {
    this.className = "ds-icon";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 256 256");
    this._svg = svg;
    this.appendChild(svg);
    this._sync();
  }
  _sync() {
    const name = this.getAttribute("name") || "";
    const title = this.getAttribute("title") || "";
    const size = this.getAttribute("size");

    this._svg.innerHTML =
      (title ? `<title>${title}</title>` : "") + (icons[name] || "");

    if (title) {
      this._svg.setAttribute("role", "img");
      this._svg.removeAttribute("aria-hidden");
    } else {
      this._svg.setAttribute("aria-hidden", "true");
      this._svg.removeAttribute("role");
    }

    // Size drives the host font-size so the 1em-square svg follows it.
    this.style.fontSize = size
      ? (/^\d+$/.test(size.trim()) ? `${size}px` : size)
      : "";
  }
}
customElements.define("ds-icon", DsIcon);
