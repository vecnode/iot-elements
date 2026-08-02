import { html, LitElement, svg, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementPin, GND, VCC } from './pin';
import { mmToPix } from './utils/units';

/**
 * A half-size (30-column) solderless breadboard - not vendored from
 * upstream wokwi/wokwi-elements (breadboards are part of Wokwi's own
 * closed-source diagram editor/renderer, not the open element
 * library), so this is an original element, same "small, original, not
 * copied from Wokwi" precedent as capacitor-element.ts/74hc165-element.ts.
 *
 * Pin naming follows pin.ts's "same prefix + dot + unique suffix = same
 * net" convention:
 *  - Each column's 5-hole terminal strip (rows a-e above the center
 *    channel, f-j below it) shares one prefix - `{col}t` / `{col}b` -
 *    so the 5 holes in a strip are electrically one node, exactly like
 *    a real breadboard's internal metal clips.
 *  - Each power rail runs the *entire* length of the board as a single
 *    node, so all of its pins share one prefix regardless of column -
 *    `tp`/`tn` (top +/-) and `bp`/`bn` (bottom +/-). This is what lets
 *    two LEDs sharing a ground rail actually share a net in physicalsim
 *    without the host needing any breadboard-specific wiring logic -
 *    the same name-prefix rule already applies to every element's
 *    multi-pin nets (see e.g. arduino-leonardo-element.ts's `GND.3`).
 */
const PITCH = 2.54;
const COLUMNS = 30;
const GROUP_SIZE = 5;
const GROUP_GAP = 1.3;

const RAIL_TOP_NEG_Y = 2;
const RAIL_TOP_POS_Y = RAIL_TOP_NEG_Y + PITCH;
const ROW_A_Y = RAIL_TOP_POS_Y + PITCH * 1.5;
const ROW_E_Y = ROW_A_Y + PITCH * 4;
const ROW_F_Y = ROW_E_Y + PITCH * 3; // center component channel
const ROW_J_Y = ROW_F_Y + PITCH * 4;
const RAIL_BOTTOM_POS_Y = ROW_J_Y + PITCH * 1.5;
const RAIL_BOTTOM_NEG_Y = RAIL_BOTTOM_POS_Y + PITCH;

const BOARD_WIDTH = COLUMNS * PITCH + Math.floor((COLUMNS - 1) / GROUP_SIZE) * GROUP_GAP + PITCH;
const BOARD_HEIGHT = RAIL_BOTTOM_NEG_Y + 2;

const TOP_ROWS = ['a', 'b', 'c', 'd', 'e'] as const;
const BOTTOM_ROWS = ['f', 'g', 'h', 'i', 'j'] as const;

function colX(col: number): number {
  return col * PITCH + Math.floor((col - 1) / GROUP_SIZE) * GROUP_GAP;
}

// pinInfo coordinates are consumed as plain CSS pixels of the rendered
// element by physicalsim's marker overlay (confirmed against
// utils/show-pins-element.ts's own reference overlay, which has no
// viewBox and uses pin.x/pin.y directly as CSS px) - since this
// element's own SVG is authored and drawn in mm (matching its viewBox,
// for readable geometry math above), every pinInfo coordinate needs the
// same mm-to-CSS-px factor (mmToPix, 1mm = 3.78px at 96dpi) the render
// itself gets from its `width="...mm"` attribute, or a placed board's
// pin markers land bunched into a fraction of its actual rendered size
// instead of tracking the real holes.
function terminalPins(): ElementPin[] {
  const pins: ElementPin[] = [];
  for (let col = 1; col <= COLUMNS; col++) {
    const x = colX(col) * mmToPix;
    TOP_ROWS.forEach((row, i) => {
      pins.push({ name: `${col}t.${row}`, x, y: (ROW_A_Y + i * PITCH) * mmToPix, signals: [] });
    });
    BOTTOM_ROWS.forEach((row, i) => {
      pins.push({ name: `${col}b.${row}`, x, y: (ROW_F_Y + i * PITCH) * mmToPix, signals: [] });
    });
  }
  return pins;
}

