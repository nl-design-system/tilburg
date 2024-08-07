import { componentWrapperDecorator, Meta, Story } from '@storybook/angular';
import { TilburgHeading4 } from '@utrecht/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Heading 4',
  id: 'angular-tilburg-heading-4',
  decorators: [componentWrapperDecorator((story) => `<div class="utrecht-document utrecht-theme">${story}</div>`)],
  component: TilburgHeading4,
} as Meta<typeof TilburgHeading4>;

const Template: Story = (args) => ({
  props: args,
  template: `<tilburg-heading-4>The Quick Brown Fox Jumps Over The Lazy Dog</tilburg-heading-4>`,
  component: TilburgHeading4,
});

export const Default = Template.bind({});

Default.args = {};
