<!-- @license CC0-1.0 -->

# Select

Een keuzelijst: de bezoeker kiest **één** optie uit een vaste lijst. Het is een gewone `<select>` met de
Tilburg-huisstijl, dus hij werkt zonder JavaScript, doet vanzelf mee in het formulier en toont op een telefoon de
vertrouwde keuzelijst van het systeem.

## Wanneer gebruik je het?

- **Wel**: één keuze uit een bekende, niet al te lange lijst (een stadsdeel, een maand, een soort afspraak).
- **Niet** voor twee of drie opties: gebruik dan radio buttons, zodat alle keuzes meteen zichtbaar zijn.
- **Niet** voor meerdere keuzes: gebruik de combobox met `multiple` (verwijderbare chips).
- **Niet** om naar een andere pagina te gaan zodra iemand iets kiest: een keuze mag de pagina niet veranderen
  (WCAG 3.2.2). Laat de bezoeker kiezen en daarna op een knop drukken.

## Toegankelijkheid

- Geef de select altijd een zichtbaar label met `for`/`id`; een placeholder-optie is geen label.
- Begin met een lege optie ("Maak een keuze") als er geen logische standaardwaarde is. Met `required` weigert de
  browser dan het formulier tot er iets is gekozen.
- Koppel een uitleg of foutmelding met `aria-describedby` en zet bij een fout `aria-invalid="true"` (of `invalid`).
- Groepeer lange lijsten met `<optgroup label="…">`.

## Doen en niet doen

| Doen                                                          | Niet doen                                              |
| ------------------------------------------------------------- | ------------------------------------------------------ |
| Korte, onderscheidende optieteksten, in een logische volgorde | Opties die met hetzelfde woord beginnen ("Aanvraag …") |
| "Maak een keuze" als eerste, lege optie                       | Een uitleg in de placeholder-optie zetten              |
| Een select voor één keuze uit vijf of meer opties             | Een select voor ja/nee                                 |
