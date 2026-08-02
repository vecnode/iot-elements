import { html } from 'lit';
import './ntc-temperature-sensor-element';

export default {
  title: 'NTC Temperature Sensor',
  component: 'iot-ntc-temperature-sensor',
};

const Template = () => html` <iot-ntc-temperature-sensor></iot-ntc-temperature-sensor> `;

export const Default = Template.bind({});
