import { svg, type TemplateResult } from 'lit';
import { GND, VCC, type ElementPin } from '../pin';
import { edgeHeaderRow } from './pcb-board';

/**
 * Shared Arduino-Nano-compatible header layout for the Nucleo-32 board
 * family (STM32's own documented form factor - every Nucleo-32 board,
 * regardless of which STM32 it carries, ships the same CN3/CN4 header
 * pinout so Nano shields fit any of them). Used by both
 * nucleo-c031c6-element.ts and nucleo-l031k6-element.ts, which differ
 * only in their silkscreened chip name - not vendored, see
 * 74hc165-element.ts's doc comment for why.
 */
const LEFT = ['D13', 'D12', 'D11', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2'];
const RIGHT = ['VIN', 'GND', '5V', 'RESET', '3V3', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'];

export const NUCLEO32_WIDTH = 18;
export const NUCLEO32_HEIGHT = 43;

export function nucleo32Pins(): ElementPin[] {
  const left = edgeHeaderRow(LEFT, 'left', 3, 0, 3.3);
  const right = edgeHeaderRow(RIGHT, 'right', 2, NUCLEO32_WIDTH, 3.1);
  return [...left, ...right].map(({ name, x, y }, i) => ({
    name,
    x,
    y,
    number: i + 1,
    signals:
      name === 'GND'
        ? [GND()]
        : name === '3V3'
          ? [VCC(3.3)]
          : name === '5V' || name === 'VIN'
            ? [VCC(5)]
            : [],
  }));
}

export function nucleo32Pads() {
  return [
    ...edgeHeaderRow(LEFT, 'left', 3, 0, 3.3),
    ...edgeHeaderRow(RIGHT, 'right', 2, NUCLEO32_WIDTH, 3.1),
  ];
}

/**
 * Board-body decorations shared by both Nucleo-32 boards (identical on
 * both real boards - only the silkscreened chip name differs, drawn
 * separately by each element via `pcbBody`'s `title`): the micro-USB
 * connector on the short top edge, the black STM32 QFN package, a green
 * power LED, and the single black user/reset tact button - the
 * landmarks that make the silhouette read as "a Nucleo-32" rather than
 * a plain slab. Passed as `pcbBody`'s `extra` so all of this draws
 * *underneath* the silkscreened title text instead of covering it.
 */
export function nucleo32Body(): TemplateResult {
  return svg`
    <rect x="0" y="0" width="${NUCLEO32_WIDTH}" height="2.2" fill="#0a3a6b" />
    <rect
      x="${NUCLEO32_WIDTH / 2 - 3.2}"
      y="-1.4"
      width="6.4"
      height="3"
      rx="0.4"
      fill="#c8c8c8"
      stroke="#7a7a7a"
      stroke-width="0.15"
    />
    <rect x="5" y="16" width="8" height="8" fill="#1a1a1a" stroke="#000" stroke-width="0.15" />
    <circle cx="${NUCLEO32_WIDTH - 2.5}" cy="2.8" r="0.7" fill="#2ecc71" />
    <rect
      x="${NUCLEO32_WIDTH - 5.4}"
      y="27"
      width="2.4"
      height="2.4"
      rx="0.3"
      fill="#111"
      stroke="#000"
      stroke-width="0.1"
    />
  `;
}
