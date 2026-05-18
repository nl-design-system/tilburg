/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Unordered List',
  id: 'tilburg-unordered-list',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Funordered-list',
    docs: {
      description: {
        component: `Bulleted list built on \`.tilburg-unordered-list\` + \`.utrecht-unordered-list__item\`. Inherits utrecht spacing tokens and marker colour; disc markers by default.

## Usage

### Angular

\`\`\`html
<tilburg-unordered-list>
  <li class="utrecht-unordered-list__item">Eerste item</li>
  <li class="utrecht-unordered-list__item">Tweede item</li>
</tilburg-unordered-list>
\`\`\`

No inputs.

### Plain HTML / CSS

\`\`\`html
<ul class="tilburg-unordered-list utrecht-unordered-list utrecht-unordered-list--html-ul">
  <li class="utrecht-unordered-list__item">Eerste item</li>
  <li class="utrecht-unordered-list__item">Tweede item</li>
</ul>
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
    <ul className="tilburg-unordered-list utrecht-unordered-list utrecht-unordered-list--html-ul">
      <li className="utrecht-unordered-list__item">
        In deze app staan niet de dagen waarop wij de wijkcontainers legen, alleen de huiscontainers (kliko&apos;s).
      </li>
      <li className="utrecht-unordered-list__item">
        U kunt uw afval gescheiden aanbieden via de kliko of de milieustraat.
      </li>
      <li className="utrecht-unordered-list__item">
        Op feestdagen kan de ophaaldag verschuiven; controleer de afvalkalender.
      </li>
    </ul>
  ),
};

export const Nested: Story = {
  name: 'Nested',
  render: () => (
    <ul className="tilburg-unordered-list utrecht-unordered-list utrecht-unordered-list--html-ul">
      <li className="utrecht-unordered-list__item">
        Aanvragen
        <ul className="tilburg-unordered-list utrecht-unordered-list utrecht-unordered-list--html-ul">
          <li className="utrecht-unordered-list__item">Vergunningen</li>
          <li className="utrecht-unordered-list__item">Subsidies</li>
        </ul>
      </li>
      <li className="utrecht-unordered-list__item">Contact</li>
    </ul>
  ),
};
