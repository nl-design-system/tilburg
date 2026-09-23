/* @license CC0-1.0 */

import { TilburgWbcSkipLink } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-skip-link.examples';

/* Stencil `<tilburg-wbc-skip-link>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Skip Link',
  id: 'tilburg-skip-link-wbc',
  component: TilburgWbcSkipLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcSkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VisibleOnFocus: Story = {
  name: 'Visible on focus (production pattern)',
  render: () => (
    <>
      <TilburgWbcSkipLink href="#main">Sla over en ga naar de hoofdinhoud</TilburgWbcSkipLink>
      <main id="main" style={{ padding: '1rem' }} tabIndex={-1}>
        <p className="utrecht-paragraph">Tab in dit canvas om de skip-link te zien.</p>
      </main>
    </>
  ),
};

/* `--visible` on its own: always rendered in place, but *not* in the focused
   appearance. */
export const ForceVisible: Story = {
  name: 'Always visible (--visible modifier, no focus ring)',
  render: () => (
    <TilburgWbcSkipLink href="#main" visibility="visible">
      Sla over en ga naar de hoofdinhoud
    </TilburgWbcSkipLink>
  ),
};

/* `visibility="focus"` forces the focused appearance. Unlike the React story,
   the extra `utrecht-skip-link--visible` class cannot be added: a `className`
   on the proxy lands on the host, not on the inner `<a>`. */
export const ForceFocusAppearance: Story = {
  name: 'Force focused appearance (storybook screenshot)',
  render: () => (
    <TilburgWbcSkipLink href="#main" visibility="focus">
      Sla over en ga naar de hoofdinhoud
    </TilburgWbcSkipLink>
  ),
};
