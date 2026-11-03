/* @license CC0-1.0 */

import { Listbox, ValidationMessage } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-listbox.examples';

const meta = {
  title: 'Tilburg React/Listbox',
  id: 'tilburg-listbox-react',
  component: Listbox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Listbox>;

export default meta;
/* Stories render their own state, so they don't take args. */
type Story = StoryObj;

const stadsdelen = ['Centrum', 'Noord', 'Oud-Zuid', 'Reeshof', 'West', 'Berkel-Enschot', 'Udenhout'].map((label) => ({
  value: label.toLowerCase(),
  label,
}));

const Single = () => {
  const [value, setValue] = useState<string | null>('noord');
  return (
    <div style={{ maxInlineSize: '24rem' }}>
      <span className="utrecht-form-label" id="listbox-react-single-label">
        Stadsdeel: {value ?? 'geen'}
      </span>
      <Listbox aria-labelledby="listbox-react-single-label" items={stadsdelen} value={value} onChange={setValue} />
    </div>
  );
};

export const AllPermutations: Story = {
  render: () => (
    <>
      <Single />
      <div style={{ maxInlineSize: '24rem' }}>
        <span className="utrecht-form-label" id="listbox-react-multiple-label">
          Stadsdelen waarover je nieuws wilt ontvangen
        </span>
        <Listbox
          aria-labelledby="listbox-react-multiple-label"
          items={stadsdelen}
          multiple
          defaultValue={['centrum', 'reeshof']}
        />
      </div>
      <div style={{ maxInlineSize: '24rem' }}>
        <span className="utrecht-form-label" id="listbox-react-invalid-label">
          Stadsdeel (verplicht)
        </span>
        <Listbox
          aria-labelledby="listbox-react-invalid-label"
          aria-describedby="listbox-react-invalid-error"
          items={stadsdelen}
          invalid
          required
        />
        <ValidationMessage id="listbox-react-invalid-error">Kies een stadsdeel.</ValidationMessage>
      </div>
      <div style={{ maxInlineSize: '24rem' }}>
        <span className="utrecht-form-label" id="listbox-react-disabled-label">
          Stadsdeel (niet te wijzigen)
        </span>
        <Listbox aria-labelledby="listbox-react-disabled-label" items={stadsdelen} defaultValue="oud-zuid" disabled />
      </div>
    </>
  ),
};
