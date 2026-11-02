/* @license CC0-1.0 */

import { TilburgWbcButton, TilburgWbcForm } from '@gemeente-tilburg/web-components-react';
import type { Meta, StoryObj } from '@storybook/react';
import { bugs, descriptionWebComponents } from '../../storybook-shared/src/tilburg-form.examples';

/* Stencil `<tilburg-wbc-form>` rendered through its generated React proxy. The custom elements themselves are
   registered once in `config/preview.tsx` (`defineCustomElements()`). */

const meta = {
  title: 'Tilburg Web Components/Form',
  id: 'tilburg-form-wbc',
  component: TilburgWbcForm,
  tags: ['autodocs'],
  parameters: {
    bugs,
    docs: { description: { component: descriptionWebComponents } },
  },
} satisfies Meta<typeof TilburgWbcForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TilburgWbcForm
      aria-label="Contact"
      style={{ maxInlineSize: '32rem' }}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="utrecht-form-field utrecht-form-field--text">
        <label className="utrecht-form-label" htmlFor="form-wbc-naam">
          Naam
        </label>
        <input id="form-wbc-naam" name="naam" className="utrecht-textbox utrecht-textbox--html-input" />
      </div>
      <TilburgWbcButton type="submit">Versturen</TilburgWbcButton>
    </TilburgWbcForm>
  ),
};
