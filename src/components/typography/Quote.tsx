import React from 'react';
import { cn } from '../../utils';
import { cva, type VariantProps } from 'class-variance-authority';

const quoteVariants = cva(
    'border-l-4 pl-6 italic',
    {
        variants: {
            variant: {
                default: 'border-muted text-muted-foreground',
                primary: 'border-primary text-primary',
                secondary: 'border-secondary text-secondary',
                destructive: 'border-destructive text-destructive',
            },
            size: {
                sm: 'text-sm',
                default: 'text-base',
                lg: 'text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface QuoteProps
    extends React.HTMLAttributes<HTMLQuoteElement>,
        VariantProps<typeof quoteVariants> {
    cite?: string;
    author?: string;
}

const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
    (
        { className, variant, size, cite, author, children, ...props },
        ref
    ) => {
        return (
            <figure className="my-4">
                <blockquote
                    ref={ref}
                    cite={cite}
                    className={cn(quoteVariants({ variant, size, className }))}
                    {...props}
                >
                    {children}
                </blockquote>
                {author && (
                    <figcaption className="mt-2 text-sm text-muted-foreground">
                        — {author}
                    </figcaption>
                )}
            </figure>
        );
    }
);

Quote.displayName = 'Quote';

export { Quote, quoteVariants };
