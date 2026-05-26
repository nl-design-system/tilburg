/* @license CC0-1.0 */

import { Pagination } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { bugs, description } from '../../storybook-shared/src/tilburg-pagination.examples';

const meta = {
  title: 'Tilburg React/Pagination',
  id: 'tilburg-pagination-react',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const Interactive = ({ total }: { total: number }) => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      pageCount={total}
      currentPage={page}
      previousDisabled={page === 1}
      firstDisabled={page === 1}
      nextDisabled={page === total}
      lastDisabled={page === total}
      onNavigate={({ step, page: target }) => {
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
        <Pagination pageCount={5} currentPage={2} feedback="Pagina 2 van 5" />
      </div>
      <div>
        <h4>Zonder pagina&apos;s — range-tekst</h4>
        <Pagination pageCount={0} range="Resultaten 1 – 10 van 47" />
      </div>
    </div>
  ),
};
