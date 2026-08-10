import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import { typeDtcgDelegate } from "style-dictionary/utils";
import { readFile, writeFile } from "node:fs/promises";
import { createStyleDictionaryConfig } from "./style-dictionary-config.mjs"; // Assuming this file exists

// --- Original Custom Action ---
StyleDictionary.registerAction({
  name: "log-missing-tokens",
  do: function (dictionary) {
    console.log("Logging all tokens for debugging:");

    // Original logging (can be verbose)
    // dictionary.allTokens.forEach((token) => {
    //   console.log(
    //     `Token: ${token.name}, Value: ${token.value || token.$value}`,
    //   );
    // });

    // Check for unresolved references (using original logic)
    const unresolvedReferences = dictionary.allTokens.filter((token) => {
      // A simple check: if the value is still a string containing { } it might be unresolved
      // Note: This isn't foolproof as transforms might output strings with braces.
      // A more robust check would compare original.value to final value if original contained braces.
      return (
        typeof token.value === "string" &&
        token.value.includes("{") &&
        token.value.includes("}") &&
        // Add check to see if original value was also a reference
        typeof token.original.value === "string" &&
        token.original.value.includes("{") &&
        token.original.value.includes("}") &&
        token.value === token.original.value // Only flag if final value is identical to original reference string
      );
    });

    if (unresolvedReferences.length > 0) {
      console.warn("⚠️ Unresolved Token References Found:"); // Use warn for visibility
      unresolvedReferences.forEach((token) => {
        console.warn(
          `  - Token: ${token.name} (Path: ${token.path.join(".")}) has an unresolved reference: ${token.original.value}`,
        );
      });
    } else {
      console.log("✅ No unresolved token references found.");
    }
  },
  undo: function (dictionary) {},
});

// --- Build Function ---
const build = async () => {
  const themeConfig = JSON.parse(await readFile("./config.json", "utf-8"));
  console.log("Starting build..."); // Debugging statement

  // Register preprocessors and transformers
  StyleDictionary.registerPreprocessor({
    name: 'dtcg-delegate',
    preprocessor: typeDtcgDelegate,
  });

  register(StyleDictionary, {
    excludeParentKeys: true,
    // Add other sd-transforms options if necessary
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

// --- Run Build ---
build().catch((error) => {
  console.error("❌ Build script failed:", error);
  process.exit(1);
});
