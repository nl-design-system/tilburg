import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgComponentsModule, TilburgHeading5 } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Heading 5',
  id: 'heading-5',
  component: TilburgHeading5,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgHeading5>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<tilburg-heading-5>Test Heading 5</tilburg-heading-5>',
  }),
};
