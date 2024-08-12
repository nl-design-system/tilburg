import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgHeading6 } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Heading 6',
  id: 'heading-6',
  component: TilburgHeading6,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgHeading6>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<tilburg-heading-6>Test Heading 6</tilburg-heading-6>',
  }),
};