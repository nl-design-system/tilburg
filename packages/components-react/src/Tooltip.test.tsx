import { act, fireEvent, render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';
import '@testing-library/jest-dom';

const wrapperOf = (element: HTMLElement) => element.closest('.tilburg-tooltip')!;

/* jsdom has no layout: give the page a 1000×800 viewport and let the popup report where it would be for each side. */
const fakeLayout = (popup: HTMLElement, rects: { above: Partial<DOMRect>; below: Partial<DOMRect> }) => {
  Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000, configurable: true });
  Object.defineProperty(document.documentElement, 'clientHeight', { value: 800, configurable: true });
  popup.getBoundingClientRect = () => {
    const side = popup.closest('.tilburg-tooltip')!.getAttribute('data-tilburg-tooltip-placement') as 'above' | 'below';
    return { top: 0, bottom: 0, left: 0, right: 0, ...rects[side] } as DOMRect;
  };
};

afterEach(() => {
  delete (document.documentElement as { clientWidth?: number }).clientWidth;
  delete (document.documentElement as { clientHeight?: number }).clientHeight;
});

describe('Tooltip', () => {
  it('describes the trigger with the tooltip, keeping its own name and existing description', () => {
    render(
      <>
        <Tooltip content="Uw gegevens bewerken">
          <button type="button" aria-label="Bewerken" aria-describedby="hint">
            ✎
          </button>
        </Tooltip>
        <p id="hint">Wijzigingen worden direct opgeslagen.</p>
      </>,
    );
    const trigger = screen.getByRole('button', { name: 'Bewerken' });
    const tooltip = screen.getByRole('tooltip', { hidden: true });
    expect(tooltip).toHaveTextContent('Uw gegevens bewerken');
    expect(trigger.getAttribute('aria-describedby')).toBe(`hint ${tooltip.id}`);
    expect(trigger).toHaveAccessibleDescription('Wijzigingen worden direct opgeslagen. Uw gegevens bewerken');
  });

  it('opens on focus, closes on Escape and when focus leaves', () => {
    render(
      <Tooltip content="Uitleg">
        <button type="button">Opslaan</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'Opslaan' });
    act(() => trigger.focus());
    expect(wrapperOf(trigger)).toHaveClass('tilburg-tooltip--open');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(wrapperOf(trigger)).not.toHaveClass('tilburg-tooltip--open');
    act(() => trigger.focus());
    act(() => trigger.blur());
    expect(wrapperOf(trigger)).not.toHaveClass('tilburg-tooltip--open');
  });

  it('opens on hover after a delay and stays open while the pointer moves onto the popup', () => {
    jest.useFakeTimers();
    render(
      <Tooltip content="Uitleg" placement="below">
        <button type="button">Opslaan</button>
      </Tooltip>,
    );
    const wrapper = wrapperOf(screen.getByRole('button'));
    expect(wrapper).toHaveClass('tilburg-tooltip--below');
    fireEvent.mouseEnter(wrapper);
    expect(wrapper).not.toHaveClass('tilburg-tooltip--open');
    act(() => jest.advanceTimersByTime(200));
    expect(wrapper).toHaveClass('tilburg-tooltip--open');
    fireEvent.mouseLeave(wrapper);
    fireEvent.mouseEnter(wrapper);
    act(() => jest.advanceTimersByTime(400));
    expect(wrapper).toHaveClass('tilburg-tooltip--open');
    fireEvent.mouseLeave(wrapper);
    act(() => jest.advanceTimersByTime(200));
    expect(wrapper).not.toHaveClass('tilburg-tooltip--open');
    jest.useRealTimers();
  });

  it('flips below the trigger when there is no room above it', () => {
    render(
      <Tooltip content="Uitleg">
        <button type="button">Opslaan</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button');
    fakeLayout(screen.getByRole('tooltip', { hidden: true }), {
      above: { top: -30, bottom: -2, left: 400, right: 500 },
      below: { top: 40, bottom: 68, left: 400, right: 500 },
    });
    act(() => trigger.focus());
    expect(wrapperOf(trigger)).toHaveAttribute('data-tilburg-tooltip-placement', 'below');
  });

  it('stays on the preferred side when it fits, and shifts away from the left edge', () => {
    render(
      <Tooltip content="Uitleg">
        <button type="button">Opslaan</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button');
    const popup = screen.getByRole('tooltip', { hidden: true });
    fakeLayout(popup, {
      above: { top: 100, bottom: 128, left: -40, right: 60 },
      below: { top: 200, bottom: 228, left: -40, right: 60 },
    });
    act(() => trigger.focus());
    expect(wrapperOf(trigger)).toHaveAttribute('data-tilburg-tooltip-placement', 'above');
    expect(popup.style.getPropertyValue('--_tilburg-tooltip-shift')).toBe('48px');
  });
});
