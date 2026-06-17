/* <ds-switch checked disabled name="…">Label</ds-switch>
   Renders a real checkbox + track inside a <label> so clicking the label text
   toggles it. Reflects the `checked` attribute and emits a `change` event with
   detail.checked. */
export class DsSwitch extends HTMLElement {
  static observedAttributes = ["checked", "disabled"];

  connectedCallback() { if (!this._input) this._render(); }
  attributeChangedCallback() {
    if (!this._input) return;
    this._input.checked = this.hasAttribute("checked");
    this._input.disabled = this.hasAttribute("disabled");
  }

  get checked() { return this._input ? this._input.checked : this.hasAttribute("checked"); }
  set checked(v) { this.toggleAttribute("checked", !!v); }

  _render() {
    this.style.display = "contents";
    const text = this.textContent.trim();
    const label = document.createElement("label");
    label.className = "ds-switch";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = this.hasAttribute("checked");
    input.disabled = this.hasAttribute("disabled");
    if (this.hasAttribute("name")) input.name = this.getAttribute("name");
    const track = document.createElement("span");
    track.className = "ds-switch__track";
    const span = document.createElement("span");
    span.textContent = text;
    label.append(input, track, span);
    this.textContent = "";
    this.appendChild(label);
    this._input = input;
    input.addEventListener("change", () => {
      this.toggleAttribute("checked", input.checked);
      this.dispatchEvent(new CustomEvent("change", {
        detail: { checked: input.checked }, bubbles: true,
      }));
    });
  }
}
customElements.define("ds-switch", DsSwitch);
