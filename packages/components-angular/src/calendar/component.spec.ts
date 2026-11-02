import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgCalendar } from './component';
import { keyTarget, parseIsoDate, toIsoDate } from './date';

@Component({
  template: `<tilburg-calendar
    [value]="value"
    [min]="min"
    [max]="max"
    (dateSelect)="picked = $event"
  ></tilburg-calendar>`,
  standalone: false,
})
class HostComponent {
  value: string | null = '2026-11-12';
  min: string | null = null;
  max: string | null = null;
  picked = '';
}

describe('TilburgCalendar', () => {
  let fixture: ComponentFixture<HostComponent>;
  const el = () => fixture.nativeElement as HTMLElement;
  const day = (label: string) => el().querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;

  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2026, 10, 2, 10) });
    TestBed.configureTestingModule({ declarations: [TilburgCalendar, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
  });

  afterEach(() => jest.useRealTimers());

  it('shares the date helper with React and Stencil', () => {
    expect(parseIsoDate('2026-02-31')).toBeNull();
    expect(toIsoDate(keyTarget(new Date(2026, 10, 4), 'Home')!)).toBe('2026-11-02');
  });

  it('renders the reference DOM with the selected and today markers', () => {
    fixture.detectChanges();
    const label = el().querySelector('.utrecht-calendar__navigation-label')!;
    expect(label.textContent!.trim()).toBe('november 2026');
    expect(label.getAttribute('datetime')).toBe('2026-11');
    expect(el().querySelector('table')!.getAttribute('role')).toBe('grid');
    expect(el().querySelector('table')!.getAttribute('aria-labelledby')).toBe(label.id);
    expect(el().querySelectorAll('.utrecht-calendar__table-days-item-day').length).toBe(42);
    const selected = day('donderdag 12 november 2026');
    expect(selected.classList).toContain('utrecht-calendar__table-days-item-day--selected');
    expect(selected.parentElement!.getAttribute('aria-selected')).toBe('true');
    expect(selected.getAttribute('tabindex')).toBe('0');
    expect(day('maandag 2 november 2026').getAttribute('aria-current')).toBe('date');
    expect(day('maandag 26 oktober 2026').classList).toContain(
      'utrecht-calendar__table-days-item-day--out-of-the-month',
    );
  });

  it('emits dateSelect with the ISO date', () => {
    fixture.detectChanges();
    day('vrijdag 20 november 2026').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.picked).toBe('2026-11-20');
    expect(day('vrijdag 20 november 2026').classList).toContain('utrecht-calendar__table-days-item-day--selected');
  });

  it('disables days outside min and max', () => {
    fixture.componentInstance.min = '2026-11-09';
    fixture.componentInstance.max = '2026-11-27';
    fixture.detectChanges();
    expect(day('zondag 8 november 2026').disabled).toBe(true);
    expect(day('maandag 9 november 2026').disabled).toBe(false);
    expect(day('zaterdag 28 november 2026').disabled).toBe(true);
  });

  it('navigates with the month and year buttons', () => {
    fixture.detectChanges();
    el().querySelector<HTMLButtonElement>('button[aria-label="Volgende maand"]')!.click();
    fixture.detectChanges();
    expect(el().querySelector('.utrecht-calendar__navigation-label')!.textContent!.trim()).toBe('december 2026');
    el().querySelector<HTMLButtonElement>('button[aria-label="Vorig jaar"]')!.click();
    fixture.detectChanges();
    expect(el().querySelector('.utrecht-calendar__navigation-label')!.textContent!.trim()).toBe('december 2025');
  });

  it('moves the focus with the arrow keys', () => {
    fixture.detectChanges();
    document.body.appendChild(el());
    el()
      .querySelector('table')!
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    const target = day('donderdag 19 november 2026');
    expect(target.getAttribute('tabindex')).toBe('0');
    expect(document.activeElement).toBe(target);
    el().remove();
  });
});
