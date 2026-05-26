/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-accordion.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-accordion.examples.ts`). The Angular
   storybook's `tilburg-accordion-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Accordion',
  id: 'tilburg-accordion',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const MultipleSections: Story = {
  name: examples.multipleSections.name,
  render: () => <HtmlExample html={examples.multipleSections.html} />,
};

export const WithDisabledSection: Story = {
  name: examples.withDisabledSection.name,
  render: () => <HtmlExample html={examples.withDisabledSection.html} />,
};
