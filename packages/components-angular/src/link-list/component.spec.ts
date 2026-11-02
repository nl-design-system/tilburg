import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgLinkList, TilburgLinkListLink } from './component';

@Component({
  template: `<tilburg-link-list [links]="links" ariaLabel="Meer over afval"></tilburg-link-list>`,
  standalone: false,
})
class HostComponent {
  links: TilburgLinkListLink[] = [
    { label: 'Afvalkalender', href: '/afval/afvalkalender', current: 'page' },
    { label: 'Afvalscheiding', href: 'https://www.milieucentraal.nl', external: true },
  ];
}

describe('TilburgLinkList', () => {
  let fixture: ComponentFixture<HostComponent>;
  const list = () => fixture.nativeElement.querySelector('ul') as HTMLElement | null;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgLinkList, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders the HTML reference structure', () => {
    expect(list()!.className).toBe('utrecht-link-list utrecht-link-list--html-ul');
    expect(list()!.getAttribute('role')).toBe('list');
    expect(list()!.getAttribute('aria-label')).toBe('Meer over afval');
    const items = list()!.querySelectorAll(':scope > li.utrecht-link-list__item');
    expect(items.length).toBe(2);
    const link = items[0].querySelector('a')!;
    expect(link.className).toBe('utrecht-link utrecht-link--html-a utrecht-link-list__link');
    expect(link.getAttribute('href')).toBe('/afval/afvalkalender');
    expect(link.querySelector('svg.utrecht-icon')!.getAttribute('aria-hidden')).toBe('true');
    expect(link.querySelector('.utrecht-link-list__link-text')!.textContent).toBe('Afvalkalender');
  });

  it('maps current and external per link', () => {
    const [first, second] = Array.from(list()!.querySelectorAll('a'));
    expect(first.getAttribute('aria-current')).toBe('page');
    expect(first.hasAttribute('rel')).toBe(false);
    expect(second.getAttribute('rel')).toBe('external noopener noreferrer');
    expect(second.hasAttribute('aria-current')).toBe(false);
  });

  it('renders nothing without links', () => {
    fixture.componentInstance.links = [];
    fixture.detectChanges();
    expect(list()).toBeNull();
  });
});
