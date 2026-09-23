/* @license CC0-1.0 */

import {
  TilburgWbcHeading1,
  TilburgWbcHeading2,
  TilburgWbcHeading3,
  TilburgWbcHeading4,
  TilburgWbcHeading5,
  TilburgWbcHeading6,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-heading.examples';

/* Stencil `<tilburg-wbc-heading-1…6>` rendered through their generated React proxies. */

const meta = {
  title: 'Tilburg Web Components/Heading',
  id: 'tilburg-heading-wbc',
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLevels: Story = {
  render: () => (
    <>
      <TilburgWbcHeading1>Heading 1 — primair</TilburgWbcHeading1>
      <TilburgWbcHeading2>Heading 2 — sectietitel</TilburgWbcHeading2>
      <TilburgWbcHeading3>Heading 3 — subsectie</TilburgWbcHeading3>
      <TilburgWbcHeading4>Heading 4 — kleinere subsectie</TilburgWbcHeading4>
      <TilburgWbcHeading5>Heading 5</TilburgWbcHeading5>
      <TilburgWbcHeading6>Heading 6</TilburgWbcHeading6>
    </>
  ),
};
