import { componentWrapperDecorator, Meta, Story } from '@storybook/angular';
import { TilburgHeading6 } from '@utrecht/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Heading 6',
  id: 'angular-tilburg-heading-6',
  decorators: [componentWrapperDecorator((story) => `<div class="utrecht-document utrecht-theme">${story}</div>`)],
  component: TilburgHeading6,
} as Meta<typeof TilburgHeading6>;

const Template: Story = (args) => ({
  props: args,
  template: `<tilburg-heading-6>The Quick Brown Fox Jumps Over The Lazy Dog</tilburg-heading-6>`,
  component: TilburgHeading6,
});

export const Default = Template.bind({});

Default.args = {};
