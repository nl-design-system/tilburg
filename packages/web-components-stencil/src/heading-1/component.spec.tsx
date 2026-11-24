import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcHeading1 } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcHeading1], html });

describe('tilburg-wbc-heading-1', () => {
  it('renders h1.utrecht-heading-1 around its content', async () => {
    const page = await render('<tilburg-wbc-heading-1>Mijn aanvragen</tilburg-wbc-heading-1>');
    const heading = page.root!.querySelector('utrecht-heading-1 > h1.utrecht-heading-1')!;
    expect(heading).not.toBeNull();
    expect(heading.textContent).toBe('Mijn aanvragen');
  });
});
