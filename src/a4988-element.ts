import { html, LitElement, svg } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND, VCC } from './pin';
import { headerPin, pcbBody } from './utils/pcb-board';

/**
 * A4988: bipolar stepper motor driver breakout. Not vendored - see
 * 74hc165-element.ts's doc comment for why. Two header rows, matching
 * the real module's standard layout: control side (bottom) and
 * motor-power side (top).
 */
const CONTROL_PINS = ['ENABLE', 'MS1', 'MS2', 'MS3', 'RESET', 'SLEEP', 'STEP', 'DIR', 'GND', 'VDD'];
const MOTOR_PINS = ['VMOT', 'GND', '2B', '2A', '1A', '1B'];

@customElement('iot-a4988')
export class A4988Element extends LitElement {
  readonly pinInfo: ElementPin[] = [
    ...CONTROL_PINS.map((name, i) => ({
      name,
      x: 2 + i * 3,
      y: 20,
      number: i + 1,
      signals: name === 'GND' ? [GND()] : name === 'VDD' ? [VCC(5)] : ([] as never[]),
    })),
    ...MOTOR_PINS.map((name, i) => ({
      name: name === 'GND' ? 'GND.2' : name,
      x: 3 + i * 4.5,
      y: 0,
      number: 11 + i,
      signals: name === 'GND' ? [GND()] : name === 'VMOT' ? [VCC()] : ([] as never[]),
    })),
  ];

  render() {
    return html`
      <svg
        width="30mm"
        height="25mm"
        version="1.1"
        viewBox="0 -3 30 25"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(30, 20, 'A4988', '#2a2a3a')}
        <rect x="10" y="7" width="10" height="8" fill="#1a1a1a" stroke="#000" stroke-width="0.15" />
        <!-- the small blue current-limiting trimpot mounted on the
             driver chip itself - a real, easily-spotted landmark on
             every one of these boards. -->
        <circle cx="15" cy="10" r="1.3" fill="#1a5cb0" stroke="#0a2a5a" stroke-width="0.15" />
        <line x1="15" y1="10" x2="15.9" y2="9.3" stroke="#0a2a5a" stroke-width="0.3" />
        <g fill="#ccc">
          ${CONTROL_PINS.map(
            (_, i) => svg`<rect x="${1.85 + i * 3}" y="18" width="0.3" height="2" />`,
          )}
          ${MOTOR_PINS.map(
            (_, i) => svg`<rect x="${2.85 + i * 4.5}" y="0" width="0.3" height="2" />`,
          )}
        </g>
        ${CONTROL_PINS.map((name, i) => headerPin(2 + i * 3, 20, name))}
        ${MOTOR_PINS.map((name, i) => headerPin(3 + i * 4.5, 0, name, 'up'))}
      </svg>
    `;
  }
}
