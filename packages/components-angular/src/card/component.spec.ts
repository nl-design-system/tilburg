import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgCard } from './component';

@Component({
  template: `
    <tilburg-card [heading]="heading" [headingLevel]="level" [href]="href">
      <img slot="image" src="x.png" alt="" />
      <p>Op afspraak.</p>
    </tilburg-card>
  `,
  standalone: false,
})
class HostComponent {
  heading = 'Afval';
  level: 1 | 2 | 3 | 4 | 5 | 6 = 3;
  href?: string;
}

describe('TilburgCard', () => {
  beforeEach(() => TestBed.configureTestingModule({ declarations: [TilburgCard, HostComponent] }));

  const setup = (props: Partial<HostComponent> = {}) => {
    const fixture = TestBed.createComponent(HostComponent);
    Object.assign(fixture.componentInstance, props);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('tilburg-card > .utrecht-card') as HTMLElement;
  };

  it('renders the HTML/CSS reference structure', () => {
    const card = setup();
    expect(card.className).toBe('utrecht-card');
    const content = card.querySelector(':scope > .utrecht-card__content')!;
    const parts = Array.from(content.children, (el) => el.className);
    expect(parts).toEqual(['utrecht-card__heading', 'utrecht-card__image', 'utrecht-card__body']);
    const heading = content.querySelector(':scope > .utrecht-card__heading > h3.utrecht-heading-3')!;
    expect(heading.textContent?.trim()).toBe('Afval');
    expect(heading.querySelector('a')).toBeNull();
    expect(content.querySelector(':scope > .utrecht-card__image > img')).not.toBeNull();
    expect(content.querySelector(':scope > .utrecht-card__body > p')?.textContent).toBe('Op afspraak.');
  });

  it('makes the heading a stretched link with href', () => {
    const card = setup({ href: '/afval' });
    expect(card.classList).toContain('utrecht-card--link');
    const link = card.querySelector('h3 > a') as HTMLAnchorElement;
    expect(link.className).toBe('utrecht-link utrecht-link--html-a utrecht-card__link');
    expect(link.getAttribute('href')).toBe('/afval');
    expect(link.textContent?.trim()).toBe('Afval');
  });

  it('renders the heading level', () => {
    const card = setup({ level: 2 });
    expect(card.querySelector('.utrecht-card__heading > h2.utrecht-heading-2')?.textContent?.trim()).toBe('Afval');
    expect(card.querySelector('h3')).toBeNull();
  });
});
