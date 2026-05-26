/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-skip-link.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-skip-link.examples.ts`). The Angular
   storybook's `tilburg-skip-link-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Skip Link',
  id: 'tilburg-skip-link',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

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
  render: () => <HtmlExample html={examples.visibleOnFocus.html} />,
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
  render: () => <HtmlExample html={examples.forceVisible.html} />,
};
