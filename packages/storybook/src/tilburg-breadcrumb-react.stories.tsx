/* @license CC0-1.0 */

import { Breadcrumb } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, description } from '../../storybook-shared/src/tilburg-breadcrumb.examples';

const meta = {
  title: 'Tilburg React/Breadcrumb',
  id: 'tilburg-breadcrumb-react',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Twee niveaus</h4>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Diensten', current: true },
          ]}
        />
      </div>
      <div>
        <h4>Drie niveaus</h4>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Diensten', href: '/diensten' },
            { label: 'Paspoort aanvragen', current: true },
          ]}
        />
      </div>
      <div>
        <h4>Diep genest</h4>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Inwoners', href: '/inwoners' },
            { label: 'Diensten', href: '/inwoners/diensten' },
            { label: 'Reisdocumenten', href: '/inwoners/diensten/reisdocumenten' },
            { label: 'Paspoort aanvragen', current: true },
          ]}
        />
      </div>
      <div>
        <h4>Lege items (renders niets)</h4>
        <Breadcrumb items={[]} />
        <p style={{ fontStyle: 'italic', color: '#666' }}>(geen output zichtbaar)</p>
      </div>
    </div>
  ),
};
