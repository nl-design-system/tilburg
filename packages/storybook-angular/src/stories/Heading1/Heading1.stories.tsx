import { componentWrapperDecorator, Meta, Story } from '@storybook/angular';
import { TilburgHeading1 } from '@utrecht/component-library-angular';

export default {
  title: 'Tilburg Angular Components/Heading 1',
  id: 'angular-tilburg-heading-1',
  decorators: [componentWrapperDecorator((story) => `<div class="utrecht-document utrecht-theme">${story}</div>`)],
  component: TilburgHeading1,
} as Meta<typeof TilburgHeading1>;

const Template: Story = (args) => ({
  props: args,
  template: `<tilburg-heading-1>The Quick Brown Fox Jumps Over The Lazy Dog</tilburg-heading-1>`,
  component: TilburgHeading1,
});

export const Default = Template.bind({});

Default.args = {};
