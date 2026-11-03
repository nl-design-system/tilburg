import '@gemeente-tilburg/components-css/iban-data/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, Fragment, HTMLAttributes } from 'react';
import { ibanGroups, normalizeIban } from './utils/data-format';

export interface IbanDataProps extends Omit<HTMLAttributes<HTMLDataElement>, 'children'> {
  /** The IBAN, in any spacing or case. */
  value: string;
}

export const IbanData = forwardRef(
  ({ value, className, ...restProps }: IbanDataProps, ref: ForwardedRef<HTMLDataElement>) => {
    const normalized = normalizeIban(value);
    return (
      <data ref={ref} value={normalized} translate="no" className={clsx('utrecht-iban-data', className)} {...restProps}>
        {ibanGroups(normalized).map((group, index) => (
          <Fragment key={index}>
            {index > 0 && ' '}
            <span className="tilburg-iban-data__group">{group}</span>
          </Fragment>
        ))}
      </data>
    );
  },
);

IbanData.displayName = 'IbanData';
