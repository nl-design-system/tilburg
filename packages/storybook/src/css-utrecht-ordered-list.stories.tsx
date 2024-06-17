/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { OrderedList, OrderedListItem } from '@utrecht/component-library-react/dist/css-module';
import readme from './documentation/ordered-list.md?raw';

const meta = {
  title: 'CSS Component/Ordered list',
  id: 'css-utrecht-ordered-list',
  component: OrderedList,
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
      url: 'https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=823-571&m=dev',
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof OrderedList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Ordered list',
  args: {
    children: [
      <OrderedListItem>Gemeente Tilburg rekenkamer</OrderedListItem>,
      <OrderedListItem>Gemeente Tilburg college</OrderedListItem>,
      <OrderedListItem>Gemeente Tilburg contact</OrderedListItem>,
    ],
  },
};
