/* @license CC0-1.0 */

import { TilburgWbcValidationMessage } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-validation-message.examples';

/* Stencil `<tilburg-wbc-validation-message>` rendered through its generated
   React proxy. The custom elements themselves are registered once in
   `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Validation Message',
  id: 'tilburg-validation-message-wbc',
  component: TilburgWbcValidationMessage,
  tags: ['autodocs', 'tilburg'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcValidationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

const Bang = () => (
  <span slot="icon" aria-hidden="true">
    !
  </span>
);

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <TilburgWbcValidationMessage type="error">Error — dit veld is verplicht.</TilburgWbcValidationMessage>
      <TilburgWbcValidationMessage type="error">
        <Bang />
        Error met icoon — vul een geldig e-mailadres in.
      </TilburgWbcValidationMessage>
      <TilburgWbcValidationMessage type="warning">Warning — deze waarde is ongebruikelijk.</TilburgWbcValidationMessage>
      <TilburgWbcValidationMessage type="warning">
        <Bang />
        Warning met icoon — controleer je invoer.
      </TilburgWbcValidationMessage>
      <TilburgWbcValidationMessage type="error" liveRegion="assertive">
        Error met live-region=&quot;assertive&quot;.
      </TilburgWbcValidationMessage>
    </div>
  ),
};
