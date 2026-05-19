import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { Fieldset } from './Fieldset';
import { FormField } from './FormField';
import { FormFieldDescription } from './FormFieldDescription';
import { FormLabel } from './FormLabel';
import { RadioButton } from './RadioButton';
import { Textarea } from './Textarea';
import { Textbox } from './Textbox';
import { ValidationMessage } from './ValidationMessage';
import '@testing-library/jest-dom';

describe('FormField', () => {
  it('adds the warning class when warning is true', () => {
    const { container } = render(
      <FormField warning>
        <span>x</span>
      </FormField>,
    );
    expect(container.firstChild).toHaveClass('tilburg-warning');
  });
});

describe('Fieldset', () => {
  it('renders a fieldset element', () => {
    const { container } = render(
      <Fieldset>
        <FormLabel>x</FormLabel>
      </Fieldset>,
    );
    expect(container.querySelector('fieldset')).toBeInTheDocument();
  });

  it('sets aria-invalid when invalid', () => {
    const { container } = render(
      <Fieldset invalid>
        <FormLabel>x</FormLabel>
      </Fieldset>,
    );
    expect(container.querySelector('fieldset')).toHaveAttribute('aria-invalid', 'true');
  });
});

describe('FormLabel', () => {
  it('renders a label element', () => {
    const { container } = render(<FormLabel htmlFor="foo">label</FormLabel>);
    expect(container.querySelector('label')).toBeInTheDocument();
    expect(container.querySelector('label')).toHaveAttribute('for', 'foo');
  });
});

describe('FormFieldDescription', () => {
  it('renders children', () => {
    render(<FormFieldDescription>hint</FormFieldDescription>);
    expect(screen.getByText('hint')).toBeInTheDocument();
  });

  it('sets role="alert" when invalid', () => {
    render(<FormFieldDescription invalid>oops</FormFieldDescription>);
    expect(screen.getByRole('alert')).toHaveTextContent('oops');
  });
});

describe('Textbox', () => {
  it('renders an input element', () => {
    const { container } = render(<Textbox />);
    expect(container.querySelector('input')).toBeInTheDocument();
  });

  it('sets aria-invalid and aria-required when invalid/required', () => {
    const { container } = render(<Textbox invalid required />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-required', 'true');
  });
});

describe('Textarea', () => {
  it('renders a textarea element', () => {
    const { container } = render(<Textarea />);
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });
});

describe('Checkbox', () => {
  it('renders an input[type=checkbox]', () => {
    const { container } = render(<Checkbox />);
    expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
  });
});

describe('RadioButton', () => {
  it('renders an input[type=radio]', () => {
    const { container } = render(<RadioButton />);
    expect(container.querySelector('input[type="radio"]')).toBeInTheDocument();
  });
});

describe('ValidationMessage', () => {
  it('renders an error-styled message by default', () => {
    render(<ValidationMessage>oops</ValidationMessage>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('tilburg-validation-message--error');
    expect(alert).toHaveClass('utrecht-form-field-error-message');
  });

  it('renders a warning-styled message when type="warning"', () => {
    render(<ValidationMessage type="warning">careful</ValidationMessage>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('tilburg-validation-message--warning');
    expect(alert).toHaveClass('utrecht-form-field-description--warning');
  });
});
