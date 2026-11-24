import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgSeparator } from './component';

@Component({
  template: `<tilburg-separator [decorative]="decorative"></tilburg-separator>`,
  standalone: false,
})
class HostComponent {
  decorative = false;
}

describe('TilburgSeparator', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgSeparator, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  const separator = () => host().querySelector('tilburg-separator > hr.utrecht-separator') as HTMLElement;

  it('renders hr.utrecht-separator, exposed to assistive technology by default', () => {
    expect(separator()).not.toBeNull();
    expect(separator().hasAttribute('aria-hidden')).toBe(false);
  });

  it('hides a decorative separator', () => {
    set({ decorative: true });
    expect(separator().getAttribute('aria-hidden')).toBe('true');
  });
});
