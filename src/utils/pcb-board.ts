import { svg, type TemplateResult } from 'lit';

/**
 * Shared "green PCB module" body - a rounded rectangle plus a title
 * silkscreened across it - used by every small breakout-board element in
 * this fork (bmp180, mfrc522, grove-oled-sh1107, max7219-matrix,
 * relay-module, tm1637-7segment, nokia-5110, a4988). Not vendored from
 * anywhere - same "original, not copied from Wokwi" precedent as
 * dip-chip.ts/capacitor-element.ts. Each element still draws its own
 * header pins (silkscreen + pads), since pin count/layout differs per
 * part - this only factors out the part every module has in common.
 */
export function pcbBody(
  width: number,
  height: number,
  title: string,
  color = '#1a6b3a',
  // Silkscreen text color - the light default reads on every dark PCB
  // color this fork otherwise uses, but a light-colored board (e.g. the
  // Nucleo family's white silkscreen) needs a dark override instead.
  textColor = '#e8f5ec',
  strokeColor = '#0c3a1e',
): TemplateResult {
  return svg`
    <rect x="0" y="0" width="${width}" height="${height}" rx="1" fill="${color}" stroke="${strokeColor}" stroke-width="0.2" />
    <text
      x="${width / 2}"
      y="${height / 2}"
      text-anchor="middle"
      dominant-baseline="middle"
      font-size="1.6"
      font-family="sans-serif"
      fill="${textColor}"
    >${title}</text>
  `;
}

/**
 * Lays out one row of evenly-spaced header pins along an edge, with
 * their pads just inside `edgeY`/`edgeX` and labels pointing outward -
 * used by the edge-header dev-board elements (franzininho-wifi, the two
 * Nucleo-32 boards, bluepill) for their two side headers. `side`
 * controls both which edge ('left'/'right', a vertical row) or
 * ('top'/'bottom', a horizontal row) and which way labels point.
 */
export function edgeHeaderRow(
  names: readonly string[],
  side: 'left' | 'right' | 'top' | 'bottom',
  start: number,
  fixedCoord: number,
  pitch: number,
): Array<{ name: string; x: number; y: number; pin: TemplateResult }> {
  const vertical = side === 'left' || side === 'right';
  const labelDir =
    side === 'left' ? 'left' : side === 'right' ? 'right' : side === 'top' ? 'up' : 'down';
  return names.map((name, i) => {
    const along = start + i * pitch;
    const x = vertical ? fixedCoord : along;
    const y = vertical ? along : fixedCoord;
    return { name, x, y, pin: headerPin(x, y, name, labelDir) };
  });
}

/** One header pin: a small pad + silkscreen label, at local (x, y), with the label drawn `labelOffset` mm away in `labelDir`. */
export function headerPin(
  x: number,
  y: number,
  label: string,
  labelDir: 'up' | 'down' | 'left' | 'right' = 'down',
): TemplateResult {
  const offsets = { up: [0, -1.6], down: [0, 2.4], left: [-1.6, 0.5], right: [1.6, 0.5] };
  const [dx, dy] = offsets[labelDir];
  const anchor = labelDir === 'left' ? 'end' : labelDir === 'right' ? 'start' : 'middle';
  return svg`
    <circle cx="${x}" cy="${y}" r="0.6" fill="#d4af37" />
    <circle cx="${x}" cy="${y}" r="0.3" fill="#3a3a3a" />
    <text
      x="${x + dx}"
      y="${y + dy}"
      text-anchor="${anchor}"
      font-size="1.1"
      font-family="sans-serif"
      fill="#e8f5ec"
    >${label}</text>
  `;
}
