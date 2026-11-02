import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgIndexCharNav, TilburgIndexCharNavCharacter } from './component';

@Component({
  template: `<tilburg-index-char-nav
    [characters]="characters"
    currentChar="B"
    (charClick)="clicked.push($event.character)"
  ></tilburg-index-char-nav>`,
  standalone: false,
})
class HostComponent {
  characters: TilburgIndexCharNavCharacter[] = [
    { char: 'A', href: '#A' },
    { char: 'B' },
    { char: 'C', disabled: true },
  ];
  clicked: TilburgIndexCharNavCharacter[] = [];
}

describe('TilburgIndexCharNav', () => {
  it('renders button links: secondary, current (primary) and disabled (placeholder)', () => {
    TestBed.configureTestingModule({ declarations: [TilburgIndexCharNav, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav') as HTMLElement;
    expect(nav.className).toBe('utrecht-index-char-nav');
    expect(nav.getAttribute('aria-label')).toBe('Alfabetische index');
    const [a, b, c] = Array.from(nav.querySelectorAll('a'));
    const base = ['utrecht-button-link', 'utrecht-button-link--html-a', 'utrecht-index-char-nav__link'];
    expect(Array.from(a.classList).sort()).toEqual([...base, 'utrecht-button-link--secondary-action'].sort());
    expect(a.getAttribute('href')).toBe('#A');
    expect(Array.from(b.classList).sort()).toEqual(
      [...base, 'utrecht-button-link--primary-action', 'utrecht-index-char-nav__link--current'].sort(),
    );
    expect(b.getAttribute('aria-current')).toBe('page');
    expect(b.getAttribute('href')).toBe('#');
    expect(c.classList).toContain('utrecht-button-link--placeholder');
    expect(c.classList).toContain('utrecht-index-char-nav__link--disabled');
    expect(c.hasAttribute('href')).toBe(false);
    expect(c.getAttribute('role')).toBe('link');
    expect(c.getAttribute('aria-disabled')).toBe('true');
    c.click();
    a.click();
    expect(fixture.componentInstance.clicked).toEqual([fixture.componentInstance.characters[0]]);
  });
});
