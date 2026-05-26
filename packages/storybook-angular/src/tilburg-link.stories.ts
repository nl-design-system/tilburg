/* @license CC0-1.0 */

import { TilburgLink } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-link.examples';

const meta: Meta<TilburgLink> = {
  title: 'Tilburg Angular/Link',
  id: 'tilburg-link-angular',
  component: TilburgLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgLink>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `<tilburg-link href="#">Parkeren in Tilburg</tilburg-link>`,
  }),
};

export const InParagraph: Story = {
  name: 'In a paragraph',
  render: () => ({
    template: `
      <p class="utrecht-paragraph">
        Tilburg, gelegen in het zuiden van Nederland, is een bruisende stad met een rijke geschiedenis en een levendige
        cultuur. Bekijk de
        <tilburg-link href="#">website van Tilburg</tilburg-link>
        voor actuele informatie en evenementen.
      </p>
    `,
  }),
};

export const ExternalLink: Story = {
  name: 'External link',
  render: () => ({
    template: `<tilburg-link href="https://nldesignsystem.nl" target="_blank" rel="external noopener noreferrer" [external]="true">NL Design System ↗</tilburg-link>`,
  }),
};

export const AllPermutations: Story = {
  render: () => ({
    template: `
      <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem">
        <li><tilburg-link href="/foo">Standaard interne link</tilburg-link></li>
        <li><tilburg-link href="https://example.com" [external]="true">Externe link</tilburg-link></li>
        <li><tilburg-link href="#" current="page">Link met aria-current=page</tilburg-link></li>
        <li><tilburg-link href="#" current="step">Link met aria-current=step</tilburg-link></li>
        <li><tilburg-link href="/foo" target="_blank">Link met target=_blank</tilburg-link></li>
      </ul>
    `,
  }),
};
