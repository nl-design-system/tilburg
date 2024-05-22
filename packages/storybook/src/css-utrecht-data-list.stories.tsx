/* @license CC0-1.0 */

import { Meta, StoryObj } from '@storybook/react';
import { DataList, DataListActions, DataListItem, DataListKey, DataListValue } from '@utrecht/component-library-react';
import readme from '@utrecht/components/data-list/README.md?raw';
import { ReactNode } from 'react';

interface DataListStoryProps {
  appearance?: string | '' | 'rows';
  items: {
    actions?: ReactNode;
    key: ReactNode;
    keyId?: string;
    value: ReactNode;
    multiline?: boolean;
  }[];
}

const DataListStory = ({ appearance, items }: DataListStoryProps) => (
  <DataList appearance={appearance}>
    {items.map(({ key, keyId, value, actions, multiline }) => (
      <DataListItem>
        <DataListKey id={keyId}>{key}</DataListKey>
        <DataListValue multiline={multiline}>{value}</DataListValue>
        {actions && <DataListActions>{actions}</DataListActions>}
      </DataListItem>
    ))}
  </DataList>
);

const meta = {
  title: 'CSS Component/Data list',
  id: 'css-data-list',
  component: DataListStory,
  argTypes: {
    appearance: {
      description: 'Appearance',
      options: ['', 'rows'],
      control: { type: 'select' },
    },
  },
  args: {
    appearance: '',
    items: [],
  },
  parameters: {
    tokensPrefix: 'utrecht-data-list',
    status: {
      type: 'WORK IN PROGRESS',
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof DataListStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    appearance: 'rows',
    items: [
      {
        key: 'Voornaam',
        value: 'John',
      },
      {
        key: 'Achternaam',
        value: 'Doe',
      },
      {
        key: 'Adres',
        value: 'Stadhuisplein 130\n5038 TC Tilburg',
        multiline: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Styling via `utrecht-data-list` class name.',
      },
    },
  },
};

export const DesignTokens = meta;
