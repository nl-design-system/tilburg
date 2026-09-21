/* @license CC0-1.0 */

import { TilburgWebcPagination } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-pagination.examples';

const meta = {
  title: 'Tilburg Web Components/Pagination',
  id: 'tilburg-pagination-webc',
  component: TilburgWebcPagination,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const Interactive = ({ total }: { total: number }) => {
  const [page, setPage] = useState(1);
  return (
    <TilburgWebcPagination
      pageCount={total}
      currentPage={page}
      previousDisabled={page === 1}
      firstDisabled={page === 1}
      nextDisabled={page === total}
      lastDisabled={page === total}
      onTilburgNavigate={(event) => {
        const { step, page: target } = event.detail;
        if (step === 'page' && target) setPage(target);
        if (step === 'first') setPage(1);
        if (step === 'previous') setPage((p) => Math.max(1, p - 1));
        if (step === 'next') setPage((p) => Math.min(total, p + 1));
        if (step === 'last') setPage(total);
      }}
    />
  );
};

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4>4 pagina&apos;s (geen ellipsis nodig)</h4>
        <Interactive total={4} />
      </div>
      <div>
        <h4>7 pagina&apos;s (drempelwaarde, geen ellipsis)</h4>
        <Interactive total={7} />
      </div>
      <div>
        <h4>12 pagina&apos;s (met ellipsis)</h4>
        <Interactive total={12} />
      </div>
      <div>
        <h4>Met feedback-tekst</h4>
        <TilburgWebcPagination pageCount={5} currentPage={2} feedback="Pagina 2 van 5" />
      </div>
      <div>
        <h4>Zonder pagina&apos;s — range-tekst</h4>
        <TilburgWebcPagination pageCount={0} range="Resultaten 1 – 10 van 47" />
      </div>
    </div>
  ),
};
