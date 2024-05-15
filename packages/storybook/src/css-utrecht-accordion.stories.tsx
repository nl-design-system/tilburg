/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { AccordionProvider } from '@utrecht/component-library-react/dist/css-module';
import { ReactNode } from 'react';
import readme from './documentation/accordion.md?raw';

interface AccordionStoryProps {
  label: string;
  body: ReactNode;
  expanded?: boolean;
  expandedAccordion?: boolean;
}

const AccordionStory = ({ expanded, label, body }: AccordionStoryProps) => (
  <AccordionProvider sections={[{ expanded, label, body }]} />
);

const meta = {
  title: 'CSS Component/Accordion',
  id: 'css-utrecht-accordion',
  component: AccordionProvider,
  args: {
    // @ts-ignore
    label: '',
    body: '',
    expandedAccordion: false,
  },
  argTypes: {
    // @ts-ignore
    label: {
      name: 'label',
      type: { name: 'string', required: true },
      table: {
        defaultValue: { summary: '' },
        category: 'API',
      },
    },
    body: {
      name: 'body',
      type: { name: 'string', required: true },
      table: {
        defaultValue: { summary: '' },
        category: 'API',
      },
    },
    expandedAccordion: {
      name: 'expandedAccordion',
      type: { name: 'boolean', required: false },
      table: {
        defaultValue: { summary: false },
        category: 'API',
      },
    },
  },
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/ck81CE8SNzePi30jCEu7MK/NLDS---Gemeente-Tilburg---Bibliotheek?node-id=1261%3A4784&t=lu24fBlSHdl7JcKT-1',
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  // @ts-ignore
  render: AccordionStory,
} satisfies Meta<typeof AccordionProvider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // @ts-ignore
  args: {
    label: 'Lorem ipsum',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.`,
    expandedAccordion: true,
  },
};

const accordionData = [
  {
    label: 'Lorem ipsum 1',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.`,
    expandedAccordion: true,
  },
  {
    label: 'Lorem ipsum 2',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.`,
    expandedAccordion: false,
  },
  {
    label: 'Lorem ipsum 3',
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.`,
    expandedAccordion: false,
  },
];

// @ts-ignore
export const Multiple: Story = {
  render: () => <AccordionProvider sections={accordionData} />,
};
