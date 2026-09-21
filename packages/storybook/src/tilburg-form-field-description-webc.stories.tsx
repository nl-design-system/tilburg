/* @license CC0-1.0 */

import { TilburgWebcFormFieldDescription } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-form-field-description.examples';

/* Stencil `<tilburg-webc-form-field-description>` rendered through its
   generated React proxy. The custom elements themselves are registered once in
   `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Form Field Description',
  id: 'tilburg-form-field-description-webc',
  component: TilburgWebcFormFieldDescription,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcFormFieldDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <TilburgWebcFormFieldDescription>Default — gebruik je officiële e-mailadres.</TilburgWebcFormFieldDescription>
      <TilburgWebcFormFieldDescription valid>Valid — ziet er goed uit.</TilburgWebcFormFieldDescription>
      <TilburgWebcFormFieldDescription warning>
        Warning — dit veld is verplicht na 1 januari.
      </TilburgWebcFormFieldDescription>
      <TilburgWebcFormFieldDescription invalid>
        Invalid (role=alert) — dit e-mailadres is niet geldig.
      </TilburgWebcFormFieldDescription>
    </div>
  ),
};
