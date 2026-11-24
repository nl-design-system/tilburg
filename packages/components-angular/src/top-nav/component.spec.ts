import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgTopNav, TilburgTopNavItem } from './component';

@Component({
  template: `<tilburg-top-nav [items]="items" (itemClick)="clicked = $event.item"></tilburg-top-nav>`,
  standalone: false,
})
class HostComponent {
  items: TilburgTopNavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Aanvragen', href: '/aanvragen', current: true },
  ];
  clicked?: TilburgTopNavItem;
}

describe('TilburgTopNav', () => {
  it('renders the utrecht topnav with the current page and emits itemClick', () => {
    TestBed.configureTestingModule({ declarations: [TilburgTopNav, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav') as HTMLElement;
    expect(nav.className).toBe('utrecht-topnav');
    expect(nav.getAttribute('aria-label')).toBe('Hoofdmenu');
    expect(nav.querySelector('ul')!.className).toBe('utrecht-topnav__list');
    const links = nav.querySelectorAll('li.utrecht-topnav__item > a');
    expect(links[0].className).toBe('utrecht-topnav__link');
    expect(links[1].className).toBe('utrecht-topnav__link utrecht-topnav__link--current');
    expect(links[1].getAttribute('aria-current')).toBe('page');
    (links[0] as HTMLAnchorElement).dispatchEvent(new MouseEvent('click', { cancelable: true }));
    expect(fixture.componentInstance.clicked).toBe(fixture.componentInstance.items[0]);
    fixture.componentInstance.items = [];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nav')).toBeNull();
  });
});
