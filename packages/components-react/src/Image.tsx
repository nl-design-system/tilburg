import '@gemeente-tilburg/components-css/image/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  photo?: boolean;
}

export const Image = forwardRef(
  ({ photo, className, ...restProps }: ImageProps, ref: ForwardedRef<HTMLImageElement>) => (
    <img ref={ref} className={clsx('utrecht-img', { 'utrecht-img--photo': photo }, className)} {...restProps} />
  ),
);

Image.displayName = 'Image';
