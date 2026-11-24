import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcPreHeading } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcPreHeading], html });

describe('tilburg-wbc-pre-heading', () => {
  it('renders p.utrecht-pre-heading around its content', async () => {
    const page = await render('<tilburg-wbc-pre-heading>Afval en recycling</tilburg-wbc-pre-heading>');
    const element = page.root!.querySelector('p.utrecht-pre-heading')!;
    expect(element).not.toBeNull();
    expect(element.textContent).toBe('Afval en recycling');
  });
});
