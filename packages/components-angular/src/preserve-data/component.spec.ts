import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgPreserveData } from './component';

@Component({
  template: `<tilburg-preserve-data [value]="value" [dateTime]="dateTime">{{ text }}</tilburg-preserve-data>`,
  standalone: false,
})
class HostComponent {
  value?: string;
  dateTime?: string;
  text = 'J.  de  Vries';
}

describe('TilburgPreserveData', () => {
  const render = (props: Partial<HostComponent> = {}) => {
    TestBed.configureTestingModule({ declarations: [TilburgPreserveData, HostComponent], imports: [CommonModule] });
    const fixture = TestBed.createComponent(HostComponent);
    Object.assign(fixture.componentInstance, props);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('.utrecht-preserve-data') as HTMLElement;
  };

  it('renders a bdi with translate="no" and keeps the spaces', () => {
    const el = render();
    expect(el.tagName).toBe('BDI');
    expect(el.getAttribute('translate')).toBe('no');
    expect(el.textContent).toBe('J.  de  Vries');
    expect(el.children).toHaveLength(0);
  });

  it('renders a data element with value around the bdi', () => {
    const el = render({ value: '5038 AB' });
    expect(el.tagName).toBe('DATA');
    expect(el.getAttribute('value')).toBe('5038 AB');
    expect(el.querySelector('bdi')!.getAttribute('translate')).toBe('no');
    expect(el.querySelector('bdi')!.textContent).toBe('J.  de  Vries');
  });

  it('renders a time element when dateTime is set, also with a value', () => {
    const el = render({ dateTime: '2026-05-19', value: 'x' });
    expect(el.tagName).toBe('TIME');
    expect(el.getAttribute('datetime')).toBe('2026-05-19');
    expect(el.hasAttribute('value')).toBe(false);
    expect(el.querySelector('bdi')).not.toBeNull();
  });
});
