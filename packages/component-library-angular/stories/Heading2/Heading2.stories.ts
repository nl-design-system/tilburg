import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgHeading2 } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Heading 2',
  id: 'heading-2',
  component: TilburgHeading2,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgHeading2>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<tilburg-heading-2>Test Heading 2</tilburg-heading-2>',
  }),
};
