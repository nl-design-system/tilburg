/* @license CC0-1.0 */

import { TilburgSkipLink } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-skip-link.examples';

const meta: Meta<TilburgSkipLink> = {
  title: 'Tilburg Angular/Skip Link',
  id: 'tilburg-skip-link-angular',
  component: TilburgSkipLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgSkipLink>;

export const VisibleOnFocus: Story = {
  name: 'Visible on focus (production pattern)',
  args: { href: '#main', visibility: 'visible-on-focus' },
  render: (args) => ({
    props: args,
    template: `<tilburg-skip-link [href]="href" [visibility]="visibility">Sla over en ga naar de hoofdinhoud</tilburg-skip-link>
<main id="main" style="padding:1rem" tabindex="-1">
  <p class="utrecht-paragraph">Tab in dit canvas om de skip-link te zien.</p>
</main>`,
  }),
};

export const ForceVisible: Story = {
  name: 'Force visible (demo)',
  args: { href: '#main', visibility: 'visible' },
  render: (args) => ({
    props: args,
    template: `<tilburg-skip-link [href]="href" [visibility]="visibility">Sla over en ga naar de hoofdinhoud</tilburg-skip-link>`,
  }),
};

export const ForceFocusAppearance: Story = {
  name: 'Force focused appearance (storybook screenshot)',
  args: { href: '#main', visibility: 'focus' },
  render: (args) => ({
    props: args,
    template: `<tilburg-skip-link [href]="href" [visibility]="visibility" class="utrecht-skip-link--visible">Sla over en ga naar de hoofdinhoud</tilburg-skip-link>`,
  }),
};
