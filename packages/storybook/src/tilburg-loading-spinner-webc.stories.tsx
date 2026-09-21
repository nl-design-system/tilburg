/* @license CC0-1.0 */

import { TilburgWebcLoadingSpinner } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-loading-spinner.examples';

/* Stencil `<tilburg-webc-loading-spinner>` rendered through its generated React
   proxy. The custom elements themselves are registered once in
   `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Loading Spinner',
  id: 'tilburg-loading-spinner-webc',
  component: TilburgWebcLoadingSpinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcLoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Every story passes `aria-label`, like the canonical HTML reference markup
   does: the overlay has no text of its own that assistive tech can use as its
   accessible name. `title` is `heading` on the web component. */
export const ImmediateWithTitleAndMessage: Story = {
  render: () => (
    <TilburgWebcLoadingSpinner
      visible
      delayMs={0}
      heading="Aan het laden"
      message="Even geduld..."
      aria-label="Aan het laden"
    />
  ),
};

export const ImmediateWithoutMessage: Story = {
  render: () => <TilburgWebcLoadingSpinner visible delayMs={0} heading="Bezig" aria-label="Bezig" />,
};

export const ImmediateOnlySpinner: Story = {
  render: () => <TilburgWebcLoadingSpinner visible delayMs={0} aria-label="Bezig met laden" />,
};

export const Hidden: Story = {
  render: () => <TilburgWebcLoadingSpinner visible={false} />,
};
