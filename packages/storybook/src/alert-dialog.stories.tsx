import type { Meta, StoryObj } from '@storybook/react';
import { Button, Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { useRef } from 'react';
import '@tilburg/design-tokens/dist/theme.css';
import { AlertDialog } from './alert-dialog';

const meta = {
  title: 'React/Alert Dialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Alert Dialog

An Alert Dialog component following the NL Design System guidelines. It allows users to focus on one task or piece of information by popping up and blocking the page content until the modal task is completed or until the user dismisses the action.

## When to use an Alert Dialog

- To display important information that requires user confirmation
- To present choices that cannot be undone
- To warn users about critical actions
- For short and non-frequent tasks that require immediate attention

## Guidelines

- Use dialogs sparingly because they interrupt the user's workflow
- Use a dialog for short and non-frequent tasks. Consider using the main flow for regular tasks
- Keep content concise and focused on a single task or piece of information
- Ensure the dialog title clearly describes its purpose
- Use action-oriented button labels that describe the action being taken

## Accessibility

- The dialog blocks interaction with the page content when open
- Focus is trapped inside the dialog when open
- The dialog can be closed using the Escape key
- All interactive elements are keyboard accessible
- The dialog has a clear visual hierarchy
- The close button is always available in the header
- ARIA attributes are properly set for screen readers
        `,
      },
    },
    bugs: 'https://github.com/nl-design-system/tilburg/labels/component%2Falert-dialog',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/6RXnW5Zc1qBXlmD8YAm8lJ/Open-Tilburg?type=design&node-id=1-2&mode=design&t=YPa5Qd7RBECXALYg-0',
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the dialog',
    },
    children: {
      control: 'text',
      description: 'The content of the dialog',
    },
    customFooter: {
      control: 'boolean',
      description: 'Optional footer with custom buttons',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  name: 'Default',
  args: {
    title: 'Example Alert Dialog',
    children: (
      <>
        <Paragraph>
          <strong>Agreement</strong>
          <br />A formal agreement or arrangement between two or more parties.
        </Paragraph>
        <Paragraph>
          <strong>Policy Document</strong>
          <br />
          Document used to establish policies or guidelines.
        </Paragraph>
      </>
    ),
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `
import { AlertDialog, Button } from '@tilburg/component-library-react';

function MyComponent() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      <Button onClick={openDialog}>Open Dialog</Button>
      <AlertDialog
        ref={dialogRef}
        title="Example Alert Dialog"
      >
        <Paragraph>
          <strong>Agreement</strong><br />
          A formal agreement or arrangement between two or more parties.
        </Paragraph>
        <Paragraph>
          <strong>Policy Document</strong><br />
          Document used to establish policies or guidelines.
        </Paragraph>
      </AlertDialog>
    </>
  );
}`,
      },
    },
  },
  render: (args) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
      dialogRef.current?.showModal();
    };

    return (
      <>
        <Button onClick={openModal}>Open Dialog</Button>
        <AlertDialog {...args} ref={dialogRef} />
      </>
    );
  },
};

export const WithCustomFooter: Story = {
  name: 'With Custom Footer',
  args: {
    title: 'Alert Dialog with Custom Footer',
    children: <Paragraph>This alert dialog has a custom footer with multiple buttons.</Paragraph>,
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `
import { AlertDialog, Button } from '@tilburg/component-library-react';

function MyComponent() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <Button onClick={openDialog}>Open Dialog</Button>
      <AlertDialog
        ref={dialogRef}
        title="Alert Dialog with Custom Footer"
        customFooter={
          <div className="tilburg-modal__footer">
            <Button appearance="subtle-button" onClick={closeDialog}>
              Cancel
            </Button>
            <Button appearance="primary-action-button" onClick={closeDialog}>
              Save
            </Button>
          </div>
        }
      >
        <Paragraph>
          This alert dialog has a custom footer with multiple buttons.
        </Paragraph>
      </AlertDialog>
    </>
  );
}`,
      },
    },
  },
  render: (args) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
      dialogRef.current?.showModal();
    };

    const closeModal = () => {
      dialogRef.current?.close();
    };

    return (
      <>
        <Button onClick={openModal}>Open Dialog</Button>
        <AlertDialog
          {...args}
          ref={dialogRef}
          customFooter={
            <div className="tilburg-modal__footer">
              <Button appearance="subtle-button" onClick={closeModal}>
                Cancel
              </Button>
              <Button appearance="primary-action-button" onClick={closeModal}>
                Save
              </Button>
            </div>
          }
        />
      </>
    );
  },
};
