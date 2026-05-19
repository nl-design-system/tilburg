/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { createElement } from 'react';

const meta = {
  title: 'Tilburg/Page Content',
  id: 'tilburg-page-content',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fpage-content',
    docs: {
      description: {
        component: `Main content region of a page. Sits inside \`<tilburg-page>\` between the header and footer; provides a constrained max-inline-size and consistent inline padding.

## Usage

### Angular

\`\`\`html
<tilburg-page-content>
  <tilburg-heading-1>Aanvraag indienen</tilburg-heading-1>
  <tilburg-paragraph>Vul de gegevens in om de aanvraag te starten.</tilburg-paragraph>
</tilburg-page-content>
\`\`\`

### Plain HTML / CSS

\`\`\`html
<main class="utrecht-page-content">
  <!-- main content -->
</main>
\`\`\`
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  render: () => (
    <main className="utrecht-page-content" style={{ maxWidth: '1150px', marginInline: 'auto', padding: '1rem' }}>
      {createElement(
        'utrecht-heading-1',
        null,
        createElement('h1', { className: 'utrecht-heading-1' }, 'Aanvraag indienen'),
      )}
      <p className="utrecht-paragraph">Vul de gegevens in om de aanvraag te starten.</p>
    </main>
  ),
};
