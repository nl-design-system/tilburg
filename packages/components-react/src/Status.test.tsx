import { fireEvent, render, screen } from '@testing-library/react';
import { Alert } from './Alert';
import { BadgeStatus } from './BadgeStatus';
import { Breadcrumb } from './Breadcrumb';
import { Pagination } from './Pagination';
import { ProgressBar } from './ProgressBar';
import '@testing-library/jest-dom';

describe('Alert', () => {
  it('maps variant to utrecht class', () => {
    const { container } = render(
      <Alert variant="success" title="Done">
        body
      </Alert>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('utrecht-alert--ok');
    expect(screen.getByText('Done').tagName).toBe('H3');
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('shows a close button when closable and fires onClose', () => {
    const onClose = jest.fn();
    render(<Alert closable onClose={onClose} closeButtonAriaLabel="dismiss" />);
    fireEvent.click(screen.getByRole('button', { name: 'dismiss' }));
    expect(onClose).toHaveBeenCalled();
  });
});

describe('BadgeStatus', () => {
  it('forwards role=status and aria-live=polite', () => {
    const { container } = render(<BadgeStatus status="online">x</BadgeStatus>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute('role', 'status');
    expect(el).toHaveAttribute('aria-live', 'polite');
  });
});

describe('Breadcrumb', () => {
  it('renders an empty container when no items', () => {
    const { container } = render(<Breadcrumb items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders links for non-last items and aria-current for the last', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Section', href: '/s' },
          { label: 'Page', current: true },
        ]}
      />,
    );
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Section' })).toBeInTheDocument();
    expect(screen.getByText('Page')).toHaveAttribute('aria-current', 'page');
  });
});

describe('Pagination', () => {
  it('emits step events for first/previous/next/last', () => {
    const onNavigate = jest.fn();
    render(<Pagination pageCount={5} currentPage={3} onNavigate={onNavigate} />);
    fireEvent.click(screen.getByRole('button', { name: 'Eerste pagina' }));
    fireEvent.click(screen.getByRole('button', { name: 'Vorige pagina' }));
    fireEvent.click(screen.getByRole('button', { name: 'Volgende pagina' }));
    fireEvent.click(screen.getByRole('button', { name: 'Laatste pagina' }));
    expect(onNavigate.mock.calls.map((c) => c[0].step)).toEqual(['first', 'previous', 'next', 'last']);
  });

  it('emits page events with the selected page number', () => {
    const onNavigate = jest.fn();
    render(<Pagination pageCount={5} currentPage={3} onNavigate={onNavigate} />);
    fireEvent.click(screen.getByRole('button', { name: 'Pagina 2' }));
    expect(onNavigate).toHaveBeenLastCalledWith({ step: 'page', page: 2 });
  });
});

describe('ProgressBar', () => {
  it('exposes the progressbar role with computed values', () => {
    render(<ProgressBar value={50} total={200} title="Step 2" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '50');
    expect(bar).toHaveAttribute('aria-valuemax', '200');
  });

  it('renders a back link when showBack and fires onBackClick', () => {
    const onBackClick = jest.fn();
    render(<ProgressBar showBack backLabel="terug" onBackClick={onBackClick} />);
    fireEvent.click(screen.getByText('terug'));
    expect(onBackClick).toHaveBeenCalled();
  });
});
