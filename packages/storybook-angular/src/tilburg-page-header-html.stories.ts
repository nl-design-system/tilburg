/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description, examples } from '../../storybook-shared/src/tilburg-page-header.examples';

/* Thin Angular wrapper around the shared HTML/CSS reference markup
   (`packages/storybook-shared/src/tilburg-page-header.examples.ts`). The React
   storybook's `tilburg-page-header.stories.tsx` consumes the same source. */

const meta: Meta = {
  title: 'Tilburg HTML/Page Header',
  id: 'tilburg-page-header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj;

export const LogoOnly: Story = {
  name: examples.logoOnly.name,
  render: () => ({ template: examples.logoOnly.html }),
};

export const LogoAndTitle: Story = {
  name: examples.logoAndTitle.name,
  render: () => ({ template: examples.logoAndTitle.html }),
};

export const LoggedIn: Story = {
  name: examples.loggedIn.name,
  render: () => ({ template: examples.loggedIn.html }),
};
