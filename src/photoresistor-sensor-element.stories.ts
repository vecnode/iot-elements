import { html } from 'lit';
import './photoresistor-sensor-element';

export default {
  title: 'Photoresistor Sensor',
  component: 'iot-photoresistor-sensor',
  argTypes: {
    ledPower: { control: { type: 'boolean' } },
    ledDO: { control: { type: 'boolean' } },
  },
  args: {
    ledPower: false,
    ledDO: false,
  },
};

const Template = ({ ledPower, ledDO }) =>
  html`<iot-photoresistor-sensor .ledPower=${ledPower} .ledDO=${ledDO}>
  </iot-photoresistor-sensor>`;

export const Default = Template.bind({});
