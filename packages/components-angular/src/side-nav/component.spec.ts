import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgSideNav, TilburgSideNavItem } from './component';

@Component({
  template: `<tilburg-side-nav [items]="items" (itemClick)="clicked = $event.item"></tilburg-side-nav>`,
  standalone: false,
})
class HostComponent {
  items: TilburgSideNavItem[] = [
    { label: 'Afval', href: '/afval' },
    {
      label: 'Parkeren',
      href: '/parkeren',
      children: [
        { label: 'Bewonersvergunning', href: '/b', current: true },
        { label: 'Bezoekersvergunning', href: '/v' },
      ],
    },
    { label: 'Paspoort', current: true },
  ];
  clicked?: TilburgSideNavItem;
}

describe('TilburgSideNav', () => {
  it('renders the HTML reference: modifiers for last, parent, child and current', () => {
    TestBed.configureTestingModule({ declarations: [TilburgSideNav, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav') as HTMLElement;
    expect(nav.className).toBe('utrecht-sidenav utrecht-sidenav--pseudo-elements');
    expect(nav.getAttribute('aria-label')).toBe('Submenu');
    const top = nav.querySelectorAll(':scope > ul.utrecht-sidenav__list > li');
    expect(top.length).toBe(3);
    expect(top[0].className).toBe('utrecht-sidenav__item');
    expect(top[2].className).toBe('utrecht-sidenav__item utrecht-sidenav__item--last');
    expect(top[1].querySelector('a')!.className).toBe('utrecht-sidenav__link utrecht-sidenav__link--parent');
    expect(top[2].querySelector('a')!.className).toBe('utrecht-sidenav__link utrecht-sidenav__link--current');
    expect(top[2].querySelector('a')!.getAttribute('href')).toBe('#');
    const childList = top[1].querySelector('ul')!;
    expect(childList.className).toBe('utrecht-sidenav__list utrecht-sidenav__list--child');
    const children = childList.querySelectorAll('li.utrecht-sidenav__item.utrecht-sidenav__item--child > a');
    expect(children[0].className).toBe(
      'utrecht-sidenav__link utrecht-sidenav__link--child utrecht-sidenav__link--current utrecht-sidenav__link--current-child',
    );
    expect(children[0].getAttribute('aria-current')).toBe('page');
    expect(children[1].hasAttribute('aria-current')).toBe(false);
    expect(nav.querySelectorAll('.utrecht-sidenav__item-separator').length).toBe(3);
    (children[1] as HTMLAnchorElement).dispatchEvent(new MouseEvent('click', { cancelable: true }));
    expect(fixture.componentInstance.clicked).toBe(fixture.componentInstance.items[1].children![1]);
  });
});
