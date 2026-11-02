import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgColumnLayout } from './component';

@Component({
  template: `
    <tilburg-column-layout id="plain"><p>Tekst</p></tilburg-column-layout>
    <tilburg-column-layout id="rule" rule><p>Tekst</p></tilburg-column-layout>
  `,
  standalone: false,
})
class HostComponent {}

describe('TilburgColumnLayout', () => {
  beforeEach(() => TestBed.configureTestingModule({ declarations: [TilburgColumnLayout, HostComponent] }));

  it('renders the HTML/CSS reference markup; a bare rule attribute adds the rule', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const plain = fixture.nativeElement.querySelector('#plain > div') as HTMLElement;
    expect(plain.className).toBe('utrecht-column-layout');
    expect(plain.querySelector(':scope > p')?.textContent).toBe('Tekst');
    expect(fixture.nativeElement.querySelector('#rule > div').classList).toContain('utrecht-column-layout--rule');
  });
});
