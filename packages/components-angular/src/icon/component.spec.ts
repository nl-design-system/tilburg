import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgIcon } from './component';

@Component({
  template: `<tilburg-icon><svg viewBox="0 0 24 24"></svg></tilburg-icon>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgIcon', () => {
  it('renders a hidden utrecht-icon span around the projected svg', () => {
    TestBed.configureTestingModule({ declarations: [TilburgIcon, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span.utrecht-icon') as HTMLElement;
    expect(span.getAttribute('aria-hidden')).toBe('true');
    expect(span.querySelector('svg')).not.toBeNull();
  });
});
