import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import { formatIban, normalizeIban } from './utils/data-format';

export interface IbanDataProps extends Omit<HTMLAttributes<HTMLDataElement>, 'children'> {
  /** The IBAN, in any spacing or case. */
  value: string;
}

export const IbanData = forwardRef(
  ({ value, className, ...restProps }: IbanDataProps, ref: ForwardedRef<HTMLDataElement>) => {
    const normalized = normalizeIban(value);
    return (
      <data ref={ref} value={normalized} translate="no" className={clsx('utrecht-iban-data', className)} {...restProps}>
        {formatIban(normalized)}
      </data>
    );
  },
);

IbanData.displayName = 'IbanData';
