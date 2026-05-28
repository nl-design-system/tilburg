/* @license CC0-1.0 */

import type { Meta, StoryObj } from '@storybook/react';
import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';

const meta = {
  title: 'Tilburg/Tokens',
  id: 'tilburg-tokens',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Browseable reference for the \`--tilburg-*\` design tokens shipped via \`@gemeente-tilburg/design-tokens\`. Tokens are scoped to \`.tilburg-theme\` (the storybook decorator wraps each story in that scope), so the names below resolve to live values throughout the design system.

Tokens are grouped by purpose: **Colors** (brand palette + neutral scale), **Space** (block / row / column / inline gaps on the animal-named scale), **Typography** (font sizes), and **Interaction** (link / focus / active accents).

## Two token families: Tilburg-owned vs utrecht-owned

The Tilburg design system uses **two custom-property namespaces** that live on the same \`.tilburg-theme\` scope. Both resolve at runtime — what differs is who owns each name and what it controls.

### 1. \`--tilburg-*\` — Tilburg's own decisions

The brand palette (\`--tilburg-color-*\`), the animal-named space scale (\`--tilburg-space-{block,row,column,inline}-*\`), typography (\`--tilburg-typography-font-size-*\`, \`--tilburg-typography-font-family-*\`), borders (\`--tilburg-border-width-sm/md/lg\`), interaction accents (\`--tilburg-interaction-color\`), and component-specific slots (\`--tilburg-table-footer-border-width\`, \`--tilburg-accordion-section-border-color\`, …). Authored in \`proprietary/design-tokens/src/\` and built into \`dist/tilburg/theme.css\`. Reference these directly in app CSS.

### 2. \`--utrecht-*\` — Plumbing inherited from @utrecht/component-library-css

[utrecht](https://github.com/nl-design-system/utrecht) defines hundreds of \`--utrecht-<component>-*\` slots (\`--utrecht-button-primary-action-background-color\`, \`--utrecht-form-control-border-width\`, …). The Tilburg theme **points each one at the right \`--tilburg-*\` token**, so utrecht components automatically inherit the Tilburg look without any per-component CSS rewrites:

\`\`\`css
.tilburg-theme {
  --utrecht-button-primary-action-background-color: var(--tilburg-color-blue-300);
  --utrecht-form-control-border-width: var(--tilburg-border-width-sm);
  --utrecht-table-header-background-color: var(--tilburg-color-blue-100);
  /* …hundreds more */
}
\`\`\`

When you read CSS in \`@gemeente-tilburg/components-css/*/index.scss\` you'll see one of two patterns:

1. **Consume a utrecht token** when utrecht already defines a slot for the property — e.g. \`border-block-end-color: var(--utrecht-table-row-border-color)\`. The Tilburg theme already aliases that to \`--tilburg-color-blue-200\`.
2. **Consume a Tilburg token directly** when there's no matching utrecht slot, or when the rule is Tilburg-specific (e.g. zebra striping, badge counter brand colour, page-header logo). Example: \`background-color: var(--tilburg-color-pink-300)\`.

### Overriding tokens

Override values app-wide by re-declaring them on \`.tilburg-theme\`, or per-section with a more specific selector:

\`\`\`css
.tilburg-theme .promo-zone {
  --tilburg-color-blue-300: #c4007a;
}
\`\`\`

For more, see the package readme at \`proprietary/design-tokens/README.md\`.`,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const useResolvedValue = (cssVar: string): string => {
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    if (typeof window === 'undefined') return;
    /* Tokens are scoped to `.tilburg-theme` (set by the storybook decorator),
       not `:root` — so read the computed value from a node inside that scope.
       Fall back to documentElement for any token that happens to be defined
       at the root. */
    const themed = document.querySelector('.tilburg-theme') ?? document.documentElement;
    const v = getComputedStyle(themed).getPropertyValue(cssVar).trim();
    setValue(v || '—');
  }, [cssVar]);
  return value;
};

