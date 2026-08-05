/**
 * @type {import('prettier').Config}
 */
export default {
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
        printWidth: 120,
        singleQuote: true,
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json',
        printWidth: 120,
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
        printWidth: 120,
        singleQuote: true,
      },
    },
    {
      files: ['*.css', '*.scss'],
      options: {
        parser: 'css',
      },
    },
    {
      files: ['*.html', '*.vue'],
      options: {
        parser: 'html',
        printWidth: 120,
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
