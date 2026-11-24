import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgBreadcrumb, type TilburgBreadcrumbItem } from './component';

@Component({
  template: `<tilburg-breadcrumb [items]="items" (itemClick)="clicked = $event.item.label"></tilburg-breadcrumb>`,
  standalone: false,
})
class HostComponent {
  items: TilburgBreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Mijn Tilburg' },
    { label: 'Mijn aanvragen', current: true },
  ];
  clicked?: string | null;
}

describe('TilburgBreadcrumb', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgBreadcrumb, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders a named nav with a link per step and the current page as text', () => {
    const nav = host().querySelector('nav.utrecht-breadcrumb-nav')!;
    expect(nav.getAttribute('aria-label')).toBe('Kruimelpad');
    const links = nav.querySelectorAll('a.utrecht-breadcrumb-nav__link');
    expect(Array.from(links).map((link) => link.textContent)).toEqual(['Home', 'Mijn Tilburg']);
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('#');
    const current = nav.querySelector('[aria-current="page"]')!;
    expect(current.tagName).toBe('SPAN');
    expect(current.textContent).toBe('Mijn aanvragen');
    expect(nav.querySelectorAll('.utrecht-breadcrumb-nav__separator[aria-hidden="true"]').length).toBe(2);
  });

  it('emits itemClick with the clicked item', () => {
    const link = host().querySelector('a')!;
    link.addEventListener('click', (event) => event.preventDefault());
    link.click();
    expect(fixture.componentInstance.clicked).toBe('Home');
  });

  it('renders nothing without items', () => {
    set({ items: [] });
    expect(host().querySelector('nav')).toBeNull();
  });
});
