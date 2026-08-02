import { html } from 'lit';
import { drawWokwiW } from './utils/logo';
import './ili9341-element';

export default {
  title: 'ILI9341',
  component: 'iot-ili9341',
  argTypes: {
    flipHorizontal: { control: { type: 'boolean' } },
    flipVertical: { control: { type: 'boolean' } },
  },
  args: {
    flipHorizontal: false,
    flipVertical: false,
  },
};

function drawLogo(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  drawWokwiW(ctx, 6, 120 * Math.random(), 220 * Math.random());

  setInterval(() => {
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawWokwiW(ctx, 6, 120 * Math.random(), 220 * Math.random());
  }, 1000);
}

export const Default = () => html`<iot-ili9341></iot-ili9341> `;

export const Logo = ({ flipHorizontal, flipVertical }) => html`
  <iot-ili9341
    @canvas-ready=${(e) => drawLogo(e.target.canvas)}
    .flipHorizontal=${flipHorizontal}
    .flipVertical=${flipVertical}
  ></iot-ili9341>
`;
