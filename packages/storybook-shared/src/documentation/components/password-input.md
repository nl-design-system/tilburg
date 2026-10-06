<!-- @license CC0-1.0 -->

# Password input

Een tekstveld voor een wachtwoord, met een knop om het wachtwoord te tonen of te verbergen. Zo kan iemand controleren
wat hij heeft getypt, zonder dat het wachtwoord standaard in beeld staat. Dit is een **Tilburg-component** (label
**TLB**): Utrecht heeft geen eigen wachtwoordveld.

## Wanneer gebruik je het?

- **Wel**: bij inloggen en bij het kiezen van een nieuw wachtwoord.
- **Niet** voor andere geheime gegevens die iemand overneemt van papier (een code uit een brief): daar is het juist
  handig om te zien wat je typt; gebruik een gewone textbox.

## Toegankelijkheid

- De knop is een **toggle-knop**: hij heet altijd "Wachtwoord tonen" en geeft met `aria-pressed` aan of het
  wachtwoord zichtbaar is. Een schermlezer leest "Wachtwoord tonen, knop, ingedrukt" of "niet ingedrukt".
- Na elke klik meldt een statusregel "Wachtwoord is zichtbaar." of "Wachtwoord is verborgen."; bij het laden van de
  pagina blijft die stil.
- De knop is 44 pixels breed (WCAG 2.5.8), heeft een zichtbare focusring en werkt in Windows-hoog-contrast.
- Gebruik `autocomplete="current-password"` bij inloggen en `autocomplete="new-password"` bij een nieuw wachtwoord,
  zodat wachtwoordmanagers het juiste invullen of voorstellen (WCAG 1.3.5).
- Zet eisen aan het wachtwoord in een beschrijving onder het label en koppel die met `aria-describedby`, niet alleen in
  een foutmelding achteraf.

## Doen en niet doen

| Doen                                                                   | Niet doen                                         |
| ---------------------------------------------------------------------- | ------------------------------------------------- |
| De eisen vooraf noemen ("Minimaal 12 tekens.")                         | Plakken blokkeren                                 |
| `autocomplete` instellen                                               | Het wachtwoord standaard zichtbaar maken          |
| De teksten vertalen met `toggleLabel` / `statusShown` / `statusHidden` | Het label van de knop laten wisselen met de stand |
