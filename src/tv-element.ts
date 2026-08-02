import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ElementPin, GND, VCC } from './pin';
import { headerPin } from './utils/pcb-board';

/**
 * TV: a composite-video display output part, for sketches that
 * bit-bang a TV-out signal (e.g. TVout-style libraries) rather than
 * driving a proper framebuffer display. Not vendored - see
 * 74hc165-element.ts's doc comment for why. 3 pins (VIDEO, GND, VCC) -
 * VCC is only there because these are usually small powered composite
 * monitors, not because the signal itself needs it.
 */
@customElement('iot-tv')
export class TvElement extends LitElement {
  @property() label = 'TV';

  readonly pinInfo: ElementPin[] = [
    { name: 'VIDEO', x: 2, y: 26, number: 1, signals: [] },
    { name: 'GND', x: 6, y: 26, number: 2, signals: [GND()] },
    { name: 'VCC', x: 10, y: 26, number: 3, signals: [VCC(5)] },
  ];

  render() {
    return html`
      <svg
        width="34mm"
        height="26mm"
        version="1.1"
        viewBox="0 0 34 26"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          y="0"
          width="34"
          height="22"
          rx="2"
          fill="#222"
          stroke="#000"
          stroke-width="0.3"
        />
        <rect x="2" y="2" width="30" height="18" fill="#0a1a2a" stroke="#000" stroke-width="0.3" />
        <text
          x="17"
          y="12"
          text-anchor="middle"
          font-size="3"
          font-family="monospace"
          fill="#3af"
          dominant-baseline="middle"
        >
          ${this.label}
        </text>
        <g fill="#ccc">
          <rect x="1.85" y="22" width="0.3" height="4" />
          <rect x="5.85" y="22" width="0.3" height="4" />
          <rect x="9.85" y="22" width="0.3" height="4" />
        </g>
        ${headerPin(2, 26, 'VIDEO')} ${headerPin(6, 26, 'GND')} ${headerPin(10, 26, 'VCC')}
      </svg>
    `;
  }
}
