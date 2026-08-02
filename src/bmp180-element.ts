import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND, i2c, VCC } from './pin';
import { headerPin, pcbBody } from './utils/pcb-board';

/**
 * BMP180: barometric pressure/temperature sensor, I2C breakout board.
 * Not vendored - see 74hc165-element.ts's doc comment for why. 4-pin
 * I2C breakout, the standard layout these small modules ship with.
 */
@customElement('iot-bmp180')
export class BMP180Element extends LitElement {
  readonly pinInfo: ElementPin[] = [
    { name: 'VCC', x: 2, y: 12, number: 1, signals: [VCC(3.3)] },
    { name: 'GND', x: 6, y: 12, number: 2, signals: [GND()] },
    { name: 'SCL', x: 10, y: 12, number: 3, signals: [i2c('SCL')] },
    { name: 'SDA', x: 14, y: 12, number: 4, signals: [i2c('SDA')] },
  ];

  render() {
    return html`
      <svg
        width="16mm"
        height="14mm"
        version="1.1"
        viewBox="0 0 16 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(16, 10, 'BMP180')}
        <rect
          x="5.5"
          y="2.5"
          width="5"
          height="5"
          rx="0.5"
          fill="#333"
          stroke="#111"
          stroke-width="0.15"
        />
        <g fill="#ccc">
          <rect x="1.85" y="10" width="0.3" height="2" />
          <rect x="5.85" y="10" width="0.3" height="2" />
          <rect x="9.85" y="10" width="0.3" height="2" />
          <rect x="13.85" y="10" width="0.3" height="2" />
        </g>
        ${headerPin(2, 12, 'VCC')} ${headerPin(6, 12, 'GND')} ${headerPin(10, 12, 'SCL')}
        ${headerPin(14, 12, 'SDA')}
      </svg>
    `;
  }
}
