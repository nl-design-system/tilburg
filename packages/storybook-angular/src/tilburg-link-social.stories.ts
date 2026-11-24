/* @license CC0-1.0 */

import { TilburgLinkSocial } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { accounts, bugs, description } from '../../storybook-shared/src/tilburg-link-social.examples';

const meta: Meta<TilburgLinkSocial> = {
  title: 'Tilburg Angular/Link Social',
  id: 'tilburg-link-social-angular',
  component: TilburgLinkSocial,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgLinkSocial>;

const link = ([href, label, icon]: [string, string, string]) =>
  `<tilburg-link-social href="${href}" ariaLabel="${label}">${icon}</tilburg-link-social>`;

export const Single: Story = {
  name: 'Single link',
  render: () => ({ template: link(accounts[0]) }),
};

export const List: Story = {
  name: 'List Social',
  render: () => ({
    template: `
      <tilburg-list-social ariaLabel="Gemeente Tilburg op sociale media">
        ${accounts.map((account) => `<li class="utrecht-list-social__item">${link(account)}</li>`).join('\n')}
      </tilburg-list-social>
    `,
  }),
};
