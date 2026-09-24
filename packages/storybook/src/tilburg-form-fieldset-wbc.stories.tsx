/* @license CC0-1.0 */

import {
  TilburgWbcCheckbox,
  TilburgWbcFieldset,
  TilburgWbcFormLabel,
  TilburgWbcRadioButton,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-form-fieldset.examples';

/* Stencil `<tilburg-wbc-fieldset>` (Angular `tilburg-fieldset`) rendered
   through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Fieldset',
  id: 'tilburg-form-fieldset-wbc',
  component: TilburgWbcFieldset,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcFieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <TilburgWbcFieldset>
        <legend>Default — voorkeuren</legend>
        <TilburgWbcFormLabel type="checkbox">
          <TilburgWbcCheckbox name="news" /> Nieuwsbrief
        </TilburgWbcFormLabel>
        <TilburgWbcFormLabel type="checkbox">
          <TilburgWbcCheckbox name="updates" /> Updates
        </TilburgWbcFormLabel>
      </TilburgWbcFieldset>
      <TilburgWbcFieldset invalid>
        <legend>Invalid (aria-invalid=true)</legend>
        <TilburgWbcFormLabel type="radio">
          <TilburgWbcRadioButton name="fs-wbc-r1" value="a" invalid /> Optie A
        </TilburgWbcFormLabel>
        <TilburgWbcFormLabel type="radio">
          <TilburgWbcRadioButton name="fs-wbc-r1" value="b" invalid /> Optie B
        </TilburgWbcFormLabel>
      </TilburgWbcFieldset>
      <TilburgWbcFieldset disabled>
        <legend>Disabled</legend>
        <TilburgWbcFormLabel type="checkbox" disabled>
          <TilburgWbcCheckbox name="d1" disabled /> Niet selecteerbaar
        </TilburgWbcFormLabel>
      </TilburgWbcFieldset>
    </div>
  ),
};
