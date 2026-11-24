import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgPreHeading } from './component';

@Component({
  template: `<tilburg-pre-heading>Afval en recycling</tilburg-pre-heading>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgPreHeading', () => {
  const render = () => {
    TestBed.configureTestingModule({ declarations: [TilburgPreHeading, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  };

  it('renders <p class="utrecht-pre-heading"> around the projected content', () => {
    const p = render().nativeElement.querySelector('tilburg-pre-heading > p.utrecht-pre-heading') as HTMLElement;
    expect(p.textContent).toBe('Afval en recycling');
  });
});
