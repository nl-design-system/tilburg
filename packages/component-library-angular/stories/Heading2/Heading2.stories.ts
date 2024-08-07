import { Meta, StoryObj } from '@storybook/angular';
import { TilburgHeading2 } from '@tilburg/component-library-angular';

export default {
  title: 'Angular Component/Heading 2',
  id: 'heading-2',
  component: TilburgHeading2,
  decorators: [],
} as Meta;

type Story = StoryObj<TilburgHeading2>;

export const Default: Story = {
  args: {},
};
