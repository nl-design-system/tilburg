import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgButton, TilburgComponentsModule } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Button',
  id: 'button-1',
  component: TilburgButton,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgButton>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<tilburg-button (click)="alert()">Test Heading 1</tilburg-button>',
  }),
};
