import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgNavList, TilburgNavListItem } from './component';

@Component({
  template: `<tilburg-nav-list
    [items]="items"
    [center]="center"
    (itemClick)="clicked = $event.item"
  ></tilburg-nav-list>`,
  standalone: false,
})
class HostComponent {
  items: TilburgNavListItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Wonen', href: '/wonen', current: true },
    { label: 'Afval' },
  ];
  center = false;
  clicked?: TilburgNavListItem;
}

describe('TilburgNavList', () => {
  let fixture: ComponentFixture<HostComponent>;
  const el = () => fixture.nativeElement as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgNavList, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders the HTML reference list with the current page', () => {
    const list = el().querySelector('ul')!;
    expect(list.className).toBe('utrecht-nav-list');
    expect(list.getAttribute('role')).toBe('list');
    const links = el().querySelectorAll('li.utrecht-nav-list__item > a');
    expect(links.length).toBe(3);
    expect(links[0].className).toBe('utrecht-link utrecht-link--html-a utrecht-nav-list__link');
    expect(links[0].hasAttribute('aria-current')).toBe(false);
    expect(links[1].classList).toContain('utrecht-link--current');
    expect(links[1].getAttribute('aria-current')).toBe('page');
    expect(links[2].getAttribute('href')).toBe('#');
  });

  it('adds the center modifier, emits itemClick and renders nothing without items', () => {
    fixture.componentInstance.center = true;
    fixture.detectChanges();
    expect(el().querySelector('ul')!.classList).toContain('utrecht-nav-list--center');
    (el().querySelector('a') as HTMLAnchorElement).dispatchEvent(new MouseEvent('click', { cancelable: true }));
    expect(fixture.componentInstance.clicked).toBe(fixture.componentInstance.items[0]);
    fixture.componentInstance.items = [];
    fixture.detectChanges();
    expect(el().querySelector('ul')).toBeNull();
  });
});
