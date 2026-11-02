import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgCurrencyData } from './component';

@Component({
  template: `<tilburg-currency-data [amount]="amount" [currency]="currency" [locale]="locale"></tilburg-currency-data>`,
  standalone: false,
})
class HostComponent {
  amount: number | string = 1234.5;
  currency = 'EUR';
  locale = 'nl-NL';
}

describe('TilburgCurrencyData', () => {
  const setup = (props: Partial<HostComponent> = {}) => {
    TestBed.configureTestingModule({ declarations: [TilburgCurrencyData, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    Object.assign(fixture.componentInstance, props);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('data') as HTMLElement;
  };

  it('renders value, no aria-label and the formatted amount (same as React and Stencil)', () => {
    const data = setup();
    expect(data.className).toBe('utrecht-currency-data utrecht-currency-data--positive');
    expect(data.getAttribute('value')).toBe('EUR 1234.5');
    expect(data.hasAttribute('aria-label')).toBe(false);
    expect(data.textContent).toBe('€ 1.234,50');
  });

  it('marks negative amounts and puts the minus before the currency', () => {
    const data = setup({ amount: '-85' });
    expect(data.className).toBe('utrecht-currency-data utrecht-currency-data--negative');
    expect(data.getAttribute('value')).toBe('EUR -85');
    expect(data.textContent).toBe('− € 85,00');
  });

  it('adds no modifier for zero, and honours currency and locale', () => {
    expect(setup({ amount: 0 }).className).toBe('utrecht-currency-data');
    TestBed.resetTestingModule();
    const data = setup({ amount: -3, currency: 'USD', locale: 'en-US' });
    expect(data.textContent).toBe('−$3.00');
  });
});
