import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { type AriaCurrent, TilburgLink } from './component';

@Component({
  template: `<tilburg-link
    [href]="href"
    [external]="external"
    [rel]="rel"
    [target]="target"
    [current]="current"
    [ariaLabel]="ariaLabel"
    >Contact</tilburg-link
  >`,
  standalone: false,
})
class HostComponent {
  href?: string = '/contact';
  external = false;
  rel?: string;
  target?: string;
  current?: AriaCurrent;
  ariaLabel?: string;
}

describe('TilburgLink', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgLink, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  const link = () => host().querySelector('a') as HTMLAnchorElement;

  it('renders a.utrecht-link with the href and nothing else', () => {
    expect(link().className).toBe('utrecht-link utrecht-link--html-a');
    expect(link().getAttribute('href')).toBe('/contact');
    expect(link().textContent!.trim()).toBe('Contact');
    for (const name of ['rel', 'target', 'aria-label', 'aria-current']) expect(link().hasAttribute(name)).toBe(false);
  });

  it('adds the external rel values after an own rel', () => {
    set({ external: true });
    expect(link().getAttribute('rel')).toBe('external noopener noreferrer');
    set({ rel: 'nofollow' });
    expect(link().getAttribute('rel')).toBe('nofollow external noopener noreferrer');
    set({ external: false });
    expect(link().getAttribute('rel')).toBe('nofollow');
  });

  it('maps target, current and ariaLabel', () => {
    set({ target: '_blank', current: 'page', ariaLabel: 'Contact met de gemeente' });
    expect(link().getAttribute('target')).toBe('_blank');
    expect(link().getAttribute('aria-current')).toBe('page');
    expect(link().getAttribute('aria-label')).toBe('Contact met de gemeente');
  });

  it('renders no href attribute without one', () => {
    set({ href: undefined });
    expect(link().hasAttribute('href')).toBe(false);
  });
});
