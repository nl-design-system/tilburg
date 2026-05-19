/* @license CC0-1.0 */

import { Page, PageContent, PageFooter, PageHeader, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg React/Page',
  id: 'tilburg-page-react',
  component: Page,
  tags: ['autodocs'],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Page>
      <Paragraph>Pagina-inhoud cascadeert vanuit Page.</Paragraph>
    </Page>
  ),
};

export const FullLayout: Story = {
  render: () => (
    <Page>
      <PageHeader title="Gemeente Tilburg" titleHref="/" />
      <PageContent>
        <Paragraph>Hoofdinhoud van de pagina.</Paragraph>
      </PageContent>
      <PageFooter
        links={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Toegankelijkheid', href: '/a11y' },
        ]}
      />
    </Page>
  ),
};
