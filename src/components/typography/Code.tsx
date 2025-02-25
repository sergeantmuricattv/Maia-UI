import React from 'react';
import { cn } from '../../utils';
import { cva, type VariantProps } from 'class-variance-authority';

const codeVariants = cva(
    'font-mono rounded px-[0.3em] py-[0.2em] text-sm',
    {
        variants: {
            variant: {
                default: 'bg-muted text-foreground',
                primary: 'bg-primary/10 text-primary',
                secondary: 'bg-secondary/10 text-secondary',
                destructive: 'bg-destructive/10 text-destructive',
            },
            size: {
                sm: 'text-xs',
                default: 'text-sm',
                lg: 'text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface CodeProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof codeVariants> {
    block?: boolean;
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
    ({ className, variant, size, block = false, children, ...props }, ref) => {
        const Component = block ? 'pre' : 'code';

        return React.createElement(
            Component,
            {
                ref,
                className: cn(
                    codeVariants({ variant, size, className }),
                    block && 'block p-4 overflow-x-auto'
                ),
                ...props,
            },
            children
        );
    }
);

Code.displayName = 'Code';

export { Code, codeVariants };
