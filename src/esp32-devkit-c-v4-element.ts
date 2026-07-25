import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { ElementPin, GND, VCC, usart } from './pin';

// Real ESP32 DevKit C V4 board artwork, sourced from wokwi/wokwi-boards
// (boards/esp32-devkit-c-v4/board.svg + board.json, Marc Endtricht) - same
// vendoring posture as pi-pico-w-element.ts (an explicit user decision to
// use Wokwi's own official assets despite that repo shipping no LICENSE
// file), same chip as esp32-devkit-v1-element.ts (ESP32-WROOM-32, Xtensa
// LX6) but that element was hand-drawn from scratch rather than vendored -
// this one follows the Pico/Pico W vendoring pattern instead, per an
// explicit user decision (2026-07-25) to vendor real upstream artwork for
// this addition.
import rawBoardSvg from './assets/esp32-devkit-c-v4-board.svg?raw';

const BOARD_WIDTH_MM = 27.9;
const BOARD_HEIGHT_MM = 56.628;
// board.svg's own viewBox (confirmed against its own width/height
// attributes below being a mismatched, unrelated print/DPI-derived size -
// see boardArtwork's own comment for why that matters). Unlike the Pico's
// vendored artwork, this one's viewBox already happens to be ~mm-scale
// (0 0 27.9 56.6), so SVG_TO_MM_SCALE below comes out very close to 1 - but
// it's still computed generically rather than assumed, same as every other
// vendored board here.
const RAW_VIEWBOX_WIDTH = 27.9;
const RAW_VIEWBOX_HEIGHT = 56.6;
const SVG_TO_MM_SCALE = BOARD_WIDTH_MM / RAW_VIEWBOX_WIDTH;

// board.svg's own root <svg> tag carries width="105.4" height="214" -
// unrelated to (a fixed DPI multiple of) its own viewBox="0 0 27.9 56.6",
// the same nested-<svg>-viewport bug pi-pico-element.ts's own comment
// documents in more detail. Fixed here from the start by stripping the raw
// file's own <svg ...> wrapper tag before embedding, keeping only its
// inner path/group content.
const boardArtwork = rawBoardSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

// physicalsim's own canvas (web/shell/src/canvas/scene.ts's
// overlayPinMarkers()) positions each pin marker with pin.x/pin.y used
// directly as CSS px offsets into the rendered element, not this element's
// own SVG viewBox/mm units - see pi-pico-element.ts's own (longer) comment
// on this for the full story. Built correctly here from the start.
const CSS_MM_TO_PX = 96 / 25.4;

interface MmPin {
  name: string;
  x: number;
  y: number;
  signals: ElementPin['signals'];
}

// Real pin map, from board.json's own `pins` object - bare GPIO numbers
// (this board's own real silkscreen, unlike esp32-devkit-v1-element.ts's
// hand-picked "D<n>" convention). CMD/CLK/D0-D3 are the SPI-flash pins
// (GPIO6-11 per board.json's own `target` field) - physically broken out
// on this devkit's header but not safe general-purpose GPIO (the onboard
// flash chip uses them), so kept off web/common/src/boards/
// esp32-devkit-c-v4.ts's wireable pin map even though they're drawn here.
const PIN_TABLE_MM: MmPin[] = [
  { name: '3V3', x: 1.22, y: 7.62, signals: [VCC(3.3)] },
  { name: 'EN', x: 1.22, y: 10.16, signals: [] },
  { name: 'VP', x: 1.22, y: 12.7, signals: [] },
  { name: 'VN', x: 1.22, y: 15.24, signals: [] },
  { name: '34', x: 1.22, y: 17.78, signals: [] },
  { name: '35', x: 1.22, y: 20.32, signals: [] },
  { name: '32', x: 1.22, y: 22.86, signals: [] },
  { name: '33', x: 1.22, y: 25.4, signals: [] },
  { name: '25', x: 1.22, y: 27.94, signals: [] },
  { name: '26', x: 1.22, y: 30.48, signals: [] },
  { name: '27', x: 1.22, y: 33.02, signals: [] },
  { name: '14', x: 1.22, y: 35.56, signals: [] },
  { name: '12', x: 1.22, y: 38.1, signals: [] },
  { name: 'GND.1', x: 1.22, y: 40.64, signals: [GND()] },
  { name: '13', x: 1.22, y: 43.18, signals: [] },
  { name: 'D2', x: 1.22, y: 45.72, signals: [] },
  { name: 'D3', x: 1.22, y: 48.26, signals: [] },
  { name: 'CMD', x: 1.22, y: 50.8, signals: [] },
  { name: '5V', x: 1.22, y: 53.34, signals: [VCC(5)] },

  { name: 'GND.2', x: 26.66, y: 7.62, signals: [GND()] },
  { name: '23', x: 26.66, y: 10.16, signals: [] },
  { name: '22', x: 26.66, y: 12.7, signals: [] },
  { name: 'TX', x: 26.66, y: 15.24, signals: [usart('TX', 0)] },
  { name: 'RX', x: 26.66, y: 17.78, signals: [usart('RX', 0)] },
  { name: '21', x: 26.66, y: 20.32, signals: [] },
  { name: 'GND.3', x: 26.66, y: 22.86, signals: [GND()] },
  { name: '19', x: 26.66, y: 25.4, signals: [] },
  { name: '18', x: 26.66, y: 27.94, signals: [] },
  { name: '5', x: 26.66, y: 30.48, signals: [] },
  { name: '17', x: 26.66, y: 33.02, signals: [] },
  { name: '16', x: 26.66, y: 35.56, signals: [] },
  { name: '4', x: 26.66, y: 38.1, signals: [] },
  { name: '0', x: 26.66, y: 40.64, signals: [] },
  { name: '2', x: 26.66, y: 43.18, signals: [] },
  { name: '15', x: 26.66, y: 45.72, signals: [] },
  { name: 'D1', x: 26.66, y: 48.26, signals: [] },
  { name: 'D0', x: 26.66, y: 50.8, signals: [] },
  { name: 'CLK', x: 26.66, y: 53.34, signals: [] },
];

@customElement('wokwi-esp32-devkit-c-v4')
export class ESP32DevkitCV4Element extends LitElement {
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
