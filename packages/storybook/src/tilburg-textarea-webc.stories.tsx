/* @license CC0-1.0 */

import { TilburgWebcTextarea } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-textarea.examples';

/* Stencil `<tilburg-webc-textarea>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Textarea',
  id: 'tilburg-textarea-webc',
  component: TilburgWebcTextarea,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <TilburgWebcTextarea name="msg" rows={3} placeholder="Default" />
      <TilburgWebcTextarea name="msg" rows={3} required placeholder="Required" />
      <TilburgWebcTextarea name="msg" rows={3} value="Alleen lezen" readonly />
      <TilburgWebcTextarea name="msg" rows={3} disabled placeholder="Disabled" />
      <TilburgWebcTextarea name="msg" rows={3} value="bad value" invalid />
      <TilburgWebcTextarea name="msg" rows={3} autoResize={false} placeholder="auto-resize=false (rows=3)" />
    </div>
  ),
};
