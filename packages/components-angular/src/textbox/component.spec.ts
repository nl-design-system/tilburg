import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgTextbox } from './component';

@Component({
  template: `
    <tilburg-textbox id="tb-password" type="password" [control]="control"></tilburg-textbox>
    <tilburg-textbox id="tb-email" type="email" [control]="control"></tilburg-textbox>
    <tilburg-textbox id="tb-default" [control]="control"></tilburg-textbox>
    <tilburg-textbox
      id="tb-attrs"
      name="email"
      dir="ltr"
      inputMode="email"
      [control]="control"
      (blur)="blurred = blurred + 1"
    ></tilburg-textbox>
    <tilburg-textbox id="tb-plain" name="plain" [disabled]="true"></tilburg-textbox>
    <tilburg-textbox class="no-id" [control]="control"></tilburg-textbox>
  `,
  standalone: false,
})
class HostComponent {
  control = new FormControl('');
  blurred = 0;
}

describe('TilburgTextbox', () => {
  let fixture: ComponentFixture<HostComponent>;
  let warn: jest.SpyInstance;
  const input = (id: string) => fixture.nativeElement.querySelector(`input#${id}`) as HTMLInputElement;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    TestBed.configureTestingModule({
      declarations: [TilburgTextbox, HostComponent],
      imports: [ReactiveFormsModule, UtrechtComponentsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  afterEach(() => warn.mockRestore());

  it('sets the real input type, so a password field masks the password', () => {
    expect(input('tb-password').type).toBe('password');
    expect(input('tb-password').classList).toContain('utrecht-textbox--password');
    expect(input('tb-email').type).toBe('email');
    expect(input('tb-default').type).toBe('text');
  });

  it('keeps name, dir and inputmode on the native input despite the utrecht directive', () => {
    const el = input('tb-attrs');
    expect(el.getAttribute('name')).toBe('email');
    expect(el.getAttribute('dir')).toBe('ltr');
    expect(el.getAttribute('inputmode')).toBe('email');
  });

  it('renders without a FormControl', () => {
    expect(input('tb-plain').disabled).toBe(true);
    expect(input('tb-plain').getAttribute('name')).toBe('plain');
  });

  it('does not write id="undefined" when no id is given', () => {
    expect(fixture.nativeElement.querySelector('tilburg-textbox.no-id input').hasAttribute('id')).toBe(false);
  });

  it("does not trigger Angular's reactive-forms disabled warning", () => {
    expect(warn).not.toHaveBeenCalled();
  });

  it('re-emits blur from the native input', () => {
    input('tb-attrs').dispatchEvent(new FocusEvent('blur'));
    expect(fixture.componentInstance.blurred).toBe(1);
  });
});
