import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgDatetimeValue } from './component';

@Component({
  template: `<tilburg-datetime-value dateTime="2026-11-02T09:30">2 november 2026 om 09:30</tilburg-datetime-value>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgDatetimeValue', () => {
  it('renders <time class="utrecht-value-datetime" datetime>', () => {
    TestBed.configureTestingModule({ declarations: [TilburgDatetimeValue, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const time = fixture.nativeElement.querySelector('time') as HTMLElement;
    expect(time.className).toBe('utrecht-value-datetime');
    expect(time.getAttribute('datetime')).toBe('2026-11-02T09:30');
    expect(time.textContent).toBe('2 november 2026 om 09:30');
  });
});
