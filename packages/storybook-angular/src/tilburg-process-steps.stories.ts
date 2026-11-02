/* @license CC0-1.0 */

import { TilburgProcessSteps } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, exampleSteps } from '../../storybook-shared/src/tilburg-process-steps.examples';

const meta: Meta<TilburgProcessSteps> = {
  title: 'Tilburg Angular/Process Steps',
  id: 'tilburg-process-steps-angular',
  component: TilburgProcessSteps,
  tags: ['autodocs'],
  /* Explicit template: the built Angular Storybook cannot derive the selector of a library component. */
  render: (args) => ({ props: args, template: '<tilburg-process-steps [steps]="steps"></tilburg-process-steps>' }),
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgProcessSteps>;

export const Default: Story = {
  name: 'Default',
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
