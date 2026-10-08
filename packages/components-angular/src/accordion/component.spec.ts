import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgAccordion, TilburgAccordionSection } from './component';

@Component({
  template: `
    <tilburg-accordion>
      <tilburg-accordion-section label="Eerste"></tilburg-accordion-section>
      <tilburg-accordion-section label="Tweede"></tilburg-accordion-section>
      <tilburg-accordion-section key="vast" label="Met key"></tilburg-accordion-section>
    </tilburg-accordion>
  `,
  standalone: false,
})
class HostComponent {}

describe('TilburgAccordionSection', () => {
  it('gives sections without a key unique, wired-up ids; a key still controls the id', () => {
    // The accordion's own heading is not under test here.
    TestBed.configureTestingModule({
      declarations: [TilburgAccordion, TilburgAccordionSection, HostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const buttons = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
    const ids = buttons.map((b) => b.id);
    expect(new Set(ids).size).toBe(3);
    expect(ids[2]).toBe('utrecht-accordion-vast-button');
    for (const button of buttons) {
      const panel = fixture.nativeElement.querySelector(`#${button.getAttribute('aria-controls')}`);
      expect(panel).not.toBeNull();
    }
  });
});
