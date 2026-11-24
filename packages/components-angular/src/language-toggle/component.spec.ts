import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgLanguageToggle } from './component';

@Component({
  template: `<tilburg-language-toggle [active]="active" (toggle)="toggled = $event"></tilburg-language-toggle>`,
  standalone: false,
})
class HostComponent {
  active = 'NL';
  toggled?: string;
}

describe('TilburgLanguageToggle', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgLanguageToggle, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  const button = () => host().querySelector('button') as HTMLButtonElement;

  it('renders a named switch with NL and EN, NL active', () => {
    expect(button().getAttribute('role')).toBe('switch');
    expect(button().getAttribute('type')).toBe('button');
    expect(button().getAttribute('aria-label')).toBe('Switch language');
    expect(button().getAttribute('aria-checked')).toBe('false');
    const options = button().querySelectorAll('.tilburg-language-toggle__option');
    expect(Array.from(options).map((option) => option.textContent)).toEqual(['NL', 'EN']);
    expect(options[0].classList).toContain('tilburg-language-toggle__option--active');
    expect(options[1].classList).not.toContain('tilburg-language-toggle__option--active');
  });

  it('is checked when the last option is active', () => {
    set({ active: 'EN' });
    expect(button().getAttribute('aria-checked')).toBe('true');
  });

  it('emits the next language on click, and wraps around', () => {
    button().click();
    expect(fixture.componentInstance.toggled).toBe('EN');
    set({ active: 'EN' });
    button().click();
    expect(fixture.componentInstance.toggled).toBe('NL');
  });

  it.each(['Enter', ' '])('emits on the %j key and keeps the page from scrolling', (key) => {
    const event = new KeyboardEvent('keydown', { key, cancelable: true });
    button().dispatchEvent(event);
    expect(fixture.componentInstance.toggled).toBe('EN');
    expect(event.defaultPrevented).toBe(true);
  });
});
