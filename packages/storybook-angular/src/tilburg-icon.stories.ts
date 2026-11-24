/* @license CC0-1.0 */

import { TilburgIcon } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { bugs, description } from '../../storybook-shared/src/tilburg-icon.examples';

const meta: Meta<TilburgIcon> = {
  title: 'Tilburg Angular/Icon',
  id: 'tilburg-icon-angular',
  component: TilburgIcon,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: description } },
  },
};

export default meta;
type Story = StoryObj<TilburgIcon>;

export const Default: Story = {
  name: 'Default',
  render: () => ({
    template: `
      <tilburg-paragraph>
        <tilburg-icon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" /></svg>
        </tilburg-icon>
        Meer informatie over afvalinzameling
      </tilburg-paragraph>
    `,
  }),
};

export const CustomSize: Story = {
  name: 'Custom size and colour',
  render: () => ({
    template: `
      <div style="--utrecht-icon-size:var(--tilburg-size-icon-4xl);--utrecht-icon-color:var(--tilburg-interaction-color)">
        <tilburg-icon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" /></svg>
        </tilburg-icon>
        Let op
      </div>
    `,
  }),
};
