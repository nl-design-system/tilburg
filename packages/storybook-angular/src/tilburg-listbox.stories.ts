/* @license CC0-1.0 */

import { FormControl } from '@angular/forms';
import { TilburgListbox } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-listbox.examples';

type Item = { value: string; displayValue: string };

const meta: Meta<TilburgListbox<Item>> = {
  title: 'Tilburg Angular/Listbox',
  id: 'tilburg-listbox-angular',
  component: TilburgListbox,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgListbox<Item>>;

const stadsdelen: Item[] = ['Centrum', 'Noord', 'Oud-Zuid', 'Reeshof', 'West', 'Berkel-Enschot', 'Udenhout'].map(
  (displayValue) => ({ value: displayValue.toLowerCase(), displayValue }),
);

export const Single: Story = {
  name: 'Single select',
  render: () => ({
    props: { control: new FormControl('noord'), items: stadsdelen },
    template: `
      <div style="max-inline-size:24rem">
        <span class="utrecht-form-label" id="listbox-ng-single-label">Stadsdeel: {{ control.value }}</span>
        <tilburg-listbox ariaLabelledBy="listbox-ng-single-label" [items]="items" [control]="control"></tilburg-listbox>
      </div>
    `,
  }),
};

export const Multiple: Story = {
  name: 'Multiple select',
  render: () => ({
    props: { control: new FormControl(['centrum', 'reeshof']), items: stadsdelen },
    template: `
      <div style="max-inline-size:24rem">
        <span class="utrecht-form-label" id="listbox-ng-multiple-label">Stadsdelen waarover je nieuws wilt ontvangen</span>
        <tilburg-listbox ariaLabelledBy="listbox-ng-multiple-label" [items]="items" [multiple]="true" [control]="control"></tilburg-listbox>
      </div>
    `,
  }),
};

export const InvalidAndDisabled: Story = {
  name: 'Invalid and disabled',
  render: () => ({
    props: { items: stadsdelen },
    template: `
      <div style="max-inline-size:24rem">
        <span class="utrecht-form-label" id="listbox-ng-invalid-label">Stadsdeel (verplicht)</span>
        <tilburg-listbox ariaLabelledBy="listbox-ng-invalid-label" [items]="items" [invalid]="true" [required]="true"></tilburg-listbox>
        <span class="utrecht-form-label" id="listbox-ng-disabled-label">Stadsdeel (niet te wijzigen)</span>
        <tilburg-listbox ariaLabelledBy="listbox-ng-disabled-label" [items]="items" value="oud-zuid" [disabled]="true"></tilburg-listbox>
      </div>
    `,
  }),
};
