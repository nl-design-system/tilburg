/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

const meta = {
  title: 'Tilburg/Button',
  id: 'tilburg-button',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fbutton',
    docs: {
      description: {
        component: `Tilburg-specific button variants on top of utrecht: \`.tilburg-small / .tilburg-medium / .tilburg-large\` size classes and \`--secondary-action\` / \`--subtle\` focus overrides.

## Usage

### Angular

\`\`\`html
<tilburg-button appearance="primary-action" size="medium" (click)="submit()">
  Versturen
</tilburg-button>
\`\`\`

Inputs: \`appearance\` (\`'primary-action' | 'secondary-action' | 'subtle'\`), \`size\` (\`'small' | 'medium' | 'large'\`), \`type\`, \`disabled\`, \`title\`, \`ariaLabel\`, \`ariaDescribedBy\`, \`pressed\`.

### Plain HTML / CSS

\`\`\`html
<button type="button" class="utrecht-button utrecht-button--primary-action tilburg-medium">
  Versturen
</button>
\`\`\`

Combine one size class (\`tilburg-small | tilburg-medium | tilburg-large\`) with one appearance modifier (\`utrecht-button--primary-action | utrecht-button--secondary-action | utrecht-button--subtle\`).

## Vertical baseline shift (why button text is nudged down)

Tilburg buttons use **TradeGothicCondensed18**, whose vertical font metrics put more empty descent space below the baseline than ascent space above. With \`line-height: 1\` the line-box still includes that descent zone, and flex-centring the line-box places the visible letters in the upper half of the box — so the text reads as sitting *above* the geometric centre of the button.

We compensate by shifting the line-box downward via **asymmetric padding-block**: more \`padding-block-start\`, less \`padding-block-end\`. Total button height is unchanged; only the letters move down.

The amount is controlled by the local custom property \`--_tilburg-button-baseline-offset\`:

| Size class | Offset |
| --- | --- |
| \`.tilburg-small\` | \`2px\` |
| \`.tilburg-medium\` | \`2px\` |
| \`.tilburg-large\` | \`4px\` |

Small buttons need a smaller shift because their padding-block budget is smaller — the same 4px that optically centres a medium/large button visibly skews a small one.

See \`packages/components-css/button/index.scss\` for the exact rules; adjust the offset there if the optical centre still feels off after a font or token change.
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Btn = ({
  size,
  appearance,
  label = 'Label',
}: {
  size: 'tilburg-small' | 'tilburg-medium' | 'tilburg-large';
  appearance?: 'primary-action' | 'secondary-action' | 'subtle';
  label?: string;
}) => {
  const classes = ['utrecht-button', size];
  if (appearance === 'primary-action') classes.push('utrecht-button--primary-action');
  if (appearance === 'secondary-action') classes.push('utrecht-button--secondary-action');
  if (appearance === 'subtle') classes.push('utrecht-button--subtle');
  return (
    <button type="button" className={classes.join(' ')}>
      {label}
    </button>
  );
};

const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>{children}</div>
);

export const Sizes: Story = {
  name: 'Sizes (small / medium / large)',
  render: () => (
    <Row>
      <Btn size="tilburg-small" label="Small" />
      <Btn size="tilburg-medium" label="Medium" />
      <Btn size="tilburg-large" label="Large" />
    </Row>
  ),
};

export const PrimaryAction: Story = {
  name: 'Primary action',
  render: () => (
    <Row>
      <Btn size="tilburg-small" appearance="primary-action" label="Small" />
      <Btn size="tilburg-medium" appearance="primary-action" label="Medium" />
      <Btn size="tilburg-large" appearance="primary-action" label="Large" />
    </Row>
  ),
};

export const SecondaryAction: Story = {
  name: 'Secondary action',
  render: () => (
    <Row>
      <Btn size="tilburg-small" appearance="secondary-action" label="Small" />
      <Btn size="tilburg-medium" appearance="secondary-action" label="Medium" />
      <Btn size="tilburg-large" appearance="secondary-action" label="Large" />
    </Row>
  ),
};

export const Subtle: Story = {
  name: 'Subtle',
  render: () => (
    <Row>
      <Btn size="tilburg-small" appearance="subtle" label="Small" />
      <Btn size="tilburg-medium" appearance="subtle" label="Medium" />
      <Btn size="tilburg-large" appearance="subtle" label="Large" />
    </Row>
  ),
};
