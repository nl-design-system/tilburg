import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TilburgButtonLink, TilburgComponentsModule } from '@tilburg/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Button Link',
  id: 'button-link-1',
  component: TilburgButtonLink,
  decorators: [
    moduleMetadata({
      imports: [TilburgComponentsModule],
    }),
  ],
} as Meta;

type Story = StoryObj<TilburgButtonLink>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: '<a [external]="external" [appearance]="appearance" [href]="href" utrecht-button-link>Read More</a>',
  }),
};
