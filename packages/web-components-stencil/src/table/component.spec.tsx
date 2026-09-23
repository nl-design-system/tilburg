import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcTable } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcTable], html });

const nativeTable = `
  <tilburg-wbc-table caption="Open aanvragen" aria-describedby="uitleg">
    <table>
      <thead>
        <tr><th scope="col">Zaaknummer</th><th scope="col">Status</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">2025-TLB-001</th><td>In behandeling</td></tr>
        <tr><th scope="row">2025-TLB-002</th><td>Goedgekeurd</td></tr>
      </tbody>
      <tfoot>
        <tr><td colspan="2">2 aanvragen</td></tr>
      </tfoot>
    </table>
  </tilburg-wbc-table>`;

const columns = [
  { key: 'id', label: 'Zaaknummer', rowHeader: true },
  { key: 'status', label: 'Status' },
];
const rows = [
  { id: '2025-TLB-001', status: 'In behandeling' },
  { id: '2025-TLB-002', status: 'Goedgekeurd' },
];

/** Asserts the parent chain table > section > tr > cell for every cell. */
const expectTableStructure = (table: Element) => {
  const cells = Array.from(table.querySelectorAll('th, td'));
  expect(cells.length).toBeGreaterThan(0);
  for (const cell of cells) {
    const row = cell.parentElement!;
    expect(row.tagName).toBe('TR');
    expect(['THEAD', 'TBODY', 'TFOOT']).toContain(row.parentElement!.tagName);
    expect(row.parentElement!.parentElement).toBe(table);
  }
};

describe('tilburg-wbc-table (enhance mode: slotted native <table>)', () => {
  it('keeps a real table structure in light DOM', async () => {
    const page = await render(nativeTable);
    expect(page.root!.shadowRoot).toBeNull();
    const tables = page.root!.querySelectorAll('table');
    expect(tables.length).toBe(1);
    expectTableStructure(tables[0]);
  });

  it('adds the utrecht-table classes to every native part', async () => {
    const page = await render(nativeTable);
    const table = page.root!.querySelector('table')!;
    expect(table).toHaveClass('utrecht-table');
    expect(table.querySelector('thead')).toHaveClass('utrecht-table__header');
    expect(table.querySelector('tbody')).toHaveClass('utrecht-table__body');
    expect(table.querySelector('tfoot')).toHaveClass('utrecht-table__footer');
    table.querySelectorAll('tr').forEach((tr) => expect(tr).toHaveClass('utrecht-table__row'));
    table.querySelectorAll('th').forEach((th) => expect(th).toHaveClass('utrecht-table__header-cell'));
    table.querySelectorAll('td').forEach((td) => expect(td).toHaveClass('utrecht-table__cell'));
  });

  it('derives the header-cell role from scope like the Angular directive', async () => {
    const page = await render(nativeTable);
    expect(page.root!.querySelector('thead th')!.getAttribute('role')).toBe('columnheader');
    expect(page.root!.querySelector('tbody th')!.getAttribute('role')).toBe('rowheader');
  });

  it('inserts the caption prop as the first child of the table', async () => {
    const page = await render(nativeTable);
    const table = page.root!.querySelector('table')!;
    const caption = table.firstElementChild!;
    expect(caption.tagName).toBe('CAPTION');
    expect(caption).toHaveClass('utrecht-table__caption');
    expect(caption.textContent).toBe('Open aanvragen');
    expect(table.querySelectorAll('caption').length).toBe(1);
  });

  it('updates and removes its own caption when the prop changes', async () => {
    const page = await render(nativeTable);
    page.root!.caption = 'Nieuw';
    await page.waitForChanges();
    expect(page.root!.querySelector('caption')!.textContent).toBe('Nieuw');
    page.root!.caption = undefined;
    await page.waitForChanges();
    expect(page.root!.querySelector('caption')).toBeNull();
  });

  it('classes an authored caption and does not add a second one', async () => {
    const page = await render(
      '<tilburg-wbc-table caption="Prop"><table><caption>Eigen</caption><tbody><tr><td>x</td></tr></tbody></table></tilburg-wbc-table>',
    );
    const captions = page.root!.querySelectorAll('caption');
    expect(captions.length).toBe(1);
    expect(captions[0]).toHaveClass('utrecht-table__caption');
    expect(captions[0].textContent).toBe('Eigen');
  });

  it('moves aria attributes from the host to the table', async () => {
    const page = await render(nativeTable);
    expect(page.root!.hasAttribute('aria-describedby')).toBe(false);
    expect(page.root!.querySelector('table')!.getAttribute('aria-describedby')).toBe('uitleg');
  });

  it('decorates rows the parser wrapped in an implicit tbody', async () => {
    const page = await render('<tilburg-wbc-table><table><tr><td>a</td></tr></table></tilburg-wbc-table>');
    const table = page.root!.querySelector('table')!;
    expectTableStructure(table);
    expect(table.querySelector('tbody')).toHaveClass('utrecht-table__body');
    expect(table.querySelector('td')).toHaveClass('utrecht-table__cell');
  });

  it('does not touch nested tables inside cells', async () => {
    const page = await render(
      '<tilburg-wbc-table><table><tbody><tr><td><table><tbody><tr><td id="inner">x</td></tr></tbody></table></td></tr></tbody></table></tilburg-wbc-table>',
    );
    expect(page.root!.querySelector('#inner')).not.toHaveClass('utrecht-table__cell');
  });
});

