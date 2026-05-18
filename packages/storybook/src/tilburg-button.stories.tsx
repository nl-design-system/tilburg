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
