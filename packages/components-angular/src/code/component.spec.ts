import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgCode } from './component';

@Component({
  template: `<tilburg-code>.pdf</tilburg-code>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgCode', () => {
  const render = () => {
    TestBed.configureTestingModule({ declarations: [TilburgCode, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  };

  it('renders <code class="utrecht-code"> around the projected content', () => {
    const code = render().nativeElement.querySelector('tilburg-code > code.utrecht-code') as HTMLElement;
    expect(code.textContent).toBe('.pdf');
  });
});
