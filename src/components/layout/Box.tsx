import React from 'react';
import { cn } from '../../utils';
import { cva, type VariantProps } from 'class-variance-authority';

const boxVariants = cva('', {
    variants: {
        padding: {
            none: 'p-0',
            sm: 'p-2',
            md: 'p-4',
            lg: 'p-6',
            xl: 'p-8',
        },
        rounded: {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            full: 'rounded-full',
        },
        border: {
            none: 'border-0',
            default: 'border border-border',
            thick: 'border-2 border-border',
        },
        shadow: {
            none: 'shadow-none',
            sm: 'shadow-sm',
            md: 'shadow-md',
            lg: 'shadow-lg',
            xl: 'shadow-xl',
        },
    },
    defaultVariants: {
        padding: 'none',
        rounded: 'none',
        border: 'none',
        shadow: 'none',
    },
});

export interface BoxProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof boxVariants> {}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
    ({ className, padding, rounded, border, shadow, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(boxVariants({ padding, rounded, border, shadow, className }))}
                {...props}
            />
        );
    }
);

Box.displayName = 'Box';

export { Box, boxVariants };