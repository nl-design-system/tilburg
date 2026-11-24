import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgButtonGroup } from './component';

@Component({
  template: `<tilburg-button-group role="toolbar" ariaLabel="Opmaak"
    ><button type="button">Vet</button></tilburg-button-group
  >`,
  standalone: false,
})
class HostComponent {}

describe('TilburgButtonGroup', () => {
  it('puts a static role only on the inner group, not on the host', () => {
    TestBed.configureTestingModule({ declarations: [TilburgButtonGroup, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('tilburg-button-group') as HTMLElement;
    expect(host.hasAttribute('role')).toBe(false);
    expect(host.querySelector('.utrecht-button-group')!.getAttribute('role')).toBe('toolbar');
    expect(fixture.nativeElement.querySelectorAll('[role="toolbar"]')).toHaveLength(1);
  });
});
