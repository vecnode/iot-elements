import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ElementPin, GND, VCC } from './pin';
import { headerPin, pcbBody } from './utils/pcb-board';

/**
 * Clock generator: a test/dev part that outputs a configurable
 * square-wave signal - useful for feeding a clock/PWM input without
 * wiring up a whole board. Not vendored - see 74hc165-element.ts's doc
 * comment for why. Visual/wireable only; `frequency` is a label, not a
 * simulated signal yet.
 */
@customElement('iot-clock-generator')
export class ClockGeneratorElement extends LitElement {
  /** Output frequency label, e.g. "1000" (Hz) - not simulated yet. */
  @property() frequency = '1000';

  readonly pinInfo: ElementPin[] = [
    { name: 'VCC', x: 2, y: 14, number: 1, signals: [VCC(5)] },
    { name: 'GND', x: 6, y: 14, number: 2, signals: [GND()] },
    { name: 'OUT', x: 10, y: 14, number: 3, signals: [] },
  ];

  render() {
    return html`
      <svg
        width="14mm"
        height="14mm"
        version="1.1"
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(14, 12, 'CLK', '#3a3a1a')}
        <path
          d="M 2 6 h 2 v -3 h 2 v 3 h 2 v -3 h 2 v 3 h 2"
          fill="none"
          stroke="#ffd23b"
          stroke-width="0.4"
        />
        <g fill="#ccc">
          <rect x="1.85" y="12" width="0.3" height="2" />
          <rect x="5.85" y="12" width="0.3" height="2" />
          <rect x="9.85" y="12" width="0.3" height="2" />
        </g>
        ${headerPin(2, 14, 'VCC')} ${headerPin(6, 14, 'GND')} ${headerPin(10, 14, 'OUT')}
      </svg>
    `;
  }
}
