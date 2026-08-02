import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { pcbBody } from './utils/pcb-board';
import {
  nucleo32Body,
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
@customElement('iot-nucleo-l031k6')
export class NucleoL031K6Element extends LitElement {
  readonly pinInfo = nucleo32Pins();

  render() {
    return html`
      <svg
        width="${NUCLEO32_WIDTH + 12}mm"
        height="${NUCLEO32_HEIGHT + 3}mm"
        version="1.1"
        viewBox="-6 -2 ${NUCLEO32_WIDTH + 12} ${NUCLEO32_HEIGHT + 3}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Real Nucleo boards are white/light-gray silkscreen with a
             blue accent, not a solid dark-blue slab like a generic dev
             board - a recognizable ST Nucleo trait worth keeping. -->
        ${pcbBody(
          NUCLEO32_WIDTH,
          NUCLEO32_HEIGHT,
          'NUCLEO L031K6',
          '#eef1f4',
          '#0a3a6b',
          '#0a3a6b',
          nucleo32Body(),
        )}
        ${nucleo32Pads().map((p) => p.pin)}
      </svg>
    `;
  }
}
