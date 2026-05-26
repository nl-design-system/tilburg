/* @license CC0-1.0 */

import { ProgressBar } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description } from '../../storybook-shared/src/tilburg-progress-bar.examples';

const meta = {
  title: 'Tilburg React/Progress Bar',
  id: 'tilburg-progress-bar-react',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const BackIcon = () => <span aria-hidden="true">‹</span>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4>0% — net begonnen</h4>
        <ProgressBar value={0} total={5} title="Stap 1 van 5" label="Welkom" />
      </div>
      <div>
        <h4>40%</h4>
        <ProgressBar value={2} total={5} title="Stap 2 van 5" label="Persoonlijke gegevens" />
      </div>
      <div>
        <h4>60% — met back-link</h4>
        <ProgressBar
          value={3}
          total={5}
          title="Stap 3 van 5"
          label="Adresgegevens"
          showBack
          backLabel="Vorige stap"
          backIcon={<BackIcon />}
        />
      </div>
      <div>
        <h4>100% — voltooid</h4>
        <ProgressBar value={5} total={5} title="Stap 5 van 5" label="Klaar" />
      </div>
      <div>
        <h4>Alleen track (geen titel/label)</h4>
        <ProgressBar value={3} total={10} aria-label="Voortgang" />
      </div>
    </div>
  ),
};
