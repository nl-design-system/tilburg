import { Component, Input } from '@angular/core';
import { formatCurrency, FormattedCurrency } from '../utils/data-format';

@Component({
  selector: 'tilburg-currency-data',
  templateUrl: 'index.html',
  styleUrls: ['index.scss'],
  standalone: false,
})
export class TilburgCurrencyData {
  @Input({ required: true }) amount!: number | string;
  /** ISO 4217 currency code. */
  @Input() currency: string = 'EUR';
  /** BCP 47 locale for the notation. */
  @Input() locale: string = 'nl-NL';

  get formatted(): FormattedCurrency {
    return formatCurrency(this.amount, this.currency, this.locale);
  }
}
