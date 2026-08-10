/* @license CC0-1.0 */

import { Button, PageHeader } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-page-header.examples';

const meta = {
  title: 'Tilburg React/Page Header',
  id: 'tilburg-page-header-react',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    bugs,
    /* Matches the HTML/CSS reference stories: the header is a full-bleed brand
       bar, so the default 1rem canvas padding would misrepresent it. */
    layout: 'fullscreen',
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <PageHeader title="Alleen titel" titleHref="/" />
      <PageHeader title="Met logo" logoSrc="/logo-on-dark.svg" logoAlt="" titleHref="/" />
      <PageHeader title="Met acties" titleHref="/">
        <Button appearance="subtle-button">Inloggen</Button>
      </PageHeader>
      <PageHeader title="Met logo en acties" logoSrc="/logo-on-dark.svg" logoAlt="" titleHref="/">
        <Button appearance="subtle-button">Inloggen</Button>
        <Button appearance="primary-action-button">Account</Button>
      </PageHeader>
    </div>
  ),
};
