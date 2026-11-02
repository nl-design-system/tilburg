import { newSpecPage } from '@stencil/core/testing';
import { TilburgWbcHeadingGroup } from './component';

const render = (html: string) => newSpecPage({ components: [TilburgWbcHeadingGroup], html });

describe('tilburg-wbc-heading-group', () => {
  it('renders <hgroup class="utrecht-heading-group"> around the heading and pre-heading, in source order', async () => {
    const page = await render(
      '<tilburg-wbc-heading-group><h1 class="utrecht-heading-1">Afvalkalender</h1><p class="utrecht-pre-heading">Afval</p></tilburg-wbc-heading-group>',
    );
    const hgroup = page.root!.querySelector('hgroup.utrecht-heading-group')!;
    expect(Array.from(hgroup.children).map((child) => child.className)).toEqual([
      'utrecht-heading-1',
      'utrecht-pre-heading',
    ]);
  });
});
