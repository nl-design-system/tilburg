import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcFileInput } from './component';

describe('tilburg-wbc-file-input', () => {
  const setup = async (html: string) => {
    const page = await newSpecPage({ components: [TilburgWbcFileInput], html });
    return { page, input: page.root!.querySelector('input[type="file"]') as HTMLInputElement };
  };

  it('renders the tilburg-file-input markup, named after its button', async () => {
    const { page, input } = await setup('<tilburg-wbc-file-input multiple></tilburg-wbc-file-input>');
    expect(page.root!.querySelector('.tilburg-file-input')).not.toBeNull();
    expect(input.getAttribute('aria-label')).toBe('Bestanden kiezen');
  });

  it('moves the id to the input, where a label then names it', async () => {
    const { page, input } = await setup('<tilburg-wbc-file-input id="een"></tilburg-wbc-file-input>');
    expect(input.getAttribute('id')).toBe('een');
    expect(input.getAttribute('aria-label')).toBeNull();
    expect(page.root!.hasAttribute('id')).toBe(false);
  });

  it('busy shows the spinner with its text, and takes no files meanwhile', async () => {
    const { page, input } = await setup('<tilburg-wbc-file-input busy></tilburg-wbc-file-input>');
    expect(page.root!.querySelector('.tilburg-file-input__busy')!.textContent).toContain('Bezig met uploaden…');
    expect(page.root!.querySelector('.tilburg-file-input--busy')).not.toBeNull();
    expect(input.hasAttribute('disabled')).toBe(true);
  });

  it('emits the chosen files and lists their names', async () => {
    const { page, input } = await setup('<tilburg-wbc-file-input></tilburg-wbc-file-input>');
    const onFiles = jest.fn();
    page.root!.addEventListener('tilburgFilesChange', (event) => onFiles((event as CustomEvent).detail));
    const files = [{ name: 'a.pdf' }];
    Object.defineProperty(input, 'files', { configurable: true, value: files });
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(onFiles).toHaveBeenCalledWith(files);
    expect(page.root!.querySelector('.tilburg-file-input__files')!.textContent).toContain('a.pdf');
  });
});
