/* global __dirname -- Jest runs specs as CommonJS; the spec reads the installed Stencil runtime from disk. */
import { readFileSync } from 'fs';
import { join } from 'path';
import { patchStencilRuntime, safeTextContent } from './safe-text-content';

const runtimePath = join(__dirname, '../../node_modules/@stencil/core/internal/client/index.js');
const runtime = readFileSync(runtimePath, 'utf8');

describe('safeTextContent', () => {
  it('stops the slot-patched textContent / insertAdjacentText from parsing HTML', () => {
    const patched = patchStencilRuntime(runtime);
    expect(patched).not.toContain('this.insertAdjacentHTML("beforeend", value);');
    expect(patched).not.toContain('this.insertAdjacentHTML(position, text);');
    expect(patched).toContain('this.append(String(value));');
    expect(patched).toContain('HTMLElement.prototype.insertAdjacentText.call(this, position, text)');
  });

  it('fails the build when the Stencil runtime no longer matches', () => {
    expect(() => patchStencilRuntime('')).toThrow(/safe-text-content/);
  });

  it('only transforms the client runtime, also with the lazy-build query', () => {
    const { transform } = safeTextContent();
    expect(transform(runtime, `${runtimePath}?app-data=conditional`)?.code).toContain('this.append(String(value));');
    expect(transform(runtime, runtimePath)).not.toBeNull();
    expect(transform('x', '/src/code/component.tsx')).toBeNull();
  });
});
