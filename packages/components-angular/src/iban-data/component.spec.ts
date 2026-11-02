import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgIbanData } from './component';

@Component({
  template: `<tilburg-iban-data [value]="value"></tilburg-iban-data>`,
  standalone: false,
})
class HostComponent {
  value = ' nl91 abna-0417 1643 00 ';
}

describe('TilburgIbanData', () => {
  it('renders the normalized IBAN as value and groups of four as text (same as React and Stencil)', () => {
    TestBed.configureTestingModule({ declarations: [TilburgIbanData, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const data = fixture.nativeElement.querySelector('data') as HTMLElement;
    expect(data.className).toBe('utrecht-iban-data');
    expect(data.getAttribute('value')).toBe('NL91ABNA0417164300');
    expect(data.getAttribute('translate')).toBe('no');
    expect(data.textContent).toBe('NL91 ABNA 0417 1643 00');

    fixture.componentInstance.value = 'MU43BOMM0101123456789101000MUR';
    fixture.detectChanges();
    expect(data.textContent).toBe('MU43 BOMM 0101 1234 5678 9101 000M UR');
  });
});
