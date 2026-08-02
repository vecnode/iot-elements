import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND, spi, VCC } from './pin';
import { dipBody, dipPinPositions, dipSvgSize, dipViewBox } from './utils/dip-chip';

/**
 * Bare ATtiny85 chip, standard 8-pin DIP - not the Franzininho board
 * (franzininho-element.ts) that already has one soldered on, this is the
 * standalone chip for breadboard/perfboard circuits. Not vendored - see
 * 74hc165-element.ts's doc comment for why. Pin 1 (RESET/PB5) and the
 * SPI-programming pins (PB0/MOSI, PB1/MISO, PB2/SCK) are the same
 * physical pins used for both ISP programming and normal GPIO, same as
 * on the real chip - this element doesn't distinguish the two modes,
 * it's visual/wireable only, no simulated core.
 */
const PIN_NAMES = ['PB5', 'PB3', 'PB4', 'GND', 'PB0', 'PB1', 'PB2', 'VCC'];

@customElement('wokwi-attiny85')
export class ATtiny85Element extends LitElement {
  readonly pinInfo: ElementPin[] = dipPinPositions(4).map((p, i) => ({
    name: PIN_NAMES[i],
    x: p.x,
    y: p.y,
    number: i + 1,
    signals:
      PIN_NAMES[i] === 'GND'
        ? [GND()]
        : PIN_NAMES[i] === 'VCC'
          ? [VCC(5)]
          : PIN_NAMES[i] === 'PB2'
            ? [spi('SCK')]
            : PIN_NAMES[i] === 'PB1'
              ? [spi('MISO')]
              : PIN_NAMES[i] === 'PB0'
                ? [spi('MOSI')]
                : [],
  }));

  render() {
    const { width, height } = dipSvgSize(4);
    return html`
      <svg
        width="${width}mm"
        height="${height}mm"
        version="1.1"
        viewBox="${dipViewBox(4)}"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${dipBody(4, 'ATtiny85')}
      </svg>
    `;
  }
}
