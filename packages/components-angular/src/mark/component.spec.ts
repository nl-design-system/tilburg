import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgMark } from './component';

@Component({
  template: `<tilburg-mark>Stadswinkel</tilburg-mark>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgMark', () => {
  const render = () => {
    TestBed.configureTestingModule({ declarations: [TilburgMark, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  };

  it('renders <mark class="utrecht-mark"> around the projected content', () => {
    const mark = render().nativeElement.querySelector('tilburg-mark > mark.utrecht-mark') as HTMLElement;
    expect(mark.textContent).toBe('Stadswinkel');
  });
});
