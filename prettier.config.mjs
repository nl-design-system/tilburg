/**
 * @type {import('prettier').Config}
 */
export default {
  printWidth: 120,
  singleQuote: true,
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.js', '*.jsx', '*.cjs', '*.mjs'],
      options: {
        parser: 'flow',
      },
    },
    {
      // The developer scripts use top-level await, which the flow parser does not read.
      files: ['scripts/**/*.mjs'],
      options: {
        parser: 'babel',
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json',
      },
    },
    {
      files: ['package.json'],
      options: {
        parser: 'json-stringify',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: ['*.css', '*.scss'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.html', '*.vue'],
      options: {
        parser: 'html',
      },
    },
    {
      // match pnpm CLI-driven changes behavior
      files: ['pnpm-workspace.yaml'],
      options: {
        singleQuote: true,
      },
    },
  ],
};
