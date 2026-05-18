/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Language Toggle',
  id: 'tilburg-language-toggle',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Flanguage-toggle',
    docs: {
      description: {
        component: `Two-option toggle for switching between Dutch and English. Active option uses the Tilburg interaction-active colour with white text.

## Usage

### Angular

\`\`\`html
<tilburg-language-toggle
  [active]="currentLang"
  ariaLabel="Schakel taal"
  (toggle)="setLang($event)"
/>
\`\`\`

Inputs: \`options\` (\`TilburgLanguageOption[]\`, default \`[{code:'NL',label:'NL'},{code:'EN',label:'EN'}]\`), \`active\` (option code), \`ariaLabel\`. Output: \`(toggle)\` emits the next option code.

### Plain HTML / CSS

\`\`\`html
<button
  type="button"
  role="switch"
  aria-label="Schakel taal"
  aria-checked="false"
  class="tilburg-language-toggle utrecht-button utrecht-button--html-button utrecht-button--secondary-action"
>
  <span class="tilburg-language-toggle__option tilburg-language-toggle__option--active">NL</span>
  <span class="tilburg-language-toggle__option">EN</span>
</button>
\`\`\`
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Toggle = ({ active }: { active: 'NL' | 'EN' }) => (
  <button
    type="button"
    role="switch"
    aria-label="Schakel taal"
    aria-checked={active === 'EN'}
    className="tilburg-language-toggle utrecht-button utrecht-button--html-button utrecht-button--secondary-action"
  >
    <span
      className={`tilburg-language-toggle__option${active === 'NL' ? ' tilburg-language-toggle__option--active' : ''}`}
    >
      NL
    </span>
    <span
      className={`tilburg-language-toggle__option${active === 'EN' ? ' tilburg-language-toggle__option--active' : ''}`}
    >
      EN
    </span>
  </button>
);

export const NLActive: Story = {
  name: 'NL active',
  render: () => <Toggle active="NL" />,
};

export const ENActive: Story = {
  name: 'EN active',
  render: () => <Toggle active="EN" />,
};
