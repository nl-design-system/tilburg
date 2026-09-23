/* @license CC0-1.0 */

import { TilburgWbcFormFieldDescription } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-form-field-description.examples';

/* Stencil `<tilburg-wbc-form-field-description>` rendered through its
   generated React proxy. The custom elements themselves are registered once in
   `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Form Field Description',
  id: 'tilburg-form-field-description-wbc',
  component: TilburgWbcFormFieldDescription,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcFormFieldDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <TilburgWbcFormFieldDescription>Default — gebruik je officiële e-mailadres.</TilburgWbcFormFieldDescription>
      <TilburgWbcFormFieldDescription valid>Valid — ziet er goed uit.</TilburgWbcFormFieldDescription>
      <TilburgWbcFormFieldDescription warning>
        Warning — dit veld is verplicht na 1 januari.
      </TilburgWbcFormFieldDescription>
      <TilburgWbcFormFieldDescription invalid>
        Invalid (role=alert) — dit e-mailadres is niet geldig.
      </TilburgWbcFormFieldDescription>
    </div>
  ),
};
