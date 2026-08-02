import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND, VCC } from './pin';
import { headerPin, pcbBody } from './utils/pcb-board';

/**
 * Single-channel relay module: a mounted PCB with a 3-pin logic-side
 * header (VCC/GND/IN) and a 3-terminal screw block on the output side
 * (COM/NO/NC) - different from ks2e-m-dc5-element.ts, which is the bare
 * relay component itself, not the driver PCB it's normally mounted on.
 * Not vendored - see 74hc165-element.ts's doc comment for why.
 */
@customElement('iot-relay-module')
export class RelayModuleElement extends LitElement {
  readonly pinInfo: ElementPin[] = [
    { name: 'VCC', x: 2, y: 20, number: 1, signals: [VCC(5)] },
    { name: 'GND', x: 6, y: 20, number: 2, signals: [GND()] },
    { name: 'IN', x: 10, y: 20, number: 3, signals: [] },
    { name: 'NO', x: 18, y: 1, number: 4, signals: [] },
    { name: 'COM', x: 18, y: 9, number: 5, signals: [] },
    { name: 'NC', x: 18, y: 17, number: 6, signals: [] },
  ];

  render() {
    return html`
      <svg
        width="26mm"
        height="20mm"
        version="1.1"
        viewBox="0 0 26 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(26, 18, 'RELAY', '#0e5c2f')}
        <!-- the SONGLE-style relay can itself: blue plastic body, its
             own printed spec text - a very recognizable landmark on
             these boards. -->
        <rect
          x="1"
          y="1"
          width="12"
          height="10"
          rx="1"
          fill="#3a5aa0"
          stroke="#1a2a50"
          stroke-width="0.2"
        />
        <text x="7" y="6.5" text-anchor="middle" font-size="1.4" font-family="sans-serif" fill="#dfe6f5">SONGLE</text>
        <!-- green screw-terminal block on the output side, with a
             visible screw-hole per terminal - not a plain black
             rectangle. -->
        <rect
          x="15.5"
          y="0.5"
          width="10"
          height="17"
          fill="#1a7a3a"
          stroke="#0c4a22"
          stroke-width="0.15"
        />
        <g fill="#8a8a8a" stroke="#444" stroke-width="0.15">
          <circle cx="20.5" cy="1" r="1" />
          <circle cx="20.5" cy="9" r="1" />
          <circle cx="20.5" cy="17" r="1" />
        </g>
        <g fill="#ccc">
          <rect x="1.85" y="18" width="0.3" height="2" />
          <rect x="5.85" y="18" width="0.3" height="2" />
          <rect x="9.85" y="18" width="0.3" height="2" />
        </g>
        ${headerPin(2, 20, 'VCC')} ${headerPin(6, 20, 'GND')} ${headerPin(10, 20, 'IN')}
        ${headerPin(18, 1, 'NO', 'right')} ${headerPin(18, 9, 'COM', 'right')}
        ${headerPin(18, 17, 'NC', 'right')}
      </svg>
    `;
  }
}
