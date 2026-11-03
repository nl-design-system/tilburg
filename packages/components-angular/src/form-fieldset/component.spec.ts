import { Component, ViewEncapsulation } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgFieldset } from './component';

@Component({
  template: `<tilburg-fieldset><legend>Contactgegevens</legend></tilburg-fieldset>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgFieldset', () => {
  it('projects the legend into the fieldset', () => {
    TestBed.configureTestingModule({
      declarations: [TilburgFieldset, HostComponent],
      imports: [UtrechtComponentsModule],
    });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('fieldset.utrecht-fieldset > legend')?.textContent,
    ).toBe('Contactgegevens');
  });

  /* Emulated encapsulation would scope the legend rule (`.utrecht-fieldset > legend`) away from the projected legend: an
     app that only loads the utrecht CSS globally would lose it. */
  it('does not encapsulate its styles', () => {
    expect((TilburgFieldset as unknown as { ɵcmp: { encapsulation: ViewEncapsulation } }).ɵcmp.encapsulation).toBe(
      ViewEncapsulation.None,
    );
  });
});
