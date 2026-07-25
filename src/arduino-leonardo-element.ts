import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { analog, ElementPin, GND, VCC, i2c } from './pin';

// Real Arduino Leonardo (Rev3) board artwork, sourced from
// paulvollmer.net/FritzingParts' "Arduino_Leonardo_Rev3(fix)" Fritzing
// part (breadboard view + connector pin data from its .fzp) - vendored
// into vecnode/wokwi-elements per an explicit user decision (2026-07-25)
// to use this community-maintained Fritzing part directly rather than
// redraw it, despite that site stating no explicit license text (a
// Fritzing/CC logo is shown, but no license terms are given anywhere on
// the page or site) - the same class of known, accepted, unresolved
// licensing gap as the Raspberry Pi Pico board art (see
// pi-pico-element.ts's own comment and the memory note on this), not an
// oversight. If this becomes a real problem later, the fix is
// straightforward: strip assets/arduino-leonardo-board.svg and redraw
// independently, since this file's actual pin *positions* are re-derived
// public datasheet fact either way (cross-checked against
// simulators/ArduinoCore-avr's own vendored variants/leonardo/
// pins_arduino.h, not just eyeballed off the SVG).
//
// Kept as a raw imported asset (assets/arduino-leonardo-board.svg), not
// redrawn as inline template literal paths the way most other elements
// here are, specifically so the vendored art stays byte-identical to the
// upstream source and any future licensing resolution (or upstream
// update) is a one-file swap, not a re-drawing job - same reasoning as
// pi-pico-element.ts.
import rawBoardSvg from './assets/arduino-leonardo-board.svg?raw';

// The real Arduino Uno-form-factor board width (68.6mm, the same
// footprint the Leonardo shares with the Uno/other R3-shaped boards) -
// the one external fact anchoring the scale below; board height is
// *derived* from the SVG's own aspect ratio rather than independently
// fixed to a separately-cited spec number, since preserving this
// specific artwork's own proportions matters more here than matching an
// external figure that might not agree with exactly how this SVG was
// drawn (their real board height is commonly cited as ~53.3mm - this
// works out to ~52.0mm, a normal small tolerance, not a bug).
const BOARD_WIDTH_MM = 68.6;
// The raw SVG's own viewBox (199.512 x 151.201, confirmed against its
// own width="199.512px" height="151.201px" attributes - a 1:1 px-to-
// viewBox-unit convention, unlike the Pico's board.svg which had a
// mismatched width/height baked into its root <svg> tag).
const RAW_VIEWBOX_WIDTH = 199.512;
const RAW_VIEWBOX_HEIGHT = 151.201;
const SVG_TO_MM_SCALE = BOARD_WIDTH_MM / RAW_VIEWBOX_WIDTH;
const BOARD_HEIGHT_MM = RAW_VIEWBOX_HEIGHT * SVG_TO_MM_SCALE;

// physicalsim's own canvas (web/shell/src/canvas/scene.ts's
// overlayPinMarkers()) positions each pin marker with pin.x/pin.y used
// directly as CSS px offsets into the rendered element, not this
// element's own SVG viewBox/mm units - see pi-pico-element.ts's own
// (much longer) comment on this for the full story of how getting this
// wrong looks like a subtly-misplaced-but-not-obviously-broken board.
// Built here correctly from the start: raw SVG-unit pin coordinates
// (from the Fritzing part's own connector<N>pin circle cx/cy) converted
// to mm (via SVG_TO_MM_SCALE above) then to CSS px (the standard 96px/
// 25.4mm conversion), not pasted through unconverted.
const CSS_MM_TO_PX = 96 / 25.4;
const SVG_UNIT_TO_PX = SVG_TO_MM_SCALE * CSS_MM_TO_PX;

// board.svg's own root <svg> tag is preceded by an XML declaration and
// DOCTYPE (unlike the Pico's board.svg) - stripped along with the <svg
// ...> wrapper tag itself (open+close), keeping only the inner path/
// group content, embedded directly into our own <svg viewBox="0 0
// 199.512 151.201"> below (the artwork's own native unit range, so no
// extra <g transform="scale(...)"> is needed the way pi-pico-
// element.ts's mismatched viewBox required - the SVG's own width="Nmm"/
// viewBox pairing does the mm-scaling on its own) - the same "inline SVG
// content, not a nested viewport" shape every other element in this
// library already uses (and the fix pi-pico-element.ts needed after
// shipping its own wrapper unstripped).
const boardArtwork = rawBoardSvg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

