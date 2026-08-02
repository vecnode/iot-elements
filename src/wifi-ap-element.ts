import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ElementPin } from './pin';

/**
 * WiFi AP: a diagram-only pseudo-part representing a wireless access
 * point a board's WiFi radio associates with - not a real component
 * with leads, so it has no pins (`pinInfo` is empty, same convention
 * iot-text below uses). Not vendored - see 74hc165-element.ts's doc
 * comment for why. `ssid` is a label only; nothing in this fork actually
 * simulates WiFi association yet.
 */
@customElement('iot-wifi-ap')
export class WifiApElement extends LitElement {
  @property() ssid = 'Wokwi-GUEST';

  readonly pinInfo: ElementPin[] = [];

  render() {
    return html`
      <svg
        width="20mm"
        height="22mm"
        version="1.1"
        viewBox="0 0 20 22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="#3b9dff" stroke-width="0.9" stroke-linecap="round">
          <path d="M 3 12 A 10 10 0 0 1 17 12" />
          <path d="M 5.8 15 A 6 6 0 0 1 14.2 15" />
          <path d="M 8.6 18 A 2.4 2.4 0 0 1 11.4 18" />
        </g>
        <circle cx="10" cy="20" r="1.1" fill="#3b9dff" />
        <text
          x="10"
          y="6"
          text-anchor="middle"
          font-size="2"
          font-family="sans-serif"
          fill="#e8e8e8"
        >
          ${this.ssid}
        </text>
      </svg>
    `;
  }
}
