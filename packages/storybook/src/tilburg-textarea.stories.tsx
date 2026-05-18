/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ReactNode } from 'react';

const meta = {
  title: 'Tilburg/Textarea',
  id: 'tilburg-textarea',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Ftextarea',
    docs: {
      description: {
        component:
          'Multi-line text input. Tilburg layer enforces minimum block/inline size and adds hover + focus-visible rules.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '32rem' }}>{children}</div>
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
      <label className="utrecht-form-label" style={labelStyle} htmlFor="ta-default">
        Toelichting
      </label>
      <textarea id="ta-default" className="utrecht-textarea" placeholder="Schrijf hier uw toelichting…" />
    </Row>
  ),
};

export const Filled: Story = {
  name: 'With value',
  render: () => (
    <Row>
      <label className="utrecht-form-label" style={labelStyle} htmlFor="ta-filled">
        Toelichting
      </label>
      <textarea
        id="ta-filled"
        className="utrecht-textarea"
        defaultValue="Ik wil graag een afspraak maken voor de aanvraag van een nieuwe vergunning."
      />
    </Row>
  ),
};

export const Invalid: Story = {
  name: 'Invalid',
  render: () => (
    <Row>
      <label className="utrecht-form-label" style={labelStyle} htmlFor="ta-invalid">
        Toelichting
      </label>
      <textarea id="ta-invalid" className="utrecht-textarea" defaultValue="ongeldige inhoud" aria-invalid="true" />
    </Row>
  ),
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <Row>
      <label className="utrecht-form-label" style={labelStyle} htmlFor="ta-disabled">
        Toelichting
      </label>
      <textarea
        id="ta-disabled"
        className="utrecht-textarea"
        defaultValue="Deze toelichting kan niet bewerkt worden."
        disabled
      />
    </Row>
  ),
};
