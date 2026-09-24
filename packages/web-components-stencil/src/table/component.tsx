/**
 * @license EUPL-1.2
 * Copyright (c) 2026 Gemeente Tilburg
 */

import { Component, Element, h, Prop, State } from '@stencil/core';
import { AttributeInheritor, inheritAttributes, InheritedAttributes } from '../utils/inherit-attributes';

export type TilburgWbcTableCellValue = string | number | null | undefined;
export type TilburgWbcTableRow = Record<string, TilburgWbcTableCellValue>;

export interface TilburgWbcTableColumn {
  /** Property of each row object shown in this column. */
  key: string;
  /** Column header text. */
  label: string;
  /** Render this column's body cells as `<th scope="row">` (row headers). */
  rowHeader?: boolean;
}

/** Attributes moved from the host onto the `<table>` (Angular: ariaLabel / ariaLabelledby / ariaDescribedBy). */
const TABLE_ATTRIBUTES = ['aria-label', 'aria-labelledby', 'aria-describedby'] as const;

/** Native table element → class the Angular attribute directive / React part adds. */
const PART_CLASS: Record<string, string> = {
  CAPTION: 'utrecht-table__caption',
  THEAD: 'utrecht-table__header',
  TBODY: 'utrecht-table__body',
  TFOOT: 'utrecht-table__footer',
};

/** Marks the `<caption>` the component inserts for the `caption` prop (enhance mode). */
const OWN_CAPTION = 'data-tilburg-wbc-caption';

const SCOPE_ROLE: Record<string, string> = { col: 'columnheader', row: 'rowheader' };

