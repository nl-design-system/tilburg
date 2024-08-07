import { Meta, StoryObj } from '@storybook/angular';
import { TilburgHeading3 } from '@tilburg/component-library-angular';

export default {
  title: 'Angular Component/Heading 3',
  id: 'heading-3',
  component: TilburgHeading3,
  decorators: [],
} as Meta;

type Story = StoryObj<TilburgHeading3>;

export const Default: Story = {
  args: {},
};
