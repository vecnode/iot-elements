import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND, i2c, VCC } from './pin';
import { headerPin, pcbBody } from './utils/pcb-board';

/**
 * Grove - OLED Display 1.12" (SH1107 driver), on a 4-pin Grove I2C
 * connector (GND, VCC, SDA, SCL - Grove's own standard pin order). Not
 * vendored - see 74hc165-element.ts's doc comment for why.
 */
@customElement('iot-grove-oled-sh1107')
export class GroveOledSh1107Element extends LitElement {
  readonly pinInfo: ElementPin[] = [
    { name: 'GND', x: 2, y: 22, number: 1, signals: [GND()] },
    { name: 'VCC', x: 6, y: 22, number: 2, signals: [VCC(3.3)] },
    { name: 'SDA', x: 10, y: 22, number: 3, signals: [i2c('SDA')] },
    { name: 'SCL', x: 14, y: 22, number: 4, signals: [i2c('SCL')] },
  ];

  render() {
    return html`
      <svg
        width="16mm"
        height="22mm"
        version="1.1"
        viewBox="0 0 16 22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Grove modules ship on a distinctive light cyan-blue PCB,
             not a generic dark board. -->
        ${pcbBody(16, 20, 'SH1107', '#3fb8c9', '#0a2a30', '#1f7a87')}
        <rect x="1.5" y="2" width="13" height="10" fill="#000" stroke="#333" stroke-width="0.15" />
        <!-- the white 4-pin Grove/JST connector housing on the edge -
             Grove parts plug in via this connector, not bare header
             pins, even though the pins below still expose the same
             four signals for wiring. -->
        <rect x="1" y="18" width="14" height="3.4" rx="0.4" fill="#f0f0f0" stroke="#999" stroke-width="0.15" />
        <g fill="#ccc">
          <rect x="1.85" y="20" width="0.3" height="2" />
          <rect x="5.85" y="20" width="0.3" height="2" />
          <rect x="9.85" y="20" width="0.3" height="2" />
          <rect x="13.85" y="20" width="0.3" height="2" />
        </g>
        ${headerPin(2, 22, 'GND')} ${headerPin(6, 22, 'VCC')} ${headerPin(10, 22, 'SDA')}
        ${headerPin(14, 22, 'SCL')}
      </svg>
    `;
  }
}
