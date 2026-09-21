import { newSpecPage } from '@stencil/core/testing';
import { TilburgWebcDataList } from './component';
import { TilburgWebcDataListItem } from './item';
import { TilburgWebcDataListKey } from './key';
import { TilburgWebcDataListValue } from './value';

const render = (html: string) =>
  newSpecPage({
    components: [TilburgWebcDataList, TilburgWebcDataListItem, TilburgWebcDataListKey, TilburgWebcDataListValue],
    html,
  });

const row = (key: string, value: string, keyAttrs = '') =>
  `<tilburg-webc-data-list-item><tilburg-webc-data-list-key${keyAttrs}>${key}</tilburg-webc-data-list-key><tilburg-webc-data-list-value>${value}</tilburg-webc-data-list-value></tilburg-webc-data-list-item>`;

describe('tilburg-webc-data-list', () => {
  it('renders the dl / div / dt / dd structure of the HTML reference', async () => {
    const page = await render(`<tilburg-webc-data-list>${row('Voornaam', 'John')}</tilburg-webc-data-list>`);
    expect(page.root!.shadowRoot).toBeNull();
    const dl = page.root!.querySelector('dl')!;
    expect(dl.className).toBe('tilburg-data-list');
    const item = dl.querySelector('tilburg-webc-data-list-item > div.tilburg-data-list__item')!;
    expect(item).not.toBeNull();
    expect(item.querySelector('tilburg-webc-data-list-key > dt.tilburg-data-list__key')!.textContent).toBe('Voornaam');
    expect(item.querySelector('tilburg-webc-data-list-value > dd.tilburg-data-list__value')!.textContent).toBe('John');
  });

  it('keeps rows in source order', async () => {
    const page = await render(
      `<tilburg-webc-data-list>${row('Voornaam', 'John')}${row('Achternaam', 'Doe')}</tilburg-webc-data-list>`,
    );
    const keys = Array.from(page.root!.querySelectorAll('dt')).map((dt) => dt.textContent);
    expect(keys).toEqual(['Voornaam', 'Achternaam']);
  });

  it('puts the large modifier on the <dl>', async () => {
    const page = await render(`<tilburg-webc-data-list large>${row('Voornaam', 'John')}</tilburg-webc-data-list>`);
    expect(page.root!.querySelector('dl')).toHaveClasses(['tilburg-data-list', 'tilburg-data-list--large']);
  });

  it('moves the key id from the host onto the <dt>', async () => {
    const page = await render(
      `<tilburg-webc-data-list>${row('Adres', 'Stadhuisplein 130', ' id="k-adres"')}</tilburg-webc-data-list>`,
    );
    const key = page.root!.querySelector('tilburg-webc-data-list-key')!;
    expect(key.hasAttribute('id')).toBe(false);
    expect(page.root!.querySelector('dt')!.getAttribute('id')).toBe('k-adres');
  });

  it('moves aria-label from the host to the <dl>', async () => {
    const page = await render(
      `<tilburg-webc-data-list aria-label="Persoonsgegevens">${row('A', 'B')}</tilburg-webc-data-list>`,
    );
    expect(page.root!.hasAttribute('aria-label')).toBe(false);
    expect(page.root!.querySelector('dl')!.getAttribute('aria-label')).toBe('Persoonsgegevens');
  });
});
