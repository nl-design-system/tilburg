import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgPagination, type TilburgPaginationEvent } from './component';

@Component({
  template: `<tilburg-pagination
    [pageCount]="pageCount"
    [currentPage]="currentPage"
    [range]="range"
    [feedback]="feedback"
    [firstDisabled]="firstDisabled"
    (navigate)="events.push($event)"
  ></tilburg-pagination>`,
  standalone: false,
})
class HostComponent {
  pageCount?: number = 10;
  currentPage = 5;
  range?: string;
  feedback?: string;
  firstDisabled = false;
  events: TilburgPaginationEvent[] = [];
}

describe('TilburgPagination', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgPagination, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  const nav = () => host().querySelector('nav.tilburg-pagination') as HTMLElement;
  const pages = () => Array.from(nav().querySelectorAll<HTMLButtonElement>('button.tilburg-pagination__page'));
  const step = (label: string) => nav().querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;

  it('renders a named nav with the first, last and neighbouring pages around the current one', () => {
    expect(nav().getAttribute('aria-label')).toBe('Paginering');
    expect(pages().map((page) => page.textContent!.trim())).toEqual(['1', '4', '5', '6', '10']);
    expect(nav().querySelectorAll('.tilburg-pagination__ellipsis[aria-hidden="true"]').length).toBe(2);
    expect(pages()[0].getAttribute('aria-label')).toBe('Pagina 1');
  });

  it('marks the current page and disables it', () => {
    const current = pages().find((page) => page.getAttribute('aria-current') === 'page')!;
    expect(current.textContent!.trim()).toBe('5');
    expect(current.disabled).toBe(true);
    expect(current.classList).toContain('tilburg-pagination__page--current');
    expect(pages().filter((page) => page.disabled).length).toBe(1);
  });

  it('shows every page up to seven, without an ellipsis', () => {
    set({ pageCount: 7, currentPage: 1 });
    expect(pages().length).toBe(7);
    expect(nav().querySelector('.tilburg-pagination__ellipsis')).toBeNull();
  });

  it('emits navigate for a page and for each step button', () => {
    pages()[3].click();
    for (const label of ['Eerste pagina', 'Vorige pagina', 'Volgende pagina', 'Laatste pagina']) step(label).click();
    expect(fixture.componentInstance.events).toEqual([
      { step: 'page', page: 6 },
      { step: 'first' },
      { step: 'previous' },
      { step: 'next' },
      { step: 'last' },
    ]);
  });

  it('disables a step button and shows the feedback text', () => {
    set({ firstDisabled: true, feedback: '41 tot 50 van 100' });
    expect(step('Eerste pagina').disabled).toBe(true);
    expect(step('Vorige pagina').disabled).toBe(false);
    expect(nav().querySelector('.tilburg-pagination__feedback')!.textContent).toBe('41 tot 50 van 100');
  });

  it('shows the range text when there is no page count', () => {
    set({ pageCount: undefined, range: 'Pagina 5' });
    expect(pages().length).toBe(0);
    expect(nav().querySelector('.tilburg-pagination__range')!.textContent).toBe('Pagina 5');
  });
});
