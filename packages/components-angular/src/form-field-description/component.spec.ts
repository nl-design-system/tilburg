import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgFormFieldDescription } from './component';

@Component({
  template: `<tilburg-form-field-description id="desc" class="extra" [invalid]="true"
    >Fout</tilburg-form-field-description
  >`,
  standalone: false,
})
class HostComponent {}

describe('TilburgFormFieldDescription', () => {
  it('puts id, class and role on the description div, not on the host', () => {
    TestBed.configureTestingModule({ declarations: [TilburgFormFieldDescription, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('tilburg-form-field-description') as HTMLElement;
    const div = host.querySelector('div') as HTMLElement;
    expect(div.id).toBe('desc');
    expect(div.getAttribute('role')).toBe('alert');
    expect(div.className).toContain('extra');
    expect(div.classList).toContain('utrecht-form-field-description');
    expect(div.classList).toContain('utrecht-form-field-description--invalid');
    expect(host.hasAttribute('id')).toBe(false);
    expect(host.hasAttribute('role')).toBe(false);
    expect(fixture.nativeElement.querySelectorAll('#desc').length).toBe(1);
  });
});
