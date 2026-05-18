/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Link',
  id: 'tilburg-link',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Flink',
    docs: {
      description: {
        component: `Inline link built on \`.utrecht-link\` + \`.utrecht-link--html-a\`. Tilburg layer adds an underline on \`:visited\`, shifts hover to the visited colour, and inverts the foreground to white on focus (matches the rest of the interaction surface).

## Usage

### Angular

\`\`\`html
<tilburg-link href="/parkeren" target="_blank">Parkeren in Tilburg</tilburg-link>
\`\`\`

Inputs: \`href\`, \`target\`, \`rel\`, \`external\`, \`current\` (\`'page' | 'step' | 'location' | 'date' | 'time' | boolean\`), \`ariaLabel\`, \`ariaDescribedBy\`.

### Plain HTML / CSS

\`\`\`html
<a class="utrecht-link utrecht-link--html-a" href="/parkeren">Parkeren in Tilburg</a>
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
    <a className="utrecht-link utrecht-link--html-a" href="#">
      Parkeren in Tilburg
    </a>
  ),
};

export const InParagraph: Story = {
  name: 'In a paragraph',
  render: () => (
    <p className="utrecht-paragraph">
      Tilburg, gelegen in het zuiden van Nederland, is een bruisende stad met een rijke geschiedenis en een levendige
      cultuur. Bekijk de{' '}
      <a className="utrecht-link utrecht-link--html-a" href="#">
        website van Tilburg
      </a>{' '}
      voor actuele informatie en evenementen.
    </p>
  ),
};

export const ExternalLink: Story = {
  name: 'External link',
  render: () => (
    <a
      className="utrecht-link utrecht-link--html-a"
      href="https://nldesignsystem.nl"
      rel="external noopener noreferrer"
      target="_blank"
    >
      NL Design System ↗
    </a>
  ),
};
