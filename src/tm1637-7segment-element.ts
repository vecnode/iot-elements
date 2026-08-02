import { html, LitElement, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ElementPin, GND, VCC } from './pin';
import { headerPin, pcbBody } from './utils/pcb-board';

/**
 * TM1637-driven 4-digit 7-segment display module - the common small
 * breakout with just CLK/DIO/VCC/GND (the TM1637's own 2-wire protocol,
 * not standard I2C, so pin.ts's `i2c()` signal type doesn't apply). Not
 * vendored - see 74hc165-element.ts's doc comment for why.
 */
@customElement('wokwi-tm1637-7segment')
export class Tm1637SevenSegmentElement extends LitElement {
  /** Which of the 4 digits (plus the center colon) are lit - display-only, nothing drives it yet. */
  @property() text = '----';

  readonly pinInfo: ElementPin[] = [
    { name: 'CLK', x: 2, y: 16, number: 1, signals: [] },
    { name: 'DIO', x: 6, y: 16, number: 2, signals: [] },
    { name: 'VCC', x: 10, y: 16, number: 3, signals: [VCC(5)] },
    { name: 'GND', x: 14, y: 16, number: 4, signals: [GND()] },
  ];

  render() {
    const digits = (this.text + '    ').slice(0, 4).split('');
    return html`
      <svg
        width="16mm"
        height="16mm"
        version="1.1"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(16, 14, 'TM1637', '#1a1a2e')}
        <rect x="1" y="1" width="14" height="6" fill="#111" />
        ${digits.map(
          (ch, i) => svg`
            <text x="${2.5 + i * 3.2}" y="6" font-size="4" font-family="monospace" fill="#ff3b3b">${ch === ' ' ? '' : ch}</text>
          `,
        )}
        <g fill="#ccc">
          <rect x="1.85" y="14" width="0.3" height="2" />
          <rect x="5.85" y="14" width="0.3" height="2" />
          <rect x="9.85" y="14" width="0.3" height="2" />
          <rect x="13.85" y="14" width="0.3" height="2" />
        </g>
        ${headerPin(2, 16, 'CLK')} ${headerPin(6, 16, 'DIO')} ${headerPin(10, 16, 'VCC')}
        ${headerPin(14, 16, 'GND')}
      </svg>
    `;
  }
}
