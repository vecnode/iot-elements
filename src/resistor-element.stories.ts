import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './resistor-element';

interface ResistorArgs {
  value: number;
}

const meta = {
  title: 'Resistor',
  component: 'iot-resistor',
  args: {
    value: 1000,
  },
  argTypes: {
    value: { control: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A resistor component with configurable resistance value',
      },
    },
  },
  render: (args) => html`<iot-resistor value="${args.value}"></iot-resistor>`,
} satisfies Meta<ResistorArgs>;

export default meta;
type Story = StoryObj<ResistorArgs>;

export const OneOhm: Story = {
  name: '1Ω',
  args: {
    value: 1,
  },
};

export const FourHundredSeventyOhm: Story = {
  name: '470Ω',
  args: {
    value: 470,
  },
};
