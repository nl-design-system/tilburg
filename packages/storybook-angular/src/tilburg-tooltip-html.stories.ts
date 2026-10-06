/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-tooltip.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-tooltip.examples.ts`). The behaviour comes from the `enhanceTooltip()`
   script, run in `.storybook/preview.ts`. */

const meta: Meta = {
  title: 'Tilburg HTML/Tooltip',
  id: 'tilburg-tooltip',
  tags: ['!autodocs', 'tilburg'],
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

export const IconButton: Story = {
  name: examples.iconButton.name,
  render: () => ({ template: examples.iconButton.html }),
};

export const Below: Story = {
  name: examples.below.name,
  render: () => ({ template: examples.below.html }),
};

export const ExistingDescription: Story = {
  name: examples.existingDescription.name,
  render: () => ({ template: examples.existingDescription.html }),
};

export const Edge: Story = {
  name: examples.edge.name,
  render: () => ({ template: examples.edge.html }),
};
