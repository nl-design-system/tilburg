/* @license CC0-1.0 */

import { TilburgWebcParagraph } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-paragraph.examples';

/* Stencil `<tilburg-webc-paragraph>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Paragraph',
  id: 'tilburg-paragraph-webc',
  component: TilburgWebcParagraph,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcParagraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <TilburgWebcParagraph>Standaard paragraaf. Hier staat normale brood-tekst.</TilburgWebcParagraph>
      <TilburgWebcParagraph lead>Lead paragraaf — opvallende intro voor een sectie.</TilburgWebcParagraph>
      <TilburgWebcParagraph small>Kleine paragraaf — voor voetnoten of disclaimers.</TilburgWebcParagraph>
    </>
  ),
};

export const Default: Story = {
  render: () => <TilburgWebcParagraph>Lorem ipsum dolor sit amet.</TilburgWebcParagraph>,
};
export const Lead: Story = {
  render: () => <TilburgWebcParagraph lead>Een opvallende intro-paragraaf.</TilburgWebcParagraph>,
};
export const Small: Story = { render: () => <TilburgWebcParagraph small>Een kleine voetnoot.</TilburgWebcParagraph> };
