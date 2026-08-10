/* @license CC0-1.0 */

import { PageFooter } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-page-footer.examples';

const meta = {
  title: 'Tilburg React/Page Footer',
  id: 'tilburg-page-footer-react',
  component: PageFooter,
  tags: ['autodocs'],
  parameters: {
    bugs,
    /* Matches the HTML/CSS reference stories: the footer is a full-bleed bar,
       so the default 1rem canvas padding would misrepresent it. */
    layout: 'fullscreen',
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof PageFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <PageFooter
        links={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Toegankelijkheid', href: '/a11y' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
      <PageFooter primaryLink={{ label: 'Gemeente Tilburg', href: '/' }} />
      <PageFooter
        primaryLink={{ label: 'Gemeente Tilburg', href: '/' }}
        links={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Toegankelijkheid', href: '/a11y' },
          { label: 'Contact', href: '/contact' },
        ]}
      >
        Aanvullende footer-inhoud (children).
      </PageFooter>
    </div>
  ),
};
