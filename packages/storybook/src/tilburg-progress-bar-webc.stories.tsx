/* @license CC0-1.0 */

import { TilburgWebcProgressBar } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-progress-bar.examples';

/* Stencil `<tilburg-webc-progress-bar>` rendered through its generated React
   proxy. The custom elements themselves are registered once in
   `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Progress Bar',
  id: 'tilburg-progress-bar-webc',
  component: TilburgWebcProgressBar,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4>0% — net begonnen</h4>
        <TilburgWebcProgressBar value={0} total={5} heading="Welkom" label="Stap 1 van 5" />
      </div>
      <div>
        <h4>40%</h4>
        <TilburgWebcProgressBar value={2} total={5} heading="Persoonlijke gegevens" label="Stap 2 van 5" />
      </div>
      <div>
        <h4>60% — met back-link (default pijl)</h4>
        <TilburgWebcProgressBar
          value={3}
          total={5}
          heading="Adresgegevens"
          label="Stap 3 van 5"
          showBack
          backLabel="Vorige stap"
          onTilburgBackClick={() => undefined}
        />
      </div>
      <div>
        <h4>60% — met back-link (eigen pijl-icoon via back-icon slot)</h4>
        <TilburgWebcProgressBar
          value={3}
          total={5}
          heading="Adresgegevens"
          label="Stap 3 van 5"
          showBack
          backLabel="Vorige stap"
        >
          <span slot="back-icon" aria-hidden="true">
            ‹
          </span>
        </TilburgWebcProgressBar>
      </div>
      <div>
        <h4>100% — voltooid</h4>
        <TilburgWebcProgressBar value={5} total={5} heading="Klaar" label="Stap 5 van 5" />
      </div>
      <div>
        <h4>Alleen track (geen titel/label)</h4>
        <TilburgWebcProgressBar value={3} total={10} aria-label="Voortgang" />
      </div>
    </div>
  ),
};
