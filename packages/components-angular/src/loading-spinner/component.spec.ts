import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgLoadingSpinner } from './component';

@Component({
  template: `<tilburg-loading-spinner
    [visible]="visible"
    [delayMs]="delayMs"
    [title]="title"
    [message]="message"
    [ariaLabel]="ariaLabel"
  ></tilburg-loading-spinner>`,
  standalone: false,
})
class HostComponent {
  visible = false;
  delayMs = 0;
  title?: string;
  message?: string;
  ariaLabel?: string;
}

describe('TilburgLoadingSpinner', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgLoadingSpinner, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  const overlay = () => host().querySelector('.tilburg-loading-spinner__overlay');

  afterEach(() => jest.useRealTimers());

  it('renders nothing while not visible', () => {
    expect(overlay()).toBeNull();
  });

  it('shows a busy group with the title and message in a status region', () => {
    set({ visible: true, title: 'Even geduld', message: 'We laden uw gegevens', ariaLabel: 'Laden' });
    expect(overlay()!.getAttribute('role')).toBe('group');
    expect(overlay()!.getAttribute('aria-busy')).toBe('true');
    expect(overlay()!.getAttribute('aria-label')).toBe('Laden');
    const status = overlay()!.querySelector('[role="status"]')!;
    expect(status.querySelector('.tilburg-loading-spinner__title')!.textContent).toBe('Even geduld');
    expect(status.querySelector('.tilburg-loading-spinner__message')!.textContent).toBe('We laden uw gegevens');
    expect(status.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
    expect(host().querySelector('tilburg-loading-spinner')!.hasAttribute('title')).toBe(false);
  });

  it('waits delayMs before it shows, and not at all when hidden again in time', () => {
    jest.useFakeTimers();
    set({ delayMs: 1000, visible: true });
    jest.advanceTimersByTime(999);
    fixture.detectChanges();
    expect(overlay()).toBeNull();
    jest.advanceTimersByTime(1);
    fixture.detectChanges();
    expect(overlay()).not.toBeNull();

    set({ visible: false });
    expect(overlay()).toBeNull();
    set({ visible: true });
    jest.advanceTimersByTime(500);
    set({ visible: false });
    jest.advanceTimersByTime(1000);
    fixture.detectChanges();
    expect(overlay()).toBeNull();
  });
});