const styles = {
  table: {
    borderCollapse: 'collapse',
    fontFamily: 'var(--utrecht-document-font-family, system-ui, sans-serif)',
    fontSize: '0.875rem',
    inlineSize: '100%',
  } as CSSProperties,
  th: {
    borderBlockEnd: '1px solid var(--tilburg-color-gray-200, #ccc)',
    fontWeight: 700,
    padding: '0.5rem 0.75rem',
    textAlign: 'start',
  } as CSSProperties,
  td: {
    borderBlockEnd: '1px solid var(--tilburg-color-gray-100, #eee)',
    padding: '0.5rem 0.75rem',
    verticalAlign: 'middle',
  } as CSSProperties,
  swatch: {
    blockSize: '2rem',
    border: '1px solid var(--tilburg-color-gray-200, #ccc)',
    borderRadius: '2px',
    inlineSize: '4rem',
  } as CSSProperties,
  mono: {
    fontFamily: 'var(--tilburg-typography-font-family-code, ui-monospace, "SF Mono", Menlo, Consolas, monospace)',
    fontSize: '0.8125rem',
  } as CSSProperties,
};

const ColorRow = ({ name }: { name: string }) => {
  const value = useResolvedValue(name);
  return (
    <tr>
      <td style={styles.td}>
        <div style={{ ...styles.swatch, backgroundColor: `var(${name})` }} />
      </td>
      <td style={{ ...styles.td, ...styles.mono }}>{name}</td>
      <td style={{ ...styles.td, ...styles.mono, color: 'var(--tilburg-color-gray-400, #666)' }}>{value}</td>
    </tr>
  );
};

const SpaceRow = ({ name }: { name: string }) => {
  const value = useResolvedValue(name);
  return (
    <tr>
      <td style={styles.td}>
        <div
          style={{
            backgroundColor: 'var(--tilburg-color-blue-300, #0a8cd9)',
            blockSize: '1rem',
            inlineSize: `var(${name})`,
          }}
        />
      </td>
      <td style={{ ...styles.td, ...styles.mono }}>{name}</td>
      <td style={{ ...styles.td, ...styles.mono, color: 'var(--tilburg-color-gray-400, #666)' }}>{value}</td>
    </tr>
  );
};

const TypographyRow = ({ name, sample }: { name: string; sample: string }) => {
  const value = useResolvedValue(name);
  return (
    <tr>
      <td style={{ ...styles.td, fontSize: `var(${name})` }}>{sample}</td>
      <td style={{ ...styles.td, ...styles.mono }}>{name}</td>
      <td style={{ ...styles.td, ...styles.mono, color: 'var(--tilburg-color-gray-400, #666)' }}>{value}</td>
    </tr>
  );
};

const ValueRow = ({ name }: { name: string }) => {
  const value = useResolvedValue(name);
  return (
    <tr>
      <td style={styles.td}>
        <div style={{ ...styles.swatch, backgroundColor: `var(${name})` }} />
      </td>
      <td style={{ ...styles.td, ...styles.mono }}>{name}</td>
      <td style={{ ...styles.td, ...styles.mono, color: 'var(--tilburg-color-gray-400, #666)' }}>{value}</td>
    </tr>
  );
};

const TokenSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={{ marginBlockEnd: '2.5rem' }}>
    <h2 className="utrecht-heading-2" style={{ marginBlockEnd: '0.75rem' }}>
      {title}
    </h2>
    {children}
  </section>
);

const COLOR_GROUPS: Array<{ label: string; tokens: string[] }> = [
  {
    label: 'Brand — blue',
    tokens: [
      '--tilburg-color-blue-50',
      '--tilburg-color-blue-100',
      '--tilburg-color-blue-200',
      '--tilburg-color-blue-300',
      '--tilburg-color-blue-400',
      '--tilburg-color-blue-500',
    ],
  },
  {
    label: 'Brand — pink',
    tokens: [
      '--tilburg-color-pink-100',
      '--tilburg-color-pink-200',
      '--tilburg-color-pink-300',
      '--tilburg-color-pink-400',
      '--tilburg-color-pink-500',
    ],
  },
  {
    label: 'Brand — green',
    tokens: [
      '--tilburg-color-green-100',
      '--tilburg-color-green-200',
      '--tilburg-color-green-300',
      '--tilburg-color-green-400',
    ],
  },
  {
    label: 'Brand — orange',
    tokens: [
      '--tilburg-color-orange-100',
      '--tilburg-color-orange-200',
      '--tilburg-color-orange-300',
      '--tilburg-color-orange-400',
    ],
  },
  {
    label: 'Brand — red',
    tokens: [
      '--tilburg-color-red-100',
      '--tilburg-color-red-200',
      '--tilburg-color-red-300',
      '--tilburg-color-red-400',
    ],
  },
  {
    label: 'Neutral — gray',
    tokens: [
      '--tilburg-color-gray-50',
      '--tilburg-color-gray-100',
      '--tilburg-color-gray-200',
      '--tilburg-color-gray-300',
      '--tilburg-color-gray-400',
      '--tilburg-color-gray-500',
    ],
  },
  {
    label: 'Neutral — black / white',
    tokens: ['--tilburg-color-white', '--tilburg-color-black'],
  },
];

