import { html } from 'lit';
import { action } from 'storybook/actions';
import './franzininho-element';

export default {
  title: 'Franzininho',
  component: 'iot-franzininho',
  argTypes: {
    ledPower: { control: { type: 'boolean' } },
    led1: { control: { type: 'boolean' } },
  },
  args: {
    ledPower: true,
    led1: false,
  },
};

const Template = ({ ledPower, led1 }) =>
  html`<iot-franzininho
    .ledPower=${ledPower}
    .led1=${led1}
    @button-press=${action('button-press')}
    @button-release=${action('button-release')}
  >
  </iot-franzininho>`;

export const Default = Template.bind({});
