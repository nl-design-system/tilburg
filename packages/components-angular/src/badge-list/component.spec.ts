import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgBadgeList } from './component';

@Component({
  template: `<tilburg-badge-list><span class="utrecht-data-badge">Parkeren</span></tilburg-badge-list>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgBadgeList', () => {
  it('renders a div.utrecht-badge-list around its badges', () => {
    TestBed.configureTestingModule({ declarations: [TilburgBadgeList, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const list = fixture.nativeElement.querySelector('div.utrecht-badge-list') as HTMLElement;
    expect(list).not.toBeNull();
    expect(list.querySelector('.utrecht-data-badge')!.textContent).toBe('Parkeren');
  });
});
