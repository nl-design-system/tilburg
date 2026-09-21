/* @license CC0-1.0 */

import { TilburgWebcLanguageToggle } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-language-toggle.examples';

const meta = {
  title: 'Tilburg Web Components/Language Toggle',
  id: 'tilburg-language-toggle-webc',
  component: TilburgWebcLanguageToggle,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWebcLanguageToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const Interactive = () => {
  const [active, setActive] = useState('NL');
  return <TilburgWebcLanguageToggle active={active} onTilburgToggle={(event) => setActive(event.detail)} />;
};

export const AllPermutations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4>NL active (default)</h4>
        <TilburgWebcLanguageToggle active="NL" />
      </div>
      <div>
        <h4>EN active</h4>
        <TilburgWebcLanguageToggle active="EN" />
      </div>
      <div>
        <h4>Interactive (klik om te wisselen)</h4>
        <Interactive />
      </div>
      <div>
        <h4>Custom options</h4>
        <TilburgWebcLanguageToggle
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