interface RawPin {
  name: string;
  x: number;
  y: number;
  signals: ElementPin['signals'];
}

// Real pin map, from the Fritzing part's own index.fzp <connector> names
// + breadboard.svg's own connector<N>pin circle coordinates (raw SVG
// units, converted to CSS px via SVG_UNIT_TO_PX below) - not eyeballed,
// extracted directly from the vendored files. D0-D13/A0-A5's port.bit
// signals cross-checked against simulators/ArduinoCore-avr's own
// variants/leonardo/pins_arduino.h (digital_pin_to_port_PGM/
// digital_pin_to_bit_mask_PGM), not re-derived from a different source
// than the one physicalsim's own toolchain will eventually compile
// against.
const PIN_TABLE_RAW: RawPin[] = [
  { name: 'D0', x: 185.111, y: 7.2, signals: [] }, // PD2, RX
  { name: 'D1', x: 177.912, y: 7.2, signals: [] }, // PD3, TX
  { name: 'D2', x: 170.712, y: 7.2, signals: [i2c('SDA')] }, // PD1
  { name: 'D3', x: 163.512, y: 7.2, signals: [i2c('SCL'), { type: 'pwm' }] }, // PD0
  { name: 'D4', x: 156.313, y: 7.2, signals: [analog(6)] }, // PD4
  { name: 'D5', x: 149.111, y: 7.2, signals: [{ type: 'pwm' }] }, // PC6
  { name: 'D6', x: 141.912, y: 7.2, signals: [analog(7), { type: 'pwm' }] }, // PD7
  { name: 'D7', x: 134.712, y: 7.2, signals: [] }, // PE6
  { name: 'D8', x: 123.192, y: 7.2, signals: [] }, // PB4
  { name: 'D9', x: 115.992, y: 7.2, signals: [{ type: 'pwm' }] }, // PB5
  { name: 'D10', x: 108.792, y: 7.2, signals: [{ type: 'pwm' }] }, // PB6
  { name: 'D11', x: 101.592, y: 7.2, signals: [{ type: 'pwm' }] }, // PB7
  { name: 'D12', x: 94.392, y: 7.2, signals: [] }, // PD6
  { name: 'D13', x: 87.192, y: 7.2, signals: [{ type: 'pwm' }] }, // PC7, onboard LED
  { name: 'GND.3', x: 79.992, y: 7.2, signals: [GND()] },
  { name: 'AREF', x: 72.792, y: 7.2, signals: [] },
  { name: 'SDA', x: 65.592, y: 7.2, signals: [i2c('SDA')] }, // same net as D2
  { name: 'SCL', x: 58.392, y: 7.2, signals: [i2c('SCL')] }, // same net as D3
  { name: 'NC', x: 84.312, y: 144, signals: [] },
  { name: 'IOREF', x: 91.512, y: 144, signals: [VCC(5)] },
  { name: 'RESET', x: 98.712, y: 144, signals: [] },
  { name: '3V3', x: 105.912, y: 144, signals: [VCC(3.3)] },
  { name: '5V', x: 113.111, y: 144, signals: [VCC(5)] },
  { name: 'GND.1', x: 120.313, y: 144, signals: [GND()] },
  { name: 'GND.2', x: 127.512, y: 144, signals: [GND()] },
  { name: 'VIN', x: 134.712, y: 144, signals: [VCC(9)] },
  { name: 'A0', x: 149.111, y: 144, signals: [analog(0)] }, // PF7
  { name: 'A1', x: 156.313, y: 144, signals: [analog(1)] }, // PF6
  { name: 'A2', x: 163.512, y: 144, signals: [analog(2)] }, // PF5
  { name: 'A3', x: 170.712, y: 144, signals: [analog(3)] }, // PF4
  { name: 'A4', x: 177.912, y: 144, signals: [analog(4), i2c('SDA')] }, // PF1
  { name: 'A5', x: 185.111, y: 144, signals: [analog(5), i2c('SCL')] }, // PF0
];

@customElement('wokwi-arduino-leonardo')
export class ArduinoLeonardoElement extends LitElement {
  readonly pinInfo: ElementPin[] = PIN_TABLE_RAW.map((pin) => ({
    name: pin.name,
    x: pin.x * SVG_UNIT_TO_PX,
    y: pin.y * SVG_UNIT_TO_PX,
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
        viewBox="0 0 ${RAW_VIEWBOX_WIDTH} ${RAW_VIEWBOX_HEIGHT}"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${unsafeSVG(boardArtwork)}
      </svg>
    `;
  }
}
