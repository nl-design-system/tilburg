import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TilburgForm } from './component';

@Component({
  template: `
    <tilburg-form id="contact" ariaLabel="Contact" [formGroup]="form" (ngSubmit)="submitted = submitted + 1">
      <input name="naam" formControlName="naam" />
      <button type="submit">Versturen</button>
    </tilburg-form>
    <tilburg-form id="los" [noValidate]="true"></tilburg-form>
  `,
  standalone: false,
})
class HostComponent {
  submitted = 0;
  form = new FormGroup({ naam: new FormControl('Jan') });
}

describe('TilburgForm', () => {
  let fixture: ComponentFixture<HostComponent>;
  const form = (id: string) => fixture.nativeElement.querySelector(`form#${id}`) as HTMLFormElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgForm, HostComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders form.utrecht-form with the projected content and the id on the form only', () => {
    expect(form('contact').classList).toContain('utrecht-form');
    expect(form('contact').getAttribute('aria-label')).toBe('Contact');
    expect(form('contact').querySelector('input[name="naam"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('#contact')).toHaveLength(1);
  });

  it('adds novalidate only when noValidate is set', () => {
    expect(form('contact').hasAttribute('novalidate')).toBe(false);
    expect(form('los').hasAttribute('novalidate')).toBe(true);
  });

  it('lets [formGroup] and (ngSubmit) on the host handle the native submit', () => {
    const event = new Event('submit', { bubbles: true, cancelable: true });
    form('contact').dispatchEvent(event);
    expect(fixture.componentInstance.submitted).toBe(1);
    expect(event.defaultPrevented).toBe(true);
    expect(fixture.componentInstance.form.value).toEqual({ naam: 'Jan' });
  });
});
