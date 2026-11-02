import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgSubscript } from './component';

@Component({
  template: `<tilburg-subscript [openType]="openType">2</tilburg-subscript>`,
  standalone: false,
})
class HostComponent {
  openType = false;
}

describe('TilburgSubscript', () => {
  const render = () => {
    TestBed.configureTestingModule({ declarations: [TilburgSubscript, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  };

  it('renders <sub class="utrecht-subscript"> and adds the open-type modifier only when set', () => {
    const fixture = render();
    const element = fixture.nativeElement.querySelector('tilburg-subscript > sub') as HTMLElement;
    expect(element.className).toBe('utrecht-subscript');
    expect(element.textContent).toBe('2');
    fixture.componentInstance.openType = true;
    fixture.detectChanges();
    expect(element.classList).toContain('utrecht-subscript--open-type');
  });
});
