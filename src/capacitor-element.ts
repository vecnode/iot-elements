import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ElementPin } from './pin';

/**
 * Renders a non-polarized (ceramic-disc-style) capacitor with two pins.
 *
 * Not vendored from upstream wokwi/wokwi-elements - neither that project
 * nor this fork ships a capacitor element (confirmed by checking the
 * fork's own file list), so this is a small, original, minimal element
 * added directly here, following this project's own documented "adding a
 * new sensor or connection" workflow (physicalsim's COMPONENTS.md).
 * Deliberately non-polarized (no +/- distinction, unlike a real
 * electrolytic capacitor) - a polarized variant is future scope, not
 * modeled here.
 */
@customElement('iot-capacitor')
export class CapacitorElement extends LitElement {
  /**
   * Capacitance value, in farads - accepts a plain number or an SI-suffixed
   * string ("100n", "10u", "1m") the same way real component labels do.
   * Purely a label/value carried on the element (like ResistorElement's own
   * `value`) - this element does not compute or simulate anything itself.
   */
  @property() value = '100n';

  readonly pinInfo: ElementPin[] = [
    { name: '1', x: 0, y: 8, signals: [] },
    { name: '2', x: 20, y: 8, signals: [] },
  ];

  static get styles() {
    return css`
      :host {
        display: flex;
      }
    `;
  }

  render() {
    return html`
      <svg
        width="20mm"
        height="16mm"
        version="1.1"
        viewBox="0 0 20 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Leads -->
        <rect x="0" y="7.4" width="7" height="1.2" fill="#aaa" />
        <rect x="13" y="7.4" width="7" height="1.2" fill="#aaa" />
        <!-- Ceramic disc body -->
        <ellipse cx="10" cy="8" rx="4.2" ry="6" fill="#d9a441" stroke="#8a5a1a" stroke-width="0.4" />
        <text x="10" y="9.5" text-anchor="middle" font-size="3.2" font-family="sans-serif" fill="#2a1a05">
          ${this.value}
        </text>
      </svg>
    `;
  }
}
