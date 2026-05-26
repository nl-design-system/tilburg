/* @license CC0-1.0 */

import { TilburgPageFooter } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-page-footer.examples';

const meta: Meta<TilburgPageFooter> = {
  title: 'Tilburg Angular/Page Footer',
  id: 'tilburg-page-footer-angular',
  component: TilburgPageFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgPageFooter>;

const legalLinks = [
  { label: 'Privacystatement', href: '#' },
  { label: 'Cookies', href: '#' },
  { label: 'Toegankelijkheid', href: '#' },
  { label: 'Proclaimer', href: '#' },
];

export const Default: Story = {
  name: 'Links only',
  render: () => ({
    props: { links: legalLinks },
    template: `<tilburg-page-footer [links]="links"></tilburg-page-footer>`,
  }),
};

export const WithPrimaryAction: Story = {
  name: 'With primary action',
  render: () => ({
    props: {
      links: legalLinks,
      primaryLink: { label: 'Contact ›', href: '#' },
    },
    template: `<tilburg-page-footer [links]="links" [primaryLink]="primaryLink"></tilburg-page-footer>`,
  }),
};
