/* @license CC0-1.0 */

import { TilburgWbcLanguageToggle } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-language-toggle.examples';

const meta = {
  title: 'Tilburg Web Components/Language Toggle',
  id: 'tilburg-language-toggle-wbc',
  component: TilburgWbcLanguageToggle,
  tags: ['autodocs', 'tilburg'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcLanguageToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const Interactive = () => {
  const [active, setActive] = useState('NL');
  return <TilburgWbcLanguageToggle active={active} onTilburgToggle={(event) => setActive(event.detail)} />;
};

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>NL active (default)</h4>
        <TilburgWbcLanguageToggle active="NL" />
      </div>
      <div>
        <h4>EN active</h4>
        <TilburgWbcLanguageToggle active="EN" />
      </div>
      <div>
        <h4>Interactive (klik om te wisselen)</h4>
        <Interactive />
      </div>
      <div>
        <h4>Custom options</h4>
        <TilburgWbcLanguageToggle
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
