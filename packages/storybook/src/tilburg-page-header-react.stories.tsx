/* @license CC0-1.0 */

import { Button, PageHeader } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-page-header.examples';

const meta = {
  title: 'Tilburg React/Page Header',
  id: 'tilburg-page-header-react',
  component: PageHeader,
  tags: ['autodocs', 'tilburg'],
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
    /* Each variant in its own labelled section: a <header> inside a section is not a banner landmark, so the story
       does not show four banners on one page. On a real page the header sits directly in <body>. */
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <section aria-label="Alleen titel">
        <PageHeader title="Alleen titel" titleHref="/" />
      </section>
      <section aria-label="Met logo">
        <PageHeader title="Met logo" logoSrc="logo-on-dark.svg" logoAlt="" titleHref="/" />
      </section>
      <section aria-label="Met acties">
        <PageHeader title="Met acties" titleHref="/">
          <Button appearance="subtle-button">Inloggen</Button>
        </PageHeader>
      </section>
      <section aria-label="Met logo en acties">
        <PageHeader title="Met logo en acties" logoSrc="logo-on-dark.svg" logoAlt="" titleHref="/">
          <Button appearance="subtle-button">Inloggen</Button>
          <Button appearance="primary-action-button">Account</Button>
        </PageHeader>
      </section>
    </div>
  ),
};
