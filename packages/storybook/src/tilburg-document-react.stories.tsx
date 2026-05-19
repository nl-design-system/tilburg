/* @license CC0-1.0 */

import { Document, Heading1, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Document',
  id: 'tilburg-document-react',
  component: Document,
  tags: ['autodocs'],
} satisfies Meta<typeof Document>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Document>
      <Heading1>Document titel</Heading1>
      <Paragraph>Tekst binnen een document wrapper.</Paragraph>
    </Document>
  ),
};
