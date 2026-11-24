/* @license CC0-1.0 */

import { LinkButton, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-link-button.examples';

const meta = {
  title: 'Tilburg React/Link Button',
  id: 'tilburg-link-button-react',
  component: LinkButton,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Vorige stap' },
};

export const Inline: Story = {
  name: 'Inline in text',
  render: () => (
    <Paragraph>
      Klopt uw adres niet? <LinkButton inline>Wijzig uw adres</LinkButton> voordat u verdergaat.
    </Paragraph>
  ),
};

export const Pressed: Story = {
  name: 'Toggle (pressed)',
  render: () => (
    <>
      <LinkButton inline pressed={false}>
        Details tonen
      </LinkButton>{' '}
      <LinkButton inline pressed>
        Details tonen
      </LinkButton>
    </>
  ),
};

export const Disabled: Story = {
  args: { children: 'Vorige stap', disabled: true },
};
