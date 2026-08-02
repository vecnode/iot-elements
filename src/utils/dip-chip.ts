import { svg, type TemplateResult } from 'lit';

/**
 * Shared "black DIP package" body for through-hole ICs with pins on both
 * long sides - standard 2.54mm (0.1") pin pitch, 7.62mm (300mil) row
 * spacing, the real-world spacing every part using this (74hc165,
 * 74hc595, nlsf595, attiny85) actually has on its datasheet. Not vendored
 * from anywhere - neither upstream wokwi/wokwi-elements nor this fork
 * ships a generic chip-body helper (only bespoke per-part SVGs), so this
 * is original, added so each DIP part's own element file only has to
 * define its pin *names*, not repeat the package geometry. Same
 * "small, original element, not vendored from Wokwi" precedent as
 * capacitor-element.ts.
 */
export const DIP_PITCH = 2.54;
export const DIP_ROW_SPACING = 7.62;
const TOP_MARGIN = 3.81; // 1.5 * pitch, centers pin 1's row inside the notch end
const LEAD_LENGTH = 2;

/** Y offset of the i-th pin down one side of the package (0-indexed). */
export function dipPinY(index: number): number {
  return TOP_MARGIN + index * DIP_PITCH;
}

export function dipHeight(pinsPerSide: number): number {
  return dipPinY(pinsPerSide - 1) + TOP_MARGIN;
}

/** `viewBox` string covering the body plus both sides' leads, with a small margin. */
export function dipViewBox(pinsPerSide: number): string {
  const height = dipHeight(pinsPerSide);
  const totalWidth = DIP_ROW_SPACING + 2 * LEAD_LENGTH + 2;
  return `-${LEAD_LENGTH + 1} -1 ${totalWidth} ${height + 2}`;
}

/** Physical `width`/`height` (mm) for the `<svg>` tag, matching dipViewBox(). */
export function dipSvgSize(pinsPerSide: number): { width: number; height: number } {
  const height = dipHeight(pinsPerSide);
  const totalWidth = DIP_ROW_SPACING + 2 * LEAD_LENGTH + 2;
  return { width: totalWidth, height: height + 2 };
}

/**
 * DIP pin numbering convention: pin 1 at the top-left (next to the
 * notch), numbering down the left side, then back up the right side -
 * e.g. for a 16-pin part, pins 1-8 run top-to-bottom on the left, 9-16
 * bottom-to-top on the right. Returns `{ x, y }` pairs indexed 0..N-1
 * for pin numbers 1..N, in the body's own local coordinate space (leads
 * extend to negative-x on the left, width+LEAD_LENGTH on the right).
 */
export function dipPinPositions(pinsPerSide: number): Array<{ x: number; y: number }> {
  const positions: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < pinsPerSide; i++) {
    positions.push({ x: -LEAD_LENGTH, y: dipPinY(i) });
  }
  for (let i = pinsPerSide - 1; i >= 0; i--) {
    positions.push({ x: DIP_ROW_SPACING + LEAD_LENGTH, y: dipPinY(i) });
  }
  return positions;
}

/** The package body + leads + notch + rotated label - no pin markers (the host element's own pinInfo/pin-marker layer draws those). */
export function dipBody(pinsPerSide: number, label: string): TemplateResult {
  const height = dipHeight(pinsPerSide);
  const width = DIP_ROW_SPACING;
  const positions = dipPinPositions(pinsPerSide);
  return svg`
    <g fill="#ccc">
      ${positions.map(
        (p) =>
          svg`<rect x="${p.x < 0 ? p.x : width}" y="${p.y - 0.35}" width="${LEAD_LENGTH}" height="0.7" />`,
      )}
    </g>
    <rect x="0" y="0" width="${width}" height="${height}" rx="0.6" fill="#211f1f" stroke="#050505" stroke-width="0.15" />
    <path d="M ${width / 2 - 1} 0 a 1 1 0 0 0 2 0 Z" fill="#050505" />
    <text
      x="${width / 2}"
      y="0"
      text-anchor="middle"
      font-size="1.5"
      font-family="sans-serif"
      fill="#ddd"
      transform="rotate(90 ${width / 2} ${height / 2}) translate(0 ${height / 2 + 0.5})"
    >${label}</text>
  `;
}
