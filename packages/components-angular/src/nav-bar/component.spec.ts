import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgNavBar } from './component';
import { TilburgNavList } from '../nav-list/component';

@Component({
  template: `
    <tilburg-nav-bar [ariaLabel]="label">
      <tilburg-nav-list [items]="[{ label: 'Home', href: '/' }]"></tilburg-nav-list>
    </tilburg-nav-bar>
  `,
  standalone: false,
})
class HostComponent {
  label = 'Hoofdmenu';
}

describe('TilburgNavBar', () => {
  it('renders a named nav with the content wrapper around the projected nav list', () => {
    TestBed.configureTestingModule({ declarations: [TilburgNavBar, TilburgNavList, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav') as HTMLElement;
    expect(nav.className).toBe('utrecht-nav-bar');
    expect(nav.getAttribute('aria-label')).toBe('Hoofdmenu');
    const content = nav.querySelector(':scope > .utrecht-nav-bar__content')!;
    expect(content.querySelector('ul.utrecht-nav-list')).not.toBeNull();
    fixture.componentInstance.label = 'Menu';
    fixture.detectChanges();
    expect(nav.getAttribute('aria-label')).toBe('Menu');
  });
});
