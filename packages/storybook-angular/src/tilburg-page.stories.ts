/* @license CC0-1.0 */

import { TilburgPage } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-page.examples';

const meta: Meta<TilburgPage> = {
  title: 'Tilburg Angular/Page',
  id: 'tilburg-page-angular',
  component: TilburgPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgPage>;

export const Default: Story = {
  name: 'Header + content + footer',
  render: () => ({
    props: {
      legalLinks: [
        { label: 'Privacystatement', href: '#' },
        { label: 'Cookies', href: '#' },
      ],
    },
    template: `
      <tilburg-page style="min-block-size:24rem;display:block">
        <tilburg-page-header title="Gemeente Tilburg"></tilburg-page-header>
        <tilburg-page-content>
          <tilburg-paragraph>Pagina-inhoud staat hier.</tilburg-paragraph>
        </tilburg-page-content>
        <tilburg-page-footer [links]="legalLinks"></tilburg-page-footer>
      </tilburg-page>
    `,
  }),
};
