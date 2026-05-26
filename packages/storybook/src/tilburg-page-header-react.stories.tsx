/* @license CC0-1.0 */

import { Button, PageHeader } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description } from '../../storybook-shared/src/tilburg-page-header.examples';

const meta = {
  title: 'Tilburg React/Page Header',
  id: 'tilburg-page-header-react',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <PageHeader title="Alleen titel" titleHref="/" />
      <PageHeader title="Met logo" logoSrc="/tilburg-logo.svg" logoAlt="Gemeente Tilburg" titleHref="/" />
      <PageHeader title="Met acties" titleHref="/">
        <Button appearance="subtle-button">Inloggen</Button>
      </PageHeader>
      <PageHeader title="Met logo en acties" logoSrc="/tilburg-logo.svg" logoAlt="Gemeente Tilburg" titleHref="/">
        <Button appearance="subtle-button">Inloggen</Button>
        <Button appearance="primary-action-button">Account</Button>
      </PageHeader>
    </div>
  ),
};
