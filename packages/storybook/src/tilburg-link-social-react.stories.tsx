/* @license CC0-1.0 */

import { LinkSocial, ListSocial, ListSocialItem } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { accounts, bugs, descriptionReact } from '../../storybook-shared/src/tilburg-link-social.examples';

const meta = {
  title: 'Tilburg React/Link Social',
  id: 'tilburg-link-social-react',
  component: LinkSocial,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof LinkSocial>;

export default meta;
type Story = StoryObj<typeof meta>;

/* The shared examples hold the icons as SVG strings. */
const Icon = ({ svg }: { svg: string }) => (
  <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: svg }} />
);

export const Single: Story = {
  name: 'Single link',
  render: () => {
    const [href, label, icon] = accounts[0];
    return (
      <LinkSocial href={href} aria-label={label}>
        <Icon svg={icon} />
      </LinkSocial>
    );
  },
};

export const List: Story = {
  name: 'List Social',
  render: () => (
    <ListSocial aria-label="Gemeente Tilburg op sociale media">
      {accounts.map(([href, label, icon]) => (
        <ListSocialItem key={href}>
          <LinkSocial href={href} aria-label={label}>
            <Icon svg={icon} />
          </LinkSocial>
        </ListSocialItem>
      ))}
    </ListSocial>
  ),
};
