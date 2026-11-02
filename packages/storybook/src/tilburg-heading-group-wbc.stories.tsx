/* @license CC0-1.0 */

import {
  TilburgWbcHeading1,
  TilburgWbcHeading2,
  TilburgWbcHeadingGroup,
  TilburgWbcPreHeading,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-heading-group.examples';

/* Stencil `<tilburg-wbc-heading-group>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Heading Group',
  id: 'tilburg-heading-group-wbc',
  component: TilburgWbcHeadingGroup,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcHeadingGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TilburgWbcHeadingGroup>
      <TilburgWbcHeading1>Afvalkalender</TilburgWbcHeading1>
      <TilburgWbcPreHeading>Afval en recycling</TilburgWbcPreHeading>
    </TilburgWbcHeadingGroup>
  ),
};

export const Level2: Story = {
  name: 'Heading 2',
  render: () => (
    <TilburgWbcHeadingGroup>
      <TilburgWbcHeading2>Parkeervergunning aanvragen</TilburgWbcHeading2>
      <TilburgWbcPreHeading>Parkeren</TilburgWbcPreHeading>
    </TilburgWbcHeadingGroup>
  ),
};

export const Subtitle: Story = {
  name: 'With subtitle paragraph',
  render: () => (
    <TilburgWbcHeadingGroup>
      <TilburgWbcHeading1>Spoorpark</TilburgWbcHeading1>
      <p className="utrecht-paragraph">Het stadspark dat Tilburgers samen hebben gemaakt</p>
    </TilburgWbcHeadingGroup>
  ),
};
