/* @license CC0-1.0 */

import { TilburgLinkButton } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-link-button.examples';

const meta: Meta<TilburgLinkButton> = {
  title: 'Tilburg Angular/Link Button',
  id: 'tilburg-link-button-angular',
  component: TilburgLinkButton,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgLinkButton>;

export const Default: Story = {
  render: () => ({ template: `<tilburg-link-button>Vorige stap</tilburg-link-button>` }),
};

export const Inline: Story = {
  name: 'Inline in text',
  render: () => ({
    template: `
      <tilburg-paragraph>
        Klopt uw adres niet? <tilburg-link-button [inline]="true">Wijzig uw adres</tilburg-link-button> voordat u verdergaat.
      </tilburg-paragraph>
    `,
  }),
};

export const Pressed: Story = {
  name: 'Toggle (pressed)',
  render: () => ({
    props: { open: false },
    template: `
      <tilburg-link-button [inline]="true" [pressed]="open" (click)="open = !open">
        Details tonen
      </tilburg-link-button>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({ template: `<tilburg-link-button [disabled]="true">Vorige stap</tilburg-link-button>` }),
};
