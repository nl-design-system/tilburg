import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgPasswordInput } from './component';

@Component({
  template: `
    <label for="pw">Wachtwoord</label>
    <tilburg-password-input id="pw" name="wachtwoord" autocomplete="current-password" [invalid]="invalid" />
    <tilburg-password-input id="pw-reactive" [control]="control" />
  `,
  standalone: false,
})
class HostComponent {
  invalid = false;
  control = new FormControl('geheim');
}

describe('TilburgPasswordInput', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const input = (id: string) => fixture.nativeElement.querySelector(`input#${id}`) as HTMLInputElement;
  const toggle = (id: string) =>
    input(id).parentElement!.querySelector('.tilburg-password-input__toggle') as HTMLButtonElement;
  const status = (id: string) => input(id).parentElement!.querySelector('.tilburg-password-input__status')!;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgPasswordInput, HostComponent],
      imports: [ReactiveFormsModule, UtrechtComponentsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders a password textbox with a labelled toggle, the id on the input only', () => {
    expect(input('pw').type).toBe('password');
    expect(input('pw').classList).toContain('utrecht-textbox');
    expect(input('pw').getAttribute('autocomplete')).toBe('current-password');
    expect(fixture.nativeElement.querySelectorAll('#pw')).toHaveLength(1);
    expect((fixture.nativeElement.querySelector('label') as HTMLLabelElement).control).toBe(input('pw'));
    expect(toggle('pw').getAttribute('aria-label')).toBe('Wachtwoord tonen');
    expect(toggle('pw').getAttribute('aria-pressed')).toBe('false');
    expect(toggle('pw').getAttribute('aria-controls')).toBe('pw');
    expect(status('pw').textContent).toBe('');
  });

  it('shows and hides the password, keeping the label and reporting the state', () => {
    toggle('pw').click();
    fixture.detectChanges();
    expect(input('pw').type).toBe('text');
    expect(toggle('pw').getAttribute('aria-pressed')).toBe('true');
    expect(toggle('pw').getAttribute('aria-label')).toBe('Wachtwoord tonen');
    expect(status('pw').textContent).toBe('Wachtwoord is zichtbaar.');
    toggle('pw').click();
    fixture.detectChanges();
    expect(input('pw').type).toBe('password');
    expect(status('pw').textContent).toBe('Wachtwoord is verborgen.');
  });

  it('passes invalid to the utrecht directive and binds a FormControl, disabling the toggle with it', () => {
    host.invalid = true;
    fixture.detectChanges();
    expect(input('pw').getAttribute('aria-invalid')).toBe('true');
    expect(input('pw-reactive').value).toBe('geheim');
    host.control.disable();
    fixture.detectChanges();
    expect(input('pw-reactive').disabled).toBe(true);
    expect(toggle('pw-reactive').disabled).toBe(true);
  });
});
