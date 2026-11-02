import { render } from '@testing-library/react';
import { DatetimeValue } from './DatetimeValue';
import '@testing-library/jest-dom';

describe('DatetimeValue', () => {
  it('renders <time class="utrecht-value-datetime" datetime>', () => {
    const { container } = render(
      <DatetimeValue dateTime="2026-11-02T09:30" className="extra">
        2 november 2026 om 09:30
      </DatetimeValue>,
    );
    const time = container.firstElementChild!;
    expect(time.tagName).toBe('TIME');
    expect(time).toHaveClass('utrecht-value-datetime', 'extra');
    expect(time).toHaveAttribute('datetime', '2026-11-02T09:30');
    expect(time).toHaveTextContent('2 november 2026 om 09:30');
  });
});
