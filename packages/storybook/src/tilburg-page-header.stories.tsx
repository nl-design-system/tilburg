/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-page-header.examples';

/* Thin React wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-page-header.examples.ts`). The Angular
   storybook's `tilburg-page-header-html.stories.ts` consumes the same source. */

const meta = {
  title: 'Tilburg HTML/Page Header',
  id: 'tilburg-page-header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HtmlExample = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export const LogoOnly: Story = {
  name: examples.logoOnly.name,
  render: () => <HtmlExample html={examples.logoOnly.html} />,
};

export const LogoAndTitle: Story = {
  name: examples.logoAndTitle.name,
  render: () => <HtmlExample html={examples.logoAndTitle.html} />,
};

export const LoggedIn: Story = {
  name: examples.loggedIn.name,
  render: () => <HtmlExample html={examples.loggedIn.html} />,
};
