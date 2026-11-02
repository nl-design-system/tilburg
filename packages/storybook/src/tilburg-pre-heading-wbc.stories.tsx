/* @license CC0-1.0 */

import {
  TilburgWbcHeading1,
  TilburgWbcHeadingGroup,
  TilburgWbcPreHeading,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-pre-heading.examples';

/* Stencil `<tilburg-wbc-pre-heading>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Pre Heading',
  id: 'tilburg-pre-heading-wbc',
  component: TilburgWbcPreHeading,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcPreHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TilburgWbcPreHeading>Afval en recycling</TilburgWbcPreHeading>,
};

export const InHeadingGroup: Story = {
  name: 'In a heading group',
  render: () => (
    <TilburgWbcHeadingGroup>
      <TilburgWbcHeading1>Afvalkalender</TilburgWbcHeading1>
      <TilburgWbcPreHeading>Afval en recycling</TilburgWbcPreHeading>
    </TilburgWbcHeadingGroup>
  ),
};
