import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgBackdrop } from './component';

@Component({
  template: `<tilburg-backdrop [viewport]="viewport"><span>x</span></tilburg-backdrop>`,
  standalone: false,
})
class HostComponent {
  viewport = false;
}

describe('TilburgBackdrop', () => {
  beforeEach(() => TestBed.configureTestingModule({ declarations: [TilburgBackdrop, HostComponent] }));

  it('renders the HTML/CSS reference markup and maps viewport', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const backdrop = fixture.nativeElement.querySelector('tilburg-backdrop > div') as HTMLElement;
    expect(backdrop.className).toBe('utrecht-backdrop');
    expect(backdrop.querySelector('span')?.textContent).toBe('x');

    fixture.componentInstance.viewport = true;
    fixture.detectChanges();
    expect(backdrop.classList).toContain('utrecht-backdrop--viewport');
  });
});
