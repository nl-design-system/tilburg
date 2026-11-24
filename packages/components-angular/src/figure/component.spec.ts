import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgFigure } from './component';

@Component({
  template: `<tilburg-figure [caption]="caption"><img alt="Logo" /></tilburg-figure>`,
  standalone: false,
})
class HostComponent {
  caption?: string = 'Het logo';
}

describe('TilburgFigure', () => {
  beforeEach(() => TestBed.configureTestingModule({ declarations: [TilburgFigure, HostComponent] }));

  it('renders the projected content and the caption', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const figure = fixture.nativeElement.querySelector('figure.utrecht-figure') as HTMLElement;
    expect(figure.querySelector('img')).not.toBeNull();
    const caption = figure.querySelector('figcaption.utrecht-figure__caption')!;
    expect(caption.textContent!.trim()).toBe('Het logo');
    expect(figure.lastElementChild).toBe(caption);
  });

  it('renders no figcaption without a caption', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentInstance.caption = undefined;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('figcaption')).toBeNull();
  });
});
