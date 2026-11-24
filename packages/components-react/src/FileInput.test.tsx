import { fireEvent, render, screen } from '@testing-library/react';
import { FileInput } from './FileInput';
import '@testing-library/jest-dom';

const file = (name: string) => new File(['x'], name, { type: 'application/pdf' });

describe('FileInput', () => {
  it('renders the tilburg-file-input markup, with className on the wrapper and the rest on the input', () => {
    const { container } = render(<FileInput className="extra" id="een" name="bijlage" />);
    expect(container.firstChild).toHaveClass('tilburg-file-input', 'extra');
    const input = container.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('id', 'een');
    expect(input).toHaveAttribute('name', 'bijlage');
  });

  it('is named after its button, unless a label or an aria-label names it', () => {
    const { rerender } = render(<FileInput multiple />);
    expect(screen.getByLabelText('Bestanden kiezen')).toBeInTheDocument();
    rerender(<FileInput id="een" />);
    expect(document.querySelector('input')).not.toHaveAttribute('aria-label');
    rerender(<FileInput aria-label="Foto toevoegen" />);
    expect(screen.getByLabelText('Foto toevoegen')).toBeInTheDocument();
  });

  it('reports the chosen files and lists their names', () => {
    const onFilesChange = jest.fn();
    const { container } = render(<FileInput multiple onFilesChange={onFilesChange} />);
    const files = [file('a.pdf'), file('b.pdf')];
    fireEvent.change(screen.getByLabelText('Bestanden kiezen'), { target: { files } });
    expect(onFilesChange).toHaveBeenCalledWith(files);
    expect(container.querySelector('.tilburg-file-input__files')).toHaveTextContent('a.pdf');
    expect(container.querySelector('.tilburg-file-input__files')).toHaveTextContent('b.pdf');
  });

  it('without showFiles reports the files but lists nothing', () => {
    const onFilesChange = jest.fn();
    const { container } = render(<FileInput showFiles={false} onFilesChange={onFilesChange} />);
    fireEvent.change(screen.getByLabelText('Bestand kiezen'), { target: { files: [file('a.pdf')] } });
    expect(onFilesChange).toHaveBeenCalledTimes(1);
    expect(container.querySelector('.tilburg-file-input__files')).toBeEmptyDOMElement();
  });

  it('busy shows the spinner with its text, and takes no files meanwhile', () => {
    const { container, rerender } = render(<FileInput />);
    const status = container.querySelector('.tilburg-file-input__busy')!;
    expect(status).toBeEmptyDOMElement();
    rerender(<FileInput busy />);
    expect(status).toHaveTextContent('Bezig met uploaden…');
    expect(container.firstChild).toHaveClass('tilburg-file-input--busy');
    expect(container.querySelector('input')).toBeDisabled();
    expect(container.querySelector('.tilburg-file-input__dropzone')).toHaveAttribute('aria-busy', 'true');
  });

  it('marks an invalid input, and shows a file dragged over it', () => {
    const { container } = render(<FileInput invalid />);
    expect(container.querySelector('input')).toHaveAttribute('aria-invalid', 'true');
    fireEvent.dragEnter(container.querySelector('.tilburg-file-input__dropzone')!);
    expect(container.firstChild).toHaveClass('tilburg-file-input--drag-over');
    fireEvent.drop(container.querySelector('.tilburg-file-input__dropzone')!);
    expect(container.firstChild).not.toHaveClass('tilburg-file-input--drag-over');
  });
});
