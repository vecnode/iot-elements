import { html, LitElement, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ElementPin, GND, VCC } from './pin';

/**
 * Simple (non-addressable) common-anode RGB LED strip segment - three
 * LED colors driven directly by PWM, not the per-pixel addressable kind
 * (that's neopixel-element.ts, a different part). Not vendored - see
 * 74hc165-element.ts's doc comment for why. 4-pin layout (12V, R, G, B)
 * is the standard one these strips ship with.
 */
@customElement('iot-led-strip')
export class LedStripElement extends LitElement {
  @property() r = 0;
  @property() g = 0;
  @property() b = 0;

  readonly pinInfo: ElementPin[] = [
    { name: '12V', x: 2, y: 8, number: 1, signals: [VCC(12)] },
    { name: 'R', x: 26, y: 2, number: 2, signals: [] },
    { name: 'G', x: 26, y: 8, number: 3, signals: [] },
    { name: 'B', x: 26, y: 14, number: 4, signals: [GND()] },
  ];

  render() {
    const { r, g, b } = this;
    const color = `rgb(${r}, ${g}, ${b})`;
    return html`
      <svg
        width="30mm"
        height="16mm"
        version="1.1"
        viewBox="0 0 30 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="4"
          y="2"
          width="20"
          height="12"
          rx="1"
          fill="#e8e8e8"
          stroke="#999"
          stroke-width="0.2"
        />
        ${Array.from(
          { length: 4 },
          (_, i) => svg`<circle cx="${8 + i * 4.4}" cy="8" r="1.6" fill="${color}" />`,
        )}
      </svg>
    `;
  }
}
