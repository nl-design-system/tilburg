import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgButton } from 'src/components';
import { TilburgComponentsModule } from 'src/index.module';

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
