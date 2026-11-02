import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgSuperscript } from './component';

@Component({
  template: `<tilburg-superscript [openType]="openType">2</tilburg-superscript>`,
  standalone: false,
})
class HostComponent {
  openType = false;
}

describe('TilburgSuperscript', () => {
  const render = () => {
    TestBed.configureTestingModule({ declarations: [TilburgSuperscript, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture;
  };

  it('renders <sup class="utrecht-superscript"> and adds the open-type modifier only when set', () => {
    const fixture = render();
    const element = fixture.nativeElement.querySelector('tilburg-superscript > sup') as HTMLElement;
    expect(element.className).toBe('utrecht-superscript');
    expect(element.textContent).toBe('2');
    fixture.componentInstance.openType = true;
    fixture.detectChanges();
    expect(element.classList).toContain('utrecht-superscript--open-type');
  });
});
