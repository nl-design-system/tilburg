/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-skip-link.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-skip-link.examples.ts`). The React
   storybook's `tilburg-skip-link.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Skip Link',
  id: 'tilburg-skip-link',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const VisibleOnFocus: Story = {
  name: examples.visibleOnFocus.name,
  parameters: {
    docs: {
      description: {
        story:
          'Tab into the canvas with the keyboard to reveal the link. This is the standard a11y pattern — the link is invisible until it receives keyboard focus.',
      },
    },
  },
  render: () => ({ template: examples.visibleOnFocus.html }),
};

export const ForceVisible: Story = {
  name: examples.forceVisible.name,
  parameters: {
    docs: {
      description: {
        story:
          'Adds the `--focus` and `--visible` modifiers so the link is always painted with its focus appearance. Useful for visual review.',
      },
    },
  },
  render: () => ({ template: examples.forceVisible.html }),
};