const SPACE_AXES: Array<{ label: string; prefix: string }> = [
  { label: 'Block (vertical between rows)', prefix: '--tilburg-space-block-' },
  { label: 'Row (vertical inside a row)', prefix: '--tilburg-space-row-' },
  { label: 'Inline (horizontal start/end)', prefix: '--tilburg-space-inline-' },
];

const SPACE_SCALE = ['flea', 'ant', 'beetle', 'snail', 'rat', 'mouse', 'rabbit', 'cat', 'pig', 'dog'];

const TYPOGRAPHY_TOKENS = [
  { name: '--tilburg-typography-font-size-sm', sample: 'Aa — Small' },
  { name: '--tilburg-typography-font-size-md', sample: 'Aa — Medium' },
  { name: '--tilburg-typography-font-size-lg', sample: 'Aa — Large' },
  { name: '--tilburg-typography-font-size-xl', sample: 'Aa — Extra large' },
  { name: '--tilburg-typography-font-size-2xl', sample: 'Aa — 2× large' },
  { name: '--tilburg-typography-font-size-3xl', sample: 'Aa — 3× large' },
  { name: '--tilburg-typography-font-size-4xl', sample: 'Aa — 4× large' },
];

const INTERACTION_TOKENS = [
  '--tilburg-interaction-color',
  '--tilburg-interaction-hover-color',
  '--tilburg-interaction-active-color',
];

export const Colors: Story = {
  name: 'Colors',
  render: () => (
    <>
      {COLOR_GROUPS.map((group) => (
        <TokenSection key={group.label} title={group.label}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, inlineSize: '8rem' }}>Swatch</th>
                <th style={styles.th}>Token</th>
                <th style={styles.th}>Resolved value</th>
              </tr>
            </thead>
            <tbody>
              {group.tokens.map((token) => (
                <ColorRow key={token} name={token} />
              ))}
            </tbody>
          </table>
        </TokenSection>
      ))}
    </>
  ),
};

export const Space: Story = {
  name: 'Space',
  render: () => (
    <>
      {SPACE_AXES.map((axis) => (
        <TokenSection key={axis.prefix} title={axis.label}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, inlineSize: '14rem' }}>Bar (actual size)</th>
                <th style={styles.th}>Token</th>
                <th style={styles.th}>Resolved value</th>
              </tr>
            </thead>
            <tbody>
              {SPACE_SCALE.map((step) => (
                <SpaceRow key={step} name={`${axis.prefix}${step}`} />
              ))}
            </tbody>
          </table>
        </TokenSection>
      ))}
    </>
  ),
};

export const Typography: Story = {
  name: 'Typography (font sizes)',
  render: () => (
    <TokenSection title="Font sizes">
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.th, inlineSize: '16rem' }}>Sample</th>
            <th style={styles.th}>Token</th>
            <th style={styles.th}>Resolved value</th>
          </tr>
        </thead>
        <tbody>
          {TYPOGRAPHY_TOKENS.map((token) => (
            <TypographyRow key={token.name} name={token.name} sample={token.sample} />
          ))}
        </tbody>
      </table>
    </TokenSection>
  ),
};

export const Interaction: Story = {
  name: 'Interaction accents',
  render: () => (
    <TokenSection title="Interaction colour set">
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.th, inlineSize: '8rem' }}>Swatch</th>
            <th style={styles.th}>Token</th>
            <th style={styles.th}>Resolved value</th>
          </tr>
        </thead>
        <tbody>
          {INTERACTION_TOKENS.map((token) => (
            <ValueRow key={token} name={token} />
          ))}
        </tbody>
      </table>
    </TokenSection>
  ),
};
