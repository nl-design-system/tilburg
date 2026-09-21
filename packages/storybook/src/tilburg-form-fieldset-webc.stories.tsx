/* @license CC0-1.0 */

import {
  TilburgWebcCheckbox,
  TilburgWebcFieldset,
  TilburgWebcFormLabel,
  TilburgWebcRadioButton,
} from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-form-fieldset.examples';

/* Stencil `<tilburg-webc-fieldset>` (Angular `tilburg-fieldset`) rendered
   through its generated React proxy. */

const meta = {
  title: 'Tilburg Web Components/Fieldset',
  id: 'tilburg-form-fieldset-webc',
  component: TilburgWebcFieldset,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcFieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <TilburgWebcFieldset>
        <legend>Default — voorkeuren</legend>
        <TilburgWebcFormLabel type="checkbox">
          <TilburgWebcCheckbox name="news" /> Nieuwsbrief
        </TilburgWebcFormLabel>
        <TilburgWebcFormLabel type="checkbox">
          <TilburgWebcCheckbox name="updates" /> Updates
        </TilburgWebcFormLabel>
      </TilburgWebcFieldset>
      <TilburgWebcFieldset invalid>
        <legend>Invalid (aria-invalid=true)</legend>
        <TilburgWebcFormLabel type="radio">
          <TilburgWebcRadioButton name="fs-webc-r1" value="a" invalid /> Optie A
        </TilburgWebcFormLabel>
        <TilburgWebcFormLabel type="radio">
          <TilburgWebcRadioButton name="fs-webc-r1" value="b" invalid /> Optie B
        </TilburgWebcFormLabel>
      </TilburgWebcFieldset>
      <TilburgWebcFieldset disabled>
        <legend>Disabled</legend>
        <TilburgWebcFormLabel type="checkbox" disabled>
          <TilburgWebcCheckbox name="d1" disabled /> Niet selecteerbaar
        </TilburgWebcFormLabel>
      </TilburgWebcFieldset>
    </div>
  ),
};
