import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GND, VCC, type ElementPin } from './pin';
import { edgeHeaderRow, pcbBody } from './utils/pcb-board';

/**
 * STM32 "Blue Pill" (STM32F103C8T6), the well-known 2x20-header dev
 * board - pin names below match the board's own real silkscreen.
 * Visual/wireable only, no simulated core (this fork has no STM32
 * adapter). Not vendored - see 74hc165-element.ts's doc comment for why.
 */
const LEFT = [
  'B12',
  'B13',
  'B14',
  'B15',
  'A8',
  'A9',
  'A10',
  'A11',
  'A12',
  'A15',
  'B3',
  'B4',
  'B5',
  'B6',
  'B7',
  'B8',
  'B9',
  '5V',
  'GND',
  '3V3',
];
const RIGHT = [
  'GND',
  'VBAT',
  'C13',
  'C14',
  'C15',
  'A0',
  'A1',
  'A2',
  'A3',
  'A4',
  'A5',
  'A6',
  'A7',
  'B0',
  'B1',
  'B10',
  'B11',
  'GND',
  '3V3',
];

const WIDTH = 23;
const HEIGHT = 52;

@customElement('wokwi-stm32-bluepill')
export class Stm32BluepillElement extends LitElement {
  readonly pinInfo: ElementPin[] = [
    ...edgeHeaderRow(LEFT, 'left', 1.3, 0, 2.54),
    ...edgeHeaderRow(RIGHT, 'right', 1.3, WIDTH, 2.54),
  ].map(({ name, x, y }, i) => ({
    name,
    x,
    y,
    number: i + 1,
    signals:
      name === 'GND'
        ? [GND()]
        : name === '3V3'
          ? [VCC(3.3)]
          : name === '5V' || name === 'VBAT'
            ? [VCC()]
            : [],
  }));

  render() {
    return html`
      <svg
        width="${WIDTH + 12}mm"
        height="${HEIGHT + 2}mm"
        version="1.1"
        viewBox="-6 -1 ${WIDTH + 12} ${HEIGHT + 2}"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(WIDTH, HEIGHT, 'STM32F103C8T6', '#0a3a6b')}
        <rect
          x="${WIDTH / 2 - 5}"
          y="18"
          width="10"
          height="10"
          fill="#1a1a1a"
          stroke="#000"
          stroke-width="0.15"
        />
        ${[
          ...edgeHeaderRow(LEFT, 'left', 1.3, 0, 2.54),
          ...edgeHeaderRow(RIGHT, 'right', 1.3, WIDTH, 2.54),
        ].map((p) => p.pin)}
      </svg>
    `;
  }
}
