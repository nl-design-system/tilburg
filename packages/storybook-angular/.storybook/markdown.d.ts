/* `preview.ts` hands the documentation pages to the "Gebruik" panel as raw text (see `parameters.usage`). */
declare module '*.md?raw' {
  const content: string;
  export default content;
}
