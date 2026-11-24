/* @license CC0-1.0 */

import { ProgressBar } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-progress-bar.examples';

const meta = {
  title: 'Tilburg React/Progress Bar',
  id: 'tilburg-progress-bar-react',
  component: ProgressBar,
  tags: ['autodocs', 'tilburg'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const BackIcon = () => <span aria-hidden="true">‹</span>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3>0% — net begonnen</h3>
        <ProgressBar value={0} total={5} title="Welkom" label="Stap 1 van 5" />
      </div>
      <div>
        <h3>40%</h3>
        <ProgressBar value={2} total={5} title="Persoonlijke gegevens" label="Stap 2 van 5" />
      </div>
      <div>
        <h3>60% — met back-link (default pijl)</h3>
        <ProgressBar value={3} total={5} title="Adresgegevens" label="Stap 3 van 5" showBack backLabel="Vorige stap" />
      </div>
      <div>
        <h3>60% — met back-link (eigen pijl-icoon)</h3>
        <ProgressBar
          value={3}
          total={5}
          title="Adresgegevens"
          label="Stap 3 van 5"
          showBack
          backLabel="Vorige stap"
          backIcon={<BackIcon />}
        />
      </div>
      <div>
        <h3>100% — voltooid</h3>
        <ProgressBar value={5} total={5} title="Klaar" label="Stap 5 van 5" />
      </div>
      <div>
        <h3>Alleen track (geen titel/label)</h3>
        <ProgressBar value={3} total={10} aria-label="Voortgang" />
      </div>
    </div>
  ),
};
