/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Form Field',
  id: 'tilburg-form-field',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fform-field',
    docs: {
      description: {
        component: `Form field grouping a label, description, and control. The Tilburg layer adds a \`tilburg-warning\` modifier that colours the field with the warning palette (used for non-blocking advisory messages).

## Usage

### Angular

\`\`\`html
<tilburg-form-field type="text" [invalid]="emailCtrl.invalid && emailCtrl.touched" [warning]="aboutToExpire">
  <label class="utrecht-form-label" for="email">E-mailadres</label>
  <tilburg-textbox id="email" [control]="emailCtrl" />
  <tilburg-validation-message *ngIf="emailCtrl.invalid && emailCtrl.touched" type="error">
    Vul een geldig e-mailadres in.
  </tilburg-validation-message>
</tilburg-form-field>
\`\`\`

Inputs: \`invalid\`, \`warning\`, \`type\` (\`'checkbox' | 'radio' | 'text'\`), \`class\`.

### Plain HTML / CSS

\`\`\`html
<!-- Standard invalid -->
<div class="utrecht-form-field utrecht-form-field--text utrecht-form-field--invalid">
  …
</div>

<!-- Tilburg warning -->
<div class="utrecht-form-field utrecht-form-field--text utrecht-form-field--invalid tilburg-warning">
  …
</div>
\`\`\`

Adding \`tilburg-warning\` on top of \`utrecht-form-field--invalid\` swaps the invalid colour set for the warning palette.
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const TriangleIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 1 1 19h18L10 1Zm0 5 1 7h-2l1-7Zm0 9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
  </svg>
);

const CircleIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm1 13H9v-2h2v2Zm0-4H9V5h2v5Z" />
  </svg>
);

export const Default: Story = {
  name: 'Default',
  render: () => (
    <div className="utrecht-form-field utrecht-form-field--text" style={{ maxWidth: '24rem' }}>
      <label className="utrecht-form-label" htmlFor="ff-default">
        E-mailadres
      </label>
      <div className="utrecht-form-field-description">We gebruiken dit alleen om u te bereiken.</div>
      <input
        id="ff-default"
        type="email"
        className="utrecht-textbox utrecht-textbox--html-input"
        placeholder="naam@voorbeeld.nl"
      />
    </div>
  ),
};

export const Invalid: Story = {
  name: 'Invalid',
  render: () => (
    <div
      className="utrecht-form-field utrecht-form-field--text utrecht-form-field--invalid"
      style={{ maxWidth: '24rem' }}
    >
      <label className="utrecht-form-label utrecht-form-label--invalid" htmlFor="ff-invalid">
        E-mailadres
      </label>
      <input
        id="ff-invalid"
        type="email"
        className="utrecht-textbox utrecht-textbox--html-input utrecht-textbox--invalid"
        defaultValue="niet-geldig"
        aria-invalid="true"
        aria-describedby="ff-invalid-error"
      />
      <div
        id="ff-invalid-error"
        className="tilburg-validation-message tilburg-validation-message--error utrecht-form-field-error-message"
        role="alert"
        aria-live="polite"
      >
        <span className="tilburg-validation-message__icon" aria-hidden="true">
          <CircleIcon />
        </span>
        <span>Vul een geldig e-mailadres in.</span>
      </div>
    </div>
  ),
};

export const Warning: Story = {
  name: 'Warning (Tilburg modifier)',
  parameters: {
    docs: {
      description: {
        story:
          'Adding the `tilburg-warning` class on top of `utrecht-form-field` swaps the invalid colour set for the warning palette. Use for advisory messages that should not block submission.',
      },
    },
  },
  render: () => (
    <div
      className="utrecht-form-field utrecht-form-field--text utrecht-form-field--invalid tilburg-warning"
      style={{ maxWidth: '24rem' }}
    >
      <label className="utrecht-form-label" htmlFor="ff-warning">
        Aanvraagdatum
      </label>
      <input
        id="ff-warning"
        type="text"
        className="utrecht-textbox utrecht-textbox--html-input utrecht-textbox--invalid"
        defaultValue="2026-05-31"
        aria-describedby="ff-warning-msg"
      />
      <div
        id="ff-warning-msg"
        className="tilburg-validation-message tilburg-validation-message--warning utrecht-form-field-description utrecht-form-field-description--warning"
        role="alert"
        aria-live="polite"
      >
        <span className="tilburg-validation-message__icon" aria-hidden="true">
          <TriangleIcon />
        </span>
        <span>De aanvraagperiode sluit binnenkort.</span>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <div
      className="utrecht-form-field utrecht-form-field--text utrecht-form-field--disabled"
      style={{ maxWidth: '24rem' }}
    >
      <label className="utrecht-form-label utrecht-form-label--disabled" htmlFor="ff-disabled">
        Burgerservicenummer
      </label>
      <input
        id="ff-disabled"
        type="text"
        className="utrecht-textbox utrecht-textbox--html-input"
        defaultValue="123456789"
        disabled
      />
    </div>
  ),
};
