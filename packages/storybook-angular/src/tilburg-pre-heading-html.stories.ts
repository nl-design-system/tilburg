/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, descriptionHtml, examples } from '../../storybook-shared/src/tilburg-pre-heading.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-pre-heading.examples.ts`). The React
   storybook's `tilburg-pre-heading.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Pre Heading',
  id: 'tilburg-pre-heading',
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

export const HeadingGroup: Story = {
  name: examples.headingGroup.name,
  render: () => ({ template: examples.headingGroup.html }),
};
