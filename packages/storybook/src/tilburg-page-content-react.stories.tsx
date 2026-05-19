/* @license CC0-1.0 */

import { Heading2, PageContent, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Page Content',
  id: 'tilburg-page-content-react',
  component: PageContent,
  tags: ['autodocs'],
} satisfies Meta<typeof PageContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageContent>
      <Heading2>Sectie titel</Heading2>
      <Paragraph>Hoofdinhoud van de pagina, geplaatst binnen Page Content.</Paragraph>
    </PageContent>
  ),
};
