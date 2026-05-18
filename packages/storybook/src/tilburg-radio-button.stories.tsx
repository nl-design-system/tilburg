/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

const meta = {
  title: 'Tilburg/Radio Button',
  id: 'tilburg-radio-button',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fradio-button',
    docs: {
      description: {
        component:
          'Radio button with Tilburg-specific focus, hover, active, and checked states layered on top of `.utrecht-radio-button`.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem', marginBlockEnd: '0.5rem' }}>{children}</div>
);

const baseClasses = 'utrecht-radio-button utrecht-radio-button--html-input';

export const Group: Story = {
  name: 'Group (one checked)',
  render: () => (
    <fieldset style={{ border: '0', padding: 0 }}>
      <legend className="utrecht-form-label utrecht-form-label--radio">Hoe wilt u uw aanvraag ontvangen?</legend>
      <Row>
        <input id="rb-email" type="radio" name="delivery" value="email" className={baseClasses} defaultChecked />
        <label className="utrecht-form-label utrecht-form-label--radio" htmlFor="rb-email">
          E-mail
        </label>
      </Row>
      <Row>
        <input id="rb-post" type="radio" name="delivery" value="post" className={baseClasses} />
        <label className="utrecht-form-label utrecht-form-label--radio" htmlFor="rb-post">
          Per post
        </label>
      </Row>
      <Row>
        <input id="rb-pickup" type="radio" name="delivery" value="pickup" className={baseClasses} />
        <label className="utrecht-form-label utrecht-form-label--radio" htmlFor="rb-pickup">
          Ophalen bij de balie
        </label>
      </Row>
    </fieldset>
  ),
};

export const Disabled: Story = {
  name: 'Disabled options',
  render: () => (
    <fieldset style={{ border: '0', padding: 0 }}>
      <legend className="utrecht-form-label utrecht-form-label--radio">Niet beschikbaar</legend>
      <Row>
        <input id="rb-d1" type="radio" name="disabled" value="a" className={baseClasses} disabled />
        <label className="utrecht-form-label utrecht-form-label--radio" htmlFor="rb-d1">
          Disabled (unchecked)
        </label>
      </Row>
      <Row>
        <input id="rb-d2" type="radio" name="disabled" value="b" className={baseClasses} defaultChecked disabled />
        <label className="utrecht-form-label utrecht-form-label--radio" htmlFor="rb-d2">
          Disabled (checked)
        </label>
      </Row>
    </fieldset>
  ),
};
