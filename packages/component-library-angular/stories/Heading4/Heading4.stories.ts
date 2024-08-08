import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgHeading4 } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Heading 4',
  id: 'heading-4',
  component: TilburgHeading4,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgHeading4>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<tilburg-heading-4>Test Heading 4</tilburg-heading-4>',
  }),
};
