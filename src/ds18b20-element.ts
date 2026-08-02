import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND, VCC } from './pin';

/**
 * DS18B20: 1-Wire digital temperature sensor, TO-92 package (the same
 * rounded-top, flat-faced 3-lead plastic case a small signal transistor
 * ships in). Not vendored - see 74hc165-element.ts's doc comment for
 * why. Pin order (flat face toward viewer, left to right) is the real
 * datasheet order: GND, DQ (data), VDD.
 */
@customElement('iot-ds18b20')
export class DS18B20Element extends LitElement {
  readonly pinInfo: ElementPin[] = [
    { name: 'GND', x: 1.27, y: 14, number: 1, signals: [GND()] },
    { name: 'DQ', x: 5.08, y: 14, number: 2, signals: [] },
    { name: 'VDD', x: 8.89, y: 14, number: 3, signals: [VCC(5)] },
  ];

  render() {
    return html`
      <svg
        width="10.16mm"
        height="17mm"
        version="1.1"
        viewBox="0 -3 10.16 17"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="1.02" y="9.5" width="0.5" height="4.5" fill="#ccc" />
        <rect x="4.83" y="9.5" width="0.5" height="4.5" fill="#ccc" />
        <rect x="8.64" y="9.5" width="0.5" height="4.5" fill="#ccc" />
        <path
          d="M 0.3 9.5 V 3.5 A 4.78 4.78 0 0 1 9.86 3.5 V 9.5 Z"
          fill="#3a3a3a"
          stroke="#151515"
          stroke-width="0.15"
        />
        <rect x="0.3" y="6.5" width="9.56" height="3" fill="#3a3a3a" />
        <text
          x="5.08"
          y="0.8"
          text-anchor="middle"
          font-size="1.3"
          font-family="sans-serif"
          fill="#eee"
        >
          DS18B20
        </text>
      </svg>
    `;
  }
}
