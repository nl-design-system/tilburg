import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TilburgListbox } from './component';

interface Stadsdeel {
  code: string;
  naam: string;
}

@Component({
  template: `
    <tilburg-listbox
      id="single"
      ariaLabel="Stadsdeel"
      [items]="items"
      bindLabel="naam"
      bindValue="code"
      [control]="control"
      (valueChange)="last = $event"
    ></tilburg-listbox>
    <tilburg-listbox
      id="multi"
      [items]="items"
      bindLabel="naam"
      bindValue="code"
      [multiple]="true"
      [value]="['noord']"
    ></tilburg-listbox>
    <tilburg-listbox id="off" [items]="items" bindLabel="naam" bindValue="code" [disabled]="true"></tilburg-listbox>
  `,
  standalone: false,
})
class HostComponent {
  items: Stadsdeel[] = [
    { code: 'centrum', naam: 'Centrum' },
    { code: 'noord', naam: 'Noord' },
    { code: 'reeshof', naam: 'Reeshof' },
  ];
  control = new FormControl<string | null>(null, Validators.required);
  last: unknown;
}

describe('TilburgListbox', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const listbox = (id: string) => fixture.nativeElement.querySelector(`#${id}`) as HTMLElement;
  const options = (id: string) => Array.from(listbox(id).querySelectorAll('li')) as HTMLElement[];
  const key = (id: string, k: string) => {
    listbox(id).dispatchEvent(new KeyboardEvent('keydown', { key: k, cancelable: true }));
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgListbox, HostComponent],
      imports: [ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the reference DOM with the id on the listbox only', () => {
    const el = listbox('single');
    expect(el.tagName).toBe('DIV');
    expect(el.classList).toContain('utrecht-listbox');
    expect(el.classList).toContain('utrecht-listbox--html-div');
    expect(el.getAttribute('role')).toBe('listbox');
    expect(el.getAttribute('tabindex')).toBe('0');
    expect(el.getAttribute('aria-label')).toBe('Stadsdeel');
    expect(fixture.nativeElement.querySelectorAll('#single')).toHaveLength(1);
    expect(el.querySelector('ul')?.getAttribute('role')).toBe('presentation');
    const [first] = options('single');
    expect(first.classList).toContain('utrecht-listbox__option');
    expect(first.getAttribute('role')).toBe('option');
    expect(first.id).toBe('single-opt-0');
    expect(first.getAttribute('aria-selected')).toBe('false');
    expect(first.textContent?.trim()).toBe('Centrum');
  });

  it('moves the active option with the keyboard and selects into the FormControl', () => {
    listbox('single').dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect(listbox('single').getAttribute('aria-activedescendant')).toBe('single-opt-0');
    key('single', 'ArrowDown');
    expect(listbox('single').getAttribute('aria-activedescendant')).toBe('single-opt-1');
    expect(options('single')[1].getAttribute('data-active')).toBe('true');
    key('single', ' ');
    expect(host.control.value).toBe('noord');
    expect(host.last).toBe('noord');
    expect(options('single')[1].getAttribute('aria-selected')).toBe('true');
    expect(options('single')[1].classList).toContain('utrecht-listbox__option--selected');
    key('single', 'End');
    key('single', 'Enter');
    expect(host.control.value).toBe('reeshof');
    key('single', 'Home');
    expect(listbox('single').getAttribute('aria-activedescendant')).toBe('single-opt-0');
  });

  it('shows the invalid state once an invalid control is touched', () => {
    expect(listbox('single').hasAttribute('aria-invalid')).toBe(false);
    listbox('single').dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(listbox('single').getAttribute('aria-invalid')).toBe('true');
    expect(listbox('single').classList).toContain('utrecht-listbox--invalid');
    expect(listbox('single').hasAttribute('aria-activedescendant')).toBe(false);
  });

  it('toggles options in multiple mode without a control', () => {
    expect(listbox('multi').getAttribute('aria-multiselectable')).toBe('true');
    expect(options('multi')[1].getAttribute('aria-selected')).toBe('true');
    options('multi')[0].click();
    fixture.detectChanges();
    expect(options('multi')[0].getAttribute('aria-selected')).toBe('true');
    options('multi')[1].click();
    fixture.detectChanges();
    expect(options('multi')[1].getAttribute('aria-selected')).toBe('false');
  });

  it('ignores interaction when disabled', () => {
    expect(listbox('off').getAttribute('aria-disabled')).toBe('true');
    expect(listbox('off').classList).toContain('utrecht-listbox--disabled');
    options('off')[0].click();
    key('off', 'ArrowDown');
    fixture.detectChanges();
    expect(options('off')[0].getAttribute('aria-selected')).toBe('false');
    expect(listbox('off').hasAttribute('aria-activedescendant')).toBe(false);
  });
});
