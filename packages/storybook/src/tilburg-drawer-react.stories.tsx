/* @license CC0-1.0 */

import {
  Button,
  Drawer,
  type DrawerAlign,
  Heading2,
  Link,
  UnorderedList,
  UnorderedListItem,
} from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-drawer.examples';

const meta = {
  title: 'Tilburg React/Drawer',
  id: 'tilburg-drawer-react',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Same content as the HTML/CSS reference examples, behind a trigger button:
   a drawer that opens by itself would cover the autodocs page. */
const DrawerDemo = ({ align }: { align?: DrawerAlign }) => {
  const [open, setOpen] = useState(false);
  const titleId = `drawer-react-${align ?? 'inline-start'}-title`;
  return (
    <>
      <Button appearance="secondary-action-button" onClick={() => setOpen(true)}>
        Menu
      </Button>
      <Drawer align={align} aria-labelledby={titleId} open={open} onClose={() => setOpen(false)}>
        <Heading2 id={titleId}>Menu</Heading2>
        <UnorderedList>
          <UnorderedListItem>
            <Link href="#">Afval</Link>
          </UnorderedListItem>
          <UnorderedListItem>
            <Link href="#">Parkeren</Link>
          </UnorderedListItem>
          <UnorderedListItem>
            <Link href="#">Paspoort en ID-kaart</Link>
          </UnorderedListItem>
        </UnorderedList>
        <Button appearance="secondary-action-button" onClick={() => setOpen(false)}>
          Sluiten
        </Button>
      </Drawer>
    </>
  );
};

export const Default: Story = {
  name: 'Inline start (default)',
  render: () => <DrawerDemo />,
};

export const InlineEnd: Story = {
  name: 'Inline end',
  render: () => <DrawerDemo align="inline-end" />,
};

export const BlockStart: Story = {
  name: 'Block start',
  render: () => <DrawerDemo align="block-start" />,
};

export const BlockEnd: Story = {
  name: 'Block end',
  render: () => <DrawerDemo align="block-end" />,
};
