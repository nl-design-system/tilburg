import { Meta, StoryObj } from '@storybook/angular';
import { TilburgHeading4 } from '@tilburg/component-library-angular';

export default {
  title: 'Angular Component/Heading 4',
  id: 'heading-4',
  component: TilburgHeading4,
  decorators: [],
} as Meta;

type Story = StoryObj<TilburgHeading4>;

export const Default: Story = {
  args: {},
};
