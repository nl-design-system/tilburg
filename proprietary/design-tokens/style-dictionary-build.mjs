import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { typeDtcgDelegate } from 'style-dictionary/utils';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createStyleDictionaryConfig, withPublicTokensOnly } from './style-dictionary-config.mjs';

StyleDictionary.registerAction({
  name: 'log-missing-tokens',
  do: function (dictionary) {
    // Report references that did not resolve; listing every token only buried them.
    const unresolvedReferences = dictionary.allTokens.filter((token) => {
      return typeof token.value === 'string' && token.value.includes('{') && token.value.includes('}');
    });

    unresolvedReferences.forEach((token) => {
      console.warn(`Token: ${token.name} has an unresolved reference: ${token.value}`);
    });
  },
  undo: function (dictionary) {},
});

/** Token files under `src/`, without the theme folders in `src/patches/<theme>/`: a shared `src/**` glob used to pull
 *  every theme's patches into every theme, so which theme won depended on file order. */
const sharedTokenFiles = async (themes) => {
  const files = await readdir('src', { recursive: true });
  return files
    .filter((file) => file === 'tokens.json' || file.endsWith('/tokens.json') || file.endsWith('.tokens.json'))
    .filter((file) => !themes.some((theme) => file.startsWith(`patches/${theme}/`)))
    .map((file) => `src/${file}`)
    .sort();
};

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

  /* The themes were built with `transformGroups` (plural), a key Style Dictionary does not read, so for a long time
     none of the tokens-studio transforms ran (unitless `1` for a border width, `[object Object]` for a composite).
     Now that the group runs, three of its transforms are left out because they would change how existing themes
     render: `ts/size/lineheight` turns `150%` into `1.5` (a percentage is inherited as a fixed length, a number is
     recomputed per element — every heading's line height would change); `fontFamily/css` quotes the already quoted
     family names again (`'"TradeGothic LT"'`), breaking the fallback fonts; `ts/typography/fontWeight` turns
     `Regular` into `400`, which overrides the inherited weight where the invalid `Regular` was ignored. */
  StyleDictionary.registerTransformGroup({
    name: 'tilburg/tokens-studio',
    transforms: StyleDictionary.hooks.transformGroups['tokens-studio'].filter(
      (transform) => !['ts/size/lineheight', 'fontFamily/css', 'ts/typography/fontWeight'].includes(transform),
    ),
  });

  /* One Style Dictionary run per theme. The figma export is split per theme
     (`figma/tilburg/…`, `figma/bat/…`) and each theme emits into its own
     `dist/<theme>/` folder, which is what consumers import — e.g.
     `@gemeente-tilburg/design-tokens/dist/tilburg/theme.css`. */
  for (const theme of themeConfig.themes) {
    console.log(`Instantiating theme: ${theme}`);

    const source = [`figma/${theme}/figma.tokens.json`, ...(await sharedTokenFiles(themeConfig.themes))];

    /* A theme can layer its own patches on top of the shared ones in
       `src/patches/<theme>/` (today only `bat` has any). They come last, so
       they win on conflicts. */
    source.push(`src/patches/${theme}/**/*.tokens.json`);

    const sd = new StyleDictionary({
      ...createStyleDictionaryConfig({
        selector: `.${theme}-theme`,
        source,
      }),
      log: {
        verbosity: 'default',
      },
      preprocessors: ['tokens-studio', 'dtcg-delegate'],
    });

    /* Flat `dist/index.css` for backwards compatibility — the path
       `config.json`'s `cdn` field points at. Only the primary theme owns it;
       emitting it for every theme would just overwrite it with the last one. */
    if (theme === themeConfig.prefix) {
      sd.platforms = {
        ...sd.platforms,
        ...withPublicTokensOnly({
          'css-for-backwards-compatibility': {
            transformGroup: 'tilburg/tokens-studio',
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
        }),
      };
    }

    console.log('Cleaning platforms...'); // Debugging statement
    await sd.cleanAllPlatforms();

    console.log('Building platforms...'); // Debugging statement
    await sd.buildAllPlatforms();
    console.log(`Build complete for theme: ${theme}!`); // Debugging statement
  }

  /* High-contrast mode (opt-in): black background, white text and outlines, for every theme. It is one extra class
     on the same element as the theme class (`<body class="tilburg-theme tilburg-high-contrast">`); custom properties
     with var() references resolve where they are declared, so the overrides must sit next to the theme, not deeper.
     The tokens live in `high-contrast/`, outside `src/`, so the themes above don't pick them up; only they are
     emitted, into `dist/high-contrast.css`, followed by the few component rules tokens cannot reach. */
  const highContrast = new StyleDictionary({
    include: [`figma/${themeConfig.prefix}/figma.tokens.json`, 'src/**/*.tokens.json'],
    source: ['high-contrast/**/*.tokens.json'],
    log: { verbosity: 'default', warnings: 'disabled' },
    preprocessors: ['tokens-studio', 'dtcg-delegate'],
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab', 'color/hsl-4'],
        buildPath: 'dist/',
        files: [
          {
            destination: 'high-contrast.css',
            format: 'css/variables',
            filter: (token) => token.filePath.includes('high-contrast/'),
            options: { selector: '.tilburg-high-contrast[class*="-theme"]', outputReferences: false },
          },
        ],
      },
    },
  });
  await highContrast.buildAllPlatforms();
  await writeFile(
    'dist/high-contrast.css',
    (await readFile('dist/high-contrast.css', 'utf-8')) + (await readFile('high-contrast/components.css', 'utf-8')),
  );
  console.log('Build complete for high contrast (dist/high-contrast.css)!');

  console.log('Build process finished!');
};

build();
