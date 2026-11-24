/* @license CC0-1.0 */

import { TilburgUrlData } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-url-data.examples';

const meta: Meta<TilburgUrlData> = {
  title: 'Tilburg Angular/URL Data',
  id: 'tilburg-url-data-angular',
  component: TilburgUrlData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgUrlData>;

export const AllPermutations: Story = {
  render: () => ({
    template: `
      <div style="max-inline-size:16rem">
        <tilburg-paragraph>Kijk op <tilburg-url-data>https://www.tilburg.nl/afval</tilburg-url-data> voor de afvalkalender.</tilburg-paragraph>
        <tilburg-paragraph>Uw aanvraag volgen: <tilburg-url-data>https://www.tilburg.nl/inwoners/mijn-tilburg/aanvragen/status?zaak=ZAAK-2026-004211</tilburg-url-data></tilburg-paragraph>
      </div>
    `,
  }),
};