describe('tilburg-wbc-table (data mode: columns/rows properties)', () => {
  const renderData = async (footer = false) => {
    const page = await render(
      '<tilburg-wbc-table caption="Open aanvragen" aria-label="Aanvragen"></tilburg-wbc-table>',
    );
    const el = page.root as HTMLElement & Pick<TilburgWbcTable, 'columns' | 'rows'>;
    el.columns = columns;
    el.rows = rows;
    if (footer) el.footerRows = [{ id: 'Totaal', status: '2' }];
    await page.waitForChanges();
    return page;
  };

  it('renders a complete table with the utrecht classes', async () => {
    const page = await renderData();
    const table = page.root!.querySelector('table.utrecht-table')!;
    expectTableStructure(table);
    expect(table.getAttribute('aria-label')).toBe('Aanvragen');
    expect(table.firstElementChild!.tagName).toBe('CAPTION');
    expect(table.querySelector('caption')).toHaveClass('utrecht-table__caption');
    expect(table.querySelector('thead')).toHaveClass('utrecht-table__header');
    expect(table.querySelector('tbody')).toHaveClass('utrecht-table__body');
    expect(table.querySelector('tfoot')).toBeNull();
    const headers = Array.from(table.querySelectorAll('thead th'));
    expect(headers.map((th) => th.textContent)).toEqual(['Zaaknummer', 'Status']);
    headers.forEach((th) => {
      expect(th).toHaveClass('utrecht-table__header-cell');
      expect(th.getAttribute('scope')).toBe('col');
      expect(th.getAttribute('role')).toBe('columnheader');
    });
    const bodyRows = table.querySelectorAll('tbody tr.utrecht-table__row');
    expect(bodyRows.length).toBe(2);
    const rowHeader = bodyRows[0].querySelector('th')!;
    expect(rowHeader.textContent).toBe('2025-TLB-001');
    expect(rowHeader.getAttribute('scope')).toBe('row');
    expect(rowHeader.getAttribute('role')).toBe('rowheader');
    expect(bodyRows[0].querySelector('td.utrecht-table__cell')!.textContent).toBe('In behandeling');
  });

  it('renders footer rows in a tfoot', async () => {
    const page = await renderData(true);
    const tfoot = page.root!.querySelector('table > tfoot.utrecht-table__footer')!;
    expect(tfoot.querySelectorAll('tr > td.utrecht-table__cell').length).toBe(2);
    expect(tfoot.querySelector('th')).toBeNull();
  });

  it('accepts JSON string attributes for plain HTML', async () => {
    const page = await render(
      `<tilburg-wbc-table columns='${JSON.stringify(columns)}' rows='${JSON.stringify(rows)}'></tilburg-wbc-table>`,
    );
    const table = page.root!.querySelector('table')!;
    expectTableStructure(table);
    expect(table.querySelectorAll('tbody tr').length).toBe(2);
  });
});
