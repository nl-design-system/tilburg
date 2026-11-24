/* @license CC0-1.0 */

import { TilburgWbcProcessSteps } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  bugs,
  descriptionWebComponents,
  exampleSteps,
} from '../../storybook-shared/src/tilburg-process-steps.examples';

/* Stencil `<tilburg-wbc-process-steps>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Process Steps',
  id: 'tilburg-process-steps-wbc',
  component: TilburgWbcProcessSteps,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcProcessSteps>;

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
