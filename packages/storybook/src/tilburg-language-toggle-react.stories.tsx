/* @license CC0-1.0 */

import { LanguageToggle } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { bugs, description } from '../../storybook-shared/src/tilburg-language-toggle.examples';

const meta = {
  title: 'Tilburg React/Language Toggle',
  id: 'tilburg-language-toggle-react',
  component: LanguageToggle,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
} satisfies Meta<typeof LanguageToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const Interactive = () => {
  const [active, setActive] = useState('NL');
  return <LanguageToggle active={active} onToggle={setActive} />;
};

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>NL active (default)</h4>
        <LanguageToggle active="NL" />
      </div>
      <div>
        <h4>EN active</h4>
        <LanguageToggle active="EN" />
      </div>
      <div>
        <h4>Interactive (klik om te wisselen)</h4>
        <Interactive />
      </div>
      <div>
        <h4>Custom options</h4>
        <LanguageToggle
          options={[
            { code: 'NL', label: 'NL' },
            { code: 'DE', label: 'DE' },
          ]}
          active="DE"
        />
      </div>
    </div>
  ),
};

export const Interactive_: Story = {
  name: 'Interactive',
  render: () => <Interactive />,
};
