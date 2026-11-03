import { Component, ViewEncapsulation } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgHtmlContent } from './component';

@Component({
  template: `<tilburg-html-content><p>Tekst</p></tilburg-html-content>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgHtmlContent', () => {
  it('projects the content into the styled element', () => {
    TestBed.configureTestingModule({ declarations: [TilburgHtmlContent, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('.utrecht-html-content > p')?.textContent).toBe(
      'Tekst',
    );
  });

  /* Emulated encapsulation would scope the typography rules away from the projected content: an app that only loads the utrecht CSS
     globally would lose them. */
  it('does not encapsulate its styles', () => {
    expect((TilburgHtmlContent as unknown as { ɵcmp: { encapsulation: ViewEncapsulation } }).ɵcmp.encapsulation).toBe(
      ViewEncapsulation.None,
    );
  });
});
