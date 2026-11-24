/* @license CC0-1.0 */

import { ToptaskLink } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact, tasks } from '../../storybook-shared/src/tilburg-toptask-link.examples';

const meta = {
  title: 'Tilburg React/Toptask Link',
  id: 'tilburg-toptask-link-react',
  component: ToptaskLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof ToptaskLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/* The shared examples hold the icons as SVG strings. */
const Icon = ({ svg }: { svg: string }) => (
  <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: svg }} />
);

export const Default: Story = {
  render: () => {
    const [href, title, icon] = tasks[0];
    return (
      <ToptaskLink href={href} icon={<Icon svg={icon} />}>
        {title}
      </ToptaskLink>
    );
  },
};

export const WithoutIcon: Story = {
  name: 'Without icon',
  args: { href: '/afspraak-maken', children: 'Afspraak maken' },
};