const parseList = <T,>(value: T[] | string | undefined): T[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

const childrenByTag = (parent: Element, tags: string[]): HTMLElement[] =>
  Array.from(parent.children).filter((child): child is HTMLElement => tags.includes(child.tagName)) as HTMLElement[];

/**
 * Tilburg table. Two ways to use it — both end in a real `<table>` in the DOM:
 *
 * 1. **Enhance mode** (default): wrap a native `<table>`. The browser's HTML
 *    parser does not allow custom elements between `<table>`, `<tbody>`, `<tr>`
 *    and `<td>` (it hoists them out of the table, and drops `<tr>`/`<td>`
 *    written outside one), so there are no row/cell custom elements. Instead
 *    the component adds the `utrecht-table*` classes to the native elements —
 *    exactly what the Angular attribute directives (`tr[tilburg-table-row]` …)
 *    and the React parts do — and keeps doing so when rows are added later.
 * 2. **Data mode**: set the `columns` (and `rows` / `footerRows`) properties and
 *    the component renders the whole table itself.
 *
 * @slot - A native `<table>` (enhance mode). Ignored in data mode.
 */
@Component({
  tag: 'tilburg-wbc-table',
  styleUrl: 'index.scss',
  shadow: false,
})
export class TilburgWbcTable {
  @Element() host!: HTMLElement;

  /** Caption text; rendered as `<caption class="utrecht-table__caption">` as the table's first child. */
  @Prop() caption?: string;
  /** Data mode: column definitions. Property, or a JSON string attribute. */
  @Prop() columns?: TilburgWbcTableColumn[] | string;
  /** Data mode: body rows, one object per row keyed by column `key`. Property, or a JSON string attribute. */
  @Prop() rows?: TilburgWbcTableRow[] | string;
  /** Data mode: footer rows (`<tfoot>`, e.g. totals), same shape as `rows`. */
  @Prop() footerRows?: TilburgWbcTableRow[] | string;

  /* `aria-label`, `aria-labelledby` and `aria-describedby` are written on the
     host and moved onto the `<table>`. */
  @State() inherited: InheritedAttributes = {};
  private inheritor?: AttributeInheritor;
  private observer?: MutationObserver;

  connectedCallback() {
    this.inheritor = inheritAttributes(this.host, TABLE_ATTRIBUTES, (attributes) => {
      this.inherited = attributes;
    });
    if (typeof MutationObserver !== 'undefined') {
      /* Re-decorate rows/cells added after the first render (framework lists,
         `insertRow()`, …). Decoration only touches classes/attributes and an
         already-present caption, so it does not retrigger itself endlessly. */
      this.observer = new MutationObserver(() => this.enhance());
      this.observer.observe(this.host, { childList: true, subtree: true });
    }
  }

  disconnectedCallback() {
    this.inheritor?.disconnect();
    this.observer?.disconnect();
  }

  componentDidRender() {
    this.enhance();
  }

  private get dataMode(): boolean {
    return parseList(this.columns).length > 0;
  }

  /** Enhance mode: decorate the consumer's native `<table>` like the Angular directives do. */
  private enhance() {
    if (this.dataMode) return;
    const table = this.host.querySelector('table');
    if (!table) return;

    table.classList.add('utrecht-table');
    for (const name of TABLE_ATTRIBUTES) {
      const value = this.inherited[name];
      if (value && table.getAttribute(name) !== value) table.setAttribute(name, value);
    }

    this.syncCaption(table);

    for (const part of childrenByTag(table, Object.keys(PART_CLASS))) {
      part.classList.add(PART_CLASS[part.tagName]);
    }
    const sections = childrenByTag(table, ['THEAD', 'TBODY', 'TFOOT']);
    const rows = [table, ...sections].flatMap((section) => childrenByTag(section, ['TR']));
    for (const row of rows) {
      row.classList.add('utrecht-table__row');
      for (const cell of childrenByTag(row, ['TH', 'TD'])) {
        if (cell.tagName === 'TD') {
          cell.classList.add('utrecht-table__cell');
          continue;
        }
        cell.classList.add('utrecht-table__header-cell');
        const role = SCOPE_ROLE[cell.getAttribute('scope') ?? ''];
        if (role && !cell.hasAttribute('role')) cell.setAttribute('role', role);
      }
    }
  }

  /** Adds, updates or removes the caption the component owns for the `caption` prop. */
  private syncCaption(table: HTMLTableElement) {
    const own = childrenByTag(table, ['CAPTION']).find((c) => c.hasAttribute(OWN_CAPTION));
    const authored = childrenByTag(table, ['CAPTION']).some((c) => !c.hasAttribute(OWN_CAPTION));
    if (!this.caption || authored) {
      own?.remove();
      return;
    }
    if (own) {
      if (own.textContent !== this.caption) own.textContent = this.caption;
      return;
    }
    const caption = table.ownerDocument.createElement('caption');
    caption.setAttribute(OWN_CAPTION, '');
    caption.className = 'utrecht-table__caption';
    caption.textContent = this.caption;
    table.insertBefore(caption, table.firstChild);
  }

  private renderRow(row: TilburgWbcTableRow, columns: TilburgWbcTableColumn[], rowHeaders: boolean) {
    return (
      <tr class="utrecht-table__row">
        {columns.map((column) => {
          const value = row[column.key] ?? '';
          return rowHeaders && column.rowHeader ? (
            <th class="utrecht-table__header-cell" scope="row" role="rowheader">
              {value}
            </th>
          ) : (
            <td class="utrecht-table__cell">{value}</td>
          );
        })}
      </tr>
    );
  }

  render() {
    const columns = parseList(this.columns);
    if (columns.length === 0) {
      return <slot />;
    }
    const rows = parseList(this.rows);
    const footerRows = parseList(this.footerRows);
    return (
      <table {...this.inherited} class="utrecht-table">
        {this.caption && <caption class="utrecht-table__caption">{this.caption}</caption>}
        <thead class="utrecht-table__header">
          <tr class="utrecht-table__row">
            {columns.map((column) => (
              <th class="utrecht-table__header-cell" scope="col" role="columnheader">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody class="utrecht-table__body">{rows.map((row) => this.renderRow(row, columns, true))}</tbody>
        {footerRows.length > 0 && (
          <tfoot class="utrecht-table__footer">{footerRows.map((row) => this.renderRow(row, columns, false))}</tfoot>
        )}
      </table>
    );
  }
}
