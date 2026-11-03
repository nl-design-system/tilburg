import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgFormLabel } from './component';
import { TilburgCheckbox } from '../checkbox/component';

@Component({
  template: `
    <tilburg-form-label type="checkbox"
      ><tilburg-checkbox name="agree"></tilburg-checkbox> Ik ga akkoord</tilburg-form-label
    >
    <tilburg-form-label for="email">E-mail</tilburg-form-label>
  `,
  standalone: false,
})
class HostComponent {}

describe('TilburgFormLabel', () => {
  const render = () => {
    TestBed.configureTestingModule({
      declarations: [TilburgFormLabel, TilburgCheckbox, HostComponent],
      imports: [ReactiveFormsModule, UtrechtComponentsModule],
    });
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  it('labels a wrapped checkbox: no for="undefined", and clicking the text toggles it', () => {
    const root = render();
    const label = root.querySelector('label') as HTMLLabelElement;
    const input = root.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(label.hasAttribute('for')).toBe(false);
    expect(input.labels?.length).toBe(1);
    label.click();
    expect(input.checked).toBe(true);
  });

  it('still writes a given for', () => {
    expect(render().querySelectorAll('label')[1].getAttribute('for')).toBe('email');
  });
});
