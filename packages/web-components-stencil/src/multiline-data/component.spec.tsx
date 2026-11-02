import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcMultilineData } from './component';

describe('tilburg-wbc-multiline-data', () => {
  it('renders a <pre> with both Utrecht classes and keeps the newlines', async () => {
    const page = await newSpecPage({
      components: [TilburgWbcMultilineData],
      html: '<tilburg-wbc-multiline-data>Stadhuisplein 130\n5038 TC Tilburg</tilburg-wbc-multiline-data>',
    });
    const pre = page.root!.querySelector('pre')!;
    expect(pre.className).toBe('utrecht-multiline-data utrecht-multiline-data--html-pre');
    expect(pre.textContent).toBe('Stadhuisplein 130\n5038 TC Tilburg');
  });
});
