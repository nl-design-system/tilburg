/* @license CC0-1.0 */
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@utrecht/component-library-react/dist/css-module';
import readme from './angular-tilburg-button.md?raw';

const meta = {
  title: 'Tilburg Angular Components/Button',
  id: 'angular-tilburg-button',
  component: Button,
  argTypes: {
    children: {
      name: 'Content',
      description: 'Button text',
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
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fbutton',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?type=design&node-id=847%3A865&mode=design&t=FsnygCvT6dNHH48s-1',
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
  name: 'Default button',
  args: {
    children: 'Label',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?type=design&node-id=153%3A1140&mode=design&t=FsnygCvT6dNHH48s-1',
    },
  },
};

export const PrimaryActionButton: Story = {
  name: 'Primary action button',
  args: {
    appearance: 'primary-action-button',
    children: 'Label',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?type=design&node-id=153%3A1140&mode=design&t=FsnygCvT6dNHH48s-1',
    },
  },
};

export const SecondaryActionButton: Story = {
  name: 'Secondary action button',
  args: {
    appearance: 'secondary-action-button',
    children: 'Label',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?type=design&node-id=153%3A1140&mode=design&t=FsnygCvT6dNHH48s-1',
    },
  },
};

export const SubtleButton: Story = {
  name: 'Subtle button',
  args: {
    appearance: 'subtle-button',
    children: 'Label',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?type=design&node-id=153%3A1140&mode=design&t=FsnygCvT6dNHH48s-1',
    },
  },
};
