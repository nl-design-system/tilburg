import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcDataList } from './component';
import { TilburgWbcDataListItem } from './item';
import { TilburgWbcDataListKey } from './key';
import { TilburgWbcDataListValue } from './value';

const render = (html: string) =>
  newSpecPage({
    components: [TilburgWbcDataList, TilburgWbcDataListItem, TilburgWbcDataListKey, TilburgWbcDataListValue],
    html,
  });

const row = (key: string, value: string, keyAttrs = '') =>
  `<tilburg-wbc-data-list-item><tilburg-wbc-data-list-key${keyAttrs}>${key}</tilburg-wbc-data-list-key><tilburg-wbc-data-list-value>${value}</tilburg-wbc-data-list-value></tilburg-wbc-data-list-item>`;

describe('tilburg-wbc-data-list', () => {
  it('renders the dl / div / dt / dd structure of the HTML reference', async () => {
    const page = await render(`<tilburg-wbc-data-list>${row('Voornaam', 'John')}</tilburg-wbc-data-list>`);
    expect(page.root!.shadowRoot).toBeNull();
    const dl = page.root!.querySelector('dl')!;
    expect(dl.className).toBe('tilburg-data-list');
    const item = dl.querySelector('tilburg-wbc-data-list-item > div.tilburg-data-list__item')!;
    expect(item).not.toBeNull();
    expect(item.querySelector('tilburg-wbc-data-list-key > dt.tilburg-data-list__key')!.textContent).toBe('Voornaam');
    expect(item.querySelector('tilburg-wbc-data-list-value > dd.tilburg-data-list__value')!.textContent).toBe('John');
  });

  it('keeps rows in source order', async () => {
    const page = await render(
      `<tilburg-wbc-data-list>${row('Voornaam', 'John')}${row('Achternaam', 'Doe')}</tilburg-wbc-data-list>`,
    );
    const keys = Array.from(page.root!.querySelectorAll('dt')).map((dt) => dt.textContent);
    expect(keys).toEqual(['Voornaam', 'Achternaam']);
  });

  it('puts the large modifier on the <dl>', async () => {
    const page = await render(`<tilburg-wbc-data-list large>${row('Voornaam', 'John')}</tilburg-wbc-data-list>`);
    expect(page.root!.querySelector('dl')).toHaveClasses(['tilburg-data-list', 'tilburg-data-list--large']);
  });

  it('moves the key id from the host onto the <dt>', async () => {
    const page = await render(
      `<tilburg-wbc-data-list>${row('Adres', 'Stadhuisplein 130', ' id="k-adres"')}</tilburg-wbc-data-list>`,
    );
    const key = page.root!.querySelector('tilburg-wbc-data-list-key')!;
    expect(key.hasAttribute('id')).toBe(false);
    expect(page.root!.querySelector('dt')!.getAttribute('id')).toBe('k-adres');
  });

  it('moves aria-label from the host to the <dl>', async () => {
    const page = await render(
      `<tilburg-wbc-data-list aria-label="Persoonsgegevens">${row('A', 'B')}</tilburg-wbc-data-list>`,
    );
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('dl')!.getAttribute('aria-label')).toBe('Persoonsgegevens');
  });
});
