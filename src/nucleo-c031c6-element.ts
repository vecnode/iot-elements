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
 * ST Nucleo-32 board carrying an STM32C031C6 - visual/wireable only, no
 * simulated core (this fork has no STM32 adapter, same "no
 * SimulatorAdapter yet" tier most non-AVR/RP2040/ESP32 boards in
 * COMPONENTS.md are at). Not vendored - see 74hc165-element.ts's doc
 * comment for why. Header pinout is nucleo32-layout.ts's shared one -
 * see that file's own comment for why it's identical across the family.
 */
@customElement('iot-nucleo-c031c6')
export class NucleoC031C6Element extends LitElement {
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
        <!-- Real Nucleo boards are white/light-gray silkscreen with a
             blue accent, not a solid dark-blue slab like a generic dev
             board - a recognizable ST Nucleo trait worth keeping. -->
        ${pcbBody(NUCLEO32_WIDTH, NUCLEO32_HEIGHT, 'NUCLEO C031C6', '#eef1f4', '#0a3a6b', '#0a3a6b')}
        <rect x="0" y="0" width="${NUCLEO32_WIDTH}" height="2.2" fill="#0a3a6b" />
        <rect x="5" y="16" width="8" height="8" fill="#1a1a1a" stroke="#000" stroke-width="0.15" />
        ${nucleo32Pads().map((p) => p.pin)}
      </svg>
    `;
  }
}
