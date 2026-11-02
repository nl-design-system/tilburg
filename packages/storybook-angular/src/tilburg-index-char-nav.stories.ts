/* @license CC0-1.0 */

import { TilburgIndexCharNav } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-index-char-nav.examples';

const meta: Meta<TilburgIndexCharNav> = {
  title: 'Tilburg Angular/Index Char Nav',
  id: 'tilburg-index-char-nav-angular',
  component: TilburgIndexCharNav,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
  render: (args) => ({
    props: args,
    template: `<tilburg-index-char-nav [characters]="characters" [currentChar]="currentChar"></tilburg-index-char-nav>`,
  }),
};

export default meta;
type Story = StoryObj<TilburgIndexCharNav>;

export const Default: Story = {
  name: 'Default',
  args: {
    currentChar: 'B',
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char) => ({
      char,
      href: '#',
      disabled: ['Q', 'X', 'Y'].includes(char),
    })),
  },
};

export const Short: Story = {
  name: 'Few characters',
  args: {
    currentChar: 'B',
    characters: [
      { char: 'A', href: '#' },
      { char: 'B', href: '#' },
      { char: 'C', disabled: true },
      { char: 'D', href: '#' },
    ],
  },
};
