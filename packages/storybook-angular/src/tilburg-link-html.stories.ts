/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-link.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-link.examples.ts`). The React
   storybook's `tilburg-link.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Link',
  id: 'tilburg-link',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: examples.default.name,
  render: () => ({ template: examples.default.html }),
};

export const InParagraph: Story = {
  name: examples.inParagraph.name,
  render: () => ({ template: examples.inParagraph.html }),
};

export const ExternalLink: Story = {
  name: examples.externalLink.name,
  render: () => ({ template: examples.externalLink.html }),
};
