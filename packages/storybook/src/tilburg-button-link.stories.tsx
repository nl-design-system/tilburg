/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Button Link',
  id: 'tilburg-button-link',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fbutton-link',
    docs: {
      description: {
        component: `Anchor styled like a button — same visual treatment as \`<tilburg-button>\` but rendered as an \`<a>\` for navigation that needs URL semantics (right-click, copy link, middle-click new tab, etc.). Three appearance modifiers: \`--primary-action\`, \`--secondary-action\`, \`--subtle\`.

## Usage

### Angular

\`\`\`html
<a tilburg-button-link appearance="primary-action-button" href="/aanvraag/nieuw">
  Nieuwe aanvraag starten
</a>
\`\`\`

Inputs: \`appearance\` (\`'primary-action-button' | 'secondary-action-button' | 'subtle-button'\`), \`external\` (sets \`rel="external noopener noreferrer"\`).

### Plain HTML / CSS

\`\`\`html
<a href="/aanvraag/nieuw"
   class="utrecht-button-link utrecht-button-link--html-a utrecht-button-link--primary-action">
  Nieuwe aanvraag starten
</a>
\`\`\`
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryAction: Story = {
  name: 'Primary action',
  render: () => (
    <a href="#" className="utrecht-button-link utrecht-button-link--html-a utrecht-button-link--primary-action">
      Nieuwe aanvraag starten
    </a>
  ),
};

export const SecondaryAction: Story = {
  name: 'Secondary action',
  render: () => (
    <a href="#" className="utrecht-button-link utrecht-button-link--html-a utrecht-button-link--secondary-action">
      Meer informatie
    </a>
  ),
};

export const Subtle: Story = {
  name: 'Subtle',
  render: () => (
    <a href="#" className="utrecht-button-link utrecht-button-link--html-a utrecht-button-link--subtle">
      Ga terug
    </a>
  ),
};
