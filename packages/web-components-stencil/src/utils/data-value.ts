/* Stencil's JSX types leave `value` off `<data>` (JSXBase.HTMLAttributes<HTMLDataElement>); spread this onto the
   element to set the attribute: `<data {...dataValue(x)}>`. */
export const dataValue = (value: string | undefined): Record<string, string | undefined> => ({ value });
