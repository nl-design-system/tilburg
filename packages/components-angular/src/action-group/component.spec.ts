import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TilburgActionGroup, TilburgActionGroupDirection } from './component';

@Component({
  template: `<tilburg-action-group [direction]="direction" ariaLabel="Formulierstappen">
    <button type="button">Volgende stap</button>
  </tilburg-action-group>`,
  standalone: false,
})
class HostComponent {
  direction: TilburgActionGroupDirection = 'row';
}

describe('TilburgActionGroup', () => {
  let fixture: ComponentFixture<HostComponent>;
  const group = () => fixture.nativeElement.querySelector('p') as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgActionGroup, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('renders a <p role="group"> with the row modifier and the label', () => {
    expect(group().className).toBe('utrecht-action-group utrecht-action-group--row');
    expect(group().getAttribute('role')).toBe('group');
    expect(group().getAttribute('aria-label')).toBe('Formulierstappen');
    expect(group().querySelector('button')!.textContent).toBe('Volgende stap');
  });

  it.each(['column', 'column-stretch'] as const)('maps direction="%s" to its modifier', (direction) => {
    fixture.componentInstance.direction = direction;
    fixture.detectChanges();
    expect(group().className).toBe(`utrecht-action-group utrecht-action-group--${direction}`);
  });
});
