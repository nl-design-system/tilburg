import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcCodeBlock } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcCodeBlock], html });

describe('tilburg-wbc-code-block', () => {
  it('renders pre.utrecht-code-block > code.utrecht-code-block__content around its content', async () => {
    const page = await render('<tilburg-wbc-code-block>npm install</tilburg-wbc-code-block>');
    const element = page.root!.querySelector('pre.utrecht-code-block > code.utrecht-code-block__content')!;
    expect(element).not.toBeNull();
    expect(element.textContent).toBe('npm install');
  });
});