function railPins(): ElementPin[] {
  const pins: ElementPin[] = [];
  for (let col = 1; col <= COLUMNS; col++) {
    const x = colX(col) * mmToPix;
    pins.push({ name: `tn.${col}`, x, y: RAIL_TOP_NEG_Y * mmToPix, signals: [GND()] });
    pins.push({ name: `tp.${col}`, x, y: RAIL_TOP_POS_Y * mmToPix, signals: [VCC()] });
    pins.push({ name: `bp.${col}`, x, y: RAIL_BOTTOM_POS_Y * mmToPix, signals: [VCC()] });
    pins.push({ name: `bn.${col}`, x, y: RAIL_BOTTOM_NEG_Y * mmToPix, signals: [GND()] });
  }
  return pins;
}

function hole(x: number, y: number): TemplateResult {
  return svg`<circle cx="${x}" cy="${y}" r="0.4" fill="#fff" stroke="#8a8a8a" stroke-width="0.15" />`;
}

@customElement('iot-breadboard-half')
export class BreadboardHalfElement extends LitElement {
  readonly pinInfo: ElementPin[] = [...railPins(), ...terminalPins()];

  render() {
    return html`
      <svg
        width="${BOARD_WIDTH}mm"
        height="${BOARD_HEIGHT}mm"
        version="1.1"
        viewBox="0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          y="0"
          width="${BOARD_WIDTH}"
          height="${BOARD_HEIGHT}"
          rx="1.5"
          fill="#f4f2ea"
          stroke="#c9c6ba"
          stroke-width="0.2"
        />
        <!-- power rail polarity lines - blue (-) on the outer edge, red
             (+) toward the main terminal strips, mirrored top/bottom. -->
        <line
          x1="2"
          x2="${BOARD_WIDTH - 2}"
          y1="${RAIL_TOP_NEG_Y - 0.9}"
          y2="${RAIL_TOP_NEG_Y - 0.9}"
          stroke="#2b6bd1"
          stroke-width="0.25"
        />
        <line
          x1="2"
          x2="${BOARD_WIDTH - 2}"
          y1="${RAIL_TOP_POS_Y + 0.9}"
          y2="${RAIL_TOP_POS_Y + 0.9}"
          stroke="#d13a2b"
          stroke-width="0.25"
        />
        <line
          x1="2"
          x2="${BOARD_WIDTH - 2}"
          y1="${RAIL_BOTTOM_POS_Y - 0.9}"
          y2="${RAIL_BOTTOM_POS_Y - 0.9}"
          stroke="#d13a2b"
          stroke-width="0.25"
        />
        <line
          x1="2"
          x2="${BOARD_WIDTH - 2}"
          y1="${RAIL_BOTTOM_NEG_Y + 0.9}"
          y2="${RAIL_BOTTOM_NEG_Y + 0.9}"
          stroke="#2b6bd1"
          stroke-width="0.25"
        />
        <!-- center component channel, wide enough to straddle a DIP chip. -->
        <rect
          x="0"
          y="${ROW_E_Y + PITCH * 0.6}"
          width="${BOARD_WIDTH}"
          height="${ROW_F_Y - ROW_E_Y - PITCH * 1.2}"
          fill="#eae7dc"
        />
        ${Array.from({ length: COLUMNS }, (_, i) => i + 1).map((col) => {
          const x = colX(col);
          return svg`
            ${hole(x, RAIL_TOP_NEG_Y)}
            ${hole(x, RAIL_TOP_POS_Y)}
            ${TOP_ROWS.map((_, i) => hole(x, ROW_A_Y + i * PITCH))}
            ${BOTTOM_ROWS.map((_, i) => hole(x, ROW_F_Y + i * PITCH))}
            ${hole(x, RAIL_BOTTOM_POS_Y)}
            ${hole(x, RAIL_BOTTOM_NEG_Y)}
          `;
        })}
      </svg>
    `;
  }
}
