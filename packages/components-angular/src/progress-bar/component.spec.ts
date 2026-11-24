import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgProgressBar } from './component';

@Component({
  template: `<tilburg-progress-bar
    [value]="value"
    [total]="total"
    [label]="label"
    [title]="title"
    [showBack]="showBack"
    backLabel="Vorige stap"
    (backClick)="backs = backs + 1"
  ></tilburg-progress-bar>`,
  standalone: false,
})
class HostComponent {
  value = 3;
  total = 6;
  label?: string;
  title?: string;
  showBack = false;
  backs = 0;
}

describe('TilburgProgressBar', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgProgressBar, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  const bar = () => host().querySelector('[role="progressbar"]') as HTMLElement;

  it('renders a progressbar with the percentage, without a back link by default', () => {
    expect(bar().getAttribute('aria-valuemin')).toBe('0');
    expect(bar().getAttribute('aria-valuemax')).toBe('100');
    expect(bar().getAttribute('aria-valuenow')).toBe('50');
    expect(bar().hasAttribute('aria-label')).toBe(false);
    expect((bar().querySelector('.tilburg-progress-bar__indicator') as HTMLElement).style.width).toBe('50%');
    expect(host().querySelector('.tilburg-progress-bar__back')).toBeNull();
  });

  it.each([
    [9, 6, '100'],
    [-1, 6, '0'],
    [3, 0, '0'],
  ])('keeps value %d of %d within 0 to 100', (value, total, now) => {
    set({ value, total });
    expect(bar().getAttribute('aria-valuenow')).toBe(now);
  });

  it('shows the title and label, and names the progressbar with them', () => {
    set({ title: 'Datum en tijd', label: 'Stap 3 van 6' });
    expect(host().querySelector('h2.tilburg-progress-bar__title')!.textContent).toBe('Datum en tijd');
    expect(host().querySelector('.tilburg-progress-bar__label')!.textContent).toBe('Stap 3 van 6');
    expect(bar().getAttribute('aria-label')).toBe('Datum en tijd');
    expect(bar().getAttribute('aria-valuetext')).toBe('Stap 3 van 6');
    expect(host().querySelector('tilburg-progress-bar')!.hasAttribute('title')).toBe(false);
  });

  it('emits backClick from the back link without following it', () => {
    set({ showBack: true });
    const back = host().querySelector('a.tilburg-progress-bar__back') as HTMLAnchorElement;
    expect(back.querySelector('.tilburg-progress-bar__back-label')!.textContent).toBe('Vorige stap');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    back.dispatchEvent(event);
    expect(fixture.componentInstance.backs).toBe(1);
    expect(event.defaultPrevented).toBe(true);
  });
});
