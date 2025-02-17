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

## Anatomy

An Alert Dialog consists of:

- A header with a title and close button
- Content area for information or form elements
- A footer with one or more action buttons
- A semi-transparent backdrop that blocks interaction with the page

## Keyboard Support

| Key         | Function                                                        |
| ----------- | --------------------------------------------------------------- |
| Tab         | Moves focus to the next focusable element inside the dialog     |
| Shift + Tab | Moves focus to the previous focusable element inside the dialog |
| Escape      | Closes the dialog                                               |

## Accessibility

- The dialog blocks interaction with the page content when open
- Focus is trapped inside the dialog when open
- The dialog can be closed using the Escape key
- All interactive elements are keyboard accessible
- The dialog has a clear visual hierarchy
- The close button is always available in the header
- ARIA attributes are properly set for screen readers

## Best Practices

- Use clear, action-oriented labels for buttons
- Keep content concise and to the point
- Ensure the title clearly describes the dialog's content
- Use primary action buttons for the main action
- Place 'Cancel' button on the left and primary action on the right
- Ensure sufficient contrast for all text elements
- Provide clear feedback when actions are taken

## Variants

1. Default

   - Standard variant with a single close button
   - Suitable for informative messages
   - Uses primary action button for closing

2. Custom Footer
   - Variant with multiple action buttons
   - Suitable for confirmations or choices
   - Supports custom button configurations

## Technical Details

The Alert Dialog is built using the native HTML `<dialog>` element, which provides:

- Built-in modal behavior
- Focus management
- Keyboard interaction
- Proper backdrop handling

## References

- [HTMLDialogElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement)
- [Modal & Nonmodal Dialogs: When & When Not to Use Them](https://www.nngroup.com/articles/modal-nonmodal-dialog/)
- [ARIA Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
