/* @license CC0-1.0 */

import { TilburgWbcListbox } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-listbox.examples';

/* Stencil `<tilburg-wbc-listbox>` rendered through its generated React proxy. The custom elements themselves are
   registered once in `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Listbox',
  id: 'tilburg-listbox-wbc',
  component: TilburgWbcListbox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcListbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const stadsdelen = ['Centrum', 'Noord', 'Oud-Zuid', 'Reeshof', 'West', 'Berkel-Enschot', 'Udenhout'].map((label) => ({
  value: label.toLowerCase(),
  label,
}));

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxInlineSize: '24rem' }}>
      <div>
        <span className="utrecht-form-label" id="listbox-wbc-single-label">
          Stadsdeel
        </span>
        <TilburgWbcListbox
          aria-labelledby="listbox-wbc-single-label"
          items={stadsdelen}
          value="noord"
          name="stadsdeel"
        />
      </div>
      <div>
        <span className="utrecht-form-label" id="listbox-wbc-multiple-label">
          Stadsdelen waarover je nieuws wilt ontvangen
        </span>
        <TilburgWbcListbox
          aria-labelledby="listbox-wbc-multiple-label"
          items={stadsdelen}
          multiple
          value={['centrum', 'reeshof']}
        />
      </div>
      <div>
        <span className="utrecht-form-label" id="listbox-wbc-invalid-label">
          Stadsdeel (verplicht)
        </span>
        <TilburgWbcListbox aria-labelledby="listbox-wbc-invalid-label" items={stadsdelen} invalid required />
      </div>
      <div>
        <span className="utrecht-form-label" id="listbox-wbc-disabled-label">
          Stadsdeel (niet te wijzigen)
        </span>
        <TilburgWbcListbox aria-labelledby="listbox-wbc-disabled-label" items={stadsdelen} value="oud-zuid" disabled />
      </div>
    </div>
  ),
};
