/* @license CC0-1.0 */

import { TilburgWbcIcon } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-icon.examples';

/* Stencil `<tilburg-wbc-icon>` rendered through its generated React proxy.
   The custom elements themselves are registered once in `config/preview.tsx`
   (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Icon',
  id: 'tilburg-icon-wbc',
  component: TilburgWbcIcon,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPermutations: Story = {
  render: () => (
    <>
      <p className="utrecht-paragraph">
        <TilburgWbcIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />
          </svg>
        </TilburgWbcIcon>{' '}
        Meer informatie over afvalinzameling
      </p>
      <p
        className="utrecht-paragraph"
        style={
          {
            '--utrecht-icon-size': 'var(--tilburg-size-icon-4xl)',
            '--utrecht-icon-color': 'var(--tilburg-interaction-color)',
          } as CSSProperties
        }
      >
        <TilburgWbcIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />
          </svg>
        </TilburgWbcIcon>{' '}
        Let op
      </p>
    </>
  ),
};
