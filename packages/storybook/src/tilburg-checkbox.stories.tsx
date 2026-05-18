/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

const meta = {
  title: 'Tilburg/Checkbox',
  id: 'tilburg-checkbox',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fcheckbox',
    docs: {
      description: {
        component:
          'Custom-styled checkbox built on `.utrecht-checkbox--custom`. Tilburg layer adds invalid-state background, focus-visible borders, and the inline SVG check mark on the focused-checked state.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem', marginBlockEnd: '0.5rem' }}>{children}</div>
);

const baseClasses = 'utrecht-checkbox utrecht-checkbox--html-input utrecht-checkbox--custom';

export const Unchecked: Story = {
  name: 'Unchecked',
  render: () => (
    <Row>
      <input id="cb-unchecked" type="checkbox" className={baseClasses} />
      <label className="utrecht-form-label" htmlFor="cb-unchecked">
        Ik ga akkoord met de voorwaarden
      </label>
    </Row>
  ),
};

export const Checked: Story = {
  name: 'Checked',
  render: () => (
    <Row>
      <input id="cb-checked" type="checkbox" className={baseClasses} defaultChecked />
      <label className="utrecht-form-label" htmlFor="cb-checked">
        Ik ga akkoord met de voorwaarden
      </label>
    </Row>
  ),
};

export const Invalid: Story = {
  name: 'Invalid',
  render: () => (
    <Row>
      <input id="cb-invalid" type="checkbox" className={baseClasses} required aria-invalid="true" />
      <label className="utrecht-form-label" htmlFor="cb-invalid">
        Verplicht akkoord
      </label>
    </Row>
  ),
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <>
      <Row>
        <input id="cb-disabled" type="checkbox" className={baseClasses} disabled />
        <label className="utrecht-form-label" htmlFor="cb-disabled">
          Disabled (unchecked)
        </label>
      </Row>
      <Row>
        <input id="cb-disabled-checked" type="checkbox" className={baseClasses} defaultChecked disabled />
        <label className="utrecht-form-label" htmlFor="cb-disabled-checked">
          Disabled (checked)
        </label>
      </Row>
    </>
  ),
};
