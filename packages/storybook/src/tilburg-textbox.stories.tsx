/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';

const meta = {
  title: 'Tilburg/Textbox',
  id: 'tilburg-textbox',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Ftextbox',
    docs: {
      description: {
        component: `Single-line text input. Tilburg layer adds hover and focus-visible rules on top of utrecht-textbox.

## Usage

### Angular

\`\`\`html
<label class="utrecht-form-label" for="email">E-mailadres</label>
<tilburg-textbox
  id="email"
  type="email"
  [control]="form.controls.email"
  placeholder="naam@voorbeeld.nl"
  [required]="true"
/>
\`\`\`

Inputs: \`id\`, \`control\` (\`FormControl\`), \`type\`, \`name\`, \`placeholder\`, \`dir\`, \`inputMode\`, \`disabled\`, \`invalid\`, \`required\`, \`readonly\`, \`ariaLabel\`, \`ariaDescribedBy\`.

### Plain HTML / CSS

\`\`\`html
<label class="utrecht-form-label" for="email">E-mailadres</label>
<input
  id="email"
  type="email"
  class="utrecht-textbox utrecht-textbox--html-input"
  placeholder="naam@voorbeeld.nl"
/>
\`\`\`
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '24rem' }}>{children}</div>
);

const labelStyle: CSSProperties = {
  display: 'block',
  fontWeight: 700,
  marginBottom: '0.25rem',
};

export const Default: Story = {
  name: 'Default',
  render: () => (
    <Row>
      <label className="utrecht-form-label" style={labelStyle} htmlFor="tb-default">
        E-mailadres
      </label>
      <input
        id="tb-default"
        type="text"
        className="utrecht-textbox utrecht-textbox--html-input"
        placeholder="naam@voorbeeld.nl"
      />
    </Row>
  ),
};

export const Filled: Story = {
  name: 'With value',
  render: () => (
    <Row>
      <label className="utrecht-form-label" style={labelStyle} htmlFor="tb-filled">
        Voornaam
      </label>
      <input id="tb-filled" type="text" className="utrecht-textbox utrecht-textbox--html-input" defaultValue="Jan" />
    </Row>
  ),
};

export const Invalid: Story = {
  name: 'Invalid',
  render: () => (
    <Row>
      <label className="utrecht-form-label" style={labelStyle} htmlFor="tb-invalid">
        E-mailadres
      </label>
      <input
        id="tb-invalid"
        type="email"
        className="utrecht-textbox utrecht-textbox--html-input"
        defaultValue="niet-geldig"
        aria-invalid="true"
      />
    </Row>
  ),
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <Row>
      <label className="utrecht-form-label" style={labelStyle} htmlFor="tb-disabled">
        Burgerservicenummer
      </label>
      <input
        id="tb-disabled"
        type="text"
        className="utrecht-textbox utrecht-textbox--html-input"
        defaultValue="123456789"
        disabled
      />
    </Row>
  ),
};
