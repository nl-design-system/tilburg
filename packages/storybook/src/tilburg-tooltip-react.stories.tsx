/* @license CC0-1.0 */

import { Button, Link, Tooltip } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { argDescriptions, bugs, descriptionReact, edgeText } from '../../storybook-shared/src/tilburg-tooltip.examples';

const meta = {
  title: 'Tilburg React/Tooltip',
  id: 'tilburg-tooltip-react',
  component: Tooltip,
  tags: ['tilburg'],
  args: { placement: 'above' },
  argTypes: {
    content: { control: 'text', description: argDescriptions.text },
    placement: {
      control: 'inline-radio',
      options: ['above', 'below'],
      description: argDescriptions.placement,
      table: { defaultValue: { summary: 'above' } },
    },
  },
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
    controls: { include: ['content', 'placement'] },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Room above and below, so the tooltip is not clipped by the story frame. */
const frame = { padding: '4rem 2rem', display: 'flex', gap: '2rem', alignItems: 'center' } as const;

const PencilIcon = () => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

export const Default: Story = {
  args: { content: 'U kunt de aanvraag later afmaken.', children: <Button>Opslaan als concept</Button> },
  render: (args) => (
    <div style={frame}>
      <Tooltip {...args} />
    </div>
  ),
};

export const IconButton: Story = {
  name: 'Icon-only button',
  args: {
    content: 'Uw gegevens bewerken',
    children: (
      <Button appearance="subtle-button" aria-label="Bewerken">
        <PencilIcon />
      </Button>
    ),
  },
  render: (args) => (
    <div style={frame}>
      <Tooltip {...args} />
    </div>
  ),
};

export const Below: Story = {
  name: 'Below the trigger',
  args: {
    content: 'Vrijstelling van gemeentelijke belastingen bij een laag inkomen.',
    placement: 'below',
    children: <Link href="#">Kwijtschelding</Link>,
  },
  render: (args) => (
    <div style={frame}>
      <Tooltip {...args} />
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
  args: { content: edgeText, children: <Button>Kwijtschelding</Button> },
  render: (args) => (
    <div style={edgeStyle}>
      <Tooltip {...args} />
    </div>
  ),
};
