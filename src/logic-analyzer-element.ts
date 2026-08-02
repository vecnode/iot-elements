import { html, LitElement, svg } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND } from './pin';
import { headerPin, pcbBody } from './utils/pcb-board';

/**
 * Logic analyzer: an 8-channel debug probe (CH0-CH7 + GND), for
 * capturing digital signal traces off a circuit rather than driving
 * anything. Not vendored - see 74hc165-element.ts's doc comment for why.
 * Visual/wireable only - no capture/trace behavior simulated yet.
 */
const CHANNELS = Array.from({ length: 8 }, (_, i) => `CH${i}`);

@customElement('wokwi-logic-analyzer')
export class LogicAnalyzerElement extends LitElement {
  readonly pinInfo: ElementPin[] = [
    ...CHANNELS.map((name, i) => ({ name, x: 2 + i * 3, y: 16, number: i + 1, signals: [] })),
    { name: 'GND', x: 26, y: 16, number: 9, signals: [GND()] },
  ];

  render() {
    return html`
      <svg
        width="28mm"
        height="16mm"
        version="1.1"
        viewBox="0 0 28 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(28, 14, 'LOGIC ANALYZER', '#333')}
        <g fill="#ccc">
          ${[...CHANNELS, 'GND'].map(
            (_, i) => svg`<rect x="${1.85 + i * 3}" y="14" width="0.3" height="2" />`,
          )}
        </g>
        ${CHANNELS.map((name, i) => headerPin(2 + i * 3, 16, name))} ${headerPin(26, 16, 'GND')}
      </svg>
    `;
  }
}
