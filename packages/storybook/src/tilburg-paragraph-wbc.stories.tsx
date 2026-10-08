/* @license CC0-1.0 */

import { TilburgWbcParagraph } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-paragraph.examples';

/* Stencil `<tilburg-wbc-paragraph>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Paragraph',
  id: 'tilburg-paragraph-wbc',
  component: TilburgWbcParagraph,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcParagraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <TilburgWbcParagraph>Standaard paragraaf. Hier staat normale brood-tekst.</TilburgWbcParagraph>
      <TilburgWbcParagraph lead>Lead paragraaf — opvallende intro voor een sectie.</TilburgWbcParagraph>
      <TilburgWbcParagraph small>Kleine paragraaf — voor voetnoten of disclaimers.</TilburgWbcParagraph>
    </>
  ),
};

export const Default: Story = {
  render: () => <TilburgWbcParagraph>Lorem ipsum dolor sit amet.</TilburgWbcParagraph>,
};
export const Lead: Story = {
  render: () => <TilburgWbcParagraph lead>Een opvallende intro-paragraaf.</TilburgWbcParagraph>,
};
export const Small: Story = { render: () => <TilburgWbcParagraph small>Een kleine voetnoot.</TilburgWbcParagraph> };
