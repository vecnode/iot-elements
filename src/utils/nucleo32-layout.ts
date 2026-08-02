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
