import { Meta, StoryObj } from '@storybook/angular';
import { TilburgHeading5 } from '@tilburg/component-library-angular';

export default {
  title: 'Angular Component/Heading 5',
  id: 'heading-5',
  component: TilburgHeading5,
  decorators: [],
} as Meta;

type Story = StoryObj<TilburgHeading5>;

export const Default: Story = {
  args: {},
};
