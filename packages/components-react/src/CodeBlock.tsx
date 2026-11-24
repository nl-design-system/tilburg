import '@gemeente-tilburg/components-css/code-block/index.scss';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes, PropsWithChildren } from 'react';

export type CodeBlockProps = HTMLAttributes<HTMLPreElement>;

export const CodeBlock = forwardRef(
  ({ className, children, ...restProps }: PropsWithChildren<CodeBlockProps>, ref: ForwardedRef<HTMLPreElement>) => (
    <pre ref={ref} className={clsx('utrecht-code-block', className)} tabIndex={0} {...restProps}>
      <code className="utrecht-code-block__content">{children}</code>
    </pre>
  ),
);

CodeBlock.displayName = 'CodeBlock';
