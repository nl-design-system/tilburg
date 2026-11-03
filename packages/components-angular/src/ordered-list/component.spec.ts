import { Component, ViewEncapsulation } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgOrderedList } from './component';

@Component({
  template: `<tilburg-ordered-list><li>Eerste stap</li></tilburg-ordered-list>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgOrderedList', () => {
  it('projects the content into the styled element', () => {
    TestBed.configureTestingModule({ declarations: [TilburgOrderedList, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('ol.utrecht-ordered-list--html-ol > li')?.textContent,
    ).toBe('Eerste stap');
  });

  /* Emulated encapsulation would scope the item rules (`--html-ol > li`, `::marker`) away from the projected content: an app that only loads the utrecht CSS
     globally would lose them. */
  it('does not encapsulate its styles', () => {
    expect((TilburgOrderedList as unknown as { ɵcmp: { encapsulation: ViewEncapsulation } }).ɵcmp.encapsulation).toBe(
      ViewEncapsulation.None,
    );
  });
});
