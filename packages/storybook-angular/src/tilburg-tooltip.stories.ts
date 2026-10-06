/* @license CC0-1.0 */

import { TilburgTooltip } from '@gemeente-tilburg/components-angular';
import type { Meta, StoryObj } from '@storybook/angular';
import {
  argDescriptions,
  bugs,
  description,
  edgeFrameStyle,
  edgeText,
} from '../../storybook-shared/src/tilburg-tooltip.examples';

const meta: Meta<TilburgTooltip> = {
  title: 'Tilburg Angular/Tooltip',
  id: 'tilburg-tooltip-angular',
  component: TilburgTooltip,
  tags: ['!autodocs', 'tilburg'],
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
    docs: { description: { component: description } },
    controls: { include: ['text', 'placement'] },
  },
};

export default meta;
type Story = StoryObj<TilburgTooltip>;

/* Room above and below, so the tooltip is not clipped by the story frame. */
const frame = (content: string) =>
  `<div style="padding:4rem 2rem; display:flex; gap:2rem; align-items:center">${content}</div>`;

export const Default: Story = {
  args: { text: 'U kunt de aanvraag later afmaken.', placement: 'above' },
  render: (args) => ({
    props: args,
    template: frame(`
      <tilburg-tooltip [text]="text" [placement]="placement">
        <button type="button" class="utrecht-button utrecht-button--secondary-action tilburg-medium">Opslaan als concept</button>
      </tilburg-tooltip>`),
  }),
};

export const Below: Story = {
  name: 'Below the trigger',
  args: { text: 'Vrijstelling van gemeentelijke belastingen bij een laag inkomen.', placement: 'below' },
  render: (args) => ({
    props: args,
    template: frame(`
      <tilburg-tooltip [text]="text" [placement]="placement">
        <a class="utrecht-link" href="#">Kwijtschelding</a>
      </tilburg-tooltip>`),
  }),
};

/* The trigger sits in the top-left corner of a container that cuts off what sticks out: the tooltip opens below and
   shifts right instead. */
export const Edge: Story = {
  name: 'Kept in view at the edge',
  args: { text: edgeText, placement: 'above' },
  render: (args) => ({
    props: args,
    template: `
      <div style="${edgeFrameStyle}">
        <tilburg-tooltip [text]="text" [placement]="placement">
          <button type="button" class="utrecht-button utrecht-button--secondary-action tilburg-medium">Kwijtschelding</button>
        </tilburg-tooltip>
      </div>`,
  }),
};
