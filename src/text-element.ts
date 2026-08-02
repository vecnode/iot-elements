import { html, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ElementPin } from './pin';

/**
 * Text: a plain canvas annotation/label, not a real electronic part - no
 * leads, no pins (`pinInfo` is empty, same convention wifi-ap-element.ts
 * uses). Not vendored - see 74hc165-element.ts's doc comment for why.
 */
@customElement('iot-text')
export class TextElement extends LitElement {
  @property() text = 'Text';
  @property() color = '#e8e8e8';
  @property({ type: Number }) fontSize = 4;

  readonly pinInfo: ElementPin[] = [];

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
    `;
  }

  render() {
    const { text, color, fontSize } = this;
    const width = Math.max(10, text.length * fontSize * 0.62);
    return html`
      <svg
        width="${width}mm"
        height="${fontSize * 1.5}mm"
        version="1.1"
        viewBox="0 0 ${width} ${fontSize * 1.5}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="0"
          y="${fontSize}"
          font-size="${fontSize}"
          font-family="sans-serif"
          fill="${color}"
        >
          ${text}
        </text>
      </svg>
    `;
  }
}
