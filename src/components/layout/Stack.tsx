import React from 'react';
import { cn } from '../../utils';
import { cva, type VariantProps } from 'class-variance-authority';

const stackVariants = cva('flex', {
    variants: {
        direction: {
            row: 'flex-row',
            column: 'flex-col',
        },
        spacing: {
            none: 'gap-0',
            xs: 'gap-1',
            sm: 'gap-2',
            md: 'gap-4',
            lg: 'gap-6',
            xl: 'gap-8',
        },
        align: {
            start: 'items-start',
            center: 'items-center',
            end: 'items-end',
            stretch: 'items-stretch',
            baseline: 'items-baseline',
        },
        justify: {
            start: 'justify-start',
            center: 'justify-center',
            end: 'justify-end',
            between: 'justify-between',
            around: 'justify-around',
            evenly: 'justify-evenly',
        },
        wrap: {
            none: 'flex-nowrap',
            wrap: 'flex-wrap',
        },
    },
    defaultVariants: {
        direction: 'column',
        spacing: 'md',
        align: 'stretch',
        justify: 'start',
        wrap: 'none',
    },
});

export interface StackProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof stackVariants> {
    inline?: boolean;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
    (
        {
            className,
            direction,
            spacing,
            align,
            justify,
            wrap,
            inline = false,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    stackVariants({ direction, spacing, align, justify, wrap, className }),
                    inline && 'inline-flex'
                )}
                {...props}
            />
        );
    }
);

Stack.displayName = 'Stack';

export { Stack, stackVariants };
