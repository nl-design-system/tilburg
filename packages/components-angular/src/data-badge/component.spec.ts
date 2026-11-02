import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgDataBadge } from './component';

@Component({
  template: `<tilburg-data-badge [dateTime]="dateTime" [value]="value">Inhoud</tilburg-data-badge>`,
  standalone: false,
})
class HostComponent {
  dateTime?: string;
  value?: string;
}

describe('TilburgDataBadge', () => {
  const setup = (props: Partial<HostComponent>) => {
    TestBed.configureTestingModule({ imports: [CommonModule], declarations: [TilburgDataBadge, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    Object.assign(fixture.componentInstance, props);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('.utrecht-data-badge') as HTMLElement;
  };

  it('renders a span with its content by default', () => {
    const badge = setup({});
    expect(badge.tagName).toBe('SPAN');
    expect(badge.textContent).toBe('Inhoud');
  });

  it('renders <data value> for a value', () => {
    const badge = setup({ value: '259' });
    expect(badge.tagName).toBe('DATA');
    expect(badge.getAttribute('value')).toBe('259');
    expect(badge.textContent).toBe('Inhoud');
  });

  it('renders <time datetime> for a dateTime, which wins over value', () => {
    const badge = setup({ dateTime: '2026-12-24', value: 'x' });
    expect(badge.tagName).toBe('TIME');
    expect(badge.getAttribute('datetime')).toBe('2026-12-24');
    expect(badge.hasAttribute('value')).toBe(false);
  });
});
