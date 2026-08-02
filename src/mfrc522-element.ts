import { html, LitElement, svg } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND, spi, VCC } from './pin';
import { headerPin, pcbBody } from './utils/pcb-board';

/**
 * MFRC522: 13.56MHz RFID reader/writer breakout, SPI interface. Not
 * vendored - see 74hc165-element.ts's doc comment for why. 8-pin
 * layout (SDA/SS, SCK, MOSI, MISO, IRQ, GND, RST, VCC) is the standard
 * one these breakout boards ship with.
 */
const PINS = ['SDA', 'SCK', 'MOSI', 'MISO', 'IRQ', 'GND', 'RST', 'VCC'];

@customElement('iot-mfrc522')
export class MFRC522Element extends LitElement {
  readonly pinInfo: ElementPin[] = PINS.map((name, i) => ({
    name,
    x: 2 + i * 4,
    y: 24,
    number: i + 1,
    signals:
      name === 'GND'
        ? [GND()]
        : name === 'VCC'
          ? [VCC(3.3)]
          : name === 'SCK'
            ? [spi('SCK')]
            : name === 'MOSI'
              ? [spi('MOSI')]
              : name === 'MISO'
                ? [spi('MISO')]
                : name === 'SDA'
                  ? [spi('SS')]
                  : [],
  }));

  render() {
    return html`
      <svg
        width="34mm"
        height="24mm"
        version="1.1"
        viewBox="0 0 34 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(34, 22, 'MFRC522', '#1a3a6b')}
        <rect
          x="10"
          y="3"
          width="14"
          height="14"
          fill="#1a1a1a"
          stroke="#000"
          stroke-width="0.15"
        />
        <g fill="#ccc">
          ${PINS.map((_, i) => svg`<rect x="${1.85 + i * 4}" y="22" width="0.3" height="2" />`)}
        </g>
        ${PINS.map((name, i) => headerPin(2 + i * 4, 24, name))}
      </svg>
    `;
  }
}
