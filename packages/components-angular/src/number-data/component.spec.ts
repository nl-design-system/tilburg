import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgNumberData, TilburgNumberDataVariant } from './component';

@Component({
  template: `<tilburg-number-data [value]="value" [variant]="variant">{{ text }}</tilburg-number-data>`,
  standalone: false,
})
class HostComponent {
  value?: number | string = 226000;
  variant?: TilburgNumberDataVariant;
  text = '226.000';
}

describe('TilburgNumberData', () => {
  const setup = (props: Partial<HostComponent> = {}) => {
    TestBed.configureTestingModule({ declarations: [TilburgNumberData, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    Object.assign(fixture.componentInstance, props);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('data') as HTMLElement;
  };

  it('renders <data class="utrecht-number-data"> with the number as value', () => {
    const data = setup();
    expect(data.className).toBe('utrecht-number-data');
    expect(data.getAttribute('value')).toBe('226000');
    expect(data.textContent).toBe('226.000');
  });

  it('maps variant to the modifier and leaves value off when unset', () => {
    const data = setup({ value: undefined, variant: 'negative', text: '−1,5' });
    expect(data.classList).toContain('utrecht-number-data--negative');
    expect(data.classList).not.toContain('utrecht-number-data--positive');
    expect(data.hasAttribute('value')).toBe(false);
  });
});
