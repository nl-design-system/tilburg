/* @license CC0-1.0 */

import { TilburgWebcValidationMessage } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-validation-message.examples';

/* Stencil `<tilburg-webc-validation-message>` rendered through its generated
   React proxy. The custom elements themselves are registered once in
   `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Validation Message',
  id: 'tilburg-validation-message-webc',
  component: TilburgWebcValidationMessage,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcValidationMessage>;

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
      <TilburgWebcValidationMessage type="error">Error — dit veld is verplicht.</TilburgWebcValidationMessage>
      <TilburgWebcValidationMessage type="error">
        <Bang />
        Error met icoon — vul een geldig e-mailadres in.
      </TilburgWebcValidationMessage>
      <TilburgWebcValidationMessage type="warning">
        Warning — deze waarde is ongebruikelijk.
      </TilburgWebcValidationMessage>
      <TilburgWebcValidationMessage type="warning">
        <Bang />
        Warning met icoon — controleer je invoer.
      </TilburgWebcValidationMessage>
      <TilburgWebcValidationMessage type="error" liveRegion="assertive">
        Error met live-region=&quot;assertive&quot;.
      </TilburgWebcValidationMessage>
    </div>
  ),
};
