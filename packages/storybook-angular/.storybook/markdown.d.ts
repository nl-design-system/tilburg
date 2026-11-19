/* `preview.ts` hands the documentation pages to the "Gebruik" panel as raw text (see `parameters.usage`). */
declare module '*.md?raw' {
  const content: string;
  export default content;
}

/* The example pages show their own source under "Show code" (see `src/examples/*.stories.ts`). */
declare module '*.ts?raw' {
  const content: string;
  export default content;
}
