import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TilburgTooltip } from './component';

@Component({
  template: `
    <tilburg-tooltip text="Uw gegevens bewerken" placement="below">
      <button type="button" aria-label="Bewerken" aria-describedby="hint">✎</button>
    </tilburg-tooltip>
    <p id="hint">Wijzigingen worden direct opgeslagen.</p>
  `,
  standalone: false,
})
class HostComponent {}

describe('TilburgTooltip', () => {
  let fixture: ComponentFixture<HostComponent>;
  const wrapper = () => fixture.nativeElement.querySelector('.tilburg-tooltip') as HTMLElement;
  const trigger = () => fixture.nativeElement.querySelector('button') as HTMLButtonElement;
  const popup = () => fixture.nativeElement.querySelector('[role="tooltip"]') as HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [TilburgTooltip, HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    document.body.appendChild(fixture.nativeElement);
  });

  afterEach(() => fixture.nativeElement.remove());

  it('renders the reference markup and adds the tooltip to the trigger description', () => {
    expect(wrapper().classList).toContain('tilburg-tooltip--below');
    expect(popup().textContent!.trim()).toBe('Uw gegevens bewerken');
    expect(trigger().getAttribute('aria-describedby')).toBe(`hint ${popup().id}`);
  });

  it('opens on focus and closes on Escape', () => {
    trigger().focus();
    expect(wrapper().classList).toContain('tilburg-tooltip--open');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(wrapper().classList).not.toContain('tilburg-tooltip--open');
  });

  it('opens on hover after a delay and closes after the pointer left', fakeAsync(() => {
    wrapper().dispatchEvent(new MouseEvent('mouseenter'));
    expect(wrapper().classList).not.toContain('tilburg-tooltip--open');
    tick(200);
    expect(wrapper().classList).toContain('tilburg-tooltip--open');
    wrapper().dispatchEvent(new MouseEvent('mouseleave'));
    tick(200);
    expect(wrapper().classList).not.toContain('tilburg-tooltip--open');
  }));

  it('flips above the trigger when there is no room below it', () => {
    /* jsdom has no layout: fake an 800px high viewport and where the popup would be for each side. */
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 800, configurable: true });
    popup().getBoundingClientRect = () =>
      (wrapper().getAttribute('data-tilburg-tooltip-placement') === 'below'
        ? { top: 790, bottom: 818, left: 400, right: 500 }
        : { top: 730, bottom: 758, left: 400, right: 500 }) as DOMRect;
    trigger().focus();
    expect(wrapper().getAttribute('data-tilburg-tooltip-placement')).toBe('above');
    delete (document.documentElement as { clientWidth?: number }).clientWidth;
    delete (document.documentElement as { clientHeight?: number }).clientHeight;
  });
});
