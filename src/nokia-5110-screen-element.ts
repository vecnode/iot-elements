import { html, LitElement, svg } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND, spi, VCC } from './pin';
import { headerPin, pcbBody } from './utils/pcb-board';

/**
 * Nokia 5110 LCD (PCD8544 controller), the small 84x48 monochrome
 * breakout salvaged from Nokia 5110/3310 phones. Not vendored - see
 * 74hc165-element.ts's doc comment for why. 8-pin layout (RST, CE, DC,
 * DIN, CLK, VCC, BL, GND) is the standard one these breakouts ship with.
 */
const PINS = ['RST', 'CE', 'DC', 'DIN', 'CLK', 'VCC', 'BL', 'GND'];

@customElement('iot-nokia-5110-screen')
export class Nokia5110ScreenElement extends LitElement {
  readonly pinInfo: ElementPin[] = PINS.map((name, i) => ({
    name,
    x: 2 + i * 3.4,
    y: 32,
    number: i + 1,
    signals:
      name === 'GND'
        ? [GND()]
        : name === 'VCC'
          ? [VCC(3.3)]
          : name === 'CLK'
            ? [spi('SCK')]
            : name === 'DIN'
              ? [spi('MOSI')]
              : name === 'CE'
                ? [spi('SS')]
                : [],
  }));

  render() {
    return html`
      <svg
        width="30mm"
        height="32mm"
        version="1.1"
        viewBox="0 0 30 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(30, 30, 'NOKIA 5110', '#153a1a')}
        <rect
          x="3"
          y="3"
          width="24"
          height="14"
          fill="#9fbf9f"
          stroke="#0a1f0a"
          stroke-width="0.2"
        />
        <g fill="#ccc">
          ${PINS.map((_, i) => svg`<rect x="${1.85 + i * 3.4}" y="30" width="0.3" height="2" />`)}
        </g>
        ${PINS.map((name, i) => headerPin(2 + i * 3.4, 32, name))}
      </svg>
    `;
  }
}
