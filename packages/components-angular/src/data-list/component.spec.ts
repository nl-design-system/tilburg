import { Component, ViewEncapsulation } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgDataList, TilburgDataListItem, TilburgDataListKey, TilburgDataListValue } from './component';

@Component({
  template: `<tilburg-data-list [large]="large">
    <tilburg-data-list-item>
      <tilburg-data-list-key>Naam</tilburg-data-list-key>
      <tilburg-data-list-value>Jan Jansen</tilburg-data-list-value>
    </tilburg-data-list-item>
  </tilburg-data-list>`,
  standalone: false,
})
class HostComponent {
  large = false;
}

describe('TilburgDataList', () => {
  const render = (large: boolean) => {
    TestBed.configureTestingModule({
      declarations: [TilburgDataList, TilburgDataListItem, TilburgDataListKey, TilburgDataListValue, HostComponent],
    });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.large = large;
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  it('renders <dl> > row <div> > <dt>/<dd>', () => {
    const el = render(false);
    expect(
      el.querySelector('dl.tilburg-data-list div.tilburg-data-list__item dt.tilburg-data-list__key')?.textContent,
    ).toBe('Naam');
    expect(el.querySelector('dd.tilburg-data-list__value')?.textContent).toBe('Jan Jansen');
    expect(el.querySelector('.tilburg-data-list--large')).toBeNull();
  });

  it('puts the --large modifier on the <dl>, not on the host (as in the HTML reference)', () => {
    const el = render(true);
    expect(el.querySelector('dl')?.classList).toContain('tilburg-data-list--large');
    expect(el.querySelector('tilburg-data-list')?.classList).not.toContain('tilburg-data-list--large');
  });

  /* Emulated encapsulation would scope `.tilburg-data-list--large .tilburg-data-list__item` to one component,
     but the `<dl>` and the row `<div>` live in different component templates. */
  it.each([TilburgDataList, TilburgDataListItem, TilburgDataListKey, TilburgDataListValue])(
    '%p does not encapsulate its styles',
    (component) => {
      expect((component as unknown as { ɵcmp: { encapsulation: ViewEncapsulation } }).ɵcmp.encapsulation).toBe(
        ViewEncapsulation.None,
      );
    },
  );
});
