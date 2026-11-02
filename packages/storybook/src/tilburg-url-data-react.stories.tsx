/* @license CC0-1.0 */

import { Paragraph, UrlData } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-url-data.examples';

const meta = {
  title: 'Tilburg React/URL Data',
  id: 'tilburg-url-data-react',
  component: UrlData,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof UrlData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ maxInlineSize: '16rem' }}>
      <Paragraph>
        Kijk op <UrlData>https://www.tilburg.nl/afval</UrlData> voor de afvalkalender.
      </Paragraph>
      <Paragraph>
        Uw aanvraag volgen:{' '}
        <UrlData>https://www.tilburg.nl/inwoners/mijn-tilburg/aanvragen/status?zaak=ZAAK-2026-004211</UrlData>
      </Paragraph>
    </div>
  ),
};
