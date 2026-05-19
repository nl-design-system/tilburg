/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tilburg/Skip Link',
  id: 'tilburg-skip-link',
  tags: ['autodocs'],
  parameters: {
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Fskip-link',
    docs: {
      description: {
        component: `Anchor placed at the very top of the page so keyboard users can jump straight to the main content (bypassing the header / nav). Visually hidden by default; revealed when focused. The Tilburg theme paints it with the inverse document palette (dark background, white text) so it stands out against any page background.

## Usage

### Plain HTML / CSS

\`\`\`html
<a class="utrecht-skip-link utrecht-skip-link--visible-on-focus" href="#main">
  Sla over en ga naar de hoofdinhoud
</a>
…
<main id="main">…</main>
\`\`\`

Modifier classes:
- \`--visible-on-focus\` — hidden until \`:focus\` (the standard a11y pattern)
- \`--visible\` — always rendered (useful for demos)
- \`--hidden\` — never rendered
- \`--focus\` — force the focus appearance (for screenshot / Storybook demos)

Theming runs through \`--utrecht-skip-link-{background-color,color,focus-background-color,focus-color,padding-*,text-decoration}\` — Tilburg theme already wires these to the inverse document tokens, so no per-app CSS is required.
`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const VisibleOnFocus: Story = {
  name: 'Visible on focus (production pattern)',
  parameters: {
    docs: {
      description: {
        story:
          'Tab into the canvas with the keyboard to reveal the link. This is the standard a11y pattern — the link is invisible until it receives keyboard focus.',
      },
    },
  },
  render: () => (
    <>
      <a className="utrecht-skip-link utrecht-skip-link--visible-on-focus" href="#main">
        Sla over en ga naar de hoofdinhoud
      </a>
      <main id="main" style={{ padding: '1rem' }}>
        <p className="utrecht-paragraph">Hoofdinhoud van de pagina. Tab in dit canvas om de skip-link te zien.</p>
      </main>
    </>
  ),
};

export const ForceVisible: Story = {
  name: 'Force visible (demo)',
  parameters: {
    docs: {
      description: {
        story:
          'Adds the `--focus` and `--visible` modifiers so the link is always painted with its focus appearance. Useful for visual review.',
      },
    },
  },
  render: () => (
    <a className="utrecht-skip-link utrecht-skip-link--focus utrecht-skip-link--visible" href="#main">
      Sla over en ga naar de hoofdinhoud
    </a>
  ),
};
