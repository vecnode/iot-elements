import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND, spi, VCC } from './pin';
import { dipBody, dipPinPositions, dipSvgSize, dipViewBox } from './utils/dip-chip';

/**
 * 74HC165: 8-bit parallel-in/serial-out shift register, standard 16-pin
 * DIP. Not vendored from upstream wokwi/wokwi-elements or from Wokwi's
 * own (closed-source) docs.wokwi.com rendering - neither ships this part
 * under an open license, so this is an original element, drawn as a
 * generic DIP-16 body (see utils/dip-chip.ts) with the real datasheet
 * pinout, same "small, original, not copied from Wokwi" precedent as
 * capacitor-element.ts. Purely visual/wireable, no simulated shift
 * behavior (same tier most of this fork's small parts are at today).
 */
const PIN_NAMES = [
  'PL',
  'CP',
  'D4',
  'D5',
  'D6',
  'D7',
  "Q7'",
  'GND',
  'Q7',
  'DS',
  'D0',
  'D1',
  'D2',
  'D3',
  'CE',
  'VCC',
];

@customElement('iot-74hc165')
export class HC165Element extends LitElement {
  readonly pinInfo: ElementPin[] = dipPinPositions(8).map((p, i) => ({
    name: PIN_NAMES[i],
    x: p.x,
    y: p.y,
    number: i + 1,
    signals:
      PIN_NAMES[i] === 'GND'
        ? [GND()]
        : PIN_NAMES[i] === 'VCC'
          ? [VCC(5)]
          : PIN_NAMES[i] === 'CP'
            ? [spi('SCK')]
            : PIN_NAMES[i] === 'Q7'
              ? [spi('MISO')]
              : PIN_NAMES[i] === 'DS'
                ? [spi('MOSI')]
                : PIN_NAMES[i] === 'PL'
                  ? [spi('SS')]
                  : [],
  }));

  render() {
    const { width, height } = dipSvgSize(8);
    return html`
      <svg
        width="${width}mm"
        height="${height}mm"
        version="1.1"
        viewBox="${dipViewBox(8)}"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${dipBody(8, '74HC165')}
      </svg>
    `;
  }
}
