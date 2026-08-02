import { css, html, LitElement, svg } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { analog, ElementPin, GND, VCC } from './pin';

// Real Raspberry Pi Pico board artwork, sourced from wokwi/wokwi-boards
// (boards/pi-pico/board.svg + board.json, Uri Shaked) - vendored into
// vecnode/wokwi-elements per an explicit user decision (2026-07-24) to
// use Wokwi's own official assets rather than redraw them, despite that
// repo shipping no LICENSE file (unlike avr8js/rp2040js/wokwi-elements
// itself, all clearly MIT). Kept as a raw imported asset
// (assets/pi-pico-board.svg / .json), not redrawn as inline template
// literal paths the way most other elements here are, specifically so
// the vendored art stays byte-identical to the upstream source and any
// future licensing resolution (or upstream update) is a one-file swap,
// not a re-drawing job.
//
// board.json's pin coordinates are in mm (its own `width`/`height`
// fields: 20.9 x 52.75), but board.svg's own viewBox (826.782 x
// 2086.626) is a different internal unit system - the wrapping <g
// transform="scale(...)"> below normalizes the pasted artwork down to
// the same mm-based viewBox convention every other element here uses
// (see potentiometer-element.ts's own `viewBox="0 0 20 20"`, 1 unit =
// 1mm), rather than rescaling every pin coordinate up into the
// artwork's native unit space.
import rawBoardSvg from './assets/pi-pico-board.svg?raw';

const BOARD_WIDTH_MM = 20.9;
const BOARD_HEIGHT_MM = 52.75;
// board.svg's own viewBox width (826.782) / BOARD_WIDTH_MM - confirmed
// consistent against the height axis too (2086.626 / 52.75 ~= same
// ratio, matching rounding in the original artwork's own units).
const SVG_TO_MM_SCALE = BOARD_WIDTH_MM / 826.782;

// board.svg's own root <svg> tag carries width="79" height="200" -
// unrelated to (much smaller than) its own viewBox="0 0 826.782
// 2086.626" (likely a leftover print/DPI-derived size from whatever
// tool exported it upstream). Pasting the raw file wholesale via
// unsafeSVG makes it a *nested* <svg>, and a nested <svg>'s explicit
// width/height set its own viewport size directly - so the board
// rendered at 79x200 (in the units *before* the SVG_TO_MM_SCALE
// wrapper below even applies), not at its viewBox's actual 826.782x
// 2086.626 extent, making the whole board tiny and badly proportioned
// while every pin coordinate above (measured against the real
// viewBox/mm layout from board.json) stayed correct - hence "SVG tiny,
// pins in the right real-world spot" rather than everything scaling
// together. Fix: strip the raw file's own <svg ...> wrapper tag
// (open+close) before embedding, so only its path/circle content goes
// into our own <g transform="scale(...)"> - the same "inline SVG
// content, not a nested viewport" shape every other element in this
// library already uses.
const boardArtwork = rawBoardSvg.replace(/^\s*<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

// physicalsim's own canvas (web/shell/src/canvas/scene.ts's
// overlayPinMarkers()) positions each pin marker with pin.x/pin.y used
// directly as CSS px offsets into the rendered element - not this
// element's own SVG viewBox/mm units. Every other board in this library
// already authors its own pinInfo in that convention (e.g. arduino-uno-
// element.ts's pin x values run ~0-270, matching its 72.58mm-wide SVG's
// *rendered* px size, well outside its own -4..68.58 viewBox range) -
// this element's pinInfo used to be pasted straight from board.json's
// raw millimeters instead, which only ever occupied a ~1.6-19.3px
// sliver near the left edge of the ~79px-wide rendered board (mm and
// "CSS px of a ~4x-larger rendered box" look deceptively similar in
// magnitude, which is why this went unnoticed at first - it's not that
// pins only rendered on the left, it's that *both* columns of raw-mm
// x-values landed inside what was still the left ~25% of the actual
// rendered width). Fix: keep the raw mm pin table (auditable 1:1
// against board.json) separate from the derived pinInfo the base class
// actually reads, and convert with the same CSS mm->px factor the
// browser itself uses for this element's width="Nmm"/height="Nmm" (the
// CSS spec fixes 1in = 96px = 25.4mm).
const CSS_MM_TO_PX = 96 / 25.4;

interface MmPin {
  name: string;
  x: number;
  y: number;
  signals: ElementPin['signals'];
}

// Real pin map, from board.json's own `pins` object (in mm, matching
// board.json's own `width`/`height`: 20.9 x 52.75) - GP0-GP22/GP26-GP28
// broken out on the header, plus power/ground/RUN/ADC_VREF. GP23-25 are
// deliberately not header-exposed on real hardware either (board.json's
// own "virtual pins" TP4/TP5 map to them - TP5/GPIO25 is the onboard
// LED, matching what physicalsim's own rp2040-blink example already
// uses).
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

@customElement('iot-pi-pico')
export class PiPicoElement extends LitElement {
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
