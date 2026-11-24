import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgPageFooter, type TilburgPageFooterLink } from './component';

@Component({
  template: `<tilburg-page-footer [ariaLabel]="ariaLabel" [links]="links" [primaryLink]="primaryLink"
    ><p>Gemeente Tilburg</p></tilburg-page-footer
  >`,
  standalone: false,
})
class HostComponent {
  ariaLabel?: string;
  links: TilburgPageFooterLink[] = [];
  primaryLink?: TilburgPageFooterLink;
}

describe('TilburgPageFooter', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgPageFooter, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  const footer = () => host().querySelector('footer.tilburg-page-footer') as HTMLElement;

  it('renders a footer with its content and no lists by default', () => {
    expect(footer().hasAttribute('aria-label')).toBe(false);
    expect(footer().querySelector('.tilburg-page-footer__container > p')!.textContent).toBe('Gemeente Tilburg');
    expect(footer().querySelector('ul')).toBeNull();
  });

  it('renders the links and the primary link as lists', () => {
    set({
      ariaLabel: 'Voettekst',
      primaryLink: { label: 'Contact', href: '/contact' },
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Toegankelijkheid', href: '/toegankelijkheid' },
      ],
    });
    expect(footer().getAttribute('aria-label')).toBe('Voettekst');
    const primary = footer().querySelector('ul.tilburg-page-footer__primary > li > a')!;
    expect(primary.textContent).toBe('Contact');
    expect(primary.getAttribute('href')).toBe('/contact');
    const links = footer().querySelectorAll('ul.tilburg-page-footer__list > li > a.tilburg-page-footer__link');
    expect(Array.from(links).map((link) => [link.textContent, link.getAttribute('href')])).toEqual([
      ['Privacy', '/privacy'],
      ['Toegankelijkheid', '/toegankelijkheid'],
    ]);
  });
});
