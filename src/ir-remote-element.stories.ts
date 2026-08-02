import { html } from 'lit';
import { action } from 'storybook/actions';
import './ir-remote-element';

export default {
  title: 'IR Remote',
  component: 'iot-ir-remote',
};

export const Default = () =>
  html`<iot-ir-remote
    @button-press=${action('button-press')}
    @button-release=${action('button-release')}
  ></iot-ir-remote>`;
