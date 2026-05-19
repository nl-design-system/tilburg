/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Paragraph',
  id: 'tilburg-paragraph',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fparagraph',
    docs: {
      description: {
        component: `Body text paragraph. Three size modes: default, \`lead\` (slightly larger, for intro text), and \`small\` (used in captions / small print). All three inherit Tilburg's body font + colour via the utrecht-paragraph token chain.

## Usage

### Angular

\`\`\`html
<tilburg-paragraph>Standaard alinea.</tilburg-paragraph>
<tilburg-paragraph [lead]="true">Inleidende alinea, iets groter.</tilburg-paragraph>
<tilburg-paragraph [small]="true">Kleine print onderaan een sectie.</tilburg-paragraph>
\`\`\`

Inputs: \`lead\` (boolean), \`small\` (boolean).

### Plain HTML / CSS

\`\`\`html
<p class="utrecht-paragraph">Standaard alinea.</p>
<p class="utrecht-paragraph utrecht-paragraph--lead">Inleidende alinea.</p>
<p class="utrecht-paragraph utrecht-paragraph--small">Kleine print.</p>
\`\`\`
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const COPY =
  'Tilburg, gelegen in het zuiden van Nederland, is een bruisende stad met een rijke geschiedenis en een levendige cultuur.';

export const Default: Story = {
  name: 'Default',
  render: () => <p className="utrecht-paragraph">{COPY}</p>,
};

export const Lead: Story = {
  name: 'Lead',
  render: () => <p className="utrecht-paragraph utrecht-paragraph--lead">{COPY}</p>,
};

export const Small: Story = {
  name: 'Small',
  render: () => <p className="utrecht-paragraph utrecht-paragraph--small">{COPY}</p>,
};
