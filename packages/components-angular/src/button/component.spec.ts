import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtrechtComponentsModule } from '@utrecht/component-library-angular';
import { TilburgButton } from './component';

@Component({
  template: `<tilburg-button
    [appearance]="appearance"
    [size]="size"
    [type]="type"
    [disabled]="disabled"
    [pressed]="pressed"
    [title]="title"
    >Verder</tilburg-button
  >`,
  standalone: false,
})
class HostComponent {
  appearance = 'primary-action-button';
  size = 'medium';
  type = 'button';
  disabled = false;
  pressed?: boolean;
  title = '';
}

describe('TilburgButton', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const set = (values: Partial<HostComponent>) => {
    Object.assign(fixture.componentInstance, values);
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TilburgButton, HostComponent],
      imports: [UtrechtComponentsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  const button = () => host().querySelector('button') as HTMLButtonElement;

  it('renders a medium primary type="button" <button> by default', () => {
    expect(button().classList).toContain('utrecht-button');
    expect(button().classList).toContain('utrecht-button--primary-action');
    expect(button().classList).toContain('tilburg-medium');
    expect(button().getAttribute('type')).toBe('button');
    expect(button().disabled).toBe(false);
    expect(button().hasAttribute('aria-pressed')).toBe(false);
    expect(button().hasAttribute('aria-label')).toBe(false);
    expect(button().textContent!.trim()).toBe('Verder');
  });

  it('maps appearance, size, type and disabled', () => {
    set({ appearance: 'subtle-button', size: 'small', type: 'submit', disabled: true });
    expect(button().classList).toContain('utrecht-button--subtle');
    expect(button().classList).toContain('tilburg-small');
    expect(button().classList).not.toContain('utrecht-button--primary-action');
    expect(button().getAttribute('type')).toBe('submit');
    expect(button().disabled).toBe(true);
  });

  it('renders aria-pressed for a toggle button, also when false', () => {
    set({ pressed: true });
    expect(button().getAttribute('aria-pressed')).toBe('true');
    set({ pressed: false });
    expect(button().getAttribute('aria-pressed')).toBe('false');
  });

  it('puts the title on the button as its name too, not on the host element', () => {
    set({ title: 'Sluiten' });
    expect(button().getAttribute('title')).toBe('Sluiten');
    expect(button().getAttribute('aria-label')).toBe('Sluiten');
    expect(host().querySelector('tilburg-button')!.hasAttribute('title')).toBe(false);
  });
});
