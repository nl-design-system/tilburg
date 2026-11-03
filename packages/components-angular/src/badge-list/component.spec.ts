import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgBadgeList } from './component';

@Component({
  template: `<tilburg-badge-list>
    <li><span class="utrecht-data-badge">Parkeren</span></li>
    <li><span class="utrecht-data-badge">Afval</span></li>
  </tilburg-badge-list>`,
  standalone: false,
})
class HostComponent {}

describe('TilburgBadgeList', () => {
  it('renders a ul[role=list] with the projected li items, like the HTML reference', () => {
    TestBed.configureTestingModule({ declarations: [TilburgBadgeList, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const list = fixture.nativeElement.querySelector('ul.utrecht-badge-list') as HTMLElement;
    expect(list).not.toBeNull();
    expect(list.getAttribute('role')).toBe('list');
    const items = list.querySelectorAll(':scope > li');
    expect(items.length).toBe(2);
    expect(items[0].querySelector('.utrecht-data-badge')!.textContent).toBe('Parkeren');
  });
});
