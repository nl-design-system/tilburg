import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgSpotlightSection, TilburgSpotlightSectionVariant } from './component';

@Component({
  template: `
    <tilburg-spotlight-section [variant]="variant" [aside]="aside" ariaLabel="Tip">
      <p>Tekst</p>
    </tilburg-spotlight-section>
  `,
  standalone: false,
})
class HostComponent {
  variant?: TilburgSpotlightSectionVariant;
  aside = false;
}

describe('TilburgSpotlightSection', () => {
  beforeEach(() => TestBed.configureTestingModule({ declarations: [TilburgSpotlightSection, HostComponent] }));

  const setup = (variant?: TilburgSpotlightSectionVariant, aside = false) => {
    const fixture = TestBed.createComponent(HostComponent);
    Object.assign(fixture.componentInstance, { variant, aside });
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('tilburg-spotlight-section > *') as HTMLElement;
  };

  it('renders a neutral <section> by default with the projected content', () => {
    const section = setup();
    expect(section.tagName).toBe('SECTION');
    expect(section.className).toBe('utrecht-spotlight-section');
    expect(section.getAttribute('aria-label')).toBe('Tip');
    expect(section.querySelector(':scope > p')?.textContent).toBe('Tekst');
  });

  it.each([
    ['info', 'info'],
    ['success', 'ok'],
    ['warning', 'warning'],
    ['danger', 'error'],
  ] as const)('maps variant %s to the utrecht --%s modifier', (variant, modifier) => {
    expect(setup(variant).classList).toContain(`utrecht-spotlight-section--${modifier}`);
  });

  it('renders an <aside> with aside', () => {
    const aside = setup('info', true);
    expect(aside.tagName).toBe('ASIDE');
    expect(aside.querySelector(':scope > p')?.textContent).toBe('Tekst');
  });
});
