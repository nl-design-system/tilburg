/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-heading.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-heading.examples.ts`). The React
   storybook's `tilburg-heading.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Heading',
  id: 'tilburg-heading',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const AllLevels: Story = {
  name: examples.allLevels.name,
  render: () => ({ template: examples.allLevels.html }),
};
