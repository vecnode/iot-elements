import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { pcbBody } from './utils/pcb-board';
import {
  nucleo32Pads,
  nucleo32Pins,
  NUCLEO32_HEIGHT,
  NUCLEO32_WIDTH,
} from './utils/nucleo32-layout';

/**
 * ST Nucleo-32 board carrying an STM32L031K6 - see
 * nucleo-c031c6-element.ts's own doc comment (identical in every way
 * except the silkscreened chip name, same as the real boards).
 */
@customElement('wokwi-nucleo-l031k6')
export class NucleoL031K6Element extends LitElement {
  readonly pinInfo = nucleo32Pins();

  render() {
    return html`
      <svg
        width="${NUCLEO32_WIDTH + 12}mm"
        height="${NUCLEO32_HEIGHT + 2}mm"
        version="1.1"
        viewBox="-6 -1 ${NUCLEO32_WIDTH + 12} ${NUCLEO32_HEIGHT + 2}"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(NUCLEO32_WIDTH, NUCLEO32_HEIGHT, 'NUCLEO L031K6', '#0a3a6b')}
        <rect x="5" y="16" width="8" height="8" fill="#1a1a1a" stroke="#000" stroke-width="0.15" />
        ${nucleo32Pads().map((p) => p.pin)}
      </svg>
    `;
  }
}
