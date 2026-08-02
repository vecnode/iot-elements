import { html } from 'lit';
import { action } from 'storybook/actions';
import './slide-switch-element';

export default {
  title: 'Slide Switch',
  component: 'iot-slide-switch',
};

export const SlideSwitch = () =>
  html`<iot-slide-switch @input=${action('input')}></iot-slide-switch>`;
