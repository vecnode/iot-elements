import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GND, VCC, type ElementPin } from './pin';
import { edgeHeaderRow, pcbBody } from './utils/pcb-board';

/**
 * Franzininho WiFi: the WiFi-capable sibling of the ATtiny85-based
 * Franzininho (franzininho-element.ts, a different board) - a compact
 * ESP8285-based board from the same Brazilian open-hardware project.
 * Visual/wireable only, no simulated core (this fork has no ESP8285
 * adapter). Not vendored - see 74hc165-element.ts's doc comment for why.
 */
const LEFT = ['3V3', 'GND', 'TX', 'RX', 'RST'];
const RIGHT = ['D0', 'D1', 'D2', 'D3', 'D4'];

const WIDTH = 16;
const HEIGHT = 28;

@customElement('wokwi-franzininho-wifi')
export class FranzininhoWifiElement extends LitElement {
  readonly pinInfo: ElementPin[] = [
    ...edgeHeaderRow(LEFT, 'left', 3, 0, 4.4),
    ...edgeHeaderRow(RIGHT, 'right', 3, WIDTH, 4.4),
  ].map(({ name, x, y }, i) => ({
    name,
    x,
    y,
    number: i + 1,
    signals: name === 'GND' ? [GND()] : name === '3V3' ? [VCC(3.3)] : [],
  }));

  render() {
    return html`
      <svg
        width="${WIDTH + 10}mm"
        height="${HEIGHT}mm"
        version="1.1"
        viewBox="-5 0 ${WIDTH + 10} ${HEIGHT}"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(WIDTH, HEIGHT, 'FRANZININHO WiFi', '#0e5c2f')}
        <rect x="3" y="4" width="10" height="8" fill="#888" stroke="#555" stroke-width="0.15" />
        ${[
          ...edgeHeaderRow(LEFT, 'left', 3, 0, 4.4),
          ...edgeHeaderRow(RIGHT, 'right', 3, WIDTH, 4.4),
        ].map((p) => p.pin)}
      </svg>
    `;
  }
}
