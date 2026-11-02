/* @license CC0-1.0 */

import { PageFooter } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-page-footer.examples';

const meta = {
  title: 'Tilburg React/Page Footer',
  id: 'tilburg-page-footer-react',
  component: PageFooter,
  tags: ['autodocs', 'tilburg'],
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
    /* Each variant in its own labelled section, so the story has no repeated contentinfo landmark. */
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <section aria-label="Met links">
        <PageFooter
          links={[
            { label: 'Privacy', href: '/privacy' },
            { label: 'Toegankelijkheid', href: '/a11y' },
            { label: 'Contact', href: '/contact' },
          ]}
        />
      </section>
      <section aria-label="Met hoofdlink">
        <PageFooter primaryLink={{ label: 'Gemeente Tilburg', href: '/' }} />
      </section>
      <section aria-label="Met hoofdlink, links en inhoud">
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
      </section>
    </div>
  ),
};
