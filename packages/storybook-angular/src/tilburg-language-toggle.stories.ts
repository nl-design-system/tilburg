/* @license CC0-1.0 */

import { TilburgLanguageToggle } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-language-toggle.examples';

const meta: Meta<TilburgLanguageToggle> = {
  title: 'Tilburg Angular/Language Toggle',
  id: 'tilburg-language-toggle-angular',
  component: TilburgLanguageToggle,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgLanguageToggle>;

export const NLActive: Story = {
  name: 'NL active',
  args: { active: 'NL' },
  render: (args) => ({
    props: args,
    template: `<tilburg-language-toggle [active]="active"></tilburg-language-toggle>`,
  }),
};

export const ENActive: Story = {
  name: 'EN active',
  args: { active: 'EN' },
  render: (args) => ({
    props: args,
    template: `<tilburg-language-toggle [active]="active"></tilburg-language-toggle>`,
  }),
};
