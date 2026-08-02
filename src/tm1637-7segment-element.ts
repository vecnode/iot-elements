import { html, LitElement, svg, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ElementPin, GND, VCC } from './pin';
import { headerPin, pcbBody } from './utils/pcb-board';

/**
 * TM1637-driven 4-digit 7-segment display module - the common small
 * breakout with just CLK/DIO/VCC/GND (the TM1637's own 2-wire protocol,
 * not standard I2C, so pin.ts's `i2c()` signal type doesn't apply). Not
 * vendored - see 74hc165-element.ts's doc comment for why.
 *
 * Segments are drawn as real seven-segment glyphs (segmentsFor() below),
 * not plain monospace text - a bare `<text>` character doesn't read as
 * "7-segment display" the way lit/unlit bar segments do, which is the
 * whole visual identity of this part.
 */
// a=top, b=upper-right, c=lower-right, d=bottom, e=lower-left,
// f=upper-left, g=middle - the standard seven-segment letter naming.
const DIGIT_SEGMENTS: Record<string, string> = {
  '0': 'abcdef',
  '1': 'bc',
  '2': 'abdeg',
  '3': 'abcdg',
  '4': 'bcfg',
  '5': 'acdfg',
  '6': 'acdefg',
  '7': 'abc',
  '8': 'abcdefg',
  '9': 'abcdfg',
  '-': 'g',
  ' ': '',
};

// One digit's segment endpoints, in a local W x H box - shared shape for
// every digit, only which segments render lit changes per character.
const W = 2.4;
const H = 4.2;
const SEGMENT_LINES: Record<string, [number, number, number, number]> = {
  a: [0.3, 0.15, W - 0.3, 0.15],
  g: [0.3, H / 2, W - 0.3, H / 2],
  d: [0.3, H - 0.15, W - 0.3, H - 0.15],
  f: [0.1, 0.3, 0.1, H / 2 - 0.15],
  b: [W - 0.1, 0.3, W - 0.1, H / 2 - 0.15],
  e: [0.1, H / 2 + 0.15, 0.1, H - 0.3],
  c: [W - 0.1, H / 2 + 0.15, W - 0.1, H - 0.3],
};

function digitGlyph(ch: string, x: number, y: number): TemplateResult {
  const lit = new Set(DIGIT_SEGMENTS[ch.toLowerCase()] ?? '');
  return svg`
    <g transform="translate(${x} ${y})" stroke-width="0.55" stroke-linecap="round">
      ${Object.entries(SEGMENT_LINES).map(
        ([seg, [x1, y1, x2, y2]]) => svg`
          <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${lit.has(seg) ? '#ff3b3b' : '#3a1414'}" />
        `,
      )}
    </g>
  `;
}

@customElement('iot-tm1637-7segment')
export class Tm1637SevenSegmentElement extends LitElement {
  /** Which of the 4 digits are lit - display-only, nothing drives it yet. */
  @property() text = '----';

  readonly pinInfo: ElementPin[] = [
    { name: 'CLK', x: 2, y: 16, number: 1, signals: [] },
    { name: 'DIO', x: 6, y: 16, number: 2, signals: [] },
    { name: 'VCC', x: 10, y: 16, number: 3, signals: [VCC(5)] },
    { name: 'GND', x: 14, y: 16, number: 4, signals: [GND()] },
  ];

  render() {
    const digits = (this.text + '    ').slice(0, 4).split('');
    return html`
      <svg
        width="16mm"
        height="16mm"
        version="1.1"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${pcbBody(16, 14, 'TM1637', '#1a1a2e')}
        <rect x="1" y="1" width="14" height="6.5" fill="#111" />
        ${digits.map((ch, i) => digitGlyph(ch, 1.7 + i * 3.3, 1.4))}
        <!-- the colon between digits 2 and 3, always lit - a real
             trait of these boards even when the driven value is blank. -->
        <circle cx="8.3" cy="3.3" r="0.22" fill="#ff3b3b" />
        <circle cx="8.3" cy="5.4" r="0.22" fill="#ff3b3b" />
        <g fill="#ccc">
          <rect x="1.85" y="14" width="0.3" height="2" />
          <rect x="5.85" y="14" width="0.3" height="2" />
          <rect x="9.85" y="14" width="0.3" height="2" />
          <rect x="13.85" y="14" width="0.3" height="2" />
        </g>
        ${headerPin(2, 16, 'CLK')} ${headerPin(6, 16, 'DIO')} ${headerPin(10, 16, 'VCC')}
        ${headerPin(14, 16, 'GND')}
      </svg>
    `;
  }
}
