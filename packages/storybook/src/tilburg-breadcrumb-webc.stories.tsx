/* @license CC0-1.0 */

import { TilburgWebcBreadcrumb } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-breadcrumb.examples';

const meta = {
  title: 'Tilburg Web Components/Breadcrumb',
  id: 'tilburg-breadcrumb-webc',
  component: TilburgWebcBreadcrumb,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>Twee niveaus</h4>
        <TilburgWebcBreadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Diensten', current: true },
          ]}
        />
      </div>
      <div>
        <h4>Drie niveaus</h4>
        <TilburgWebcBreadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Diensten', href: '/diensten' },
            { label: 'Paspoort aanvragen', current: true },
          ]}
        />
      </div>
      <div>
        <h4>Diep genest</h4>
        <TilburgWebcBreadcrumb
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
        <h4>Client-side routing (tilburgItemClick + preventDefault)</h4>
        <TilburgWebcBreadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Diensten', href: '/diensten' },
            { label: 'Paspoort aanvragen', current: true },
          ]}
          onTilburgItemClick={(event) => {
            event.detail.event.preventDefault();
            console.log('Kruimel aangeklikt:', event.detail.item.label);
          }}
        />
      </div>
      <div>
        <h4>Lege items (renders niets)</h4>
        <TilburgWebcBreadcrumb items={[]} />
        <p style={{ fontStyle: 'italic', color: '#666' }}>(geen output zichtbaar)</p>
      </div>
    </div>
  ),
};
