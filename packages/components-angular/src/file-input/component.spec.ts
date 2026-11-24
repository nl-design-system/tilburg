import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TilburgFileInput } from './component';

@Component({
  template: `<tilburg-file-input
    [id]="id"
    [multiple]="true"
    [showFiles]="showFiles"
    [busy]="busy"
    (filesChange)="chosen = $event"
  >
    Maximaal 10 MB
  </tilburg-file-input>`,
  standalone: false,
})
class HostComponent {
  id?: string;
  showFiles = true;
  busy = false;
  chosen: File[] = [];
}

describe('TilburgFileInput', () => {
  const setup = (props: Partial<HostComponent> = {}) => {
    TestBed.configureTestingModule({ declarations: [TilburgFileInput, HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    Object.assign(fixture.componentInstance, props);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    return { fixture, root, input: root.querySelector('input[type="file"]') as HTMLInputElement };
  };

  /* jsdom has no DataTransfer to fill `input.files` with, so the files are defined on the input. */
  const choose = (input: HTMLInputElement, names: string[]) => {
    const files = names.map((name) => new File(['x'], name));
    Object.defineProperty(input, 'files', { configurable: true, value: files });
    input.dispatchEvent(new Event('change'));
    return files;
  };

  it('renders the tilburg-file-input markup with the projected hint in the drop zone', () => {
    const { root } = setup();
    expect(root.querySelector('.tilburg-file-input')).not.toBeNull();
    expect(root.querySelector('.tilburg-file-input__dropzone')?.textContent).toContain('Maximaal 10 MB');
  });

  it('is named after its button, unless an id says a label names it', () => {
    expect(setup().input.getAttribute('aria-label')).toBe('Bestanden kiezen');
    TestBed.resetTestingModule();
    const { root, input } = setup({ id: 'een' });
    expect(input.getAttribute('aria-label')).toBeNull();
    expect(input.id).toBe('een');
    expect(root.querySelector('tilburg-file-input')?.hasAttribute('id')).toBe(false);
  });

  it('emits the chosen files and lists their names', () => {
    const { fixture, root, input } = setup();
    const files = choose(input, ['a.pdf', 'b.pdf']);
    fixture.detectChanges();
    expect(fixture.componentInstance.chosen).toEqual(files);
    expect(root.querySelector('.tilburg-file-input__files')?.textContent).toContain('a.pdf');
    expect(root.querySelector('.tilburg-file-input__files')?.textContent).toContain('b.pdf');
  });

  it('busy shows the spinner with its text, and takes no files meanwhile', () => {
    const { root, input } = setup({ busy: true });
    expect(root.querySelector('.tilburg-file-input__busy')?.textContent).toContain('Bezig met uploaden…');
    expect(root.querySelector('.tilburg-file-input--busy')).not.toBeNull();
    expect(input.disabled).toBe(true);
  });

  it('without showFiles emits the files but lists nothing', () => {
    const { fixture, root, input } = setup({ showFiles: false });
    choose(input, ['a.pdf']);
    fixture.detectChanges();
    expect(fixture.componentInstance.chosen.length).toBe(1);
    expect(root.querySelectorAll('.tilburg-file-input__file').length).toBe(0);
  });
});
