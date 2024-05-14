/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { UnorderedList, UnorderedListItem } from '@utrecht/component-library-react/dist/css-module';
import readme from './documentation/unordered-list.md?raw';

const meta = {
  title: 'CSS Component/Unordered List',
  id: 'css-utrecht-unordered-list',
  component: UnorderedList,
  argTypes: {
    children: {
      name: 'Content',
      type: {
        name: 'string',
        required: true,
      },
      defaultValue: '',
    },
  },
  args: {
    children: '',
  },
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=828%3A920&t=Y2YZ0H2902enM7la-1',
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof UnorderedList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Unordered list',
  args: {
    children: [
      <UnorderedListItem>
        In deze app staan niet de dagen waarop wij de wijkcontainers legen, alleen de huiscontainers (kliko’s)
      </UnorderedListItem>,
      <UnorderedListItem>
        In deze app staan niet de dagen waarop wij de wijkcontainers legen, alleen de huiscontainers (kliko’s)
      </UnorderedListItem>,
      <UnorderedListItem>
        In deze app staan niet de dagen waarop wij de wijkcontainers legen, alleen de huiscontainers (kliko’s)
      </UnorderedListItem>,
    ],
  },
};
