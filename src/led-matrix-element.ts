import { html, LitElement, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ElementPin } from './pin';

/**
 * Plain 8x8 LED dot-matrix (bare module, driven directly row/column -
 * not through a MAX7219, that's max7219-matrix-element.ts, a different
 * part). Not vendored - see 74hc165-element.ts's doc comment for why.
 * 16 pins (ROW1-8, COL1-8), the standard bare-module layout; `leds` is
 * display-only, nothing drives it yet (same posture as
 * max7219-matrix-element.ts's own `leds` property).
 */
const ROWS = Array.from({ length: 8 }, (_, i) => `ROW${i + 1}`);
const COLS = Array.from({ length: 8 }, (_, i) => `COL${i + 1}`);

@customElement('iot-led-matrix')
export class LedMatrixElement extends LitElement {
  @property({ type: Array }) leds: number[] = new Array(64).fill(0);
  @property() color = '#ff3b30';

  readonly pinInfo: ElementPin[] = [
    ...ROWS.map((name, i) => ({ name, x: -2, y: 2 + i * 2.4, number: i + 1, signals: [] })),
    ...COLS.map((name, i) => ({ name, x: i * 2.4, y: -2, number: 9 + i, signals: [] })),
  ];

  render() {
    const { leds, color } = this;
    return html`
      <svg
        width="21.2mm"
        height="21.2mm"
        version="1.1"
        viewBox="-3 -3 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="18" height="18" fill="#1a1a1a" stroke="#000" stroke-width="0.2" />
        ${Array.from({ length: 8 }, (_, row) =>
          Array.from(
            { length: 8 },
            (_, col) => svg`
              <circle
                cx="${1.2 + col * 2.4}"
                cy="${1.2 + row * 2.4}"
                r="0.9"
                fill="${leds[row * 8 + col] ? color : '#333'}"
              />`,
          ),
        )}
        <g fill="#ccc">
          ${ROWS.map(
            (_, i) => svg`<rect x="-2" y="${2 + i * 2.4 - 0.35}" width="2" height="0.7" />`,
          )}
          ${COLS.map((_, i) => svg`<rect x="${i * 2.4 - 0.35}" y="-2" width="0.7" height="2" />`)}
        </g>
      </svg>
    `;
  }
}
