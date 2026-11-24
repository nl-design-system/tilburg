/* @license CC0-1.0 */

import { TilburgWbcButton, TilburgWbcDrawer, TilburgWbcLink } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-drawer.examples';

/* Stencil `<tilburg-wbc-drawer>` rendered through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Drawer',
  id: 'tilburg-drawer-wbc',
  component: TilburgWbcDrawer,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Same content as the HTML/CSS reference examples, behind a trigger button:
   a drawer that opens by itself would cover the autodocs page. */
const DrawerDemo = ({
  align = 'inline-start',
}: {
  align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
}) => {
  const [open, setOpen] = useState(false);
  const titleId = `drawer-wbc-${align}-title`;
  return (
    <>
      <TilburgWbcButton appearance="secondary-action-button" onClick={() => setOpen(true)}>
        Menu
      </TilburgWbcButton>
      <TilburgWbcDrawer align={align} aria-labelledby={titleId} open={open} onTilburgClose={() => setOpen(false)}>
        <h2 className="utrecht-heading-2" id={titleId}>
          Menu
        </h2>
        <ul className="utrecht-unordered-list">
          <li className="utrecht-unordered-list__item">
            <TilburgWbcLink href="#">Afval</TilburgWbcLink>
          </li>
          <li className="utrecht-unordered-list__item">
            <TilburgWbcLink href="#">Parkeren</TilburgWbcLink>
          </li>
          <li className="utrecht-unordered-list__item">
            <TilburgWbcLink href="#">Paspoort en ID-kaart</TilburgWbcLink>
          </li>
        </ul>
        <TilburgWbcButton appearance="secondary-action-button" onClick={() => setOpen(false)}>
          Sluiten
        </TilburgWbcButton>
      </TilburgWbcDrawer>
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
