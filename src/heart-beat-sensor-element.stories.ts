import { html } from 'lit';
import './heart-beat-sensor-element';

export default {
  title: 'Heart Beat Sensor',
  component: 'iot-heart-beat-sensor',
};

const Template = () => html`<iot-heart-beat-sensor></iot-heart-beat-sensor>`;

export const Default = Template.bind({});
