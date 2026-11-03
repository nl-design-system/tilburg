import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgSubscript } from './component';

@Component({
  template: `<tilburg-subscript>2</tilburg-subscript>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgSubscript', () => {
  it('renders <sub class="utrecht-subscript"> around its content', () => {
    TestBed.configureTestingModule({ declarations: [TilburgSubscript, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('tilburg-subscript > sub') as HTMLElement;
    expect(element.className).toBe('utrecht-subscript');
    expect(element.textContent).toBe('2');
  });
});
