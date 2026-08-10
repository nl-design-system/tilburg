/* @license CC0-1.0 */

import { SkipLink } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-skip-link.examples';

const meta = {
  title: 'Tilburg React/Skip Link',
  id: 'tilburg-skip-link-react',
  component: SkipLink,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VisibleOnFocus: Story = {
  name: 'Visible on focus (production pattern)',
  render: () => (
    <>
      <SkipLink href="#main">Sla over en ga naar de hoofdinhoud</SkipLink>
      <main id="main" style={{ padding: '1rem' }} tabIndex={-1}>
        <p className="utrecht-paragraph">Tab in dit canvas om de skip-link te zien.</p>
      </main>
    </>
  ),
};

/* `--visible` on its own: always rendered in place, but *not* in the focused
   appearance. The HTML reference story called "Force Visible" combines
   `--focus` with `--visible`; its React counterpart is `ForceFocusAppearance`
   below, not this one. */
export const ForceVisible: Story = {
  name: 'Always visible (--visible modifier, no focus ring)',
  render: () => (
    <SkipLink href="#main" visibility="visible">
      Sla over en ga naar de hoofdinhoud
    </SkipLink>
  ),
};

/* Same two classes as the `tilburg-skip-link--force-visible` HTML reference:
   `utrecht-skip-link--focus utrecht-skip-link--visible`. */
export const ForceFocusAppearance: Story = {
  name: 'Force focused appearance (storybook screenshot)',
  render: () => (
    <SkipLink href="#main" visibility="focus" className="utrecht-skip-link--visible">
      Sla over en ga naar de hoofdinhoud
    </SkipLink>
  ),
};
