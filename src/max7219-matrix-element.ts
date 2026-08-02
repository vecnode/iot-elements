import { html, LitElement, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ElementPin, GND, spi, VCC } from './pin';
import { headerPin, pcbBody } from './utils/pcb-board';

/**
 * MAX7219-driven 8x8 LED dot-matrix breakout board (the common "one
 * matrix per MAX7219" module, chainable via DOUT). Not vendored - see
 * 74hc165-element.ts's doc comment for why. Visual/wireable only - the
 * `leds` property exists for a future caller to light individual dots,
 * mirroring how led-bar-graph-element.ts's own `values` property works,
 * but nothing drives it yet.
 */
const PINS = ['VCC', 'GND', 'DIN', 'CS', 'CLK', 'DOUT'];

@customElement('iot-max7219-matrix')
export class Max7219MatrixElement extends LitElement {
  /** 8x8 = 64 values, row-major, 1 = lit. Not driven by anything yet. */
  @property({ type: Array }) leds: number[] = new Array(64).fill(0);

  readonly pinInfo: ElementPin[] = PINS.map((name, i) => ({
    name,
    x: 2 + i * 4,
    y: 24,
    number: i + 1,
    signals:
      name === 'GND'
        ? [GND()]
        : name === 'VCC'
          ? [VCC(5)]
          : name === 'CLK'
            ? [spi('SCK')]
            : name === 'DIN'
              ? [spi('MOSI')]
              : name === 'CS'
                ? [spi('SS')]
                : [],
  }));

  render() {
    const { leds } = this;
    return html`
      <svg
        width="24mm"
        height="24mm"
        version="1.1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(24, 22, 'MAX7219', '#7a1010')}
        <rect x="2" y="2" width="16" height="16" fill="#1a1a1a" />
        ${Array.from({ length: 8 }, (_, row) =>
          Array.from(
            { length: 8 },
            (_, col) => svg`
              <circle
                cx="${3.2 + col * 1.86}"
                cy="${3.2 + row * 1.86}"
                r="0.7"
                fill="${leds[row * 8 + col] ? '#ff3b30' : '#3a1414'}"
              />`,
          ),
        )}
        <g fill="#ccc">
          ${PINS.map((_, i) => svg`<rect x="${1.85 + i * 4}" y="22" width="0.3" height="2" />`)}
        </g>
        ${PINS.map((name, i) => headerPin(2 + i * 4, 24, name))}
      </svg>
    `;
  }
}
