import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgHeadingGroup } from './component';

@Component({
  template: `
    <tilburg-heading-group>
      <h1 class="utrecht-heading-1">Afvalkalender</h1>
      <p class="utrecht-pre-heading">Afval en recycling</p>
    </tilburg-heading-group>
  `,
  standalone: false,
})
class HostComponent {}

describe('TilburgHeadingGroup', () => {
  const render = () => {
    TestBed.configureTestingModule({ declarations: [TilburgHeadingGroup, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  };

  it('projects the heading and pre-heading into <hgroup class="utrecht-heading-group"> in source order', () => {
    const hgroup = render().nativeElement.querySelector(
      'tilburg-heading-group > hgroup.utrecht-heading-group',
    ) as HTMLElement;
    expect(Array.from(hgroup.children).map((child) => child.className)).toEqual([
      'utrecht-heading-1',
      'utrecht-pre-heading',
    ]);
  });
});
