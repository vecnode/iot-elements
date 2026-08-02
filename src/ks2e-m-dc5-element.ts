import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ElementPin } from './pin';

const y1Pos = 5.1;
const y2Pos = 32.7;
const x1Pos = 5.5;
const x2Pos = 25;
const x3Pos = 45;
const x4Pos = 74;

@customElement('iot-ks2e-m-dc5')
export class KS2EMDC5Element extends LitElement {
  // Energized indicator (coil driven) - same property name/shape as
  // LEDElement's own `value`, so this can be driven by the exact same
  // generic "read" role code the signal chain already has for LEDs (no
  // relay-specific code needed there). Defaults to false, matching this
  // element's only appearance before this property existed - the glow
  // below is purely additive, nothing existing was changed to add it.
  @property() value = false;

  readonly pinInfo: ElementPin[] = [
    { name: 'NO2', x: x1Pos, y: y1Pos, signals: [], number: 8 },
    { name: 'NC2', x: x2Pos, y: y1Pos, signals: [], number: 6 },
    { name: 'P2', x: x3Pos, y: y1Pos, signals: [], number: 4 },
    { name: 'COIL2', x: x4Pos, y: y1Pos, signals: [{ type: 'power', signal: 'GND' }], number: 1 },
    { name: 'NO1', x: x1Pos, y: y2Pos, signals: [], number: 9 },
    { name: 'NC1', x: x2Pos, y: y2Pos, signals: [], number: 11 },
    { name: 'P1', x: x3Pos, y: y2Pos, signals: [], number: 13 },
    { name: 'COIL1', x: x4Pos, y: y2Pos, signals: [], number: 16 },
  ];

  render() {
    return html`
      <svg
        width="21mm"
        height="10mm"
        version="1.1"
        viewBox="0 0 21 10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke-width=".4" fill="#f7b93c" stroke="#dda137">
          <rect x=".20" y=".20" width="20.6" height="9.61" ry=".58" />
          <rect x="20.2" y="4.5" width=".40" height="1" fill="#dda137" />
        </g>
        <g fill="none" stroke="#dda137" stroke-width=".47">
          <ellipse cx="1.6" cy="1.35" rx=".76" ry=".76" />
          <ellipse cx="6.68" cy="1.35" rx=".76" ry=".76" />
          <ellipse cx="11.76" cy="1.35" rx=".76" ry=".76" />
          <ellipse cx="19.38" cy="1.35" rx=".76" ry=".76" />
          <ellipse cx="1.6" cy="8.65" rx=".76" ry=".76" />
          <ellipse cx="6.68" cy="8.65" rx=".76" ry=".76" />
          <ellipse cx="11.76" cy="8.65" rx=".76" ry=".76" />
          <ellipse cx="19.38" cy="8.65" rx=".76" ry=".76" />
        </g>
        <text fill="#4a3510" font-family="sans-serif" font-size="2.8222px">
          <tspan x="1.07" y="6.03">KS2E-M-DC5</tspan>
        </text>
        ${this.value
          ? html`
              <defs>
                <filter id="energizedGlow" x="-1" y="-1" width="3" height="3">
                  <feGaussianBlur stdDeviation="0.6" />
                </filter>
              </defs>
              <g>
                <circle cx="19.38" cy="5" r="1.4" fill="#5cff5c" filter="url(#energizedGlow)" opacity="0.85" />
                <circle cx="19.38" cy="5" r="0.4" fill="#eaffea" />
              </g>
            `
          : null}
      </svg>
    `;
  }
}
