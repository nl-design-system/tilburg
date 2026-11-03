import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import { formatCurrency } from './utils/data-format';

export interface CurrencyDataProps extends Omit<HTMLAttributes<HTMLDataElement>, 'children'> {
  amount: number | string;
  /** ISO 4217 currency code. */
  currency?: string;
  /** BCP 47 locale for the notation. */
  locale?: string;
}

export const CurrencyData = forwardRef(
  (
    { amount, currency = 'EUR', locale = 'nl-NL', className, ...restProps }: CurrencyDataProps,
    ref: ForwardedRef<HTMLDataElement>,
  ) => {
    const formatted = formatCurrency(amount, currency, locale);
    return (
      <data
        ref={ref}
        value={formatted.value}
        lang={formatted.lang}
        className={clsx(
          'utrecht-currency-data',
          formatted.amount < 0 && 'utrecht-currency-data--negative',
          formatted.amount > 0 && 'utrecht-currency-data--positive',
          className,
        )}
        {...restProps}
      >
        {formatted.text}
      </data>
    );
  },
);

CurrencyData.displayName = 'CurrencyData';
