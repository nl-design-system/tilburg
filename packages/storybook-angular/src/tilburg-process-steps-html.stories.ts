/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-process-steps.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-process-steps.examples.ts`). The React
   storybook's `tilburg-process-steps.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Process Steps',
  id: 'tilburg-process-steps',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionHtml } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: examples.default.name,
  render: () => ({ template: examples.default.html }),
};

export const SubSteps: Story = {
  name: examples.subSteps.name,
  render: () => ({ template: examples.subSteps.html }),
};

export const Completed: Story = {
  name: examples.completed.name,
  render: () => ({ template: examples.completed.html }),
};
