import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgBlockquote } from './component';

@Component({
  template: `<tilburg-blockquote [attribution]="attribution"><p>Citaat</p></tilburg-blockquote>`,
  standalone: false,
})
class HostComponent {
  attribution = '';
}

describe('TilburgBlockquote', () => {
  const render = () => {
    TestBed.configureTestingModule({ declarations: [TilburgBlockquote, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  };

  it('renders the content without an attribution by default', () => {
    const blockquote = render().nativeElement.querySelector(
      'tilburg-blockquote > blockquote.utrecht-blockquote',
    ) as HTMLElement;
    expect(blockquote.querySelector(':scope > .utrecht-blockquote__content > p')!.textContent).toBe('Citaat');
    expect(blockquote.querySelector('.utrecht-blockquote__attribution')).toBeNull();
  });

  it('renders the attribution after the content when set', () => {
    const fixture = render();
    fixture.componentInstance.attribution = 'Inwoner van de Reeshof';
    fixture.detectChanges();
    const children = (fixture.nativeElement.querySelector('blockquote') as HTMLElement).children;
    expect(children[0].className).toBe('utrecht-blockquote__content');
    expect(children[1].className).toBe('utrecht-blockquote__attribution');
    expect(children[1].textContent).toBe('Inwoner van de Reeshof');
  });
});
