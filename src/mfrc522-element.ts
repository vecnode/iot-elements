import { html, LitElement, svg } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND, spi, VCC } from './pin';
import { headerPin } from './utils/pcb-board';

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
    // Real RC522 breakout boards are near-square with the top-left
    // corner clipped diagonally, and most of the board is taken up by
    // a printed square-spiral antenna coil (the board's most
    // recognizable trait) - both drawn here instead of the fork's
    // original plain rectangle.
    const coilTurns = [15, 12.5, 10, 7.5, 5];
    return html`
      <svg
        width="34mm"
        height="24mm"
        version="1.1"
        viewBox="0 0 34 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 4 1 L 30 1 A 1 1 0 0 1 31 2 L 31 21 A 1 1 0 0 1 30 22 L 1 22 A 1 1 0 0 1 0 21 L 0 5 Z"
          fill="#1a3a6b"
          stroke="#0c2447"
          stroke-width="0.2"
        />
        <g fill="none" stroke="#c8a44d" stroke-width="0.5">
          ${coilTurns.map(
            (r) => svg`<rect x="${16 - r}" y="${11.5 - r * 0.68}" width="${r * 2}" height="${r * 1.36}" rx="0.6" />`,
          )}
        </g>
        <rect
          x="25"
          y="3"
          width="6"
          height="6"
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
