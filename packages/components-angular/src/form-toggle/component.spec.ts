import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TilburgFormToggle } from './component';

@Component({
  template: `
    <label for="plain">Meldingen</label>
    <tilburg-form-toggle
      id="plain"
      name="meldingen"
      [checked]="checked"
      [invalid]="invalid"
      [required]="true"
      (checkChanged)="changes = changes + 1"
    ></tilburg-form-toggle>
    <tilburg-form-toggle id="reactive" [control]="control"></tilburg-form-toggle>
    <tilburg-form-toggle ariaLabel="Zonder id"></tilburg-form-toggle>
  `,
  standalone: false,
})
class HostComponent {
  checked = false;
  invalid = false;
  changes = 0;
  control = new FormControl(false);
}

describe('TilburgFormToggle', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const input = (id: string) => fixture.nativeElement.querySelector(`input#${id}`) as HTMLInputElement;
  const wrapper = (id: string) => input(id).parentElement as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgFormToggle, HostComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the reference DOM: a switch checkbox and a track label pointing at it', () => {
    expect(wrapper('plain').classList).toContain('utrecht-form-toggle');
    expect(wrapper('plain').classList).toContain('utrecht-form-toggle--html-checkbox');
    expect(input('plain').getAttribute('type')).toBe('checkbox');
    expect(input('plain').getAttribute('role')).toBe('switch');
    expect(input('plain').classList).toContain('utrecht-form-toggle__checkbox');
    expect(input('plain').name).toBe('meldingen');
    const track = wrapper('plain').querySelector('label') as HTMLLabelElement;
    expect(track.classList).toContain('utrecht-form-toggle__track');
    expect(track.htmlFor).toBe('plain');
    expect(track.querySelector('span.utrecht-form-toggle__thumb')).not.toBeNull();
  });

  it('puts the id on the input only and keeps the external label working', () => {
    expect(fixture.nativeElement.querySelectorAll('#plain')).toHaveLength(1);
    const label = fixture.nativeElement.querySelector('label[for="plain"]') as HTMLLabelElement;
    expect(label.control).toBe(input('plain'));
    expect(input('plain').required).toBe(true);
    expect(input('plain').getAttribute('aria-required')).toBe('true');
  });

  it('generates a unique id when none is given', () => {
    const generated = fixture.nativeElement.querySelector('input[aria-label="Zonder id"]') as HTMLInputElement;
    expect(generated.id).toMatch(/^tilburg-form-toggle-\d+$/);
    expect(generated.nextElementSibling?.getAttribute('for')).toBe(generated.id);
  });

  it('maps checked and invalid, and emits checkChanged', () => {
    host.checked = true;
    host.invalid = true;
    fixture.detectChanges();
    expect(input('plain').checked).toBe(true);
    expect(input('plain').getAttribute('aria-invalid')).toBe('true');
    expect(wrapper('plain').classList).toContain('utrecht-form-toggle--invalid');
    input('plain').click();
    expect(host.changes).toBe(1);
  });

  it('binds a FormControl both ways, including the disabled state', () => {
    input('reactive').click();
    fixture.detectChanges();
    expect(host.control.value).toBe(true);
    host.control.setValue(false);
    fixture.detectChanges();
    expect(input('reactive').checked).toBe(false);
    host.control.disable();
    fixture.detectChanges();
    expect(input('reactive').disabled).toBe(true);
    expect(wrapper('reactive').classList).toContain('utrecht-form-toggle--disabled');
  });
});
