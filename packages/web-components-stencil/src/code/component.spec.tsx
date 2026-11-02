import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcCode } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcCode], html });

describe('tilburg-wbc-code', () => {
  it('renders code.utrecht-code around its content', async () => {
    const page = await render('<tilburg-wbc-code>.pdf</tilburg-wbc-code>');
    const element = page.root!.querySelector('code.utrecht-code')!;
    expect(element).not.toBeNull();
    expect(element.textContent).toBe('.pdf');
  });
});
