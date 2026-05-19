import { fireEvent, render, screen } from '@testing-library/react';
import { Accordion, AccordionSection } from './Accordion';
import '@testing-library/jest-dom';

describe('Accordion', () => {
  it('renders a div with the utrecht-accordion class (no <details> / browser disclosure arrow)', () => {
    const { container } = render(
      <Accordion>
        <AccordionSection sectionKey="s1" label="x">
          body
        </AccordionSection>
      </Accordion>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.tagName).toBe('DIV');
    expect(root).toHaveClass('utrecht-accordion');
    expect(container.querySelector('details')).not.toBeInTheDocument();
    expect(container.querySelector('summary')).not.toBeInTheDocument();
  });

  it('renders a heading when displayName is set', () => {
    render(
      <Accordion displayName="FAQ" headingLevel={3}>
        <AccordionSection sectionKey="s1" label="x">
          body
        </AccordionSection>
      </Accordion>,
    );
    expect(screen.getByRole('heading', { level: 3, name: 'FAQ' })).toBeInTheDocument();
  });

  it('exposes the region role when aria-label is set', () => {
    render(
      <Accordion aria-label="FAQ">
        <AccordionSection sectionKey="s1" label="x">
          body
        </AccordionSection>
      </Accordion>,
    );
    expect(screen.getByRole('region', { name: 'FAQ' })).toBeInTheDocument();
  });
});

describe('AccordionSection', () => {
  it('renders a button + panel structure matching the Angular template', () => {
    const { container } = render(
      <AccordionSection sectionKey="s1" label="Title" expanded>
        body
      </AccordionSection>,
    );
    expect(container.querySelector('.utrecht-accordion__section')).toBeInTheDocument();
    expect(container.querySelector('.utrecht-accordion__header')).toBeInTheDocument();
    const button = container.querySelector('button.utrecht-accordion__button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('utrecht-button', 'utrecht-button--subtle');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('.utrecht-accordion__button-label')).toHaveTextContent('Title');
    const panel = container.querySelector('.utrecht-accordion__panel');
    expect(panel).toBeInTheDocument();
    expect(panel).not.toHaveAttribute('hidden');
    expect(panel).toHaveAttribute('role', 'region');
  });

  it('hides the panel when collapsed', () => {
    const { container } = render(
      <AccordionSection sectionKey="s1" label="Title" expanded={false}>
        body
      </AccordionSection>,
    );
    expect(container.querySelector('.utrecht-accordion__panel')).toHaveAttribute('hidden');
    expect(container.querySelector('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders default text glyphs (+ collapsed, − expanded) when no icon slots are provided', () => {
    const { container, rerender } = render(
      <AccordionSection sectionKey="s1" label="Title" expanded={false}>
        body
      </AccordionSection>,
    );
    const icon = container.querySelector('.utrecht-accordion__button-icon') as HTMLElement;
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon.textContent?.trim()).toBe('+');
    rerender(
      <AccordionSection sectionKey="s1" label="Title" expanded>
        body
      </AccordionSection>,
    );
    expect((container.querySelector('.utrecht-accordion__button-icon') as HTMLElement).textContent?.trim()).toBe('−');
  });

  it('renders the custom collapsed icon when collapsed and the custom expanded icon when expanded', () => {
    const { rerender, container } = render(
      <AccordionSection
        sectionKey="s1"
        label="Title"
        expanded={false}
        iconCollapsed={<span data-testid="plus">+</span>}
        iconExpanded={<span data-testid="minus">−</span>}
      >
        body
      </AccordionSection>,
    );
    expect(screen.getByTestId('plus')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="minus"]')).not.toBeInTheDocument();
    rerender(
      <AccordionSection
        sectionKey="s1"
        label="Title"
        expanded
        iconCollapsed={<span data-testid="plus">+</span>}
        iconExpanded={<span data-testid="minus">−</span>}
      >
        body
      </AccordionSection>,
    );
    expect(screen.getByTestId('minus')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="plus"]')).not.toBeInTheDocument();
  });

  it('fires onToggle with the next expanded state when clicked', () => {
    const onToggle = jest.fn();
    render(
      <AccordionSection sectionKey="s1" label="Title" expanded onToggle={onToggle}>
        body
      </AccordionSection>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('does not fire onToggle when disabled', () => {
    const onToggle = jest.fn();
    render(
      <AccordionSection sectionKey="s1" label="Title" disabled onToggle={onToggle}>
        body
      </AccordionSection>,
    );
    fireEvent.click(screen.getByRole('button', { hidden: true }));
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('manages its own expanded state when autoToggle is set', () => {
    render(
      <AccordionSection sectionKey="s1" label="Title" autoToggle>
        body
      </AccordionSection>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
