import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgSkipLink } from './component';

@Component({
  template: `
    <tilburg-skip-link href="#main">Naar inhoud</tilburg-skip-link>
    <tilburg-skip-link visibility="focus">X</tilburg-skip-link>
  `,
  standalone: false,
})
class HostComponent {}

describe('TilburgSkipLink', () => {
  it('renders visible-on-focus by default and visibility="focus" as --focus with --visible', () => {
    TestBed.configureTestingModule({ declarations: [TilburgSkipLink, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const [production, focus] = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('a'));
    expect(production.className).toBe('utrecht-skip-link utrecht-skip-link--visible-on-focus');
    expect(production.getAttribute('href')).toBe('#main');
    expect(focus.className).toBe('utrecht-skip-link utrecht-skip-link--focus utrecht-skip-link--visible');
  });
});
