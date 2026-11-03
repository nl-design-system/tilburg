import { Component, ViewEncapsulation } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgUnorderedList } from './component';

@Component({
  template: `<tilburg-unordered-list><li>Eerste item</li></tilburg-unordered-list>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgUnorderedList', () => {
  it('projects the content into the styled element', () => {
    TestBed.configureTestingModule({ declarations: [TilburgUnorderedList, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('ul.utrecht-unordered-list--html-ul > li')?.textContent,
    ).toBe('Eerste item');
  });

  /* Emulated encapsulation would scope the item rules (`--html-ul > li`, `::marker`) away from the projected content: an app that only loads the utrecht CSS
     globally would lose them. */
  it('does not encapsulate its styles', () => {
    expect((TilburgUnorderedList as unknown as { ɵcmp: { encapsulation: ViewEncapsulation } }).ɵcmp.encapsulation).toBe(
      ViewEncapsulation.None,
    );
  });
});
