import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { ElementPin, GND, VCC, usart } from './pin';

// Real ESP32-CAM board artwork, sourced from wokwi/wokwi-boards
// (boards/esp32-cam/board.svg + board.json, Ariella Eliassaf) - same
// vendoring posture as pi-pico-w-element.ts / esp32-devkit-c-v4-element.ts.
// Same chip as esp32-devkit-v1-element.ts (ESP32-WROOM-32, Xtensa LX6);
// the OV2640 camera and onboard microSD slot are physically present but
// not emulated by esp32js - same "present on the board, not modeled" gap
// as the Pico W's WiFi chip. GPIO/LED pins work normally.
import rawBoardSvg from './assets/esp32-cam-board.svg?raw';

const BOARD_WIDTH_MM = 27.2;
const BOARD_HEIGHT_MM = 40.42;
// board.svg's own viewBox is already declared directly in mm
// (viewBox="0 0 27.199894 40.413876", width/height carry an explicit "mm"
// unit suffix too) - no DPI-derived mismatch to work around here, but
// SVG_TO_MM_SCALE is still computed generically from the raw viewBox
// rather than hardcoded to 1, matching every other vendored board here.
const RAW_VIEWBOX_WIDTH = 27.199894;
const RAW_VIEWBOX_HEIGHT = 40.413876;
const SVG_TO_MM_SCALE = BOARD_WIDTH_MM / RAW_VIEWBOX_WIDTH;

// Same nested-<svg>-viewport concern as every other vendored board here -
// stripped from the start regardless of how close this particular file's
// own width/height already are to its viewBox.
const boardArtwork = rawBoardSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

const CSS_MM_TO_PX = 96 / 25.4;

interface MmPin {
  name: string;
  x: number;
  y: number;
  signals: ElementPin['signals'];
}

// Real pin map, from board.json's own `pins` object - bare GPIO numbers,
// matching this board's own real silkscreen. GPIO0 (boot-mode strapping
// pin), GPIO2/GPIO4 (wired to the board's own onboard status/flash LEDs
// per board.json's internal `$gpio33`/`$gpio4` LED mappings - GPIO33 itself
// isn't header-exposed at all) and GPIO12-15 (also shared with the
// unemulated microSD slot's SD_MMC lines) are still drawn here since
// they're physically on the header, but callers should prefer GPIO12/13 or
// GPIO14/15 for simple digital I/O to avoid fighting the onboard LEDs.
const PIN_TABLE_MM: MmPin[] = [
  { name: '5V.1', x: 1.9, y: 4.95, signals: [VCC(5)] },
  { name: 'GND.1', x: 1.9, y: 7.49, signals: [GND()] },
  { name: '12', x: 1.9, y: 10.03, signals: [] },
  { name: '13', x: 1.9, y: 12.57, signals: [] },
  { name: '15', x: 1.9, y: 15.11, signals: [] },
  { name: '14', x: 1.9, y: 17.65, signals: [] },
  { name: '2', x: 1.9, y: 20.19, signals: [] },
  { name: '4', x: 1.9, y: 22.73, signals: [] },

  { name: '3V3', x: 24.76, y: 4.95, signals: [VCC(3.3)] },
  { name: '16', x: 24.76, y: 7.49, signals: [] },
  { name: '0', x: 24.76, y: 10.03, signals: [] },
  { name: 'GND.2', x: 24.76, y: 12.57, signals: [GND()] },
  { name: 'VCC', x: 24.76, y: 15.11, signals: [VCC(5)] },
  { name: 'RX', x: 24.76, y: 17.65, signals: [usart('RX', 0)] },
  { name: 'TX', x: 24.76, y: 20.19, signals: [usart('TX', 0)] },
  { name: 'GND.3', x: 24.76, y: 22.73, signals: [GND()] },
];

@customElement('wokwi-esp32-cam')
export class ESP32CamElement extends LitElement {
  readonly pinInfo: ElementPin[] = PIN_TABLE_MM.map((pin) => ({
    name: pin.name,
    x: pin.x * CSS_MM_TO_PX,
    y: pin.y * CSS_MM_TO_PX,
    signals: pin.signals,
  }));

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
    `;
  }

  render() {
    return html`
      <svg
        width="${BOARD_WIDTH_MM}mm"
        height="${BOARD_HEIGHT_MM}mm"
        viewBox="0 0 ${BOARD_WIDTH_MM} ${BOARD_HEIGHT_MM}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="scale(${SVG_TO_MM_SCALE})">${unsafeSVG(boardArtwork)}</g>
      </svg>
    `;
  }
}
