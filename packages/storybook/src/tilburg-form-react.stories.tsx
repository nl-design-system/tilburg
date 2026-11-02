/* @license CC0-1.0 */

import { Button, Form, FormField, FormLabel, Textbox } from '@gemeente-tilburg/components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionReact } from '../../storybook-shared/src/tilburg-form.examples';

const meta = {
  title: 'Tilburg React/Form',
  id: 'tilburg-form-react',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionReact } },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Form aria-label="Contact" style={{ maxInlineSize: '32rem' }} onSubmit={(event) => event.preventDefault()}>
      <FormField type="text">
        <FormLabel htmlFor="form-react-naam">Naam</FormLabel>
        <Textbox id="form-react-naam" name="naam" autoComplete="name" />
      </FormField>
      <FormField type="text">
        <FormLabel htmlFor="form-react-email">E-mailadres</FormLabel>
        <Textbox id="form-react-email" name="email" type="email" autoComplete="email" />
      </FormField>
      <Button type="submit" appearance="primary-action-button">
        Versturen
      </Button>
    </Form>
  ),
};
