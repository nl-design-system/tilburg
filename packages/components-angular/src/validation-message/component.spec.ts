import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgValidationMessage } from './component';

@Component({
  template: `
    <tilburg-validation-message>Vul een geldig e-mailadres in.</tilburg-validation-message>
    <tilburg-validation-message type="warning">Let op.</tilburg-validation-message>
    <tilburg-validation-message><span slot="icon" id="custom">!</span>X</tilburg-validation-message>
  `,
  standalone: false,
})
class HostComponent {}

describe('TilburgValidationMessage', () => {
  it('renders the default svg icon of the HTML reference per type, unless an icon is projected', () => {
    TestBed.configureTestingModule({ declarations: [TilburgValidationMessage, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const [error, warning, custom] = Array.from<HTMLElement>(
      fixture.nativeElement.querySelectorAll('.tilburg-validation-message__icon'),
    );
    expect(error.getAttribute('aria-hidden')).toBe('true');
    const svg = error.querySelector('svg[aria-hidden="true"]')!;
    expect(svg.getAttribute('viewBox')).toBe('0 0 20 20');
    expect(svg.querySelector('path')!.getAttribute('d')).toMatch(/^M10 1a9 9/);
    expect(warning.querySelector('path')!.getAttribute('d')).toMatch(/^M10 1 1 19h18/);
    expect(custom.querySelector('#custom')).not.toBeNull();
    expect(custom.querySelector('svg')).toBeNull();
  });
});
