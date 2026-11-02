/* @license CC0-1.0 */

import { ProcessSteps } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact, exampleSteps } from '../../storybook-shared/src/tilburg-process-steps.examples';

const meta = {
  title: 'Tilburg React/Process Steps',
  id: 'tilburg-process-steps-react',
  component: ProcessSteps,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof ProcessSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { steps: exampleSteps.default },
};

export const SubSteps: Story = {
  name: 'With sub-steps',
  args: { steps: exampleSteps.subSteps },
};

export const Completed: Story = {
  name: 'All steps completed',
  args: { steps: exampleSteps.completed },
};
