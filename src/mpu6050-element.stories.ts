import { html } from 'lit';
import './mpu6050-element';

export default {
  title: 'MPU6050',
  component: 'iot-mpu6050',
  argTypes: {
    value: { control: { type: 'boolean' } },
  },
  args: {
    value: false,
  },
};

const Template = ({ value }) => html` <iot-mpu6050 .value=${value}></iot-mpu6050>`;

export const Default = Template.bind({});
