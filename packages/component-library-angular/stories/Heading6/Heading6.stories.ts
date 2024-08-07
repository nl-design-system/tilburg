import { Meta, StoryObj } from '@storybook/angular';
import { TilburgHeading6 } from '@tilburg/component-library-angular';

export default {
  title: 'Angular Component/Heading 6',
  id: 'heading-6',
  component: TilburgHeading6,
  decorators: [],
} as Meta;

type Story = StoryObj<TilburgHeading6>;

export const Default: Story = {
  args: {},
};
