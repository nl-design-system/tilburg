declare module '*.md?raw' {
  const content: string;
  export default content;
}

/* The example pages hand their own source to the docs "Show code" block. */
declare module '*.tsx?raw' {
  const content: string;
  export default content;
}
