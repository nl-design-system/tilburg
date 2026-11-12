<!-- @license CC0-1.0 -->

## Bijdragen

De broncode staat op <https://github.com/nl-design-system/tilburg>. Issues en pull requests voor nieuwe componenten,
bugfixes en documentatie zijn welkom.

- **Opzetten** is één commando na het clonen: `node scripts/setup.mjs`.
- **Kennismaken** gaat het snelst met [Je eerste wijziging](?path=/docs/tilburg-je-eerste-wijziging--docs): een kleine
  wijziging van begin tot pull request.
- **Een nieuw component** begint bij zijn HTML: `pnpm new <naam> --html '<…>'` maakt daaruit de vier lagen, de stories
  en de tests. Het venster _Gebruik_ in de werkbalk vult zich daarna uit de story en deze documentatie.
- **Hoe alles in elkaar zit**, hoe je test en de stappen voor een component in alle lagen staan in
  [`CONTRIBUTING.md`](https://github.com/nl-design-system/tilburg/blob/main/CONTRIBUTING.md).

De belangrijkste afspraak: de HTML/CSS-referentie is leidend, en React, Angular en Web Components renderen precies
dezelfde DOM en classes.
