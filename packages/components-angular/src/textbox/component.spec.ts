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
  `,
  standalone: false,
})
class HostComponent {
  control = new FormControl('');
}

describe('TilburgTextbox', () => {
  let fixture: ComponentFixture<HostComponent>;
  const input = (id: string) => fixture.nativeElement.querySelector(`input#${id}`) as HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgTextbox, HostComponent],
      imports: [ReactiveFormsModule, UtrechtComponentsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('sets the real input type, so a password field masks the password', () => {
    expect(input('tb-password').type).toBe('password');
    expect(input('tb-password').classList).toContain('utrecht-textbox--password');
    expect(input('tb-email').type).toBe('email');
    expect(input('tb-default').type).toBe('text');
  });
});
