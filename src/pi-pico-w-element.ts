import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { analog, ElementPin, GND, VCC } from './pin';

// Real Raspberry Pi Pico W board artwork, sourced from wokwi/wokwi-boards
// (boards/pi-pico-w/board.svg + board.json, Ariella Eliassaf) - same
// vendoring posture as pi-pico-element.ts (an explicit user decision to
// use Wokwi's own official assets despite that repo shipping no LICENSE
// file - see the memory note on this, a known, accepted, unresolved
// licensing gap, not an oversight).
//
// Same board footprint/pinout as the plain Pico (board.json's own
// width/height: 20.9 x 52.75, identical GP0-GP22/GP26-GP28 physical pin
// table) - the only real hardware difference is the CYW43439 WiFi+
// Bluetooth chip, which this project doesn't emulate (see rp2040js's own
// scope - RP2040-only, no wireless peripheral at all). Per an explicit
// user decision (2026-07-25): "not emulated for now, just works like the
// normal Pico" - this board is placeable and wired exactly like
// pi-pico-element.ts, with no WiFi-specific behavior modeled. One real
// difference worth knowing: the physical Pico W's onboard LED is wired
// through the WiFi chip's own GPIO0 (WL_GPIO0), not a plain RP2040 GPIO
// the way the non-W Pico's GP25 is - board.json's own pin table doesn't
// expose GP25 at all for this reason. Not modeled here either (an
// honest, minor gap - this board simply has no onboard-LED pin alias,
// same as it has none on the real hardware's own header).
import rawBoardSvg from './assets/pi-pico-w-board.svg?raw';

const BOARD_WIDTH_MM = 20.9;
const BOARD_HEIGHT_MM = 52.75;
// board.svg's own viewBox (confirmed against its own width/height
// attributes below being a mismatched, unrelated print/DPI-derived
// size - see boardArtwork's own comment for why that matters).
const RAW_VIEWBOX_WIDTH = 826.78;
const RAW_VIEWBOX_HEIGHT = 2086.6;
const SVG_TO_MM_SCALE = BOARD_WIDTH_MM / RAW_VIEWBOX_WIDTH;

// board.svg's own root <svg> tag carries width="79.371" height="200.32" -
// unrelated to (much smaller than) its own viewBox="0 0 826.78 2086.6",
// the exact same nested-<svg>-viewport bug pi-pico-element.ts's own
// comment documents in more detail (and originally shipped unfixed,
// then fixed 2026-07-25) - fixed here from the start by stripping the
// raw file's own <svg ...> wrapper tag before embedding, keeping only
// its inner path/group content.
const boardArtwork = rawBoardSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

// physicalsim's own canvas (web/shell/src/canvas/scene.ts's
// overlayPinMarkers()) positions each pin marker with pin.x/pin.y used
// directly as CSS px offsets into the rendered element, not this
// element's own SVG viewBox/mm units - see pi-pico-element.ts's own
// (longer) comment on this for the full story. Built correctly here
// from the start.
const CSS_MM_TO_PX = 96 / 25.4;

interface MmPin {
  name: string;
  x: number;
  y: number;
  signals: ElementPin['signals'];
}

// Real pin map, from board.json's own `pins` object - identical
// GP0-GP22/GP26-GP28 physical layout to the plain Pico (confirmed
// directly against both boards' own board.json, not assumed from form
// factor alone). GP23-25 aren't header-exposed on real hardware, same
// as the plain Pico - see this file's own top comment for why GP25
// specifically has no onboard-LED meaning on this board.
const PIN_TABLE_MM: MmPin[] = [
  { name: 'GP0', x: 1.6, y: 3.4, signals: [] },
  { name: 'GP1', x: 1.6, y: 5.94, signals: [] },
  { name: 'GND.1', x: 1.6, y: 8.48, signals: [GND()] },
  { name: 'GP2', x: 1.6, y: 11.02, signals: [] },
  { name: 'GP3', x: 1.6, y: 13.56, signals: [] },
  { name: 'GP4', x: 1.6, y: 16.1, signals: [] },
  { name: 'GP5', x: 1.6, y: 18.64, signals: [] },
  { name: 'GND.2', x: 1.6, y: 21.18, signals: [GND()] },
  { name: 'GP6', x: 1.6, y: 23.72, signals: [] },
  { name: 'GP7', x: 1.6, y: 26.26, signals: [] },
  { name: 'GP8', x: 1.6, y: 28.8, signals: [] },
  { name: 'GP9', x: 1.6, y: 31.34, signals: [] },
  { name: 'GND.3', x: 1.6, y: 33.88, signals: [GND()] },
  { name: 'GP10', x: 1.6, y: 36.42, signals: [] },
  { name: 'GP11', x: 1.6, y: 38.96, signals: [] },
  { name: 'GP12', x: 1.6, y: 41.49, signals: [] },
  { name: 'GP13', x: 1.6, y: 44.03, signals: [] },
  { name: 'GND.4', x: 1.6, y: 46.57, signals: [GND()] },
  { name: 'GP14', x: 1.6, y: 49.11, signals: [] },
  { name: 'GP15', x: 1.6, y: 51.65, signals: [] },
  { name: 'GP16', x: 19.3, y: 51.65, signals: [] },
  { name: 'GP17', x: 19.3, y: 49.11, signals: [] },
  { name: 'GND.5', x: 19.3, y: 46.57, signals: [GND()] },
  { name: 'GP18', x: 19.3, y: 44.03, signals: [] },
  { name: 'GP19', x: 19.3, y: 41.49, signals: [] },
  { name: 'GP20', x: 19.3, y: 38.96, signals: [] },
  { name: 'GP21', x: 19.3, y: 36.42, signals: [] },
  { name: 'GND.6', x: 19.3, y: 33.88, signals: [GND()] },
  { name: 'GP22', x: 19.3, y: 31.34, signals: [] },
  { name: 'RUN', x: 19.3, y: 28.8, signals: [] },
  { name: 'GP26', x: 19.3, y: 26.26, signals: [analog(0)] },
  { name: 'GP27', x: 19.3, y: 23.72, signals: [analog(1)] },
  { name: 'GND.7', x: 19.3, y: 21.18, signals: [GND()] },
  { name: 'GP28', x: 19.3, y: 18.64, signals: [analog(2)] },
  { name: 'ADC_VREF', x: 19.3, y: 16.1, signals: [] },
  { name: '3V3', x: 19.3, y: 13.56, signals: [VCC(3.3)] },
  { name: '3V3_EN', x: 19.3, y: 11.02, signals: [] },
  { name: 'GND.8', x: 19.3, y: 8.48, signals: [GND()] },
  { name: 'VSYS', x: 19.3, y: 5.94, signals: [VCC(3.3)] },
  { name: 'VBUS', x: 19.3, y: 3.4, signals: [VCC(5)] },
];

@customElement('iot-pi-pico-w')
export class PiPicoWElement extends LitElement {
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
