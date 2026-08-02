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

@customElement('iot-stm32-bluepill')
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
        <!-- Real Blue Pill boards are a distinctly saturated, brighter
             blue than a generic "dark PCB" navy - #1959c9 reads closer
             to that at a glance than the fork's original #0a3a6b. -->
        ${pcbBody(WIDTH, HEIGHT, 'STM32F103C8T6', '#1959c9')}
        <!-- micro-USB connector, silver shell on the short top edge -
             the board's own power/programming port. -->
        <rect
          x="${WIDTH / 2 - 3.5}"
          y="-1.6"
          width="7"
          height="3.6"
          rx="0.4"
          fill="#c8c8c8"
          stroke="#7a7a7a"
          stroke-width="0.15"
        />
        <!-- the black 48-pin LQFP STM32F103C8T6 itself, centered. -->
        <rect
          x="${WIDTH / 2 - 5}"
          y="18"
          width="10"
          height="10"
          fill="#1a1a1a"
          stroke="#000"
          stroke-width="0.15"
        />
        <!-- small reset tact button next to the USB connector, and the
             power LED next to it - both real, easily-spotted landmarks
             on the board. -->
        <rect x="${WIDTH - 5}" y="1" width="3" height="3" rx="0.4" fill="#111" />
        <circle cx="${WIDTH - 8}" cy="2.5" r="0.8" fill="#e04b4b" />
        ${[
          ...edgeHeaderRow(LEFT, 'left', 1.3, 0, 2.54),
          ...edgeHeaderRow(RIGHT, 'right', 1.3, WIDTH, 2.54),
        ].map((p) => p.pin)}
      </svg>
    `;
  }
}
