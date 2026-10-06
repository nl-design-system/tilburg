<!-- @license CC0-1.0 -->

# Tooltip

Een korte toelichting bij een bedieningselement, die verschijnt als de muis erboven hangt of het element de
toetsenbordfocus heeft. Dit is een **Tilburg-component** (label **TLB**): Utrecht heeft geen tooltip.

## Wanneer gebruik je het?

- **Wel**: om een knop met alleen een icoon kort toe te lichten, of een korte aanvulling bij een knop of link.
- **Niet** voor informatie die iedereen nodig heeft: wie niet met een muis werkt of inzoomt, mist een tooltip
  makkelijk. Zet die informatie in de pagina, of in een beschrijving bij een formulierveld.
- **Niet** voor links, knoppen of andere interactieve inhoud in de tooltip zelf: die zijn niet te bereiken.
- **Niet** op elementen die geen focus kunnen krijgen (een stuk tekst, een icoon zonder knop): toetsenbordgebruikers
  zien de tooltip dan nooit.

## Toegankelijkheid

- De tooltip voldoet aan **WCAG 1.4.13**: hij opent bij hover (na een korte vertraging) en bij focus, **Escape** sluit
  hem zonder dat de muis of focus hoeft te bewegen, en de muis kan naar de tooltip toe bewegen zonder dat hij sluit.
  Op een touchscreen opent en sluit een tik hem.
- De tooltip is een **beschrijving**, geen naam: de trigger houdt zijn eigen naam (de tekst, of `aria-label` bij een
  icoonknop) en verwijst met `aria-describedby` naar de tooltip. Bestaande ids in `aria-describedby` blijven staan.
- De tekst staat ook in de pagina als de tooltip dicht is, dus een schermlezer leest hem altijd voor.
- De tooltip blijft in beeld: is er boven de knop geen ruimte, dan opent hij eronder, en aan de rand van het scherm of
  van een tabelcel schuift hij opzij. Ook bij inzoomen valt hij zo niet buiten beeld.

## Doen en niet doen

| Doen                                               | Niet doen                                             |
| -------------------------------------------------- | ----------------------------------------------------- |
| Eén korte zin                                      | Een alinea of een lijstje                             |
| Een `aria-label` op een icoonknop, plus de tooltip | De tooltip als enige naam van een icoonknop gebruiken |
| Belangrijke uitleg in de pagina zelf               | Verplichte informatie alleen in een tooltip           |
