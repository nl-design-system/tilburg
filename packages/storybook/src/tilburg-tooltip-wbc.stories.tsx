/* @license CC0-1.0 */

import { TilburgWbcTooltip } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  argDescriptions,
  bugs,
  descriptionWebComponents,
  edgeText,
} from '../../storybook-shared/src/tilburg-tooltip.examples';

/* Stencil `<tilburg-wbc-tooltip>` rendered through its generated React proxy. The custom elements themselves are
   registered once in `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Tooltip',
  id: 'tilburg-tooltip-wbc',
  component: TilburgWbcTooltip,
  tags: ['tilburg'],
  args: { placement: 'above' },
  argTypes: {
    text: { control: 'text', description: argDescriptions.text },
    placement: {
      control: 'inline-radio',
      options: ['above', 'below'],
      description: argDescriptions.placement,
      table: { defaultValue: { summary: 'above' } },
    },
  },
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
    controls: { include: ['text', 'placement'] },
  },
} satisfies Meta<typeof TilburgWbcTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Room above and below, so the tooltip is not clipped by the story frame. */
const frame = { padding: '4rem 2rem', display: 'flex', gap: '2rem', alignItems: 'center' } as const;

export const Default: Story = {
  args: { text: 'U kunt de aanvraag later afmaken.' },
  render: (args) => (
    <div style={frame}>
      <TilburgWbcTooltip {...args}>
        <button type="button" className="utrecht-button utrecht-button--secondary-action tilburg-medium">
          Opslaan als concept
        </button>
      </TilburgWbcTooltip>
    </div>
  ),
};

export const Below: Story = {
  name: 'Below the trigger',
  args: { text: 'Vrijstelling van gemeentelijke belastingen bij een laag inkomen.', placement: 'below' },
  render: (args) => (
    <div style={frame}>
      <TilburgWbcTooltip {...args}>
        <a className="utrecht-link" href="#">
          Kwijtschelding
        </a>
      </TilburgWbcTooltip>
    </div>
  ),
};

/* The same frame as `edgeFrameStyle` in the shared examples. */
const edgeStyle = {
  overflow: 'hidden',
  minBlockSize: '9rem',
  maxInlineSize: '28rem',
  border: '1px dashed currentColor',
  padding: '0.25rem',
} as const;

/* The trigger sits in the top-left corner of a container that cuts off what sticks out: the tooltip opens below and
   shifts right instead. */
export const Edge: Story = {
  name: 'Kept in view at the edge',
  args: { text: edgeText },
  render: (args) => (
    <div style={edgeStyle}>
      <TilburgWbcTooltip {...args}>
        <button type="button" className="utrecht-button utrecht-button--secondary-action tilburg-medium">
          Kwijtschelding
        </button>
      </TilburgWbcTooltip>
    </div>
  ),
};
