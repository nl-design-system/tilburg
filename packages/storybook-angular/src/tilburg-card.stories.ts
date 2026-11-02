/* @license CC0-1.0 */

import { TilburgCard } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, cardImageSrc, description } from '../../storybook-shared/src/tilburg-card.examples';

const meta: Meta<TilburgCard> = {
  title: 'Tilburg Angular/Card',
  id: 'tilburg-card-angular',
  component: TilburgCard,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgCard>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <div style="max-inline-size:22rem">
        <tilburg-card heading="Openingstijden Stadskantoor">
          <tilburg-paragraph>Maandag tot en met vrijdag van 9.00 tot 17.00 uur, alleen op afspraak.</tilburg-paragraph>
        </tilburg-card>
      </div>
    `,
  }),
};

export const WithLink: Story = {
  name: 'With link',
  render: () => ({
    template: `
      <div style="max-inline-size:22rem">
        <tilburg-card heading="Afval en containers" href="#">
          <tilburg-paragraph>Wanneer wordt je afval opgehaald, en waar breng je grof afval naartoe?</tilburg-paragraph>
        </tilburg-card>
      </div>
    `,
  }),
};

export const WithImage: Story = {
  name: 'With image and link',
  render: () => ({
    props: { cardImageSrc },
    template: `
      <div style="max-inline-size:22rem">
        <tilburg-card heading="Parkeren in de binnenstad" href="#">
          <img slot="image" [src]="cardImageSrc" alt="" />
          <tilburg-paragraph>Vraag een parkeervergunning aan of bekijk waar je met je auto terechtkunt.</tilburg-paragraph>
        </tilburg-card>
      </div>
    `,
  }),
};
