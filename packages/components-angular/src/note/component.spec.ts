import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgNote, TilburgNoteVariant } from './component';

@Component({
  template: `
    <tilburg-note [variant]="variant" [aside]="aside" ariaLabelledBy="t">
      <h3 id="t">Goed om te weten</h3>
    </tilburg-note>
  `,
  standalone: false,
})
class HostComponent {
  variant?: TilburgNoteVariant;
  aside = false;
}

describe('TilburgNote', () => {
  beforeEach(() => TestBed.configureTestingModule({ declarations: [TilburgNote, HostComponent] }));

  const setup = (variant?: TilburgNoteVariant, aside = false) => {
    const fixture = TestBed.createComponent(HostComponent);
    Object.assign(fixture.componentInstance, { variant, aside });
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('tilburg-note > *') as HTMLElement;
  };

  it('renders a neutral <section role="note"> by default with the projected content', () => {
    const note = setup();
    expect(note.tagName).toBe('SECTION');
    expect(note.getAttribute('role')).toBe('note');
    expect(note.className).toBe('utrecht-note');
    expect(note.getAttribute('aria-labelledby')).toBe('t');
    expect(note.querySelector(':scope > h3')?.textContent).toBe('Goed om te weten');
  });

  it.each([
    ['info', 'info'],
    ['success', 'success'],
    ['warning', 'warning'],
    ['danger', 'error'],
  ] as const)('maps variant %s to the utrecht --%s modifier', (variant, modifier) => {
    expect(setup(variant).classList).toContain(`utrecht-note--${modifier}`);
  });

  it('renders an <aside> without role="note" with aside', () => {
    const aside = setup('info', true);
    expect(aside.tagName).toBe('ASIDE');
    expect(aside.hasAttribute('role')).toBe(false);
    expect(aside.querySelector(':scope > h3')).not.toBeNull();
  });
});
