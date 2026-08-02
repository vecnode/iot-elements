import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND, spi, VCC } from './pin';
import { dipBody, dipPinPositions, dipSvgSize, dipViewBox } from './utils/dip-chip';

/**
 * NLSF595: a pin-compatible, lower-voltage clone of the 74HC595 8-bit
 * serial-in/parallel-out shift register (same 16-pin DIP pinout) - see
 * 74hc165-element.ts's doc comment for why this is an original element
 * rather than vendored.
 */
const PIN_NAMES = [
  'QB',
  'QC',
  'QD',
  'QE',
  'QF',
  'QG',
  'QH',
  'GND',
  "QH'",
  'MR',
  'SHCP',
  'STCP',
  'OE',
  'DS',
  'QA',
  'VCC',
];

@customElement('iot-nlsf595')
export class NLSF595Element extends LitElement {
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
          : PIN_NAMES[i] === 'SHCP'
            ? [spi('SCK')]
            : PIN_NAMES[i] === 'DS'
              ? [spi('MOSI')]
              : PIN_NAMES[i] === 'STCP'
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
        ${dipBody(8, 'NLSF595')}
      </svg>
    `;
  }
}
