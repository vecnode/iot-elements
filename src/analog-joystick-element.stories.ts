import { html } from 'lit';
import { action } from 'storybook/actions';
import './analog-joystick-element';

export default {
  title: 'Analog Joystick',
  component: 'iot-analog-joystick',
  parameters: {
    docs: {
      description: {
        component: 'An analog joystick component with configurable x and y values',
      },
    },
  },
};

export const Joystick = () =>
  html`<iot-analog-joystick
    @button-press=${action('button-press')}
    @button-release=${action('button-release')}
    @input=${action('input')}
  ></iot-analog-joystick>`;
