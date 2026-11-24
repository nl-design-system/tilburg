import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgMultilineData } from './component';

@Component({
  template: `<tilburg-multiline-data>{{ adres }}</tilburg-multiline-data>`,
  standalone: false,
})
class HostComponent {
  adres = 'Stadhuisplein 130\n5038 TC Tilburg';
}

describe('TilburgMultilineData', () => {
  it('renders a <pre> with both Utrecht classes and keeps the newlines', () => {
    TestBed.configureTestingModule({ declarations: [TilburgMultilineData, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const pre = fixture.nativeElement.querySelector('pre') as HTMLElement;
    expect(pre.className).toBe('utrecht-multiline-data utrecht-multiline-data--html-pre');
    expect(pre.textContent).toBe('Stadhuisplein 130\n5038 TC Tilburg');
  });
});
