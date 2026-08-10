import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { typeDtcgDelegate } from 'style-dictionary/utils';
import { readFile } from 'node:fs/promises';
import { createStyleDictionaryConfig } from './style-dictionary-config.mjs';

StyleDictionary.registerAction({
  name: 'log-missing-tokens',
  do: function (dictionary) {
    console.log('Logging all tokens for debugging:');

    dictionary.allTokens.forEach((token) => {
      console.log(`Token: ${token.name}, Value: ${token.value || token.$value}`);
    });

    // Check for unresolved references
    const unresolvedReferences = dictionary.allTokens.filter((token) => {
      return typeof token.value === 'string' && token.value.includes('{') && token.value.includes('}');
    });

    if (unresolvedReferences.length > 0) {
      console.log('Unresolved Token References:');
      unresolvedReferences.forEach((token) => {
        console.log(`Token: ${token.name} has an unresolved reference: ${token.value}`);
      });
    } else {
      console.log('No unresolved token references.');
    }
  },
  undo: function (dictionary) {},
});

const build = async () => {
  const themeConfig = JSON.parse(await readFile('./config.json', 'utf-8'));
  console.log('Starting build...'); // Debugging statement

  // Register preprocessors and transformers
  StyleDictionary.registerPreprocessor({
    name: 'dtcg-delegate',
    preprocessor: typeDtcgDelegate,
  });

  register(StyleDictionary, {
    excludeParentKeys: true,
  });

  /* One Style Dictionary run per theme. The figma export is split per theme
     (`figma/tilburg/…`, `figma/bat/…`) and each theme emits into its own
     `dist/<theme>/` folder, which is what consumers import — e.g.
     `@gemeente-tilburg/design-tokens/dist/tilburg/theme.css`. */
  for (const theme of themeConfig.themes) {
    console.log(`Instantiating theme: ${theme}`);

    const source = [`figma/${theme}/figma.tokens.json`, 'src/**/tokens.json', 'src/**/*.tokens.json'];

    /* The bat theme layers extra patches on top of the shared ones. */
    if (theme === 'bat') {
      source.push('src/patches/bat/**/*.tokens.json');
    }

    const sd = new StyleDictionary({
      ...createStyleDictionaryConfig({
        selector: `.${theme}-theme`,
        source,
      }),
      log: {
        verbosity: 'verbose',
      },
      preprocessors: ['tokens-studio', 'dtcg-delegate'],
    });

    /* Flat `dist/index.css` for backwards compatibility — the path
       `config.json`'s `cdn` field points at. Only the primary theme owns it;
       emitting it for every theme would just overwrite it with the last one. */
    if (theme === themeConfig.prefix) {
      sd.platforms = {
        ...sd.platforms,
        'css-for-backwards-compatibility': {
          transformGroups: 'tokens-studio',
          transforms: ['name/kebab', 'color/hsl-4'],
          buildPath: 'dist/',
          actions: ['log-missing-tokens'], // Attach custom action here
          files: [
            {
              destination: 'index.css',
              format: 'css/variables',
              options: {
                selector: `.${theme}-theme`,
                outputReferences: true,
              },
            },
          ],
        },
      };
    }

    console.log('Cleaning platforms...'); // Debugging statement
    await sd.cleanAllPlatforms();

    console.log('Building platforms...'); // Debugging statement
    await sd.buildAllPlatforms();
    console.log(`Build complete for theme: ${theme}!`); // Debugging statement
  }

  console.log('Build process finished!');
};

build();
