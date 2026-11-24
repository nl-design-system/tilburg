import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgBadgeStatus } from './component';

@Component({
  template: `<tilburg-badge-status [status]="status" [liveRegion]="liveRegion" [ariaLabel]="ariaLabel"
    >Ontvangen</tilburg-badge-status
  >`,
  standalone: false,
})
class HostComponent {
  status?: string;
  liveRegion?: 'polite' | 'assertive' | 'off';
  ariaLabel?: string;
}

describe('TilburgBadgeStatus', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgBadgeStatus, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  const badge = () => host().querySelector('span.utrecht-badge-status') as HTMLElement;

  it('is a polite status without a modifier by default', () => {
    expect(badge().className).toBe('utrecht-badge-status');
    expect(badge().getAttribute('role')).toBe('status');
    expect(badge().getAttribute('aria-live')).toBe('polite');
    expect(badge().hasAttribute('aria-label')).toBe(false);
    expect(badge().textContent).toBe('Ontvangen');
  });

  it('adds the status modifier and the aria-label', () => {
    set({ status: 'success', ariaLabel: 'Status: ontvangen' });
    expect(badge().classList).toContain('utrecht-badge-status--success');
    expect(badge().getAttribute('role')).toBe('status');
    expect(badge().getAttribute('aria-label')).toBe('Status: ontvangen');
  });

  it('announces an urgent status as an assertive alert', () => {
    set({ status: 'danger' });
    expect(badge().getAttribute('role')).toBe('alert');
    expect(badge().getAttribute('aria-live')).toBe('assertive');
  });

  it('lets liveRegion override the default', () => {
    set({ status: 'danger', liveRegion: 'off' });
    expect(badge().getAttribute('aria-live')).toBe('off');
  });
});
