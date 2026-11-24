import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgSuperscript } from './component';

@Component({
  template: `<tilburg-superscript>2</tilburg-superscript>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgSuperscript', () => {
  it('renders <sup class="utrecht-superscript"> around its content', () => {
    TestBed.configureTestingModule({ declarations: [TilburgSuperscript, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('tilburg-superscript > sup') as HTMLElement;
    expect(element.className).toBe('utrecht-superscript');
    expect(element.textContent).toBe('2');
  });
});
