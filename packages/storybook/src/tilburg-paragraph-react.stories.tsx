/* @license CC0-1.0 */

import { Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Paragraph',
  id: 'tilburg-paragraph-react',
  component: Paragraph,
  tags: ['autodocs'],
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <Paragraph>Standaard paragraaf. Hier staat normale brood-tekst.</Paragraph>
      <Paragraph lead>Lead paragraaf — opvallende intro voor een sectie.</Paragraph>
      <Paragraph small>Kleine paragraaf — voor voetnoten of disclaimers.</Paragraph>
    </>
  ),
};

export const Default: Story = { render: () => <Paragraph>Lorem ipsum dolor sit amet.</Paragraph> };
export const Lead: Story = { render: () => <Paragraph lead>Een opvallende intro-paragraaf.</Paragraph> };
export const Small: Story = { render: () => <Paragraph small>Een kleine voetnoot.</Paragraph> };
