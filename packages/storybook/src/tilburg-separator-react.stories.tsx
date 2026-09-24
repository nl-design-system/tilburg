/* @license CC0-1.0 */

import { Paragraph, Separator } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-separator.examples';

const meta = {
  title: 'Tilburg React/Separator',
  id: 'tilburg-separator-react',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <Paragraph>Eerste sectie met wat tekst boven de scheidingslijn.</Paragraph>
      <Separator />
      <Paragraph>Tweede sectie onder de scheidingslijn.</Paragraph>
      <Paragraph>Aanvraagdetails</Paragraph>
      <Separator decorative />
      <Paragraph>Contactgegevens</Paragraph>
    </>
  ),
};
