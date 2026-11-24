/* @license CC0-1.0 */

import { Icon, Paragraph } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-icon.examples';

const meta = {
  title: 'Tilburg React/Icon',
  id: 'tilburg-icon-react',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

const InfoSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" />
  </svg>
);

export const AllPermutations: Story = {
  render: () => (
    <>
      <Paragraph>
        <Icon>
          <InfoSvg />
        </Icon>{' '}
        Meer informatie over afvalinzameling
      </Paragraph>
      <Paragraph
        style={
          {
            '--utrecht-icon-size': 'var(--tilburg-size-icon-4xl)',
            '--utrecht-icon-color': 'var(--tilburg-interaction-color)',
          } as CSSProperties
        }
      >
        <Icon>
          <InfoSvg />
        </Icon>{' '}
        Let op
      </Paragraph>
    </>
  ),
};
