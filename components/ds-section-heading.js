/* <ds-section-heading>Label</ds-section-heading>
   Self-classing uppercase heading with a trailing hairline rule. */
export class DsSectionHeading extends HTMLElement {
  connectedCallback() { this.classList.add("ds-section-heading"); }
}
customElements.define("ds-section-heading", DsSectionHeading);
